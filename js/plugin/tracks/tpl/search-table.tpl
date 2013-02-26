		<% if (0 === data.length) { %>
			hello there is nothing here (<%= data.length %>)
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
						<td><%= elem.title %></td>
						<td><%= elem.artist %></td>
						<td><%= elem.length || '0:00' %></td>
						<td><%= elem.album || '' %></td>
					</tr>
					<% }); %>
			</tbody>
		</table>
		<% } %>
