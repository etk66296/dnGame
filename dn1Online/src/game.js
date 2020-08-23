function GameScene() {
	Phaser.Scene.call(this, 'GameScene')
	this.controls = null
	this.hero = null
	this.cursors = null
	this.lastDir = 'right'
	
	// the string is used to check if the ogvw character gifts are collected in the correct order
	this.collectedGiftsChar = ''

	//map and layer data
	this.map = null
	this.solidLayer = null
	this.decorationLayer = null
	this.guardsObjLayerData = null
	this.giftObjLayerData = null
	this.camsObjLayerData = null
	this.minirobotsObjLayerData = null
	this.crocosObjLayerData = null
	this.wheelcanonObjLayerData = null
	this.giftsObjLayerData = null
	this.minesObjLayerData = null
	this.elevatorsObjLayerData = null
	this.glowthrowersObjLayerData = null
	this.trapsObjLayerData = null
	this.keysAndGatesObjLayerData = null
	this.animatedDecoObjLayerData = null
	this.levelGateObjLayerData = null
	this.washerBossObjLayerData = null

	// parameters
	this.jumpSpeed = 85
	//game objects
	this.bullets = null
	this.gunCoolsDown = 0
	this.mines = null
	this.heroPain = false
	this.heroPainTime = 250
	this.heroPainStopWatch = 0
	this.gameCamsGroup = null
	this.minirobotsGroup = null
	this.giantRobots = null
	this.pointFlyersGroup = null
	this.crocosGroup = null
	this.wheelcanonsGroup = null
	this.enemyBullets = null
	this.giftsGroup = null
	this.mapDynamite = null
	this.dynamiteGroup = null
	this.elevators = []
	this.glowThrowers = []
	this.traps = []
	this.trapGuards = {}
	this.keysNGatesGroup = null
	this.animtedDecoGroup = null
	this.levelGateGroup = null
	this.finalBossGroup = null
	this.headUpDsp = null

	// controls
	this.key_RIGHT = null
	this.key_LEFT = null
	this.key_JUMP = null
	this.key_FIRE = null
	this.key_USE = null

	// sound opjects
	this.heroStepSound = null
	this.heroJumpSound = null
	this.heroFiresSound = null
	this.explosionSound = null
	this.pickupGiftSound = null
	this.floorfireSound = null
	this.painSound = null
	this.openGateSound = null
}

GameScene.prototype = Object.create(Phaser.Scene.prototype)
GameScene.prototype.constructor = GameScene

GameScene.prototype.preload = function () {
	// all preloads are done in the intro scene
}

GameScene.prototype.create = function() {
	// create the sound effect objects
	this.heroStepSound = this.sound.add('dukeStep')
	this.heroStepSound.rate = 2.0
	this.heroStepSound.volume = 0.5
	this.heroJumpSound = this.sound.add('dukeJump')
	this.heroFiresSound = this.sound.add('dukeFire')
	this.heroFiresSound.volume = 0.75
	this.explosionSound = this.sound.add('explosion')
	this.pickupGiftSound = this.sound.add('pickupGift')
	this.floorfireSound = this.sound.add('floorFire')
	this.painSound = this.sound.add('pain')
	this.openGateSound = this.sound.add('openGate')

	// init all game stuff
	this.initMapData()
	this.initControls()

	// especially the game sprite objects
	this.initAnimatedDeco()
	this.initHeroBullets()
	this.initEnemyBullets()
	this.initHero()
	this.initLevelGate()
	this.initMines()
	this.initGifts()
	this.initObserverCameras()
	this.initMiniRobots()
	this.initGiantRobots()
	this.initCrocos()
	this.initWheelCanons()
	this.initBouncerGuards()
	this.initElevators()
	this.initGlowThrower()
	this.initTraps()
	this.initWasherBoss()
	this.initKeysAndGates()
	
	
	// upon creating all game object instances let's add the collison polling
	this.initCollision()

	
	// define head up display
	this.headUpDsp = this.add.sprite(-10, -10, 'headUpDsp')
	
	this.headUpDsp.setOrigin(0)
	this.headUpDsp.setDepth(100)
	this.headUpDsp.setScrollFactor(0,0)
	
	// setup a hero following phaser cam
	this.cameras.main.startFollow(this.hero)
}

