<form id="edit-profile" class="form-horizontal">
	<fieldset>
		<legend><%= title %></legend>
		<% if (alert) { %>
			<div class="alert alert-<%= alert %>">
				<% if (alertTitle) { %><h4><%= alertTitle %></h4><% } %>
				<%= message %>
			</div>
		<% } %>
		<%
		_.each(elems, function(i) { %>
				<div class="control-group">
					<label class="control-label" for="input-<%= i.field %>"><%= i.title %></label>
						<div class="controls">
							<input
								type="<%= undefined == i.type ? 'text' : i.type %>"
								id="input-<%= i.field %>"
								value="<%= i.value %>"
								<%= i.placeholder ? 'placeholder="'+i.placeholder+'"' : '' %>
								<%= i.disable ? 'disabled' : '' %>
							/>
					 </div>
				 </div>

		<% }); %>

		<div class="control-group">
			<div class="controls">
				<button type="submit" class="btn btn-primary"><%= button %></button>
			</div>
		</div>
	</fieldset>
</form>
