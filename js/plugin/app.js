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

		return plugin;
	}
);

