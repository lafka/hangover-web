define(
	["backbone",
	 "plugin/app",
	 "plugin/user/user"
	],
	function(Backbone, App, User) {
		App.addNav("main", "/playlist/overview", "Playlists", "Playlists");

		App.Model.playlist = Backbone.Model.extend({
			defaults: {
				id: "",
				name: "",
				author: ""
			},
			tracks: undefined,
			initialize: function() {
				console.log("new playlist", this);
				// @todo 2013-02-25 olav; add dynamic collection fetch url
				this.tracks = new App.Collection.tracks()
			}
		});

		App.Collection.playlists = Backbone.Collection.extend({
			model: App.Model.playlist,
			initialize: function() {
				console.log("new playlist collection") }
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
