define(
	['backbone',
	 'app',
	 'plugin/user/user'
	],
	function(Backbone, App, User) {
		App.addNav("main", "/playlists", "Playlists", "Playlists");

		App.Model.playlist = Backbone.RelationalModel.extend({
			station: "oslobass",
			defaults: {
				name: "",
				author: "",
				tracks: "",
			},
			url: function() {
				return "api/playlists/" + this.station + "/" + (this.id || "");
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
				return 'api/playlists/' + this.station + "/";
			},
		});

		var router = Backbone.Router.extend({
			routes : {
				'playlists'  : 'overview',
				'playlists/:playlist' : 'view'
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
