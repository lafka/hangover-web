define(
	['backbone',
	 'app',
	 'plugin/playlist/view/track-inline',
	 'text!plugin/playlist/tpl/track-inline.tpl',
	],
	function(Backbone, App, TrackView, TrackTpl) {
		var view = Backbone.View.extend({
			tracksView: undefined,
			events: {
				'click .delete' : 'deletePlaylist',
				'click .play'   : 'queuePlaylist',
				'click .edit'   : 'editPlaylist',
			},
			initialize: function(opts) {
				_.bindAll(this);

				this.model.get('tracks').on('reset', function(ev) {
					consol.log('tracks, reset', ev);
				});


				var view = this;

				_.extend(this, opts);

				this.model.get('tracks').on('add', function(track, collection) {
					console.log('add', track, collection);
				});

				this.construct = _.once(function() {
					view.tracksView = new App.View.UpdatingCollectionView({
						collection: view.model.get('tracks'),
						partial: TrackView,
						tpl: TrackTpl,
						el: $('<table class="table-condensed" />'),
						wrapper: "<tr/>",
						limit: 3
					});
				});
			},
			render: function() {
				var view = this;
				this.construct();

				this.tracksView.render()

				this.model.fetchRelated('tracks', {success: function(track) {
					view.tracksView.add(track);
				}}, true);

				this.$el.html(_.template(this.tpl, this.model.toJSON()));
				$('table.items', this.$el).replaceWith(this.tracksView.$el);
			},
			deletePlaylist: function(e) {
				e.preventDefault();
				this.model.destroy();
			},
			queuePlaylist: function(e) {
				e.preventDefault();
				console.log("queue: ", e);
			},
			editPlaylist: function(e) {
				e.preventDefault();
				window.location.hash = "/playlists/" + this.model.id;
			},
		});

		return view;
	});
