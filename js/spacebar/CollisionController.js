define(
	[
		'spacebar/NameSpace',
		'jquery'
	], 
	function(ns, $) {
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
		    	for(var i=0; i < ns.activeBullets.length; i++){
		    		var _bullet = ns.activeBullets[i];

		    		for(var j = 0; j < ns.activeMeteors.length; j++){
		    			var _meteor = ns.activeMeteors[j];

		    			var hit = _bullet.x >= _meteor.x && _bullet.x <= _meteor.x + _meteor.width && _bullet.y >= _meteor.y && _bullet.y <= _meteor.y + _meteor.height;
		    			
		    			if(hit)
		    				ns.collisions.push({bullet:_bullet, meteor:_meteor})
		    		}
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