define(
	['backbone',
	 'app',
	 'text!plugin/playlist/tpl/track-inline.tpl'
	],
	function(Backbone, App, tpl) {
		var view = Backbone.View.extend({
			model: undefined,
			tpl: undefined,
			events: {
			},
			initialize: function(opts) {
				_.extend(this, opts);
				this.tpl = tpl;
			},
			render: function() {
				this.$el.html(_.template(this.tpl, this.model.toJSON()));
			}
		});

		return view;
	});
