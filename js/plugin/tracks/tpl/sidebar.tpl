<aside class="span3 sidebar" id="tracks-collection">
	<div class="tabbable">
		<div class="tab-content">
			<%
				var pointer;
				_.each(collection, function(elem) { %>
				<div
					id="search-sidebar-<%= elem.id %>"
					class="tab-pane <%= undefined != pointer ? '' : 'active' %>">
					<div class="buttun-header">
						<h1>
							<a class="pull-left icon" href="#search-sidebar-<%= pointer %>">
								<i class="icon-chevron-left"></i>&nbsp;
							</a>
							<%= elem.name %>
							<a class="icon pull-right" href="#search-sidebar-<%= pointer %>">
								<i class="icon-chevron-right"></i>&nbsp;
							</a>
						</h1>
					</div>
					<ul>
						<% _.each(elem.data, function(track) { %>
						<li><%= track.artist %> &ndash; <%= track.title %></li>
						<% }); %>
					</ul>
					<% pointer = elem; %>
				</div>
			<% }) %>
		</div>
	</div>
</aside>
