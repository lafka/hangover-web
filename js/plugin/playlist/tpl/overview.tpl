<h1>Playlists</h1>
<% if (0 === numPlaylists) { %>
	<div class="alert alert-info">
		<p>
		<b>You don't seem to have any playlists.</b>
		</p>
		<%= createTemplate %>
	</div>
<% } else { %>
	<%= createTemplate %>

	<div class="children">
	</div>
<% } %>
