define(
	["backbone",
	 "plugin/app",
	 "plugin/user/view/login",
	],
	function(Backbone, App, LoginView) {
		var view = Backbone.View.extend({
			model: undefined,
			initialize: function() {
				this.model = App.Model.user;
				_.bindAll(this, "change");
			},
			events: {
				'submit #edit-profile' : 'save',
				'change #edit-profile input' : 'change',
			},
			render: function(alert, alertTitle, alertMsg) {
				this.model = App.Model.user
				var view = this
				require(["text!tpl/form.tpl"], function(tpl) {
					view.$el.html( _.template(tpl, {elems:
						[
							{
								field: "username",
								title: "Username",
								disable: true,
								placeholder: "Username",
								value: view.model.get("username")
							},
							{
								field: "email",
								title: "Email",
								placeholder: "Email",
								value: view.model.get("email")
							},
							{
								field: "phone",
								title: "Phone",
								placeholder: "Phone",
								value: view.model.get("phone")
							}
						],
						title: "Edit profile",
						button: "Update",
						alert: alert,
						alertTitle: alertTitle,
						message: alertMsg}) );
				});
			},
			change: function(e) {
				var field = e.target.id.replace(/input-/, "");
				this.model.set(field, e.target.value);
			},
			save: function() {
				view = this;
				this.model.save(this.model.attributes, {
					success : function(model, resp) {
						view.render("success", "Updated", "Your profile was successfully updated");
					},
					error : function(model, resp) {
						view.render("error", "Damn!", "Sorry, could not update your profile...");
					}
				});
			},
		});

		return view;
	}
);
