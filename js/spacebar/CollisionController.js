define(
	[
		'spacebar/NameSpace',
		'jquery',
		'spacebar/Bullet',
		'spacebar/Meteor'
	], 
	function(ns, $, Bullet, Meteor) {
		var CollisionController = function(){

		};

		CollisionController.prototype = {
			update:function(){
				if(ns.hasShot && ns.hasMeteors) {
			    	ns.collisions = [];

			    	this.checkForCollisions();

			    	if(ns.collisions.length > 0)
			    		this.dealWithCollisions();
			    }
			},

			checkForCollisions:function(){
				var _bulletsInTile = [];
				var _meteorsInTile = [];

				for(var i = 0; i < ns.ScreenMap.tiles.length; i++){
					_bulletsInTile = [];
					_meteorsInTile = [];
					var _tile = ns.ScreenMap.tiles[i];

					for(var j = 0; j < _tile.objList.length; j++){
						if(_tile.objList[j] instanceof Bullet){
							_bulletsInTile.push(_tile.objList[j]);
						}
						else if(_tile.objList[j] instanceof Meteor){
							_meteorsInTile.push(_tile.objList[j]);
						}
					}

					for(var k=0; k < _bulletsInTile.length; k++){
			    		var _bullet = _bulletsInTile[k];

			    		for(var l = 0; l < _meteorsInTile.length; l++){
			    			var _meteor = _meteorsInTile[l];

			    			var hit = _bullet.x >= _meteor.x && _bullet.x <= _meteor.x + _meteor.width && _bullet.y >= _meteor.y && _bullet.y <= _meteor.y + _meteor.height;
			    			if(hit)
			    				ns.collisions.push({bullet:_bullet, meteor:_meteor})
			    		}
			    	}

					//console.log(ns.collisions)
				}
			},

			dealWithCollisions:function(){
		    	for(var i=0; i < ns.collisions.length; i++){
		    			// Remove meteors involved in a collision
		    			var index = ns.activeMeteors.indexOf(ns.collisions[i].meteor);
		    			if(index > -1){
		    				ns.activeMeteors.splice(index, 1);

		    				if(ns.activeMeteors.length <= 0)
		    					ns.hasMeteors = false;
		    			}

		    			// Remove bullets involved in a collision
		    			index = ns.activeBullets.indexOf(ns.collisions[i].bullet);
		    			if(index > -1){
		    				ns.activeBullets.splice(index, 1);

		    				if(ns.activeBullets <= 0)
		    					ns.hasShot = false;
		    			}
		    	}
			}
		};

		return CollisionController;
	}
);