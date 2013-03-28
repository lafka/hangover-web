define(
	['backbone',
	 'app',
	 'plugin/user/user',
	 'plugin/playlist/view/sidebar'
	],
	function(Backbone, App, User, Sidebar) {
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
			link: undefined,
			routes : {
				'playlists'  : 'overview',
				'playlists/:playlist' : 'view'
			},
			initialize: function() {
				App.addNav("main", "/playlists", "Playlists", "Playlists");
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

		var sidebar;
		if (App.Model.authentication.authenticated()) {
			var el = $('<aside class="span3" id="sidebar" />').prependTo($('body'));
			sidebar = new Sidebar({el: el});
			sidebar.render();
			$('body').addClass('has-aside');
		}

		return router;
	}
);
