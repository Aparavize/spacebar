define(
	[
		'spacebar/NameSpace',
		'jquery'
	], 
	function(ns, $) {
		var Player = function(options){
			this.name = options.name || 'Player 1';
			this.lives = options.lives || 5;
			this.weaponType = options.weaponType || 0;
			this.speed = options.speed || 1;
		};

		Player.prototype = {
			getSpeed : function(){
				return this.speed;
			},

			setSpeed : function(speed){
				this.speed = speed;
			},

			// Get the player's name
			getName : function(){
				return this.name;
			},

			// Get the player's current weapon type
			getWeaponType : function(){
				return this.weaponType;
			},

			// Set the player's weapon type
			setWeaponType : function(weaponType){
				this.weaponType = weaponType;
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