GameScene.prototype.update = function (time, delta) {
	// phaser you are awesome --> have a look at the low lined game update function
	// hero movement -->
	// this.headUpDsp.setPosition(this.cameras.)
	// console.log(this.cameras.main._scrollX)
	if (this.key_LEFT.isDown) {
		if(this.hero.body.onFloor()) {
			if (!this.heroStepSound.isPlaying) {
				this.heroStepSound.play()
			}
			this.hero.setVelocityX(-140)
			if (this.heroPain) {
				this.hero.anims.play('heroPainLeft', true)
			} else {
				this.hero.anims.play('heroWalkLeft', true)
			}
		} else {
			this.hero.setVelocityX(-this.jumpSpeed)
			if (this.heroPain) {
				this.hero.anims.play('heroPainLeft', true)
			} else {
				this.hero.anims.play('heroJumpLeft', true)
			}
		}
		this.lastDir = 'left'
  } else if (this.key_RIGHT.isDown) {
		if(this.hero.body.onFloor()) {
			if (!this.heroStepSound.isPlaying) {
				this.heroStepSound.play()
			}
			this.hero.setVelocityX(140)
			if (this.heroPain) {
				this.hero.anims.play('heroPainRight', true)
			} else {
				this.hero.anims.play('heroWalkRight', true)
			}
		} else {
			this.hero.setVelocityX(this.jumpSpeed)
			if (this.heroPain) {
				this.hero.anims.play('heroPainRight', true)
			} else {
				this.hero.anims.play('heroJumpRight', true)
			}
		}
		this.lastDir = 'right'
  } else {
		this.hero.setVelocityX(0)
		if(this.lastDir === 'left') {
			if (this.heroPain) {
				this.hero.anims.play('heroPainLeft', true)
			} else {
				this.hero.anims.play('heroIdleLeft')
			}
		} else {
			if (this.heroPain) {
				this.hero.anims.play('heroPainRight', true)
			} else {
				this.hero.anims.play('heroIdleRight')
			}
		}
	}
	if (this.key_JUMP.isDown && (this.hero.body.onFloor() || this.hero.body.touching.down)) {
		this.hero.setVelocityY(-185)
		if (!this.heroJumpSound.isPlaying) {
			this.heroJumpSound.play()
		}
	}
	// <-- hero movement
	// fire -->
	if (this.key_FIRE.isDown && this.gunCoolsDown <= 0) {
		if (!this.heroFiresSound.isPlaying) {
			this.heroFiresSound.play()
		}
		this.gunCoolsDown = 1000 // if the gun was fired it must cool down before the next shoot
		if(this.lastDir === 'left') {
			this.bullets.fireBullet(this.hero.x - 8, this.hero.y, -1)
		} else {
			this.bullets.fireBullet(this.hero.x + 8, this.hero.y, 1)
		}
	} else {
		this.gunCoolsDown -= delta
	}
	// <-- fire
	// use -->
	if (this.key_USE.isDown) {
		this.elevators.forEach((elevator) => {
			elevator.enable()
		})
	}
	// <-- use
	// pain time -->
	if (this.heroPain) {
		this.heroPainStopWatch += delta
	}
	if(this.heroPainStopWatch > this.heroPainTime) {
		if (!this.painSound.isPlaying) {
			this.painSound.play()
		}
		this.heroPain = false
		this.heroPainStopWatch = 0
	}
	// <-- pain time
}

GameScene.prototype.initControls = function() {	
	// constrols
	this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
	this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
	this.key_JUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
	this.key_FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)
	this.key_USE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
}

GameScene.prototype.initMapData = function() {	
	// map
	this.add.sprite(-1, -1, 'level1Background').setOrigin(0)
	this.map = this.make.tilemap({ key: "level1map" })
	const tileset = this.map.addTilesetImage("TilesNoTileBleeding", "TilesNoTileBleeding")
	this.solidLayer = this.map.createStaticLayer("Solid", tileset) //, 0, 0)
	this.solidLayer.setCollisionBetween(0, 11519)
	this.decorationLayer = this.map.createStaticLayer("Decoration", tileset)
	this.guardsObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Guards")].objects
	this.giftObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Gifts")].objects
	this.camsObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Cameras")].objects
	this.minirobotsObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Minirobots")].objects
	this.giantrobotsObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Giantrobots")].objects
	this.crocosObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Crocos")].objects
	this.wheelcanonObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Wheelcanon")].objects
	this.giftsObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Gifts")].objects
	this.minesObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Mines")].objects
	this.elevatorsObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Elevators")].objects
	this.glowthrowersObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "GlowThrowers")].objects
	this.trapsObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "Traps")].objects
	this.keysAndGatesObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "KeysAndGates")].objects
	this.animatedDecoObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "AnimatedDecoration")].objects
	this.levelGateObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "LevelGate")].objects
	this.washerBossObjLayerData = this.map.objects[this.map.objects.findIndex(x => x.name === "WasherBoss")].objects
}

