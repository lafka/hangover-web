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

		plugin.loadView = function(Ref, plugin, view) {
			view = "plugin/" + plugin + "/view/" + view;
			require([view], function(View) {
				Ref.View.current = new View({el: $("#content")});
				Ref.View.current.render();
			});
		};


		return plugin;
	}
);

