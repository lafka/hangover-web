define(
	['backbone',
	],
	function(Backbone, tpl) {
		var view = Backbone.View.extend({
			events: {
				'click .delete' : 'deletePlaylist',
				'click .play'   : 'queuePlaylist',
				'click .edit'   : 'editPlaylist',
			},
			initialize: function(opts) {
				_.extend(this, opts);
			},
			render: function() {
				this.$el.html(_.template(this.tpl, this.model.toJSON()));
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
