define(
	[
		'spacebar/NameSpace',
		'jquery',
		'spacebar/Bullet',
		'spacebar/Meteor'
	], 
	function(ns, $, Bullet, Meteor) {
		var ScreenMap = function(){			
			this.tiles = [];

			this.init();
		};

		ScreenMap.prototype = {
			init:function(){
				this.tiles = [
					{
						xStart: 0,
						xEnd: 470,
						yStart: 0,
						yEnd: 360,
						objList:[]
					},
					{
						xStart: 471,
						xEnd: 940,
						yStart: 0,
						yEnd: 360,
						objList:[]
					},
					{
						xStart: 0,
						xEnd: 470,
						yStart: 361,
						yEnd: 720,
						objList:[]
					},
					{
						xStart: 471,
						xEnd: 940,
						yStart: 361,
						yEnd: 720,
						objList:[]
					}
				];
			},

			update:function(){
				for(var i = 0; i < this.tiles.length; i++){
					var _tile = this.tiles[i];

					// Reset the object list of each tile at each update
					_tile.objList = [];

					if(ns.hasMeteors){
						for(var j = 0; j < ns.activeMeteors.length; j++){
							var _meteor = ns.activeMeteors[j];

							if(ns.checkIfInTile(_meteor, _tile))
								_tile.objList.push(_meteor);
						}
					}

					if(ns.hasShot){
						for(var k = 0; k < ns.activeBullets.length; k++){
							var _bullet = ns.activeBullets[k];

							if(ns.checkIfInTile(_bullet, _tile))
								_tile.objList.push(_bullet);
						}
					}
				}
			}
		};

		return ScreenMap;
	}
);