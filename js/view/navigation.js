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
			render: function() {
				var list = "<% _.each(links, function(item) { %> <li><%= item %></li> <% }); %>";
				var itemTpl =_.template('<a href="<%= link %>" title="<%= title %>"><%= text %></a>');

				this.$el.append( _.template(list,
					{links: _.map(this.links, function(X) { return itemTpl(X); }) }
				) );
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
