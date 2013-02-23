define(
	["backbone",
	 "plugin/app"
	],
	function(Backbone, App) {
		var view = Backbone.View.extend({
			model: undefined,
			initialize: function() {
			},
			render: function() {
				var view = this;
				require([
					"text!plugin/tracks/tpl/sidebar.tpl"
				], function(tpl) {
					var queueCollection = App.Collection.tracksQueue;
					queueCollection.fetch();
					view.$el.html(_.template(tpl, queueCollection.toJSON()));
				});
			}
		});

		return view;
	});
