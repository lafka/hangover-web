define(
	["backbone",
	 "plugin/app",
	 "plugin/user/user"
	],
	function(Backbone, App, User) {
		App.addNav("main", "/", "Home", "Home");

		var IndexRouter = Backbone.Router.extend({
			routes: {
				'': 'index',
			},
			defaultRoute: 'index'
		});

		return {router : new IndexRouter()};
	}
);
