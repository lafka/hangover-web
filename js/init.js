require.config({
	baseUrl : 'js',
	paths   : {
		underscore   : 'vendor/underscore.js/underscore-1.4.4',
		backbone     : 'vendor/backbone.js/backbone-0.9.10',
		backbone_rel : 'vendor/backbone-relational.js/backbone-relational-0.7.1',
		cookie       : 'vendor/cookie.js/cookie-0.4',
		jquery       : 'vendor/jquery.js/jquery-1.9.1',
		app          : 'app'
	},
	shim    : {
		underscore : {
			exports: '_' },
		jquery: {
			exports: '$' },
		backbone: {
			deps   : ['underscore', 'jquery'],
			exports : 'Backbone' },
		backbone_rel: {
			deps: ['backbone'] },
		app: {
			deps: ['backbone_rel'],
			exports: 'App' }
	}
});

var deps =
	['backbone',
	 'jquery',
	 'app',
	 'backbone_rel',
	 'plugin/index/index',
	 'plugin/tracks/tracks',
	 'plugin/schedule/schedule',
	 'plugin/playlist/playlist',
	 'plugin/user/user'
	];

require(deps, function(Backbone, $, App) {
	var args = arguments;
	_.each(deps, function(path ,i){
		var arg = args[i];
		if (path.match(/^plugin\/.*/) && 'function' == typeof(arg)) {
			new arg();
		}
	});

	Backbone.history.start();

	Backbone.history.bind('route', function(e) {
		if (undefined != e.selector) {
			var navs = $('.nav ' + e.selector);

			navs.closest('.nav').children().each( function() {
				$(this).removeClass('active');
			} );
			navs.each(function() { $(this).parent().addClass('active'); });
		}

		var link = $('.nav a[href="/' + this.fragment + '"]');
		link.closest('.nav').children().each( function() {
				$(this).removeClass('active');
			} );
		link.each(function() {
			$(this).parent().addClass('active');
		});
	});

	App.Nav.main.render();
});
