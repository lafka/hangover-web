define(
	["backbone",
	 "plugin/app"
	],
	function(Backbone, App) {
		var view = Backbone.View.extend({
			model: App.Model.playlist,
			initialize: function() { },
			render: function(id) {
				var view = this;

				require([
					"text!plugin/playlist/tpl/playlist.tpl",
					"text!plugin/tracks/tpl/search-table.tpl"
				], function(canvas, table) {
					view.renderCanvas.call(view, id, canvas, table);
				});
			},
			renderCanvas: function(id, canvas, table) {
				this.$el.html( _.template( canvas, {
					tpl: table,
					data: this.model.findOrCreate(id).toJSON()
				}));
			}
		});

		return view;
	});
