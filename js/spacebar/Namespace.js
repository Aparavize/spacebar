(function(ns, undefined) {
	define([], 
	function() {

		/*
		Initialise les fonctions de base du namespace (fonctions globales)
		
		*/
		
		ns.app = null;
		ns.name = 'spacebar';

		ns.meteorList = [
			{
				skin:"meteorBrown_big1",
				width:101,
				height:84
			},
			{
				skin:"meteorBrown_big2",
				width:120,
				height:98
			},
			{
				skin:"meteorBrown_big3",
				width:89,
				height:82
			},
			{
				skin:"meteorBrown_big4",
				width:98,
				height:96
			}
		];

		ns.initialize = function(){
			
			
		};
		
		return ns;
	});

})(window.spacebar = window.spacebar || {});