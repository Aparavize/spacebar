define(
	[
		'spacebar/NameSpace',
		'jquery'
	], 
	function(ns, $) {
		var Player = function(options){
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

			// Get a property from the player
			// @prop : STRING
			getProp : function(prop){
				if(this.hasOwnProperty(prop)){
					return this[prop];
				}
				else {
					var errorMsg = 'Player "' + this.name + '" does not have any instance of the property "' + prop + '" requested.';
					throw new Error(errorMsg); 
				}
			},

			// Set a property of the player
			// @prop : STRING
			// @value : Any type
			setProp : function(prop, value){
				this[prop] = value;
			},

			// Add lives
			addLives : function(nLives){
				this.lives += nLives;
			},

			// Remove lives
			removeLives : function(nLives){
				this.lives -= nLives;

				if(this.lives <= 0)
					this.lives = 0;
			}
		};

		return Player;
	}
);