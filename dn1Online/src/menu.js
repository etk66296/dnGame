function MenuScene() {
	Phaser.Scene.call(this, 'MenuScene')
	this.bgImage = null

	this.menuTileGroup = null
	this.menuTileGroupBg = null

	// buttons
	this.newGameButton = { pointerOver: false, gameObj: null, currentScale: 1.0, scaleDelta: -0.0025}
	this.notesButton = { pointerOver: false, gameObj: null, currentScale: 1.0, scaleDelta: -0.0025}
	this.scoreButton = { pointerOver: false, gameObj: null, currentScale: 1.0, scaleDelta: -0.0025}
	this.resumeButton = { pointerOver: false, gameObj: null, currentScale: 1.0, scaleDelta: -0.0025}

	// cookie level management helper functions
	this.getCookie = function(cname) {
		var name = cname + "="
		var decodedCookie = decodeURIComponent(document.cookie)
		var ca = decodedCookie.split(';')
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i]
			while (c.charAt(0) == ' ') {
				c = c.substring(1)
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length)
			}
		}
		return ""
	}

	this.bestScoreText = null
	// request best core
	this.requestScore = function() {
		// axios.get('http://localhost:9999/score.json')
		axios.get('http://www.ogv-wendlingen.de/games/dn1Online/score.php')
		// axios.post('http://htmlpreview.github.io/?https://github.com/etk66296/games/blob/master/dn1Online/score.json')
			.then(response => {
				this.bestScoreText = this.add.text(200, 220, '🥇  ' + response.data.score[0].name + '\t\t' + String(response.data.score[0].points), { fontFamily: 'VT323-Regular', fontSize: 20, color: '#ffffff', fontStyle: 'bold' })
			})
			.catch(error => {
				console.log(error)
			})
	}

}

MenuScene.prototype = Object.create(Phaser.Scene.prototype)
MenuScene.prototype.constructor = MenuScene

MenuScene.prototype.init = function (data) {

	
}

MenuScene.prototype.preload = function () {
	// this.load.tilemapTiledJSON("mapLevel1City", "assets/maps/dn1MapLevel1City.json")
}

