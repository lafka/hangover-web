define(
	["backbone",
	 "plugin/app",
	 "plugin/user/user"
	],
	function(Backbone, App, User) {
		App.addNav("main", "/schedule/overview", "Schedules", "Schedule");

		var router = Backbone.Router.extend({
			routes : {
				'schedule/overview'  : 'overview',
				'schedule/:schedule' : 'view'
			},
			defaultRoute: 'schedule/overview',
		});

		return {
			router: new router(),
			plugin: 'schedule'
		};
	}
);
