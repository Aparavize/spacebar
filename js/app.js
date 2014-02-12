(function(ns){
	require.config({
		paths:{
			'jquery':'vendor/jquery.min'
		},
		shim: {
			'jquery': {
				deps: []
			}
		}
	});
		
	require([
		'jquery', 
		'spacebar/Main',
		'vendor/Stats'
		], 
		function($, Main){
			$(document).ready(function(){
				Main.init();

				// COUNT FPS
				var stats = new Stats();
				stats.setMode(1); // 0: fps, 1: ms

				// Align top-left
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.left = '0px';
				stats.domElement.style.top = '0px';

				document.body.appendChild( stats.domElement );

				setInterval( function () {
				    stats.begin();

				    stats.end();
				}, 1000 / 60 );
			});
		});
	
})(window.spacebar = window.spacebar || {});