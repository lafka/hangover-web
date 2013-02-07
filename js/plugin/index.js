define(
	["backbone",
	 "plugin/user"
	],
	function(Backbone, user) {
		console.log("plugin: index");

		if (!user.loggedIn()) {
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
