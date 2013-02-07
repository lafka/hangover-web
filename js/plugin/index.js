define(
	["backbone",
	 "plugin/page",
	 "plugin/user"
	],
	function(Backbone, Page, User) {
		Page.addNav("main", "/", "Home", "Home");

		if (!User.loggedIn()) {
			return {};
		}

		var IndexRouter = Backbone.Router.extend({
			routes: {
				'': 'index',
			}
		});

		return {router : new IndexRouter()};
	}
);