MenuScene.prototype.create = function() {

	// reloading the score
	this.time.addEvent({
		delay: 10000,
		loop: true,
		callback: () => {
			this.requestScore()
		}
	})

	// background
	this.bgImage = this.add.sprite(0, 0, 'menuBackground')
	this.bgImage.setOrigin(0)
	this.bgImage.setDepth(-100)
	this.bgImage.setScrollFactor(0, 0)

	this.headlineCharGroup = this.add.group()
	
	// headline text
	let headLineStr = 'Dieter NussbaumEinsatz im Ländle'
	let fontSize = 48
	let charPos = { x: 32, y: 18 }
	for (let i = 0; i < headLineStr.length; i++) {
		let charIndex = i
		this.time.addEvent({
			delay: 25 * i,
			loop: false,
			callback: () => {
				// quick and dirty
				charPos = {x: 32 + 24 * charIndex, y: 18}
				if (charIndex > 14) {
					charPos = {x: 32 + 24 * (charIndex - 14), y: 72}
					fontSize = 24
				}
				let letter = this.add.text(charPos.x, charPos.y, headLineStr.charAt(i),{
					fontFamily: 'VT323-Regular',
					fontSize: fontSize,
					color: '#AAAAAA',
					fontStyle: 'bold'
				})
				letter.setStroke('#a4461d', 5);
				letter.setShadow(2, -2, '#d05521' /*color*/, 0 /*blur*/, true /*stroke*/, false /*fill*/)
			}
		})
	}


	this.menuTileGroup = this.add.group()
	this.menuTileGroup.createMultiple({ key: 'menuTile', frameQuantity: 31, setXY: { x: 10, y: 12, stepX: 16, stepY: 0 }, visible: false })
	this.menuTileGroup.createMultiple({ key: 'menuTile', frameQuantity: 16, setXY: { x: 490, y: 28, stepX: 0, stepY: 16 }, visible: false })
	this.menuTileGroup.createMultiple({ key: 'menuTile', frameQuantity: 30, setXY: { x: 474, y: 268, stepX: -16, stepY: 0 }, visible: false })
	this.menuTileGroup.createMultiple({ key: 'menuTile', frameQuantity: 15, setXY: { x: 10, y: 252, stepX: 0, stepY: -16 }, visible: false })
	this.menuTileGroup.children.iterate((tile, index) => {
		this.time.addEvent({
			delay: 15 * index,
			loop: false,
			callback: () => {
				tile.setVisible(true)
			}
		})
	})

	// menu buttons

	// resume
	this.resumeButton.gameObj = this.add.sprite(264, 150, 'menuBtnResume')
	this.resumeButton.gameObj.setInteractive()
	this.resumeButton.gameObj.on('pointerdown', () => {
		// try to load cookie game data
		let cookieDataString = this.getCookie('dn1SaveGameData')
		
		// no cookie data => tell the user he shall start a new game
		if (cookieDataString === '') {
			this.scene.manager.pause('Level0Scene')
				this.scene.manager.start('InfoTextScene', {text: [
					'sorry, there is no saved game',
					'',
					'please start a new one'
			]})
		} else {
			let heroData = JSON.parse(cookieDataString)
			this.scene.manager.stop('MenuScene')
			this.scene.manager.start('LevelControlScene' , {
				points: heroData.points,
				hasHighJumpShoe: heroData.hasHighJumpShoe,
				hasDangleClaws: heroData.hasDangleClaws,
				hasMultiHand: heroData.hasMultiHand,
				numOfGunUps: heroData.numOfGunUps,
				numOfHealthBlocks: heroData.numOfHealthBlocks,
				levelData: {
					key: heroData.levelData.key,
					mapData: heroData.levelData.mapData,
					numOfTiles: heroData.levelData.numOfTiles,
					lastScene: heroData.levelData.lastScene,
					backgroundImageFilePath: heroData.levelData.backgroundImageFilePath,
					backgroundKey: heroData.levelData.backgroundKey
				},
				currentLevelId: heroData.currentLevelId,
			})
		}		
	})
	this.resumeButton.gameObj.on('pointerover', () => {
		this.resumeButton.pointerOver = true
	})
	this.resumeButton.gameObj.on('pointerout', () => {
		this.resumeButton.pointerOver = false
	})

	this.resumeButton.gameObj.on('pointerover', () => {
		this.resumeButton.pointerOver = true
	})
	this.resumeButton.gameObj.on('pointerout', () => {
		this.resumeButton.pointerOver = false
	})

	// new game
	this.newGameButton.gameObj = this.add.sprite(404, 150, 'menuBtnPlay')
	this.newGameButton.gameObj.setInteractive()
	this.newGameButton.gameObj.on('pointerdown', () => {
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
	this.newGameButton.gameObj.on('pointerover', () => {
		this.newGameButton.pointerOver = true
	})
	this.newGameButton.gameObj.on('pointerout', () => {
		this.newGameButton.pointerOver = false
	})

	this.newGameButton.gameObj.on('pointerover', () => {
		this.newGameButton.pointerOver = true
	})
	this.newGameButton.gameObj.on('pointerout', () => {
		this.newGameButton.pointerOver = false
	})

	// notes
	this.notesButton.gameObj = this.add.sprite(264, 190, 'menuBtnNotes')
	this.notesButton.gameObj.setInteractive()
	this.notesButton.gameObj.on('pointerdown', () => {
		this.scene.manager.stop('MenuScene')
		this.scene.manager.start('NotesScene')
	})
	this.notesButton.gameObj.on('pointerover', () => {
		this.notesButton.pointerOver = true
	})
	this.notesButton.gameObj.on('pointerout', () => {
		this.notesButton.pointerOver = false
	})

	// score
	this.scoreButton.gameObj = this.add.sprite(404, 190, 'menuBtnScore')
	this.scoreButton.gameObj.setInteractive()
	this.scoreButton.gameObj.on('pointerdown', () => {
		this.scene.manager.stop('MenuScene')
		this.scene.manager.start('ScoreScene')
	})
	this.scoreButton.gameObj.on('pointerover', () => {
		this.scoreButton.pointerOver = true
	})
	this.scoreButton.gameObj.on('pointerout', () => {
		this.scoreButton.pointerOver = false
	})

	this.newGameButton.pointerOver = false
	this.notesButton.pointerOver = false
	this.scoreButton.pointerOver = false
	this.resumeButton.pointerOver = false

	this.requestScore()
}

MenuScene.prototype.update = function (time, delta) {
	// new game
	if (this.newGameButton.pointerOver) {
		this.newGameButton.gameObj.setScale(this.newGameButton.currentScale)
		this.newGameButton.currentScale -= this.newGameButton.scaleDelta
		if (this.newGameButton.currentScale < 0.95) {
			this.newGameButton.scaleDelta *= -1
			this.newGameButton.currentScale = 0.95
		}
		if (this.newGameButton.currentScale > 1.0) {
			this.newGameButton.scaleDelta *= -1
			this.newGameButton.currentScale = 1.0
		}
	} else {
		this.newGameButton.scaleDelta *= -1
		this.newGameButton.currentScale = 1.0
		this.newGameButton.gameObj.setScale(this.newGameButton.currentScale)
	}

	// resume
	if (this.resumeButton.pointerOver) {
		this.resumeButton.gameObj.setScale(this.resumeButton.currentScale)
		this.resumeButton.currentScale -= this.resumeButton.scaleDelta
		if (this.resumeButton.currentScale < 0.95) {
			this.resumeButton.scaleDelta *= -1
			this.resumeButton.currentScale = 0.95
		}
		if (this.resumeButton.currentScale > 1.0) {
			this.resumeButton.scaleDelta *= -1
			this.resumeButton.currentScale = 1.0
		}
	} else {
		this.resumeButton.scaleDelta *= -1
		this.resumeButton.currentScale = 1.0
		this.resumeButton.gameObj.setScale(this.resumeButton.currentScale)
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
		this.notesButton.gameObj.setScale(this.notesButton.currentScale)
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
		this.scoreButton.gameObj.setScale(this.scoreButton.currentScale)
	}
}



