function MemoryGame() {
	var config = {
			type: Phaser.AUTO,
			// type: Phaser.CANVAS,
	    parent: 'phaser3Canvas',
	    width: 501, // the odd values avoid bleeding on the render borders
	    height: 281,
			backgroundColor: '#111111',
			physics: {
				default: "arcade",
				arcade: {
					// gravity: { y: 300 }, // Top down game, so no gravity
					debug: false
				}
    	},
			// scene: [IntroScene, MenuScene],
			scene: [IntroScene, LogoScene, GameScene],
			audio: {
        disableWebAudio: true
    	}
	}
	var game = new Phaser.Game(config)
}
