define(
	["backbone",
	 "zepto",
	 "plugin/app",
	 "plugin/user/view/login",
	 "plugin/tracks/tracks",
	 "plugin/tracks/view/sidebar"
	],
	function(Backbone, $, App, LoginView, Tracks, Sidebar) {
		var view = Backbone.View.extend({
			model: undefined,
			sidebarView: undefined,
			contentView: undefined,
			initialize: function() {
				var search = this;

				var view = Backbone.View.extend({
					collection: undefined,
					events: {
						"change #search-tracks .search input" : 'render',
						"keyup #search-tracks .search input" : 'autocomplete',
						"click #search-tracks button" : 'autocomplete'
					},
					initialize: function() {
						this.collection = new Tracks.collection();
					},
					autocomplete: function(ev) {
						this.collection.query.string = ev.target.value;
						this.updateTable()
						ev.preventDefault();
						return false;
					},
					render: function() {
						var view = this;
						this.collection.fetch();
						require([
							"text!plugin/tracks/tpl/search.tpl",
							"text!plugin/tracks/tpl/search-table.tpl"
						], function(canvas, table) {
							view.renderTpl.call(view, canvas, table);
						})
						return this.$el;
					},
					renderTpl: function(canvas, table) {
						var tableVars = {data: this.collection.toJSON()};
						var table = _.template(table, tableVars);
						this.$el.html(_.template(canvas, {table: table}));
					},
					updateTable: function() {
						var view = this;
						require([
							"text!plugin/tracks/tpl/search-table.tpl"
						], function(table) {
							view.collection.fetch({
								success: function() {
									var tableVars = {data: view.collection.toJSON()};
									$('table', view.$el).html(_.template(table, tableVars));
								},
								error: function() { console.log('error'); }
							});
						});
					}
				});

				this.sidebarView = new Sidebar({
					el: $('<aside class="span3" />')
				});
				this.contentView = new view({
					el: $('<section class="span9" id="search-tracks" />')
				});
			},
	 		render: function() {
				if (App.Model.authentication.authenticated()) {
					this.renderSearch.call(this);
				} else {
					this.render401.call(this);
				}
			},
			renderSearch: function() {
				var self = this;
				self.$el.html('');

				_.each([this.sidebarView, this.contentView], function(partial) {
					self.$el.append(partial.$el);
					partial.render();
				});
			},
			render401: function() {
				var inner = new LoginView({ el: this.$el });
				inner.render("You need to login to access this page");
			},
		});

		return view;
	});
