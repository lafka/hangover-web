<h1>Playlists</h1>
<% if (0 === data.length) { %>
	<div class="alert alert-warning">
		<b>You have no playlists</b>
		<p>
			Did you consider creating one (yeah i know, nowhere to go)....
		</p>
	</div>
<% } %>

<%= createTemplate %>

<% if (0 < data.length) { %>
	<% _.each(data, function(elem) { %>
		<div id="span12">
			<h2>
				<a href="#/playlist/<%= elem.id %>"><%= elem.name %></a>
				<div class="btn-toolbar span2 pull-right">
					<div class="btn-group">
					<a class="<%= elem.tracks.length > 0 ? '' : 'disabled ' %>btn" href="#" title="Play"><i class="icon-headphones"></i></a>
					<a class="btn" href="#" title="Edit playlist"><i class="icon-pencil"></i></a>
					<a class="btn" href="#" title="Delete playlist"><i class="icon-trash"></i></a>
					</div>
				</div>
			</h2>
			<%	if ( elem.tracks.length < 10 ) { %>
				<%= _.template(tpl, {data: elem.tracks}) %>
			<% } else { %>
				<%= _.template(tpl, {data: elem.tracks.slice(0, 10)}) %>
				<a href="#/playlist/view/<%= elem.id %>"><b>+</b> view more</a>
			<% } %>
		</div>
	<% }); %>
<% } %>
