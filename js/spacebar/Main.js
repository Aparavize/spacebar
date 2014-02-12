define(
	[
		'spacebar/NameSpace',
		'jquery',
		'spacebar/Player',
		'spacebar/Bullet'
	], 
	function(ns, $, Player, Bullet) {
		var Main = {
			init: function(){
				var canvas = document.getElementById('canvas');
				var ctx = canvas.getContext('2d');
				var lastTimeShot = Date.now();
				var hasShot = false;
				var bulletsShot = [];
				
				var player_one = new Player({
					width:99,
					height:75
				});
				
				var keysDown = {};
				window.addEventListener('keydown', function(e) {
				    keysDown[e.keyCode] = true;
				});
				window.addEventListener('keyup', function(e) {
				    delete keysDown[e.keyCode];
				});
				 
				function update(mod) {
				    if (37 in keysDown) {
				        if(player_one.x > 0)
				        	player_one.x -= Math.round(player_one.speed * mod);
				    }
				    if (38 in keysDown) {
				    	if(player_one.y > 0)
				        	player_one.y -= Math.round(player_one.speed * mod);
				    }
				    if (39 in keysDown) {
				    	if(player_one.x + player_one.width < canvas.width)
				        	player_one.x += Math.round(player_one.speed * mod);
				    }
				    if (40 in keysDown) {
				    	if(player_one.y + player_one.height < canvas.height)
				        	player_one.y += Math.round(player_one.speed * mod);
				    }
				    if (32 in keysDown) {
				    	shoot();
				    }

			    	if(hasShot){
				    	for(var i =0; i < bulletsShot.length; i++){
				    		var _bullet = bulletsShot[i];

				    		_bullet.y -= Math.round(_bullet.speed * mod)

				    		if(_bullet.y < 0){
				    			var index = bulletsShot.indexOf(_bullet);

				    			if(index > -1)
				    				bulletsShot.splice(index, 1);
				    		}
				    	}
				    }
				}

				function shoot() {
					if((Date.now() - lastTimeShot) / 1000 < 0.1)
						return;

				    lastTimeShot = Date.now();

				    var _bullet = new Bullet({
				    	width: 9,
				    	height: 54,
				    	x: player_one.x + player_one.width / 2 - 5,
				    	y: player_one.y,
				    	speed: player_one.speed * 1.5 
				    }); 

				    bulletsShot.push(_bullet);

				    if(!hasShot)
				  	  hasShot = true;
				}
				 
				function render() {
				    ctx.fillStyle = '#000';
				    ctx.fillRect(0, 0, canvas.width, canvas.height);

				    if(player_one.isReady){
				    	ctx.drawImage(player_one.skin, 0, 0, player_one.width, player_one.height, player_one.x, player_one.y, player_one.width, player_one.height);
				    }
				    if(hasShot){
				    	for(var i =0; i < bulletsShot.length; i++){
				    		var _bullet = bulletsShot[i];	

				    		ctx.drawImage(_bullet.skin, 0, 0, _bullet.width, _bullet.height, _bullet.x, _bullet.y, _bullet.width, _bullet.height);
				    	}
				    }
				}
				 
				function run() {
				    update((Date.now() - time) / 1000);
				    render();
				    time = Date.now();
				}
				
				var time = Date.now();
				setInterval(run, 10);
			}
			
		};

		return Main;
	}
);