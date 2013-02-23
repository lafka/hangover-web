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
				<% if (0 === data.length) { %>
					nothing
				<% } else {
					_.each(data, function(elem) { %>
					<tr>
						<td><%= elem.title %></td>
						<td><%= elem.artist %></td>
						<td><%= elem.length || '0:00' %></td>
						<td><%= elem.album || '' %></td>
					</tr>
					<% }); %>
				<% } %>
			</tbody>
		</table>
