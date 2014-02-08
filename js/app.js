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
		'spacebar/Main'
		], 
		function($, Main){
			$(document).ready(function(){
				Main.init();
			});
		});
	
})(window.spacebar = window.spacebar || {});