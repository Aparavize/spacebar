define(
	[
		'spacebar/NameSpace',
		'jquery',
		'spacebar/Player'
	], 
	function(ns, $, Player) {
		var Main = {
			init: function(){
				var canvas = document.getElementById('canvas');
				var ctx = canvas.getContext('2d');
			}
			
		};

		return Main;
	}
);