GameScene.prototype.initAnimatedDeco = function() {	
	this.animtedDecoGroup = new AnimatedDeco(this, this.animatedDecoObjLayerData)
	this.animtedDecoGroup.children.iterate((decoSegment) => {
		decoSegment.setup()
	})
}

GameScene.prototype.initHeroBullets = function() {	
	this.bullets = new Bullets(this, this.solidLayer)
	this.bullets.children.iterate((bullet) => {
		bullet.setup()
	})
}

GameScene.prototype.initCrocos = function() {
	this.crocosGroup = new Crocos(this, this.crocosObjLayerData, this.solidLayer, this.bullets, this.explosionSound)
	this.crocosGroup.children.iterate(function (croco) {
		croco.setup()
	})
}

GameScene.prototype.initLevelGate = function() {	
	this.levelGateGroup = new LevelGate(this, this.levelGateObjLayerData, this.hero, this.key_USE)
	this.levelGateGroup.children.iterate((levelGateSegment) => {
		levelGateSegment.setup()
	})
	this.levelGateGroup.setup()
}

GameScene.prototype.initEnemyBullets = function() {
	this.enemyBullets = new EnemyBullets(this, this.solidLayer)
	this.enemyBullets.children.iterate((bullet) => {
		bullet.setup()
	})
}

GameScene.prototype.initMines = function() {
	this.mines = new Mines(this, this.minesObjLayerData, this.solidLayer, this.bullets)
	this.mines.children.iterate(function(mine) {
		mine.setup()
	})
}

GameScene.prototype.initObserverCameras = function() {
	this.gameCamsGroup = new GameCams(this, this.camsObjLayerData, this.bullets, this.pointFlyersGroup, this.explosionSound)
	this.gameCamsGroup.children.iterate((cam) => {
		cam.setup()
	})
}

GameScene.prototype.initGiantRobots = function() {
	this.giantRobots = new Giantrobots(this, this.giantrobotsObjLayerData, this.solidLayer, this.enemyBullets, this.hero, this.bullets)
	this.giantRobots.children.iterate(function (giantrobo) {
		giantrobo.setup()
	})
}

GameScene.prototype.initMiniRobots = function() {
	this.minirobotsGroup = new Minirobots(this, this.minirobotsObjLayerData, this.solidLayer, this.bullets, this.explosionSound)
	this.minirobotsGroup.children.iterate(function (minirobo) {
		minirobo.setup()
	})
}

GameScene.prototype.initWheelCanons = function() {
	this.wheelcanonsGroup = new Wheelcanons(this, this.wheelcanonObjLayerData, this.solidLayer, this.enemyBullets, this.bullets)
	this.wheelcanonsGroup.children.iterate(function (wheelcanon) {
		wheelcanon.setup()
	})
}

GameScene.prototype.initBouncerGuards = function() {
	this.guardsObjLayerData.forEach((guard) => {
		var r1 = this.add.rectangle(guard.x + 8, guard.y + 8, guard.width, guard.height)
		this.physics.add.existing(r1)
		r1.body.immovable = true
		this.physics.add.collider(r1, this.minirobotsGroup)
		this.physics.add.collider(r1, this.crocosGroup )
		this.physics.add.collider(r1, this.wheelcanonsGroup )
		if (guard.type === "Trapguard") {
			if (this.trapGuards[guard.properties.id] === undefined) {
				this.trapGuards[guard.properties.id] = []
			}
			this.trapGuards[guard.properties.id].push(r1)
		}
	})
}

GameScene.prototype.initHero = function() {
	this.hero = this.physics.add.sprite(864, 64, 'heroSpriteAtlas').play('heroJumpRight')
	this.hero.setSize(10, 32, true)
	this.hero.setGravityY(300)
	this.hero.setBounce(0.0)
	this.hero.useElevator = false
	this.physics.add.collider(this.hero, this.solidLayer)
	this.hero.isUsingElevator = false
	this.hero.inventory = []
}

