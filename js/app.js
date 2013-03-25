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
			app.Nav[navbar].addNav.call(app.Nav[navbar], link, text, title);
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
			initialize: function(opts) {
				_(this).bindAll('add', 'remove');

				_.extend(this, {partialOpts: {}}, opts);

				this.subViews = [];
				this.collection.each(this.add);
				this.collection.bind('add', this.add);
				this.collection.bind('remove', this.remove);
			},
			render: function() {
				var view = this;

				_(this.subViews).each(function(Partial) {
					Partial.render();
				});
			},
			add: function(model) {
				console.log("created new one", model);
				var buf = $("<div class=\"partial\"/>").appendTo(this.$el)
				var partial = new this.partial(
					_.extend(this.partialOpts, {model:model, el: buf})
				);

				this.subViews.push(partial);

				if (!$(this.el).is(':empty')) {
					$(buf).appendTo(this.$el);
					partial.render();
				}
			},
			remove: function(model) {
				var partial = _(this.subViews).select(function(p) {
					return p.model === model;
				});

				_(this.subViews).without(partial[0]);
				$(partial[0].el).remove();
			},
		});

		return app;
	}
);

