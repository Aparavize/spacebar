define(
	[
		'spacebar/NameSpace',
		'jquery'
	], 
	function(ns, $) {
		var Meteor = function(options){
			var randomMeteor = ns.meteorList[Math.round(Math.random() * (ns.meteorList.length - 1))];

			this.isReady = false;
			this.speedY = options.speedY || Math.round(Math.random() * 200) + 1;
			this.speedX = options.speedY || Math.round(Math.random() * 100) + 1;
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

		};

		return Meteor;
	}
);