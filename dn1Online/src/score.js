function ScoreScene() {
	Phaser.Scene.call(this, 'ScoreScene')
	this.bgImage = null

	this.menuTileGroup = null
	this.menuTileGroupBg = null

	// buttons
	this.backButton = { pointerOver: true, gameObj: null, currentScale: 1.0, scaleDelta: -0.0025 }
	this.upButton = { pointerOver: true, gameObj: null, currentScale: 1.0, scaleDelta: -0.05 }
	this.downButton = { pointerOver: true, gameObj: null, currentScale: 1.0, scaleDelta: -0.05 }
	
	
	this.content = []
	this.scoreText = []
	this.visibleScoreBlockIndex = 0

	// request score
	this.requestScore = function() {
		// axios.get('http://localhost:9999/score.json')
		axios.get('http://www.ogv-wendlingen.de/games/dn1Online/score.json')
		// axios.post('http://htmlpreview.github.io/?https://github.com/etk66296/games/blob/master/dn1Online/score.json')
			.then(response => {
				this.content = []
				this.scoreText = []
				response.data.score.forEach((nameAndPoints, index) => {
					if (index % 10 === 0) {
						this.content.push([])
					}
					if (nameAndPoints !== null) {
						this.content[this.content.length - 1].push(((index + 1 < 10) ? '0' + String(index + 1) : String(index + 1)) + '.\t\t' + nameAndPoints.name + '\t\t\t' + String(nameAndPoints.points) + '\t\t' + ((index + 1 == 1) ? '🥇' : ((index + 1 == 2) ? '🥈' : ((index + 1 == 3) ? '🥉' : ''))))
					}
				})
				this.content.forEach((scoreBlock, Index) => {
					this.scoreText.push(this.add.text(80, 22, scoreBlock, { fontFamily: 'VT323-Regular', fontSize: 22, color: '#ffffff', fontStyle: 'bold' }))
					this.scoreText[this.scoreText.length - 1].setVisible(false)
				})

				this.scoreText[this.visibleScoreBlockIndex].setVisible(true)
			})
			.catch(error => {
				console.log(error)
			})
	}
}

ScoreScene.prototype = Object.create(Phaser.Scene.prototype)
ScoreScene.prototype.constructor = ScoreScene

ScoreScene.prototype.init = function (data) {

	
}

ScoreScene.prototype.preload = function () {
}

ScoreScene.prototype.create = function() {
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

	// back button
	this.backButton.gameObj = this.add.sprite(460, 240, 'menuBtnBack')
	this.backButton.gameObj.setScale(0.5)
	this.backButton.gameObj.setInteractive()
	this.backButton.gameObj.on('pointerup', () => {
		this.scene.stop('ScoreScene')
		this.scene.start('MenuScene')
	})
	this.backButton.gameObj.on('pointerover', () => {
		this.backButton.pointerOver = false
	})
	this.backButton.gameObj.on('pointerout', () => {
		this.backButton.pointerOver = true
	})
	this.backButton.pointerOver = false

	// up
	this.upButton.gameObj = this.add.sprite(460, 110, 'menuBtnUp')
	this.upButton.gameObj.setScale(0.5)
	this.upButton.gameObj.setInteractive()
	this.upButton.gameObj.on('pointerdown', () => {
		if (this.visibleScoreBlockIndex > 0) {
			let preIndex = this.visibleScoreBlockIndex
			this.visibleScoreBlockIndex -= 1
			this.scoreText[preIndex].setVisible(false)
			this.scoreText[this.visibleScoreBlockIndex].setVisible(true)
		}
	})
	this.upButton.pointerOver = false

	// down
	this.downButton.gameObj = this.add.sprite(460, 150, 'menuBtnDown')
	this.downButton.gameObj.setScale(0.5)
	this.downButton.gameObj.setInteractive()
	this.downButton.gameObj.on('pointerdown', () => {
		if (this.visibleScoreBlockIndex < 9) {
			let preIndex = this.visibleScoreBlockIndex
			this.visibleScoreBlockIndex += 1
			this.scoreText[preIndex].setVisible(false)
			this.scoreText[this.visibleScoreBlockIndex].setVisible(true)
		}
	})
	this.downButton.pointerOver = false


	// request the score data
	this.content = []
	this.scoreText = []
	this.visibleScoreBlockIndex = 0
	this.requestScore()
}

ScoreScene.prototype.update = function (time, delta) {
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
		this.backButton.gameObj.setScale(this.backButton.currentScale)
	}
}



