define(
	['backbone',
	 'app',
	 'plugin/playlist/view/playlist-embedded',
	 'text!plugin/playlist/tpl/sidebar.tpl'
	],
	function(Backbone, App, EmbeddedPartial, SidebarTpl) {
		var view = Backbone.View.extend({
			playlists: undefined,
			initialize: function() {
				this.playlists = new App.Collection.playlists();
				var view = this;
				this.construct = _.once(function(embedView) {
					view.playlistsView = new App.View.UpdatingCollectionView({
						collection: view.playlists,
						partial: EmbeddedPartial,
						partialOpts: {tpl: embedView},
						tpl: embedView,
						el: $('<ul class="children"/>'),
						wrapper: $('<li/>')
					});
				});
			},
			events: {
				'submit #create-playlist-sidebar' : 'addPlaylist',
			},
			render: function() {
				var view = this;
				require(
					['text!plugin/playlist/tpl/sidebar-line.tpl'
					], function(LineTpl) {
						view.playlists.fetch({success: function(model) {
							view.construct(LineTpl);
							view.$el.html(_.template(SidebarTpl));
							$('.children', view.$el).replaceWith(view.playlistsView.el);
						}});
				});
			},
			addPlaylist: function(e) {
				console.log("add playlist to sidebar");
			}
		});

		return view;
	});
