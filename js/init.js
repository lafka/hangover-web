require.config({
	baseUrl : 'js',
	paths   : {
		underscore : 'vendor/underscore.js/underscore-1.4.4',
		backbone   : 'vendor/backbone.js/backbone-0.9.10',
		cookie     : 'vendor/cookie.js/cookie-0.4',
		zepto      : 'vendor/zepto.js/zepto-1.0'
	},
	shim    : {
		underscore : {
			exports: '_' },
		zepto: {
			exports: '$' },
		backbone: {
			deps   : ['underscore', 'zepto'],
			exports : 'Backbone' }
	}
});

require(["hangover"], function(App) { App.initialize(); });
