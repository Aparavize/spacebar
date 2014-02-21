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
				if(ns.hasShot || ns.hasMeteors) {
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

					// Collision testing with bullets and meteors
					//
					// Do this before testing meteors and the player so that a bullet can
					// save his life.
					for(var k=0; k < _bulletsInTile.length; k++){
			    		var _bullet = _bulletsInTile[k];

			    		for(var l = 0; l < _meteorsInTile.length; l++){
			    			var _meteor = _meteorsInTile[l];

			    			var hitX = _bullet.boundaries.UL.x >= _meteor.boundaries.UL.x && _bullet.boundaries.UL.x <= _meteor.boundaries.UR.x;
			    			var hitY = _bullet.boundaries.UL.y >= _meteor.boundaries.UL.y && _bullet.boundaries.UL.y <= _meteor.boundaries.LL.y;
			    			
			    			if(hitX && hitY)
			    				ns.collisions.push({bullet:_bullet, meteor:_meteor})
			    		}
			    	}

			    	// Collision testing with the player and meteors
			    	for(var m=0; m < _meteorsInTile.length; m++){
			    		var _meteor = _meteorsInTile[m];

			    		// Test if hit player
			    		var hitXRight = ns.player.boundaries.UL.x >= _meteor.boundaries.UL.x && ns.player.boundaries.UL.x <= _meteor.boundaries.UR.x;
			    		var hitXLeft = ns.player.boundaries.UR.x >= _meteor.boundaries.UL.x && ns.player.boundaries.UR.x <= _meteor.boundaries.UR.x;
			    		var hitX = hitXLeft || hitXRight;

		    			var hitYUp = ns.player.boundaries.UL.y >= _meteor.boundaries.UL.y && ns.player.boundaries.UL.y <= _meteor.boundaries.LL.y;
		    			var hitYDown = ns.player.boundaries.LL.y >= _meteor.boundaries.UL.y && ns.player.boundaries.LL.y <= _meteor.boundaries.LL.y;
						var hitY = hitYUp || hitYDown;

		    			if(hitX && hitY)
		    				ns.collisions.push({player:ns.player, meteor:_meteor})
			    	}
				}
			},

			dealWithCollisions:function(){
		    	for(var i=0; i < ns.collisions.length; i++){
		    			if(ns.collisions[i].player){
		    				// Remove meteors involved in a collision
			    			var index = ns.activeMeteors.indexOf(ns.collisions[i].meteor);
			    			if(index > -1){
			    				ns.activeMeteors.splice(index, 1);

			    				if(ns.activeMeteors.length <= 0)
			    					ns.hasMeteors = false;
			    			}

			    			ns.collisions[i].player.lives--;
		    			}
		    			else {
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
			}
		};

		return CollisionController;
	}
);