define(
	[
		'spacebar/NameSpace',
		'jquery'
	], 
	function(ns, $) {
		var Meteor = function(options){
			var randomMeteor = ns.meteorList[Math.round(Math.random() * (ns.meteorList.length - 1))];

			this.isReady = false;
			this.speedY = options.speedY || Math.round(Math.random() * 200) + 100;
			this.speedX = options.speedY || Math.round(Math.random() * 100) + 100;
			this.rotateAngle = 0;
			this.rotateSpeed = 50;
			this.directionX = (Math.round(Math.random() * 10) > 5) ? 1 : -1;
			this.width = options.width || randomMeteor.width;
			this.height = options.height || randomMeteor.height;
			this.x = options.x || 0;
			this.y = options.y || -this.height;

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

			//console.log(this.boundaries);

		    this.skin = new Image();
		    this.skin.onload = function(){
				this.isReady = true;
			}.bind(this);

			this.skin.src = 'assets/img/Meteors/' + randomMeteor.skin + '.png';
		};

		Meteor.prototype = {
			update:function(mod){
	    		this.y += Math.round(this.speedY * mod);
	    		this.x += Math.round(this.speedX * mod) * this.directionX;
	    		this.rotateAngle += Math.round(this.rotateSpeed * mod);
	    		this.updateBoundaries();

	    		if(this.y > ns.canvas.height){
	    			var index = ns.activeMeteors.indexOf(this);

	    			if(index > -1){
	    				ns.activeMeteors.splice(index, 1);
	    				
	    				if(ns.activeMeteors.length <= 0)
	    					ns.hasMeteors = false;
	    			}
	    		}
			},

			drawRotatedImage:function(obj, x, y, angle) { 
				// save the current co-ordinate system 
				// before we screw with it
				ns.ctx.save(); 
			 
				// move to the middle of where we want to draw our image
				ns.ctx.translate(x, y);
			 
				// rotate around that point, converting our 
				// angle from degrees to radians 
				ns.ctx.rotate(angle * ns.TO_RADIANS);
			 
				// draw it up and to the left by half the width
				// and height of the image 
				ns.ctx.drawImage(obj.skin, 0, 0, obj.width, obj.height, -(obj.width/2), -(obj.width/2), obj.width, obj.height);
			 
				// and restore the co-ords to how they were when we began
				ns.ctx.restore(); 
			},

			updateBoundaries:function(){
				var _self = this;
				this.boundaries = {
					UL:{
						x:(_self.directionX == 1) ? _self.x : _self.x - _self.width,
						y:_self.y
					},
					UR:{
						x:(_self.directionX == 1) ? _self.x + _self.width : _self.x,
						y:_self.y
					},
					LL:{
						x:(_self.directionX == 1) ? _self.x : _self.x - _self.width,
						y:_self.y + _self.height
					},
					LR:{
						x:(_self.directionX == 1) ? _self.x + _self.width : _self.x,
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
				var _meteorCenterX = this.x + ((this.width / 2) * this.directionX);
	    		var _meteorCenterY = this.y + this.height / 2;

	    		this.drawRotatedImage(this, _meteorCenterX, _meteorCenterY, this.rotateAngle);
	    		this.drawBoundaries();
			}
		};

		return Meteor;
	}
);