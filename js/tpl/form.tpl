<%
try { title } catch(e) { title = false }
try { formClass } catch(e) { formClass = "form-horizontal" }
try { controlGroups } catch(e) { controlGroups = true }
try { labels } catch(e) { labels = false }
try { alertBox } catch(e) { alertBox = false }
try { alertTitle } catch(e) { alertTitle = "" }
try { alertMessage } catch(e) { alertMessage = "" }
%>
<form id="edit-profile" class="<%= formClass %>">
	<fieldset>
		<% if (title) { %>
			<legend><%= title %></legend>
		<% } %>
		<% if (alertBox) { %>
			<div class="alert alert-<%= alertBox %>">
				<% if (alertTitle) { %><h4><%= alertTitle %></h4><% } %>
				<%= alertMessage %>
			</div>
		<% } %>
		<%

		var fun = function() {}
		if (controlGroups) {
			fun = function(i) { %>
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
			<% };
		} else {
			fun = function(i) { %>
					<% if (labels) { %><label for="input-<%= i.field %>"><%= i.title %></label><% } %>
					<input
						type="<%= undefined == i.type ? 'text' : i.type %>"
						id="input-<%= i.field %>"
						value="<%= i.value %>"
						<%= i.placeholder ? 'placeholder="'+i.placeholder+'"' : '' %>
						<%= i.disable ? 'disabled' : '' %>
						/>
			<% }
		}

		_.each(elems, fun); %>

		<% if (controlGroups) { %>
			<div class="control-group">
				<div class="controls">
		<% } %>
		<button type="submit" class="btn btn-primary"><%= button %></button>
		<% if (controlGroups) { %>
				</div>
			</div>
		<% } %>
	</fieldset>
</form>
