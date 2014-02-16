define(
	[
		'spacebar/NameSpace',
		'jquery',
		'spacebar/Bullet'
	], 
	function(ns, $, Bullet) {
		var Player = function(options){
			this.SPACEBAR = 32; 
			this.LEFT_ARROW = 37; 
			this.RIGHT_ARROW = 39; 
			this.UP_ARROW = 40; 
			this.DOWN_ARROW = 38; 

			this.isReady = false;
			this.name = options.name || 'Player 1';
			this.lives = options.lives || 5;
			this.weaponType = options.weaponType || 0;
			this.speed = options.speed || 400;
			this.x = options.x || 200;
			this.y = options.y || 200;
			this.width = options.width || 50;
			this.height = options.height || 50;
		    this.color = '#c00';

		    this.skin = new Image();
		    this.skin.onload = function(){
				this.isReady = true;
			}.bind(this);
			this.skin.src = 'assets/img/playerShip1_blue.png';
		};

		Player.prototype = {
			update:function(mod){
				// Look out for Arrow keys
				if (this.LEFT_ARROW in ns.keysDown) {
			        if(this.x > 0)
			        	this.x -= Math.round(this.speed * mod);
			    }
			    if (this.DOWN_ARROW in ns.keysDown) {
			    	if(this.y > 0)
			        	this.y -= Math.round(this.speed * mod);
			    }
			    if (this.RIGHT_ARROW in ns.keysDown) {
			    	if(this.x + this.width < ns.canvas.width)
			        	this.x += Math.round(this.speed * mod);
			    }
			    if (this.UP_ARROW in ns.keysDown) {
			    	if(this.y + this.height < ns.canvas.height)
			        	this.y += Math.round(this.speed * mod);
			    }

			    // If Spacebar was hit, shoot
			    if (this.SPACEBAR in ns.keysDown) {
			    	this.shoot();
			    }
			},

			render:function(){
				ns.ctx.drawImage(this.skin, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
			},

			shoot:function(){
				if((Date.now() - ns.lastTimeShot) / 1000 < 0.1)
					return;

				var _self = this;
			    ns.lastTimeShot = Date.now();

			    var _bullet = new Bullet({
			    	width: 9,
			    	height: 54,
			    	x: _self.x + _self.width / 2 - 5,
			    	y: _self.y,
			    	speed: _self.speed * 1.5 
			    }); 

			    ns.activeBullets.push(_bullet);

			    if(!ns.hasShot)
			  		ns.hasShot = true;
			}
		};

		return Player;
	}
);