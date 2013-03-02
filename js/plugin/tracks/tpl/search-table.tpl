		<% if (0 === data.length) { %>
			<div class="alert alert-warning">
				Give me food, my stomach is empty
			</div>
		<% } else { %>
		<table class="table table-hover table-striped table-bordered">
			<thead>
				<tr>
					<th>Title</th>
					<th>Artist</th>
					<th>Length</th>
					<th>Album</th>
				</tr>
			</thead>
			<tbody>
					<% _.each(data, function(elem) { %>
					<tr>
						<td><a href="#/tracks/<%= elem.id %>"><%= elem.title %></a></td>
						<td><a><%= elem.artist %></a></td>
						<td><%= elem.length || '0:00' %></td>
						<td><a><%= elem.album || '' %></a></td>
					</tr>
					<% }); %>
			</tbody>
		</table>
		<% } %>
