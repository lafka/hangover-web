define(
	["backbone",
	 "zepto",
	 "plugin/app",
	 "plugin/index/index",
	 "plugin/tracks/tracks",
	 "plugin/schedule/schedule",
	 "plugin/playlist/playlist",
	 "plugin/user/user",
	 "plugin/index/404"
	],
	function(Backbone, $, App, Index) {
		// arguments is not a real array...
		var plugins = Array.prototype.slice.call(arguments, 3);

		var obj = {};
		obj.initialize = function() {
			var filterFun = function(A) {
				return 'object' == typeof(A) && _.has(A, "router");
			};

			var callback = function(A) {
				_.each(_.pairs(A.router.routes), function(X) {
					X[0] = ('/' == X[0] ? 'index/main' : X[0]) || (A.defaultRoute || 'index/main');
					A.router.on('route:' + X[1], function() {
						var plugin = X[0].split("/");
						var view = 'plugin/' + plugin[0] + '/view/' + plugin.slice(1).join("/")
						if (X[0].match(/^[^a-zA-Z0-9]/)) {
							view = 'plugin/' + A.plugin + '/view/' + X[1];
						}
						require([view], function(PartialView) {
							App.View.current = new PartialView({el: $("#content")});
							App.View.current.render();
						});
					});
				});
			};

			var routes = _.each(_.filter(plugins, filterFun), callback);

			Backbone.history.start();

			if (window.location.hash.match(/#?\/?$/)) {
				window.location.hash = '#/index/main'
			}

			App.Nav.main.render();
		};

		return obj;
	});
