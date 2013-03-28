<%
try { album } catch(e) { album = "unknown" }
%>
		<td><a href="#/tracks/<%= id %>"><%= title %></a></td>
		<td><a><%= artist %></a></td>
		<td><%= length || '0:00' %></td>
		<td><a><%= album || '' %></a></td>