GameScene.prototype.initGifts = function() {
	// depends on the hero bullets instance
	this.pointFlyersGroup = new PointsFlyers(this)
	this.dynamiteGroup = new Dynamite(this, this.floorfireSound)
	this.dynamiteGroup.children.iterate((floorfire) => {
		floorfire.setup()
	})
	this.giftsGroup = new Gifts(this, this.giftsObjLayerData, this.solidLayer, this.pointFlyersGroup, this.bullets, this.dynamiteGroup, this.pickupGiftSound, this.explosionSound)
	this.giftsGroup.children.iterate(gift => {
		gift.setup()
	})
}

GameScene.prototype.initElevators = function() {
	this.elevatorsObjLayerData.forEach((elevatorData) => {
		this.elevators.push(new Elevator(this, elevatorData, this.hero, this.key_USE))
	})
	// all elevator groups in one level are in an array
	this.elevators.forEach(elevator => {
		elevator.setup()
		elevator.children.iterate(segment => {
			segment.setup()
		})
	})
}

GameScene.prototype.initGlowThrower = function() {
	// glow thrower groups are organized in an array
	this.glowthrowersObjLayerData.forEach((glowThrowerData) => {
		this.glowThrowers.push(new GlowThrower(this, glowThrowerData))
	})
	this.glowThrowers.forEach((glowThrower) => {
		glowThrower.children.iterate((glowSegment) => {
			glowSegment.setup()
		})
	})
}


GameScene.prototype.initTraps = function() {
	// check how many traps are in the level
	// each trapsegment of the same trap has the same id
	let trapsData = {}
	this.trapsObjLayerData.forEach(trapSegment => {
		if (trapsData[trapSegment.properties.id] === undefined) {
			trapsData[trapSegment.properties.id] = []
		}
		trapsData[trapSegment.properties.id].push(trapSegment)
	})
	Object.keys(trapsData).forEach((key) => {
		// the guards corresponding to the traps must have the same id attribute as the traps itself
		this.traps.push(new Trap(this, trapsData[key], this.hero, this.trapGuards[key]))
	})
	this.traps.forEach(trap => {
		trap.children.iterate(trapSegment => {
			trapSegment.setup()
		})
	})
}

GameScene.prototype.initWasherBoss = function() {
	this.finalBossGroup = new WasherBoss(this, this.washerBossObjLayerData, this.hero, this.bullets)
	this.finalBossGroup.children.iterate(bossSegment => {
		bossSegment.setup()
	})
}

GameScene.prototype.initKeysAndGates = function() {
	this.keysNGatesGroup = new KeysNGates(this, this.keysAndGatesObjLayerData, this.hero, this.pointFlyersGroup, this.key_USE, this.openGateSound)
	this.keysNGatesGroup.children.iterate(keyItem => {
		keyItem.setup()
	})
}

GameScene.prototype.initCollision = function() {
	// this function depends on all init functions
	// mini robots -->
	this.physics.add.overlap(this.hero, this.minirobotsGroup,  () => {
		this.heroPain = true
	})
	// <-- mini robots
	// giant robots -->
	this.physics.add.overlap(this.hero, this.giantRobots,  () => {
		this.heroPain = true
	})
	// <-- giant robots
	// crocos -->
	this.physics.add.overlap(this.hero, this.crocosGroup,  () => {
		this.heroPain = true
	})
	// <-- crocos
	// enemy bullets -->
	this.physics.add.overlap(this.hero, this.enemyBullets, () => {
		this.heroPain = true
	})
	// <-- enemy bullets
	// wheel canon -->
	this.physics.add.overlap(this.hero, this.wheelcanonsGroup, () => {
		this.heroPain = true
	})
	// <-- wheel canon
	// mines -->
	this.physics.add.overlap(this.mines, this.hero, () => {
		this.heroPain = true
	})
	// <-- mines
	// spikes -->
	this.physics.add.overlap(this.hero, this.decorationLayer,  (hero, deco) => {
		if (deco.properties.spike) {
			this.heroPain = true
		}
	})
	// <-- spikes
	// glow thrower -->
	this.glowThrowers.forEach(glowThrower => {
		this.physics.add.overlap(this.hero, glowThrower,  (hero, deco) => {
			this.heroPain = true
		})
	})
	// <-- glowthrower
	// gifts -->
	this.physics.add.overlap(this.hero, this.giftsGroup,  (hero, gift) => {
		gift.collected()
	})
	this.physics.add.overlap(this.hero, this.dynamiteGroup,  () => {
		this.heroPain = true
	})
	// <-- gifts
}
