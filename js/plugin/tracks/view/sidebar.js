define(
	["backbone",
	 "plugin/app"
	],
	function(Backbone, App) {
		var view = Backbone.View.extend({
			tracks: undefined,
			initialize: function() {
				this.tracks = new App.Collection.playlists
				console.log("tracks", this.tracks);
				this.tracks.add(
					{id: "queue", name: "Play queue"}
				);
			},
			render: function() {
				var view = this;
				require([
					"text!plugin/tracks/tpl/sidebar.tpl"
				], function(canvas) {
					//var queueCollection = App.Collection.tracksQueue;
					//queueCollection.fetch();
					//view.$el.html(_.template(tpl, queueCollection.toJSON()));
					view.$el.html(
						_.template(canvas, {collection: view.tracks.toJSON()}));
				});
			}
		});

		return view;
	});
