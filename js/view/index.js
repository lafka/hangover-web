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

		var router = new IndexRouter();

		router.on('route:index', function() {
			console.log("yay!!!!");
		});

		return {};
	}
);
