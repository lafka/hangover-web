define(
	["backbone",
	 "plugin/app",
	],
	function(Backbone, App, User) {
		var IndexRouter = Backbone.Router.extend({
			routes: {
				'*404'      : '404',
			},
		});

		return {
			router : new IndexRouter(),
			plugin : 'index'
		};
	}
);
