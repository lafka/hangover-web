define(
	["backbone",
	 "plugin/app"
	],
	function(Backbone, App) {
		var view = Backbone.View.extend({
			model: undefined,
			initialize: function() {
			},
			render: function() {
				this.$el.html("<h1>Playlists</h1><p>this is a playlist</p>")
			}
		});

		return view;
	});
