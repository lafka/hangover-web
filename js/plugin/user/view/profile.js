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
			render: function(alert, title, msg) {
				if (App.Model.authentication.authenticated()) {
					this.renderEdit.call(this, alert, title, msg);
				} else {
					this.renderLogin.call(this);
				}
			},
			renderLogin: function() {
				var inner = new LoginView({ el: this.$el });
				inner.render("You need to login to access this page");
			},
			renderEdit : function(alert, title, msg) {
				this.model = App.Model.user
				_this = this
				require(["text!plugin/user/tpl/profile.html"], function(tpl) {
					_this.$el.html( _.template(tpl, {elems:
						[
							{
								field: "username",
								title: "Username",
								disable: true,
								placeholder: "Username",
								value: _this.model.get("username")
							},
							{
								field: "email",
								title: "Email",
								placeholder: "Email",
								value: _this.model.get("email")
							},
							{
								field: "phone",
								title: "Phone",
								placeholder: "Phone",
								value: _this.model.get("phone")
							}
						],
						alert: alert,
						title: title,
						message: msg}) );
					console.log(alert, title, msg);
				});
			},
			change: function(e) {
				var field = e.target.id.replace(/input-/, "");
				this.model.set(field, e.target.value);
			},
			save: function() {
				_this = this;
				this.model.save(this.model.attributes, {
					success : function(model, resp) {
						_this.render("success", "Updated", "Your profile was successfully updated");
					},
					error : function(model, resp) {
						_this.render("error", "Damn!", "Sorry, could not update your profile...");
					}
				});
			},
		});

		return view;
	}
);
