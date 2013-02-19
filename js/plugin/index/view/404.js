define(
	["backbone"],
	function(Backbone, User) {
		var view = Backbone.View.extend({
			initialize: function() {
			},
			render: function() {
				this.$el.html(
					'<h1>Go home, you\'r drunk</h1> \
					<p>Where you going? Nowhere!!!</p>');
			}
		});

		return view;
	}
);
