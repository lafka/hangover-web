define(
	["backbone",
	 "plugin/app"
	],
	function(Backbone, App) {
		var view = Backbone.View.extend({
			model: undefined,
			playlists: undefined,
			initialize: function() {
				this.playlists = new App.Collection.playlists();
				this.model = new App.Model.playlist();
			},
			render: function() {
				var view = this;

				require([
					"text!plugin/playlist/tpl/overview.tpl",
					"text!plugin/tracks/tpl/search-table.tpl",
					"text!tpl/form.tpl"
				], function(canvas, table, form) {
					view.playlists.fetch({success: function(ev) {
						view.renderCanvas.call(view, canvas, table, form);
					}});
				});
			},
			renderCanvas: function(canvas, table, form) {
				this.$el.html( _.template( canvas, {
					createTemplate: _.template(form, {
						title: "Create playlist",
						elems: [
							{
								field: "name",
								title: "Name",
								placeholder: "Playlist name",
								value: this.model.get("name")
							}
						],
						alert: undefined,
						alertTitle: "",
						message: undefined,
						button: "Create playlist"
					}),
					tpl: table,
					data: this.playlists.toJSON()
				}));
			}
		});

		return view;
	});
