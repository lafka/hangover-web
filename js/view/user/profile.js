define(
	["backbone",
	],
	function(Backbone) {
		var view = Backbone.View.extend({
			initialize: function() {
			},
			render: function() {
				alert("Im a profile");
			}
		});

		return view;
	}
);
