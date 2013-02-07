define(
	["backbone",
	 "cookie"
	],
	function(Backbone, Cookie) {
		Cookie = window.Cookie; // fuck me right?
		console.log("plugin: user.js");

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
		}

		var UserRouter = Backbone.Router.extend({
			routes : routes
		});

		ret.router       = new UserRouter();

		return ret;
	}
);
