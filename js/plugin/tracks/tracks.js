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

		App.Model.track = Backbone.Model.extend({
			defaults: {
				id:     "",
				title:  "Track name",
				artist: "Artist"
			},
			url: function() {
				return 'api/tracks/' + this.id;
			}
		});

		App.Collection.tracks = Backbone.Collection.extend({
			query: {
				string: ""
			},
			model: App.Model.track,
			url: function() {
				return 'api/tracks/?q=' + this.query.string;
			}
		});

		return {
			router: new router(),
			plugin: 'tracks',
			collection: App.Collection.tracks
		};
	}
);
