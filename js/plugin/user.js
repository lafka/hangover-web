define(
	["backbone",
	 "cookie",
	 "plugin/app",
	 "view/user/menu"
	],
	function(Backbone, Cookie, App, Menu) {
		Cookie = window.Cookie; // fuck me right?
		App.addNavbar("meta", $("#meta-navbar"));

		var authModel = Backbone.Model.extend({
			defaults: {
				username: "",
				password: "",
				token:    ""
			},
			initialize: function() {
				if (this.authenticated()) {
					this.set("username", Cookie.get("_h_user"));
					this.set("token",    Cookie.get("_h_token"));
				}
			},
			url: "api/auth/",
			success: function(model, resp) {
				Cookie.set("_h_token", resp.token);
				Cookie.set("_h_user", resp.username);
				App.View.meta_nav.render();
				window.location.hash = "/user/profile";
			},
			error: function(model, resp) {
				Cookie.unset("_h_token");
				Cookie.unset("_h_user");
				App.View.meta_nav.render();
			},
			authenticated: function() {
				console.log("auth", Cookie.get("_h_token"));
				return null != Cookie.get("_h_token");
			}
		});

		App.Model.authentication = new authModel();
		App.View.meta_nav = new Menu();
		App.View.meta_nav.render({el: $("#meta-navbar")});


		var ret    = {
			routes : {
				'user/profile' : 'profile',
				'user/logout'  : 'logout',
				'user/login'   : 'login'
			},
			defaultRoute : 'user/login'
		};

		var UserRouter = Backbone.Router.extend({
			routes : ret.routes
		});

		ret.router       = new UserRouter();

		return ret;
	}
);
