function MenuScene() {
	Phaser.Scene.call(this, 'MenuScene')
	this.cardPositions = [
		{ x: 50, y: 50, }, // R0
		{ x: 250, y: 50 },
		{ x: 450, y: 50 },
		{ x: 150, y: 150 },// R1
		{ x: 350, y: 150 },
		{ x: 550, y: 150 },
		{ x: 50, y: 250 }, // R2
		{ x: 250, y: 250 },
		{ x: 450, y: 250 },
		{ x: 150, y: 350 }, // R3
		{ x: 350, y: 350 },
		{ x: 550, y: 350 },
		{ x: 50, y: 450 }, // R4
		{ x: 250, y: 450 },
		{ x: 450, y: 450 },
		{ x: 150, y: 550 }, // R5
		{ x: 350, y: 550 },
		{ x: 550, y: 550 }
	]
	this.pairNames = [
		'lemon',
		'grape',
		'cherry',
		'strawberry',
		'blackberry',
		'banana',
		'lime',
		'peach',
		'plum',
		'apple'
	]
	this.mix = this.pairNames.concat(this.pairNames)
	this.sprites = []

	// menu butttons
	this.menuPlay
	this.menuScore
	this.menuHelp
	this.soundOnOff
	this.soundOnOffSwitch = false

	// sound and music
	this.backgroundMusic
}

MenuScene.prototype = Object.create(Phaser.Scene.prototype)
MenuScene.prototype.constructor = MenuScene

MenuScene.prototype.shuffleMix = function () {
  let j, x, i;
  for (i = this.mix.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = this.mix[i];
	  this.mix[i] = this.mix[j];
    this.mix[j] = x;
  }
}

MenuScene.prototype.preload = function () {}

MenuScene.prototype.create = function() {
	
	// add the background image
	this.add.image(0, 0, 'table').setOrigin(0);

	// create the card rotating background animtion
	for (let animIndex = 0; animIndex < 10; animIndex++) {
		// create frames form atlas json definitions
		let frames = this.anims.generateFrameNames('cards', {
			prefix: this.pairNames[animIndex] + '_',
			end: 9, zeroPad: 4
		})

		// push the closed card frame for a complete card rotation
		frames.push({ key: 'cards', frames: this.pairNames[animIndex] + '_0000' })

		// create the animation object
		this.anims.create({
			delay: Math.floor(Math.random() * 1000 + 1000),
			key: 'rotate' + this.pairNames[animIndex],
			frames: frames,
			frameRate: 12,
			repeat: 1,
			repeatDelay: Math.floor(Math.random() * 1000 + Math.random() * 1000)
		})
	}

	// mix the cards 
	this.shuffleMix()
	for (let cardIndex = 0; cardIndex < this.cardPositions.length; cardIndex++) {
		var config = {
			key: 'cards',
			x: this.cardPositions[cardIndex].x,
			y: this.cardPositions[cardIndex].y,
			// scale: { randFloat: [ 0.7, 1.3 ] },
			scale: 1,
			anims: 'rotate' + this.mix[cardIndex]
		}
		this.sprites.push(this.make.sprite(config))
	}

	// menu options
	// play button
	// this.menuPlay = this.add.sprite(256, 256, 'menu', 'menuPlay').setInteractive({
  //   hitArea: new Phaser.Geom.Rectangle(256-103, 256-47, 206, 94),
  //   // hitAreaCallback: () => {
	// 	// 	this.scene.stop('MenuScene')
	// 	// 	this.scene.start('GameScene')
	// 	// },
  //   draggable: false,
  //   dropZone: false,
  //   useHandCursor: false,
  //   cursor: 'pointer',
  //   pixelPerfect: false,
  //   alphaTolerance: 1
	// })
	this.menuPlay = this.add.sprite(256, 256, 'menu', 'menuPlay').setInteractive()
	this.menuPlay.on('pointerover', (pointer) => {
	  this.menuPlay.setFrame('menuPlayHover')
	})
	this.menuPlay.on('pointerout', (pointer) => {
		this.menuPlay.setFrame('menuPlay')
	})
	this.menuPlay.on('pointerup', (pointer) => {
		this.scene.stop('MenuScene')
		this.scene.start('GameScene')
	})
	// sound on of
	// this.soundOnOff = this.add.sprite(470, 470, 'soundSwitch', 'soundOff').setInteractive({
  //   hitArea: new Phaser.Geom.Rectangle(470-16, 470-16, 32, 32),
  //   // hitAreaCallback: callback,
  //   draggable: false,
  //   dropZone: false,
  //   useHandCursor: false,
  //   cursor: 'pointer',
  //   pixelPerfect: false,
  //   alphaTolerance: 1
	// })
	this.soundOnOff = this.add.sprite(470, 470, 'soundSwitch', 'soundOff').setInteractive()
	this.soundOnOff.on('pointerup', (pointer) => {
		if(this.soundOnOffSwitch) {
			this.soundOnOffSwitch = false
			this.soundOnOff.setFrame('soundOff')
			this.backgroundMusic.pause()
		} else {
			this.soundOnOffSwitch = true
			this.soundOnOff.setFrame('soundOn')
			// play music
			this.backgroundMusic = this.sound.add('backgroundMusic')
			this.backgroundMusic.config.loop = true
			this.backgroundMusic.play()
		}	
	})
	if(!this.soundOnOffSwitch) {
		this.soundOnOffSwitch = false
		this.soundOnOff.setFrame('soundOff')
	} else {
		this.soundOnOffSwitch = true
		this.soundOnOff.setFrame('soundOn')
	}
	// **********************************************************
	// for development:
	// this.scene.stop('MenuScene')
	// this.scene.start('GameScene')
	// **********************************************************
}

MenuScene.prototype.update = function (time, delta) {
	this.sprites.forEach(sprite => {
		sprite.x -= 0.1 * delta
		sprite.y -= 0.1 * delta
		if(sprite.x <= -50 || sprite.y <= -50) {
			let xNow = sprite.x
			let yNow = sprite.y
			sprite.x =  510 + (-1) * xNow
			sprite.y =  510 + (-1) * yNow
		}
	})
}
