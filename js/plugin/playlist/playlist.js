define(
	["backbone",
	 "plugin/app",
	 "plugin/user/user"
	],
	function(Backbone, App, User) {
		App.addNav("main", "/playlist/overview", "Playlists", "Playlists");

		var router = Backbone.Router.extend({
			routes : {
				'playlist/overview'  : 'overview',
				'playlist/:playlist' : 'view'
			},
			defaultRoute: 'playlist/overview'
		});

		return {
			router: new router(),
			plugin: 'playlist'
		}
	}
);
