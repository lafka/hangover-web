define(
	["backbone",
	 "plugin/app",
	 "plugin/user/user"
	],
	function(Backbone, App, User) {
		App.addNav("main", "/tracks/search", "Tracks", "Tracks");

		var router = Backbone.Router.extend({
			routes : {
				'tracks/search' : 'search',
				'track/:track'  : 'view'
			},
			defaultRoute: 'tracks/search',
		});

		return {
			router: new router(),
			plugin: 'tracks'
		};
	}
);
