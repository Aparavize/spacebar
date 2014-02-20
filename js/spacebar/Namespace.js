(function(ns, undefined) {
	define([], 
	function() {
		ns.app = null;
		ns.name = 'spacebar';

		ns.checkIfInTile = function(obj, tile){
			var testPosXOrigin = (obj.x >= tile.xStart && obj.x <= tile.xEnd);
			var testPosXWidth = (obj.x + obj.width >= tile.xStart && obj.x + obj.width <= tile.xEnd);

			var testPosYOrigin = (obj.y >= tile.yStart && obj.y <= tile.yEnd);
			var testPosYHeight = (obj.y + obj.height >= tile.yStart && obj.y + obj.height <= tile.yEnd);

			//console.log((testPosXOrigin || testPosXWidth) && (testPosYOrigin || testPosYHeight));
			return ((testPosXOrigin || testPosXWidth) && (testPosYOrigin || testPosYHeight));
		}

		ns.init = function(){
			// shim layer with setTimeout fallback
			window.requestAnimFrame = (function(){
			  return  window.requestAnimationFrame       ||
			          window.webkitRequestAnimationFrame ||
			          window.mozRequestAnimationFrame    ||
			          function( callback ){
			            window.setTimeout(callback, 1000 / 60);
			          };
			})();

			// Initialisation des variables du namespace (le jeu)
			ns.canvas = document.getElementById('canvas');
			ns.ctx = ns.canvas.getContext('2d');

			ns.keysDown = {};

			ns.lastTimeShot = Date.now();
			ns.lastMeteorSpawnTime = Date.now();
			ns.hasShot = false;
			ns.hasMeteors = false;

			ns.activeMeteors = [];
			ns.activeBullets = [];
			ns.collisions = [];
			ns.TO_RADIANS = Math.PI/180;

			ns.meteorList = [
				{
					skin:"meteorBrown_big1",
					width:101,
					height:84
				},
				{
					skin:"meteorBrown_big2",
					width:120,
					height:98
				},
				{
					skin:"meteorBrown_big3",
					width:89,
					height:82
				},
				{
					skin:"meteorBrown_big4",
					width:98,
					height:96
				}
			]; 
		};
		
		return ns;
	});

})(window.spacebar = window.spacebar || {});