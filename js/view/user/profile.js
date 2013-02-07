define(
	["backbone",
	],
	function(Backbone) {
		var view = Backbone.View.extend({
			initialize: function() {
				console.log("view: init[user/profile]");
			},
			render: function() {
				console.log("render: view/user/profile");
			}
		});

		return view;
	}
);
