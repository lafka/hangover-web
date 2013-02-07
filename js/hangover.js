define(
	["backbone",
	 "zepto",
	 "plugin/index",
	 "plugin/tracks",
	 "plugin/schedule",
	 "plugin/playlist",
	 "plugin/user"
	],
	function(Backbone, $) {
		// arguments is not a real array...
		var plugins = Array.prototype.slice.call(arguments, 2);

		var obj = {};
		obj.initialize = function() {
			console.log('hangover: init');

			var filterFun = function(A) {
				return 'object' == typeof(A) && _.has(A, "router");
			};

			var callback = function(A) {
				_.each(_.pairs(A.router.routes), function(X) {
					X[0] = X[0] || (A.defaultRoute || 'index');
					A.router.on('route:' + X[1], function() {
						console.log('ev: ' + X[1] + "; load: " + X[0]);
						require(['view/' + X[0]], function(PartialView) {
							view = new PartialView({el: $("body")});
							view.render();
						});
					});
				});
			};

			var routes = _.each(_.filter(plugins, filterFun), callback);

			Backbone.history.start();
		};

		return obj;
	});