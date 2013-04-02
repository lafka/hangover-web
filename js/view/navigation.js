define(
	['backbone',
	 'jquery'
	],
	function(Backbone, $) {
		var view = Backbone.View.extend({
			links : undefined, // make it non-manipulative for global access
			initialize: function() {
				this.links = []; // let the local instance be array
			},
			events: {
				'click a' : function(e) {
					e.preventDefault();
					window.location.hash = $(e.target).attr('href');
				},
			},
			render: function() {
				console.log("view: navigation, render -> ", this.links);
				var list = "<% _.each(links, function(item) { %> <li><%= item %></li> <% }); %>";
				var itemTpl =_.template("<a href=\"<%= link %>\" title=\"<%= title %>\" class=\"<%= tag %>\"><%= text %></a>");

				this.$el.html( _.template(list,
					{links: _.map(this.links, function(X) { return itemTpl(X); }) }
				) );
			},
			clear: function() {
				this.links = [];
			},
			addNav: function(link, text, title, tag) {
				link  = link  || "#";
				text  = text  || "Unamed Link";
				title = title || text;
				tag   = tag   || ""

				this.links.push({link: link, text: text, title: title, tag: tag});
			},
		});


		return view;
	});
