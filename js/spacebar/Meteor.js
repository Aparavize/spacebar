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

	    		if(this.y > ns.canvas.height){
	    			var index = ns.activeMeteors.indexOf(this);

	    			if(index > -1){
	    				ns.activeMeteors.splice(index, 1);
	    				
	    				if(ns.activeMeteors.length <= 0)
	    					ns.hasMeteors = false;
	    			}
	    		}
			},

			render:function(){
				var _meteorCenterX = this.x + ((this.width / 2) * this.directionX);
	    		var _meteorCenterY = this.y + this.height / 2;

	    		ns.drawRotatedImage(this, _meteorCenterX, _meteorCenterY, this.rotateAngle)
			}
		};

		return Meteor;
	}
);