define(
	['backbone',
	 'app',
	],
	function(Backbone, App) {
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
