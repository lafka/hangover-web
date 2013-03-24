define(
	['backbone',
	 'app'
	],
	function(Backbone, App) {
		var view = Backbone.View.extend({
			model: App.Model.authentication,
			initialize: function() { },
			template: _.template('<h1>You\'r now logged out</h1> \
				<p>Please come back soon :)</p>'),
			render: function() {
				App.Nav.meta.trigger("user:logout");
				_.each(["_h_user", "_h_token"], Cookie.unset);
				App.View.meta_nav.render();
				this.$el.html(this.template);
			}
		});

		return view;
	}
);
