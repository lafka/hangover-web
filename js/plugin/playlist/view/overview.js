define(
	['backbone',
	 'app',
	 'plugin/playlist/view/playlist-embedded',
	],
	function(Backbone, App, embeddedView) {
		var view = Backbone.View.extend({
			playlists: undefined,
			initialize: function() {
				this.playlists = new App.Collection.playlists();
			},
			events: {
				'submit #create-playlist' : 'addPlaylist',
			},
			render: function() {
				var view = this;

				require([
					"text!plugin/playlist/tpl/overview.tpl",
					"text!plugin/playlist/tpl/playlist-embedded.tpl",
					"text!tpl/form.tpl"
				], function(canvas, playlistEmbed, form) {
					view.playlists.fetch({
						success: function(ev) {
							if (undefined == view.playlistsViews) {
								view.playlistsView = new App.View.UpdatingCollectionView({
									collection: view.playlists,
									partial: embeddedView,
									partialOpts: {tpl: playlistEmbed},
									tpl: playlistEmbed,
									el: $('<div class="children"/>')
								});
							}
							view.renderCanvas.call(view, canvas, form);
						},
						error: function(ev, resp) {
							console.log("NOOOO", ev, resp);
						}
					});
				});
			},
			renderCanvas: function(canvas, form) {
				this.$el.html( _.template( canvas, {
					createTemplate: _.template(form, {
						id: "create-playlist",
						elems: [
							{
								field: "name",
								title: "Name",
								placeholder: "Playlist name",
							}
						],
						formClass: "form-inline",
						controlGroups: false,
						button: "Create playlist"
					}),
					numPlaylists: this.playlistsView.subViews.length
				}));

				$('div.children', this.$el).replaceWith(this.playlistsView.$el);

				this.playlistsView.render();
			},
			addPlaylist: function(e) {
				e.preventDefault();
				var model = new App.Model.playlist({
					name: $('input#input-name', e.target).val(),
				});

				if (model.get('name')) {
					var view = this;
					model.save({}, {success: function(e) {
						view.playlists.add(e)
					}});
				} else {
					$(e.target).parent().addClass("alert-error");
					$(e.target).parent().removeClass("alert-info");
				}
			},
		});

		return view;
	});
