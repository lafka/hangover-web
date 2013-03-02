<h1>Playlists</h1>
<% if (0 === data.length) { %>
	<div class="alert alert-warning">
		<b>You have no playlists</b>
		<p>
			Did you consider creating one (yeah i know, nowhere to go)....
		</p>
	</div>
<% } else { %>
	<% _.each(data, function(elem) { %>
		<div id="span12">
			<h2><a href="#/playlist/<%= elem.id %>"><%= elem.name %></a></h2>
			<%	if ( elem.tracks.length < 10 ) { %>
				<%= _.template(tpl, {data: elem.tracks}) %>
			<% } else { %>
				<%= _.template(tpl, {data: elem.tracks.slice(0, 10)}) %>
				<a href="#/playlist/view/<%= elem.id %>"><b>+</b> view more</a>
			<% } %>
		</div>
	<% }); %>
<% } %>
