define(
	['backbone',
	 'view/navigation'
	],
	function(Backbone, Nav) {
		var app = {
			Nav:   {},
			Model: {},
			View:  {},
			Collection: {}
		};

		app.addNavbar = function(nav, target) {
			app.Nav[nav] = new Nav({el: target});
		};

		app.addNav = function(navbar, link, text, title) {
			return app.Nav[navbar].addNav.call(app.Nav[navbar], link, text, title);
		};

		app.addNavbar("main", $("#navbar"));

		app.setCurrentView = function(Ref, plugin, view) {
			view = "plugin/" + plugin+ "/view/" + view;

			require([view], function(View) {
				Ref.View.current = new View({el: $("#content")});
			});
		};

		app.loadView = function(Ref, plugin, view, setCurrent, arg) {
			setCurrent = undefined == setCurrent ? true : setCurrent;
			view = "plugin/" + plugin + "/view/" + view;

			require([view], function(View) {
				var partial = new View({el: $("#content")});

				if (setCurrent) {
					Ref.View.current = partial;
				}

				partial.render.call(partial, arg);
			});
		};

		app.View.UpdatingCollectionView = Backbone.View.extend({
			rendered: false,
			limit: -1,
			wrapper: "<div class=\"partial\"/>",
			initialize: function(opts) {
				_(this).bindAll('add', 'remove');

				_.extend(this, {partialOpts: {}}, opts);

				this.subViews = [];
				this.collection.each(this.add);
				this.collection.bind('add', this.add);
				this.collection.bind('remove', this.remove);
			},
			render: function() {
				var view = this,
				    views = (this.limit >= 0)
						? this.subViews.slice(0, this.limit)
						: this.subViews;

				_(views).each(function(Partial) {
					Partial.render();
				});
				this.rendered = true;
			},
			add: function(model) {
				if (0 == this.exists(model).length) {
					var opts = {model: model};
					if (this.wrapper) {
						opts.el = $(this.wrapper).appendTo(this.$el)
					}

					var partial = new this.partial(
						_.extend(this.partialOpts, opts)
					);

					this.subViews.push(partial);

					if (!this.rendered) {
						partial.render();
						$(partial.el).appendTo(this.$el);
					}
				}
			},
			update: function(model) {
				var view = this.exists(model);
				if (0 != view.length) {
					view[0].render();
				}
			},
			remove: function(model) {
				var partial = this.exists(model);

				_(this.subViews).without(partial[0]);
				$(partial[0].el).remove();
			},
			exists: function(model) {
				return _(this.subViews).select(function(p) {
					return p.model === model;
				});
			},
		});

		return app;
	}
);

