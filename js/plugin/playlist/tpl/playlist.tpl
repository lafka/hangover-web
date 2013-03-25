<h1><%= data.name %></h1>
<% console.log(data) %>
<% if (0 === data.tracks.length) { %>
	<div class="alert alert-warning">
		<b>You have no tracks</b>
		<p>
			Did you consider adding some music?
		</p>
	</div>
<% } else { %>
	<%= _.template(tpl, {data: data.tracks}) %>
<% } %>
