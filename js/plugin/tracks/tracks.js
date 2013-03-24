define(
	['backbone',
	 'app',
	 'plugin/user/user'
	],
	function(Backbone, App, User) {
		App.addNav("main", "/tracks", "Tracks", "Tracks");

		var router = Backbone.Router.extend({
			routes : {
				'tracks'        : 'search',
				'track/:track'  : 'view'
			},
			search: function() {
				App.loadView(App, "tracks", "search");
			},
			view: function() {
				console.log('viewing track');
			}
		});

		App.Model.track = Backbone.RelationalModel.extend({
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

		return router;
	}
);
