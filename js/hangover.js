var deps =
	["backbone",
	 "zepto",
	 "plugin/app",
	 "plugin/index/index",
	 "plugin/tracks/tracks",
	 "plugin/schedule/schedule",
	 "plugin/playlist/playlist",
	 "plugin/user/user",
	];
define(deps,
	function(Backbone, $, App, Index) {
		var plugins = [],
		    pluginDeps = [],
		    obj = {};

		// arguments is not a real array...
		plugins = Array.prototype.slice.call(arguments, 3);
		pluginDeps = deps.slice(3);

		obj.initialize = function() {
			var filterFun,
			    callback
			    routes = {};

			filterFun = function(plugin) {
				return 'function' == typeof(plugin);
			};

			callback = function(acc, plugin) {
				var routes = acc[0],
				    i      = acc[1];

				routes[pluginDeps[i].split('/')[1]] = new plugin();

				return [routes, i + 1];
			};

			var routesBuf = _.foldl(_.filter(plugins, filterFun), callback, [{}, 0]);
			route = routesBuf[0];

			Backbone.history.start();

			App.Nav.main.render();
		};

		return obj;
	});
