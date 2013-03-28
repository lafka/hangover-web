		<div class="playlist" id="playlist-<%= id %>">
			<h2>
				<a href="#/playlists/<%= id %>"><%= name %></a>
				<div class="btn-toolbar span2 pull-right">
					<div class="btn-group">
					<a class="play <%= tracks.length > 0 ? '' : 'disabled ' %>btn" href="#" title="Play"><i class="icon-headphones"></i></a>
					<a class="edit btn" href="#" title="Edit playlist"><i class="icon-pencil"></i></a>
					<a class="delete btn" href="#" title="Delete playlist"><i class="icon-trash"></i></a>
					</div>
				</div>
			</h2>
			<table class="items"></table>
		</div>
