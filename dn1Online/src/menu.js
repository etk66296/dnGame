function MenuScene() {
	Phaser.Scene.call(this, 'MenuScene')
	this.bgImage = null

	this.menuTileGroup = null
	this.menuTileGroupBg = null

	// buttons
	this.playButton = { pointerOver: false, gameObj: null, currentScale: 1.0, scaleDelta: -0.0025}
	this.notesButton = { pointerOver: false, gameObj: null, currentScale: 1.0, scaleDelta: -0.0025}
	this.scoreButton = { pointerOver: false, gameObj: null, currentScale: 1.0, scaleDelta: -0.0025}

}

MenuScene.prototype = Object.create(Phaser.Scene.prototype)
MenuScene.prototype.constructor = MenuScene

MenuScene.prototype.init = function (data) {

	
}

MenuScene.prototype.preload = function () {
	// this.load.tilemapTiledJSON("mapLevel1City", "assets/maps/dn1MapLevel1City.json")
}

MenuScene.prototype.create = function() {

	// background
	this.bgImage = this.add.sprite(0, 0, 'menuBackground')
	this.bgImage.setOrigin(0)
	this.bgImage.setDepth(-100)
	this.bgImage.setScrollFactor(0, 0)

	this.headlineCharGroup = this.add.group()
	
	// headline text
	let headLineStr = 'Dieter NussbaumEinsatz im Ländle'
	for (let i = 0; i < headLineStr.length; i++) {
		let charIndex = i
		this.time.addEvent({
			delay: 100 * i,
			loop: false,
			callback: () => {
				// quick and dirty
				let pos = {x: 32 + 24 * charIndex, y: 18}
				let fontSize = 48
				if (charIndex > 14) {
					pos = {x: 32 + 24 * (charIndex - 14), y: 72}
					fontSize = 24
				}
				let letter = this.add.text(pos.x, pos.y, headLineStr.charAt(i),{
					fontFamily: 'VT323-Regular',
					fontSize: fontSize,
					color: '#54fc54',
					fontStyle: 'bold'
				})
				letter.setStroke('#00a800', 5);
				letter.setShadow(2, -2, '#a85400' /*color*/, 0 /*blur*/, true /*stroke*/, false /*fill*/)
			}
		})
	}

	// // menu tiles
	// this.menuTileGroupBg = this.add.group()
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 24, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 216, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 200, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 232, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 264, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 280, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 56, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 8, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 152, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 88, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 104, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 72, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 136, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 40, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 184, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 120, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 168, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 248, stepX: 16, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.children.iterate((tile, index) => {
	// 	this.time.addEvent({
	// 		delay: 5 * index,
	// 		loop: false,
	// 		callback: () => {
	// 			tile.setVisible(true)
	// 		}
	// 	})
	// })
	this.menuTileGroup = this.add.group()
	this.menuTileGroup.createMultiple({ key: 'menuTile', frameQuantity: 31, setXY: { x: 10, y: 12, stepX: 16, stepY: 0 }, visible: false })
	this.menuTileGroup.createMultiple({ key: 'menuTile', frameQuantity: 16, setXY: { x: 490, y: 28, stepX: 0, stepY: 16 }, visible: false })
	this.menuTileGroup.createMultiple({ key: 'menuTile', frameQuantity: 30, setXY: { x: 474, y: 268, stepX: -16, stepY: 0 }, visible: false })
	this.menuTileGroup.createMultiple({ key: 'menuTile', frameQuantity: 15, setXY: { x: 10, y: 252, stepX: 0, stepY: -16 }, visible: false })
	this.menuTileGroup.children.iterate((tile, index) => {
		this.time.addEvent({
			delay: 5 * index,
			loop: false,
			callback: () => {
				tile.setVisible(true)
			}
		})
	})

	// menu buttons

	// play
	this.playButton.gameObj = this.add.sprite(256, 150, 'menuBtnPlay')
	this.playButton.gameObj.setInteractive()
	this.playButton.gameObj.on('pointerup', () => {
		this.scene.manager.stop('MenuScene')
		this.scene.manager.start('LevelControlScene' , {
			points: 0,
			hasHighJumpShoe: false,
			hasDangleClaws: false,
			hasMultiHand: false,
			numOfGunUps: 0,
			numOfHealthBlocks: 10,
			levelData: {
				key: '',
				mapData: '',
				numOfTiles: 128 * 90,
				lastScene: 'IntroScene',
				backgroundImageFilePath: '',
				backgroundKey: ''
			},
			currentLevelId: 0,
		})
	})
	this.playButton.gameObj.on('pointerover', () => {
		this.playButton.pointerOver = true
	})
	this.playButton.gameObj.on('pointerout', () => {
		this.playButton.pointerOver = false
	})

	// notes
	this.notesButton.gameObj = this.add.sprite(400, 150, 'menuBtnNotes')
	this.notesButton.gameObj.setInteractive()
	this.notesButton.gameObj.on('pointerup', () => {
	})
	this.notesButton.gameObj.on('pointerover', () => {
		this.notesButton.pointerOver = true
	})
	this.notesButton.gameObj.on('pointerout', () => {
		this.notesButton.pointerOver = false
	})

	// score
	this.scoreButton.gameObj = this.add.sprite(256, 220, 'menuBtnScore')
	this.scoreButton.gameObj.setInteractive()
	this.scoreButton.gameObj.on('pointerup', () => {
	})
	this.scoreButton.gameObj.on('pointerover', () => {
		this.scoreButton.pointerOver = true
	})
	this.scoreButton.gameObj.on('pointerout', () => {
		this.scoreButton.pointerOver = false
	})

}

MenuScene.prototype.update = function (time, delta) {
	// play
	if (this.playButton.pointerOver) {
		this.playButton.gameObj.setScale(this.playButton.currentScale)
		this.playButton.currentScale -= this.playButton.scaleDelta
		if (this.playButton.currentScale < 0.95) {
			this.playButton.scaleDelta *= -1
			this.playButton.currentScale = 0.95
		}
		if (this.playButton.currentScale > 1.0) {
			this.playButton.scaleDelta *= -1
			this.playButton.currentScale = 1.0
		}
	} else {
		this.playButton.scaleDelta *= -1
		this.playButton.currentScale = 1.0
	}

	// notes
	if (this.notesButton.pointerOver) {
		this.notesButton.gameObj.setScale(this.notesButton.currentScale)
		this.notesButton.currentScale -= this.notesButton.scaleDelta
		if (this.notesButton.currentScale < 0.95) {
			this.notesButton.scaleDelta *= -1
			this.notesButton.currentScale = 0.95
		}
		if (this.notesButton.currentScale > 1.0) {
			this.notesButton.scaleDelta *= -1
			this.notesButton.currentScale = 1.0
		}
	} else {
		this.notesButton.scaleDelta *= -1
		this.notesButton.currentScale = 1.0
	}

	// score
	if (this.scoreButton.pointerOver) {
		this.scoreButton.gameObj.setScale(this.scoreButton.currentScale)
		this.scoreButton.currentScale -= this.scoreButton.scaleDelta
		if (this.scoreButton.currentScale < 0.95) {
			this.scoreButton.scaleDelta *= -1
			this.scoreButton.currentScale = 0.95
		}
		if (this.scoreButton.currentScale > 1.0) {
			this.scoreButton.scaleDelta *= -1
			this.scoreButton.currentScale = 1.0
		}
	} else {
		this.scoreButton.scaleDelta *= -1
		this.scoreButton.currentScale = 1.0
	}
}



