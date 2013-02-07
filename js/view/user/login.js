define(
	["backbone",
	],
	function(Backbone) {
		var view = Backbone.View.extend({
			initialize: function() {
				console.log("view: init[user/login]");
			},
			render: function() {
				console.log("render: view/user/login");
			}
		});

		return view;
	}
);
