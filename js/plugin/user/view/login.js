define(
	['backbone',
	 'app'
	],
	function(Backbone, App) {
		var view = Backbone.View.extend({
			model: undefined,
			warning: undefined,
			initialize: function() {
				this.model = App.Model.authentication
			},
			template: ' \
				<form id="login" class="form-horizontal"> \
					<fieldset> \
						<legend>Login</legend> \
						<% if (warning) { %> \
							<div class="alert alert-error"> \
								<h4>Warning!</h4> \
								<%= _.isString(warning) ? warning : "You need to login to access this page" %> \
							</div> \
						<% } %> \
						<div class="control-group"> \
							<label class="control-label" for="input-user">Username</label> \
							<div class="controls"> \
								<input type="text" id="input-user" placeholder="Username"> \
							</div> \
						</div> \
						<div class="control-group"> \
							<label class="control-label" for="input-password">Password</label> \
							<div class="controls"> \
								<input type="password" id="input-password" placeholder="Password"> \
							</div> \
						</div> \
						<div class="control-group"> \
							<div class="controls"> \
								<button type="submit" class="btn btn-primary">Login</button> \
							</div> \
						</div> \
					</fieldset> \
				</form>',
			events: {
				'submit #login' : 'authenticate'
			},
			render: function(warning) {
				if (this.model.authenticated()) {
					window.location.hash = "/user/profile";
				} else {
					this.$el.html(_.template(this.template)({warning : warning}));
				}
			},
			authenticate : function(e) {
				e.preventDefault();
				var auth = {
					username: $('input#input-user', e.target).val(),
					password: $('input#input-password', e.target).val()
				};

				this.model.save(auth, {
					error : function() {
						_.each($('.control-group input', e.target), function(A) {
							$(A).closest('.control-group').addClass('error');
						});
						$('input#input-password').val('');
					},
					success: this.login
				});
			},
			login: function(model, resp) {
				model.success(model, resp);
				App.View.current.render();
			}
		});

		return view;
	}
);
