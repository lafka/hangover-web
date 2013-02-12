define(
	["backbone",
	 "zepto"
	],
	function(Backbone, $) {
		var view = Backbone.View.extend({
			links : undefined, // make it non-manipulative for global access
			initialize: function() {
				this.links = []; // let the local instance be array
			},
			events: {
				"click a" : function(e) {
					e.preventDefault();
					window.location.hash = $(e.target).attr('href');
				},
			},
			render: function() {
				var list = "<% _.each(links, function(item) { %> <li><%= item %></li> <% }); %>";
				var itemTpl =_.template('<a href="<%= link %>" title="<%= title %>"><%= text %></a>');

				console.log(this.links);

				this.$el.html( _.template(list,
					{links: _.map(this.links, function(X) { return itemTpl(X); }) }
				) );
			},
			clear: function() {
				this.links = [];
			},
			addNav: function(link, text, title) {
				link  = link  || "#";
				text  = text  || "Unamed Link";
				title = title || text;

				this.links.push({link: link, text: text, title: title});
			},
		});


		return view;
	});
