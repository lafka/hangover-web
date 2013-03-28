define(
	['backbone',
	 'app',
	 'text!plugin/playlist/tpl/playlist.tpl',
	 'plugin/playlist/view/track-inline',
	 'text!plugin/playlist/tpl/track-inline.tpl',
	],
	function(Backbone, App, Tpl, TrackView, TrackTpl) {
		var view = Backbone.View.extend({
			model: undefined,
			initialize: function(opts) {
				var view = this;

				_.extend(this, opts || {});

				this.construct = _.once(function(id) {
					view.model = App.Model.playlist.findOrCreate({id:id});
					view.model.fetch({success: function(e) {
						view.tracksView = new App.View.UpdatingCollectionView({
							collection: view.model.get('tracks'),
							partial: TrackView,
							tpl: TrackTpl,
							el: $('<table class="table-condensed" />'),
							wrapper: "<tr draggable=\"true\" />",
						});

						view.draw();
					}});
				});
			},
			render: function(id) {
				this.construct(id);

				this.tracksView && this.draw()
			},
			draw: function() {
				var view = this;

				this.tracksView.render()

				this.model.fetchRelated('tracks', {success: function(track) {
					view.tracksView.update(track);
				}}, true);

				this.$el.html(_.template(Tpl, this.model.toJSON()));
				$('table.items', this.$el).replaceWith(this.tracksView.$el);
			}
		});

		return view;
	});
