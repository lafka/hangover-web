define(
	["backbone",
	 "backbone-forms"
	],
	function(Backbone) {
		var view = Backbone.View.extend({
			initialize: function() {
			},
			render: function() {
				var Auth = Backbone.Model.extend({
					schema: {
						name     : 'Text',
						password : 'Password' },
				});

				var user = new Auth({
					name     : 'lafa',
					password : 'god',
				});

				console.log(Backbone);

				var form = new Backbone.Form({
					model: user,
					editorClass: "test 1 2 3"
				}).render();

				this.$el.append($("<div class=\"span4 offset3\" />").append(form.el));

			}
		});

		return view;
	}
);
