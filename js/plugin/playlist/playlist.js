define(
	["backbone",
	 "plugin/app",
	 "plugin/user/user"
	],
	function(Backbone, App, User) {
		App.addNav("main", "/playlist/overview", "Playlists", "Playlists");

		App.Model.playlist = Backbone.RelationalModel.extend({
			defaults: {
				id: "",
				name: "",
				author: "",
				tracks: "",
			},
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
