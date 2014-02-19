define(
	[
		'spacebar/NameSpace',
		'jquery',
		'spacebar/Player',
		'spacebar/Bullet',
		'spacebar/Meteor',
		'spacebar/CollisionController',
		'spacebar/ScreenMap'
	], 
	function(ns, $, Player, Bullet, Meteor, CollisionController, ScreenMap) {
		var Main = {
			init: function(){
				ns.ScreenMap = new ScreenMap();

				// Variables accessibles in Main
				var player = new Player({
					width:99,
					height:75
				});

				var collisionController = new CollisionController();
				var time = Date.now();
				
				// Events for keyboard interaction
				window.addEventListener('keydown', function(e) {
				    ns.keysDown[e.keyCode] = true;
				});
				window.addEventListener('keyup', function(e) {
				    delete ns.keysDown[e.keyCode];
				});

				//========================
				// Helper functions
				//========================
				function addMeteor() {
					ns.lastMeteorSpawnTime = Date.now();

					var _meteor = new Meteor({});
					_meteor.x = Math.round(Math.random() * (ns.canvas.width - _meteor.width))

					ns.activeMeteors.push(_meteor);

					if(!ns.hasMeteors)
						ns.hasMeteors = true;
				}


				//========================
				// Main functions
				//========================
				function update(mod) {
					// Update the collision controller to check and deal with collisions
					collisionController.update();

					if((time - ns.lastMeteorSpawnTime) >= 750)
						addMeteor();

					// Update player
					player.update(mod);

					// Update bullets, if any
			    	if(ns.hasShot){
				    	for(var i = 0; i < ns.activeBullets.length; i++){
							ns.activeBullets[i].update(mod);
				    	}
				    }

				    // Update meteors, if any
				    if(ns.hasMeteors){
			    		for(var i = 0; i < ns.activeMeteors.length; i++){
			    			ns.activeMeteors[i].update(mod);
			    		}
			    	}

			    	// Update tiles
			    	ns.ScreenMap.update();
				}
				 
				function render() {
					// Clear stage with a black BG
				    ns.ctx.fillStyle = '#000';
				    ns.ctx.fillRect(0, 0, ns.canvas.width, ns.canvas.height);

				    // Render Player
			    	player.render();

			    	// Render Bullets, if any
				    if(ns.hasShot){
				    	for(var i =0; i < ns.activeBullets.length; i++){
				    		ns.activeBullets[i].render();	
				    	}
				    }

				    // Render Meteors, if any
				    if(ns.hasMeteors){
				    	for(var i =0; i < ns.activeMeteors.length; i++){
				    		ns.activeMeteors[i].render();
				    	}
				    }
				}
				
				// Calls itself immediately
				(function run() {
					window.requestAnimFrame(run);
				    update((Date.now() - time) / 1000);
				    render();
				    time = Date.now();
				})();
			}
		};

		return Main;
	}
);