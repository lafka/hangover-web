define(
	["backbone",
	 "plugin/app",
	 "plugin/user"
	],
	function(Backbone, App, User) {
		var view = Backbone.View.extend({
			model: undefined,
			initialize: function() {
				this.model = App.Model.authentication;
			},
			events: {
				"user:login" : "render",
				"user:logout" : "render",
			},
			render: function(e) {
				App.Nav.meta.clear.call(App.Nav.meta);
				if (this.model.authenticated()) {
					var username = this.model.get("username")
					App.addNav("meta", "/user/profile", "Profile");
					App.addNav("meta", "/user/logout", "Logout (" + username + ")");
				} else {
					App.addNav("meta", "/user/login", "Login");
				}
				App.Nav.meta.render.call(App.Nav.meta);
			}
		});

		return view;
	});
