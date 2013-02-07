define(
	["backbone",
	 "cookie",
	 "plugin/page"
	],
	function(Backbone, Cookie, Page) {
		Cookie = window.Cookie; // fuck me right?
		Page.addNavbar("meta", $("#meta-navbar"));

		var ret = {
			loggedIn : function() { return null != Cookie.get("_hou"); }
		};

		var routes = {};
		if (ret.loggedIn()) {
			routes = {
				'user/profile' : 'profile',
				'user/logout'  : 'logout'
			};
		} else {
			routes = {'' : 'login'};
			ret.defaultRoute = 'user/login';
			Page.addNav("meta", "/user/login", "Login");
		}

		var UserRouter = Backbone.Router.extend({
			routes : routes
		});

		ret.router       = new UserRouter();
		Page.nav.meta.render();

		return ret;
	}
);
