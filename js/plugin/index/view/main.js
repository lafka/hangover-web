define(
	["backbone",
	 "plugin/user/user"
	],
	function(Backbone, User) {
		var view = Backbone.View.extend({
			initialize: function() {
			},
			render: function() {
				this.$el.html('<h1>hello joe</h1><p>i\'m the index!</p>');
			}
		});

		return view;
	}
);
