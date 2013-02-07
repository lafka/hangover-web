define(
	["backbone",
	 "view/navigation"
	],
	function(Backbone, Nav) {
		var plugin = {
			nav: {}
		};

		plugin.addNavbar = function(nav, target) {
			plugin.nav[nav] = new Nav({el: target});
		};

		plugin.addNav = function(navbar, link, text, title) {
			plugin.nav[navbar].addNav.call(plugin.nav[navbar], link, text, title);
		};

		plugin.addNavbar("main", $("#navbar"));

		return plugin;
	}
);

