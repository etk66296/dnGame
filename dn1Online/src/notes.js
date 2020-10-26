function NotesScene() {
	Phaser.Scene.call(this, 'NotesScene')
	this.bgImage = null

	this.menuTileGroup = null
	this.menuTileGroupBg = null

	// buttons
	this.backButton = { pointerOver: true, gameObj: null, currentScale: 1.0, scaleDelta: -0.0025}

}

NotesScene.prototype = Object.create(Phaser.Scene.prototype)
NotesScene.prototype.constructor = NotesScene

NotesScene.prototype.init = function (data) {

	
}

NotesScene.prototype.preload = function () {
	// this.load.tilemapTiledJSON("mapLevel1City", "assets/maps/dn1MapLevel1City.json")
}

NotesScene.prototype.create = function() {
	// menu tiles
	this.menuTileGroupBg = this.add.group()
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 24, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 216, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 200, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 232, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 264, stepX: 15, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 280, stepX: 16, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 56, stepX: 15, stepY: 0 }, visible: false })
	// this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 8, y: 8, stepX: 16, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 152, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 88, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 104, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 72, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 136, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 40, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 184, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 120, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 168, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.createMultiple({ key: 'menuTile2', frameQuantity: 32, setXY: { x: 24, y: 248, stepX: 15, stepY: 0 }, visible: false })
	this.menuTileGroupBg.children.iterate((tile, index) => {
		this.time.addEvent({
			delay: 1 * index,
			loop: false,
			callback: () => {
				tile.setVisible(true)
			}
		})
	})
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

	let content = [
		'Level design, sprites and tiles are taken from the game duke nukem.',
		'Duke Nukem is a 2D platform game developed and published',
		'(July 1, 1991) by Apogee Software, featuring the adventures of the',
		'fictional character Duke Nukem.',
		'',
		'Tiles from Duke Nukem (Computer) Ripped by Ultimecia',
		'https://www.spriters-resource.com',
		'',
		'The game was developed using the Phaser 3 2D framework.',
		'Copyright © 2020 Richard Davey, Photon Storm Ltd.',
		'',
		'Dieter Nussbaum',
		'MIT License Copyright (c) [2020] Daniel Heilemann'
	]
	this.add.text(24, 18, content, { fontFamily: 'VT323-Regular', fontSize: 16, color: '#ffffff', fontStyle: 'bold' })

	// score
	this.backButton.gameObj = this.add.sprite(460, 240, 'menuBtnBack')
	this.backButton.gameObj.setScale(0.5)
	this.backButton.gameObj.setInteractive()
	this.backButton.gameObj.on('pointerup', () => {
		this.scene.stop('NotesScene')
		this.scene.start('MenuScene')
	})
	this.backButton.gameObj.on('pointerover', () => {
		this.backButton.pointerOver = false
	})
	this.backButton.gameObj.on('pointerout', () => {
		this.backButton.pointerOver = true
	})
}

NotesScene.prototype.update = function (time, delta) {
	// back
	if (this.backButton.pointerOver) {
		this.backButton.gameObj.setScale(this.backButton.currentScale)
		this.backButton.currentScale -= this.backButton.scaleDelta
		if (this.backButton.currentScale < 0.45) {
			this.backButton.scaleDelta *= -1
			this.backButton.currentScale = 0.45
		}
		if (this.backButton.currentScale > 0.5) {
			this.backButton.scaleDelta *= -1
			this.backButton.currentScale = 0.5
		}
	} else {
		this.backButton.scaleDelta *= -1
		this.backButton.currentScale = 0.5
	}
}



