define(
	["backbone",
	 "plugin/app"
	],
	function(Backbone, App) {
		var view = Backbone.View.extend({
			model: App.Model.authentication,
			initialize: function() { },
			template: _.template(' \
				<form id="login" class="form-horizontal"> \
					<fieldset> \
						<legend>Login</legend> \
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
				</form>'),
			events: {
				'submit' : 'authenticate'
			},
			render: function() {
				this.$el.html(this.template);
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
					success: this.model.success
				});
			}
		});

		return view;
	}
);
