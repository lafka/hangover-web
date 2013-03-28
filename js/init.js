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
	var plugins = [],
		pluginDeps = [],
		obj = {};

	// arguments is not a real array...
	plugins = Array.prototype.slice.call(arguments, 4);
	pluginDeps = deps.slice(4);

	var filterFun,
	    callback
	    routes = {};

	filterFun = function(plugin) {
		return 'function' == typeof(plugin);
	};

	callback = function(acc, plugin) {
		var routes = acc[0],
		    i      = acc[1],
		    path   = pluginDeps[i].split('/');
		if ("plugin" === path[0]) {
			console.log("init: plugin -> " + path[1]);
			routes[path[1]] = new plugin();
			return [routes, i + 1];
		} else {
			return acc;
		}
	};

	var routesBuf = _.foldl(_.filter(plugins, filterFun), callback, [{}, 0]);
	routes = routesBuf[0];

	Backbone.history.start();
	Backbone.history.bind('route', function(e, b, c, d, f, g) {
		$('.navbar ul.nav li').each(function() {
			$(this).removeClass('active');
		});
		$('.navbar .nav a[href="/' + this.fragment + '"]').parent().addClass('active');
	});

	App.Nav.main.render();
});
