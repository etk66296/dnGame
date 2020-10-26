function MemoryGame() {
	var config = {
			type: Phaser.AUTO,
			// type: Phaser.CANVAS,
	    parent: 'phaser3Canvas',
	    width: 500, // the odd values avoid bleeding on the render borders
	    height: 280,
			backgroundColor: '#000000',
			scale: {
				mode: Phaser.Scale.FIT,
				// mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
			},
			autoRound: false,
			physics: {
				default: "arcade",
				arcade: {
					// gravity: { y: 300 }, // Top down game, so no gravity
					debug: false
				}
    	},
			// scene: [IntroScene, MenuScene],
			scene: [IntroScene, MenuScene, LevelControlScene, Level0Scene, InfoTextScene, NotesScene],
			audio: {
        disableWebAudio: true
    	}
	}
	var game = new Phaser.Game(config)
}
