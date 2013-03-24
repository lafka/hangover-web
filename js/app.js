define(
	['backbone',
	 'view/navigation'
	],
	function(Backbone, Nav) {
		var app = {
			Nav:   {},
			Model: {},
			View:  {},
			Collection: {}
		};

		app.addNavbar = function(nav, target) {
			app.Nav[nav] = new Nav({el: target});
		};

		app.addNav = function(navbar, link, text, title) {
			app.Nav[navbar].addNav.call(app.Nav[navbar], link, text, title);
		};

		app.addNavbar("main", $("#navbar"));

		app.setCurrentView = function(Ref, plugin, view) {
			view = "plugin/" + plugin+ "/view/" + view;

			require([view], function(View) {
				Ref.View.current = new View({el: $("#content")});
			});
		};

		app.loadView = function(Ref, plugin, view, setCurrent, arg) {
			setCurrent = undefined == setCurrent ? true : setCurrent;
			view = "plugin/" + plugin + "/view/" + view;

			require([view], function(View) {
				var partial = new View({el: $("#content")});

				if (setCurrent) {
					Ref.View.current = partial;
				}

				partial.render.call(partial, arg);
			});
		};

		return app;
	}
);

