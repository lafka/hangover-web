define(
	['backbone',
	 'cookie',
	 'app',
	 'plugin/user/view/menu'
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
			},
			error: function(model, resp) {
				Cookie.unset("_h_token");
				Cookie.unset("_h_user");
				App.View.meta_nav.render();
			},
			authenticated: function() {
				return null != Cookie.get("_h_token");
			}
		});

		var userModel = Backbone.Model.extend({
			defaults: {
				username: "",
				password: "",
				email: "",
				phone: "",
			},
			initialize: function() {
				this.set("username", App.Model.authentication.get("username"));
				this.url = "api/user/" + this.get("username");
				this.fetch();
			},
		});

		App.Model.authentication = new authModel();
		App.Model.user = new userModel();

		App.View.meta_nav = new Menu();
		App.View.meta_nav.render({el: $("#meta-navbar")});

		App.loadViewIfAuthenticated = function(plugin, view, opts) {
			opts = _.defaults(opts, {
				successArg: undefined,
				errorArg: false // default to show error message
			});

			if (App.Model.authentication.authenticated()) {
				App.loadView(App, plugin, view, true, opts.successArg);
			} else {
				App.setCurrentView(App, plugin, view);
				App.loadView(App, "user", "login", false, opts.errorArg);
			}
		};

		var UserRouter = Backbone.Router.extend({
			routes : {
				'user/profile' : 'profile',
				'user/logout'  : 'logout',
				'user/login'   : 'login',
			},
			profile : function() {
				App.loadViewIfAuthenticated("user", "profile", {errorArg: true})
			},
			logout  : function() {
				App.loadViewIfAuthenticated("user", "logout", {errorArg: true})
			},
			login   : function() {
				App.loadViewIfAuthenticated("user", "profile", {})
			},
		});

		return UserRouter;
	}
);
