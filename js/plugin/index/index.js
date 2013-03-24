define(
	['backbone',
	 'app',
	 'plugin/user/user'
	],
	function(Backbone, App, User) {
		App.addNav("main", "/", "Home", "Home");

		var IndexRouter = Backbone.Router.extend({
			routes: {
				'': 'index',
				'/': 'index',
			},
			index: function() {
				App.loadView(App, "index", "main");
			}
		});

		return IndexRouter;
	}
);
