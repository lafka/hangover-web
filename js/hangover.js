define(
	["backbone",
	 "zepto",
	 "plugin/app",
	 "plugin/index",
	 "plugin/tracks/tracks",
	 "plugin/schedule/schedule",
	 "plugin/playlist/playlist",
	 "plugin/user/user"
	],
	function(Backbone, $, App) {
		// arguments is not a real array...
		var plugins = Array.prototype.slice.call(arguments, 3);

		var obj = {};
		obj.initialize = function() {
			var filterFun = function(A) {
				return 'object' == typeof(A) && _.has(A, "router");
			};

			var callback = function(A) {
				_.each(_.pairs(A.router.routes), function(X) {
					X[0] = ('/' == X[0] ? 'index' : X[0]) || (A.defaultRoute || 'index');
					console.log('listen for: route:' + X[1]);
					A.router.on('route:' + X[1], function() {
						var plugin = X[0].split("/");
						var view = 'plugin/' + plugin[0] + '/view/' + plugin.slice(1).join("/")
						require([view], function(PartialView) {
							view = new PartialView({el: $("#content")});
							view.render();
						});
					});
				});
			};

			var routes = _.each(_.filter(plugins, filterFun), callback);

			Backbone.history.start();

			App.Nav.main.render();
		};

		return obj;
	});
