define(
	["backbone",
	 "plugin/app"
	],
	function(Backbone, App) {
		var view = Backbone.View.extend({
			playlists: undefined,
			initialize: function() {
				this.playlists = new App.Collection.playlists();
			},
			render: function() {
				var view = this;

				require([
					"text!plugin/playlist/tpl/overview.tpl",
					"text!plugin/tracks/tpl/search-table.tpl"
				], function(canvas, table) {
					view.playlists.fetch({success: function(ev) {
						view.renderCanvas.call(view, canvas, table);
					}});
				});
			},
			renderCanvas: function(canvas, table) {
				this.$el.html( _.template( canvas, {
					tpl: table,
					data: this.playlists.toJSON()
				}));
			}
		});

		return view;
	});
