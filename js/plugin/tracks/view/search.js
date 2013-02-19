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
				this.$el.html("<h1>Tracks</h1><p>searching for tracks</p>")
			}
		});

		return view;
	});
