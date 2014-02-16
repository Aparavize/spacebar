define(
	[
		'spacebar/NameSpace',
		'jquery'
	], 
	function(ns, $) {
		var Bullet = function(options){
			this.isReady = false;
			this.speed = options.speed || 400;
			this.x = options.x || 200;
			this.y = options.y || 200;
			this.width = options.width || 50;
			this.height = options.height || 50;

		    this.skin = new Image();
		    this.skin.onload = function(){
				this.isReady = true;
			}.bind(this);
			this.skin.src = 'assets/img/Lasers/laserBlue01.png';
		};

		Bullet.prototype = {
			update:function(mod) {
				this.y -= Math.round(this.speed * mod)

	    		if(this.y < 0){
	    			var index = ns.activeBullets.indexOf(this);

	    			if(index > -1){
	    				ns.activeBullets.splice(index, 1);

	    				if(ns.activeBullets.length <= 0){
	    					ns.hasShot = false;
	    				}
	    			}
	    		}
			},

			render:function(){
				ns.ctx.drawImage(this.skin, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
			}
		};

		return Bullet;
	}
);