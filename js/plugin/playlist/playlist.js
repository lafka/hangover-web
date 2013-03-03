define(
	["backbone",
	 "plugin/app",
	 "plugin/user/user"
	],
	function(Backbone, App, User) {
		App.addNav("main", "/playlist", "Playlists", "Playlists");

		App.Model.playlist = Backbone.RelationalModel.extend({
			defaults: {
				id: "",
				name: "",
				author: "",
				tracks: "",
			},
			url: function() { return "api/playlist/" + this.id; },
			relations: [{
				type: Backbone.HasMany,
				key: 'tracks',
				relatedModel: App.Model.track,
				autoFetch: true
			}],
		});

		App.Collection.playlists = Backbone.Collection.extend({
			station: "oslobass",
			model: App.Model.playlist,
			initialize: function() {
			},
			url: function() {
				return 'api/playlist/' + this.station + "/";
			},
		});

		var router = Backbone.Router.extend({
			routes : {
				'playlist'  : 'overview',
				'playlist/:playlist' : 'view'
			},
			overview: function() {
				App.loadViewIfAuthenticated("playlist", "overview", {
					errorArg: true
				});
			},
			view: function(id) {
				App.loadViewIfAuthenticated("playlist", "view", {
					successArg: id
				});
			}
		});

		return router;
	}
);
