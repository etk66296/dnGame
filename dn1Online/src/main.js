function MemoryGame() {
	var config = {
			type: Phaser.AUTO,
			// type: Phaser.CANVAS,
	    parent: 'phaser3Canvas',
	    width: 500, // the odd values avoid bleeding on the render borders
	    height: 280,
			backgroundColor: '#000000',
			physics: {
				default: "arcade",
				arcade: {
					// gravity: { y: 300 }, // Top down game, so no gravity
					debug: true
				}
    	},
			// scene: [IntroScene, MenuScene],
			scene: [IntroScene, LevelControlScene, Level0Scene, InfoTextScene],
			audio: {
        disableWebAudio: true
    	}
	}
	var game = new Phaser.Game(config)
}
