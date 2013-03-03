define(
	["backbone",
	 "view/navigation"
	],
	function(Backbone, Nav) {
		var plugin = {
			Nav:   {},
			Model: {},
			View:  {},
			Collection: {}
		};

		plugin.addNavbar = function(nav, target) {
			plugin.Nav[nav] = new Nav({el: target});
		};

		plugin.addNav = function(navbar, link, text, title) {
			plugin.Nav[navbar].addNav.call(plugin.Nav[navbar], link, text, title);
		};

		plugin.addNavbar("main", $("#navbar"));

		plugin.setCurrentView = function(Ref, plugin, view) {
			view = "plugin/" + plugin + "/view/" + view;

			require([view], function(View) {
				Ref.View.current = new View({el: $("#content")});
			});
		};

		plugin.loadView = function(Ref, plugin, view, setCurrent, arg) {
			setCurrent = undefined == setCurrent ? true : setCurrent;
			view = "plugin/" + plugin + "/view/" + view;

			require([view], function(View) {
				var partial = new View({el: $("#content")});
				if (setCurrent)
					Ref.View.current = partial;
				partial.render.call(partial, arg);
			});
		};

		return plugin;
	}
);

