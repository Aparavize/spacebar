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

			var _self = this;
			this.boundaries = {
				UL:{
					x:_self.x,
					y:_self.y
				},
				UR:{
					x:_self.x + _self.width,
					y:_self.y
				},
				LL:{
					x:_self.x,
					y:_self.y + _self.height
				},
				LR:{
					x:_self.x + _self.width,
					y:_self.y + _self.height
				}
			};

		    this.skin = new Image();
		    this.skin.onload = function(){
				this.isReady = true;
			}.bind(this);
			this.skin.src = 'assets/img/Lasers/laserBlue01.png';
		};

		Bullet.prototype = {
			update:function(mod) {
				this.y -= Math.round(this.speed * mod)
				this.updateBoundaries();

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

			updateBoundaries:function(){
				var _self = this;
				this.boundaries = {
					UL:{
						x:_self.x,
						y:_self.y
					},
					UR:{
						x:_self.x + _self.width,
						y:_self.y
					},
					LL:{
						x:_self.x,
						y:_self.y + _self.height
					},
					LR:{
						x:_self.x + _self.width,
						y:_self.y + _self.height
					}
				};
			},

			drawBoundaries:function(){
				ns.ctx.beginPath();
		    	ns.ctx.moveTo(this.boundaries.UL.x, this.boundaries.UL.y);
		    	ns.ctx.lineTo(this.boundaries.UR.x, this.boundaries.UR.y);
		    	ns.ctx.lineTo(this.boundaries.LR.x, this.boundaries.LR.y);
		    	ns.ctx.lineTo(this.boundaries.LL.x, this.boundaries.LL.y);
		    	ns.ctx.lineTo(this.boundaries.UL.x, this.boundaries.UL.y);

		    	ns.ctx.lineWidth = 1;
		    	ns.ctx.strokeStyle = 'red';
		    	ns.ctx.stroke();
			},

			render:function(){
				ns.ctx.drawImage(this.skin, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
				//this.drawBoundaries();
			}
		};

		return Bullet;
	}
);