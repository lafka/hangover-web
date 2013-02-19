define(
	["backbone",
	 "plugin/app",
	 "plugin/user/user"
	],
	function(Backbone, App, User) {
		App.addNav("main", "/index/main", "Home", "Home");

		var IndexRouter = Backbone.Router.extend({
			routes: {
				'index/main': 'index',
			},
			defaultRoute: 'index/main'
		});

		return {router : new IndexRouter()};
	}
);
