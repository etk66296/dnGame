function Level0Scene() {
	Phaser.Scene.call(this, 'Level0Scene')
	this.worldMap = null
	this.tileset = null

	// this.stopScene = false

	// controls
	this.gameControls = null
	
	// world layers
	this.solidLayer = null
	this.decorationLayer = null
	this.heroObjLayerData = null
	this.giftsObjLayerData = null
	this.elevatorsObjLayerData = null
	this.bouncerGuardsObjLayerData = null
	this.crocosObjLayerData = null
	this.miniRobotsObjLayerData = null
	this.shootableBricksObjLayerData = null
	this.spikesObjLayerData = null
	this.dangleTilesLayerData = null
	this.multiHandLayerData = null
	this.giantRobosLayerData = null
	this.keysAndGatesObjLayerData = null
	this.placeTranslatorObjLayerData = null
	this.observerCamsObjLayerData = null
	this.fireWheelRobotsObjLayerData = null
	this.flyRobotsObjLayerData = null
	this.deuteriumSpheresObjLayerData = null
	this.killerRabbitObjLayerData = null
	this.helicoptersObjLayerData = null
	this.flameRunnersObjLayerData = null
	this.minesObjLayerData = null
	this.wheelCanonsObjLayerData = null
	this.dynamiteObjLayerData = null
	this.glowThrowerObjLayerData = null
	this.needleTilesObjLayerData = null
	this.washerBossObjLayerData = null
	this.decoObjLayerData = null
	this.levelGatesObjLayerData = null

	// scene objects
	this.heroGun = null
	this.hero = null
	this.crocosGroup = null
	this.elevators = null
	this.shootableBricksGroup = null
	this.mutliHandAcess = null
	this.enemyBullets = null
	this.giantRobots = null
	this.keysNGatesGroup = null
	this.placeTranslator = []
	this.fireWheelRobots = null
	this.flyRobots = null
	this.deuteriumSpheres = null
	this.killerRabbits = null
	this.helicopters = null
	this.flameRunners = null
	this.mines = null
	this.wheelCanons = null
	this.dynamiteBoxes = null
	this.glowThrowers  = []
	this.needleTiles = null
	this.washerBosses = []
	this.levelGates = null
}

Level0Scene.prototype = Object.create(Phaser.Scene.prototype)
Level0Scene.prototype.constructor = Level0Scene

Level0Scene.prototype.preload = function () {
	// all preloads are done in the intro scene
}

Level0Scene.prototype.init = function (data) {
	this.heroData = data
	this.scene.manager.stop(this.heroData.levelData.lastScene)
}

Level0Scene.prototype.create = function() {
	this.createWorld(this.heroData.levelData)
	// // background
	// this.stuttgart = this.add.sprite(-50, 0, 'stuttgart')
	// this.stuttgart.setOrigin(0)
	// this.stuttgart.setDepth(-100)
	// this.stuttgart.setScrollFactor(0.15, 0.1)
	// hud
	this.headUpDsp = this.add.sprite(-10, -10, 'headUpDsp')
	this.headUpDsp.setOrigin(0)
	this.headUpDsp.setDepth(100)
	this.headUpDsp.setScrollFactor(0,0)

	// controls
	this.gameControls = new Controls(this)
	this.gameControls.setup()

	// create the hero and gun instances
	this.heroGun = new HeroGun(this, this.solidLayer)
	this.hero = new Hero(this, this.heroObjLayerData[0].x, this.heroObjLayerData[0].y, this.solidLayer, this.gameControls, this.heroGun)

	// define the data for changing the scene to the next level
	this.hero.nextLevelData = {
		key: 'LevelControlScene',
		mapData: 'maplevelCtrl',
		numOfTiles: 64 * 32,
		lastScene: 'Level0Scene'
	} 
	
	// place translator machine
	if (this.placeTranslatorObjLayerData !== null) {
		this.placeTranslatorObjLayerData.forEach(pTData => {
			this.placeTranslator.push(new PlaceTranslatorMachine(this, this.hero, pTData))
		})
	}

	// dangle tiles
	if (this.dangleTilesLayerData !== null) {
		this.dangleTiles = new DangleTiles(this, this.hero, this.dangleTilesLayerData)
	}
	// multihand
	if (this.multiHandLayerData !== null) {
		this.mutliHandAcess = new MultiHandPlateAndTiles(this, this.hero, this.multiHandLayerData)
	}
	// key and gates
	this.keysNGatesGroup = new KeysNGates(this, this.hero, this.keysAndGatesObjLayerData)

	// enemy bullets
	this.enemyBullets = new EnemyBullets(this, this.hero, this.solidLayer)

	// gifts
	if (this.giftsObjLayerData !== null) {
		this.giftsGroup = new Gifts(this, this.hero, this.giftsObjLayerData, this.solidLayer)
	}
	// spikes
	this.spikesGroup = new Spikes(this, this.hero, this.spikesObjLayerData)

	// shootable bricks
	this.shootableBricksGroup = new ShootableBricks(this, this.hero, this.shootableBricksObjLayerData)

	// observer cams
	this.observerCamsGroup = new ObserverCams(this, this.hero, this.observerCamsObjLayerData)
	this.observerCamsGroup.children.iterate(cam => {
		cam.registerAsShootable()
	})
	
	// // deuterium spheres
	// if (this.deuteriumSpheresObjLayerData !== null) {
		// this.deuteriumSpheres = new DeuteriumSperes(this, this.hero, this.deuteriumSpheresObjLayerData)
	// }
	
	// crocos
	if (this.crocosObjLayerData !== null) {
		this.crocosGroup = new Crocos(this, this.hero, this.crocosObjLayerData, this.solidLayer)
		this.crocosGroup.children.iterate((croco) => {
			croco.registerAsPainful()
			croco.registerAsShootable()
		})
	}
	// mini robots
	this.miniRobotsGroup = new Minirobots(this, this.hero, this.miniRobotsObjLayerData, this.solidLayer)
	this.miniRobotsGroup.children.iterate((miniRobo) => {
		miniRobo.registerAsPainful()
		miniRobo.registerAsShootable()
	})
	// giant roboty
	this.giantRobots = new Giantrobots(this, this.hero, this.giantRobosLayerData, this.solidLayer, this.enemyBullets)
	this.giantRobots.children.iterate(giantRobo => {
		giantRobo.registerAsPainful()
		giantRobo.registerAsShootable()
	})
	// fire wheel robots
	if (this.fireWheelRobotsObjLayerData !== null) {
		this.fireWheelRobots = new FireWheelRobots(this, this.hero, this.fireWheelRobotsObjLayerData, this.solidLayer)
		this.fireWheelRobots.children.iterate(fireWheelRobo => {
			fireWheelRobo.registerAsPainful()
			fireWheelRobo.registerAsShootable()
		})
	}
	// fly robots
	if (this.flyRobotsObjLayerData !== null) {
		this.flyRobots = new FlyRobots(this, this.hero, this.flyRobotsObjLayerData, this.solidLayer, this.enemyBullets)
		this.flyRobots.children.iterate(flyRobot=> {
			flyRobot.registerAsPainful()
			flyRobot.registerAsShootable()
		})
	}
	// killer rabbits
	if (this.killerRabbitObjLayerData !== null) {
		this.killerRabbits = new KillerRabbits(this, this.hero, this.killerRabbitObjLayerData, this.solidLayer)
		this.killerRabbits.children.iterate(killerRabbit => {
			killerRabbit.registerAsPainful()
			killerRabbit.registerAsShootable()
		})
	}
	// helicopters
	if (this.helicoptersObjLayerData !== null) {
		this.helicopters = new Helicopters(this, this.hero, this.helicoptersObjLayerData, this.solidLayer)
		this.helicopters.children.iterate(heli => {
			heli.registerAsPainful()
			heli.registerAsShootable()
		})
	}
	// flame runners
	if (this.flameRunnersObjLayerData !== null) {
		this.flameRunners = new FlameRunners(this, this.hero, this.flameRunnersObjLayerData, this.solidLayer)
		this.flameRunners.children.iterate(flamerunner => {
			flamerunner.registerAsPainful()
		})
	}
	// mines
	this.mines = new Mines(this, this.hero, this.minesObjLayerData, this.solidLayer)
	this.mines.children.iterate(mine => {
		mine.registerAsPainful()
		mine.registerAsShootable()
	})
	// wheel canons
	this.wheelCanons = new WheelCanons(this, this.hero, this.wheelCanonsObjLayerData, this.solidLayer, this.enemyBullets)
	this.wheelCanons.children.iterate(wc => {
		wc.registerAsPainful()
		wc.registerAsShootable()
	})
	// dynamite
	this.dynamiteBoxes = new DynamiteBoxes(this, this.hero, this.dynamiteObjLayerData, this.solidLayer)
	this.dynamiteBoxes.children.iterate(dynamite => {
		dynamite.registerAsPainful()
		dynamite.registerAsShootable()
	})
	// glow throwers
	this.glowThrowerObjLayerData.forEach(glowThrowerData => {
		this.glowThrowers.push(new GlowThrower(this, this.hero, glowThrowerData))
	})
	this.glowThrowers.forEach(glowThrower => {
		glowThrower.children.iterate(segment => {
			segment.registerAsPainful()
		})
	})
	// needle tiles
	if (this.needleTilesObjLayerData !== null) {
		this.needleTiles = new NeedleTiles(this, this.hero, this.needleTilesObjLayerData)
	}
	// washer boss
	this.washerBossObjLayerData.forEach(washerBossData => {
		this.washerBosses.push(new WasherBoss(this, this.hero, washerBossData))
	})
	this.washerBosses.forEach(washerBoss => {
		washerBoss.children.iterate(washerBossSegment => {
			washerBossSegment.registerAsPainful()
			washerBossSegment.registerAsShootable()
		})
	})
	// decoration
	this.decoTiles = new AnimatedDeco(this, this.decoObjLayerData)

	// bouncer
	if (this.bouncerGuardsObjLayerData !== null) {
		this.bouncerGuards = new BouncerGuards(this, this.bouncerGuardsObjLayerData, [
			this.crocosGroup,
			this.miniRobotsGroup
			// this.fireWheelRobots,
			// this.flyRobots,
			// this.killerRabbits,
			// this.flameRunners,
			// this.wheelCanons
		]/*collider groups(mini robots, crocos, ...)*/)
	}
	// elevators
	this.elevators = []
	this.elevatorsObjLayerData.forEach((elevatorData) => {
		this.elevators.push(new Elevator(this, elevatorData, this.hero))
	})

	// level gates
	this.levelGates = new LevelGates(this, this.hero, this.levelGatesObjLayerData)

	// camera
	this.cameras.main.startFollow(this.hero)
}

Level0Scene.prototype.update = function (time, delta) {
	// if (this.stopScene) {
	// 	console.log('sceneStopped')
	// }
}

Level0Scene.prototype.createWorld = function(worldData) {	
	// map
	this.worldMap = this.make.tilemap({ key: worldData.mapData })
	this.tileset = this.worldMap.addTilesetImage("TilesNoTileBleeding", "TilesNoTileBleeding")
	this.decorationLayer = this.worldMap.createStaticLayer("Decoration", this.tileset)
	this.solidLayer = this.worldMap.createStaticLayer("Solid", this.tileset) //, 0, 0)
	this.solidLayer.setCollisionBetween(0, worldData.numOfTiles)

	// hero
	this.heroObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Hero")].objects

	// place translator machine
	if (this.worldMap.objects.findIndex(x => x.name === "PlaceTranslatorMachines") !== -1) {
		this.placeTranslatorObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "PlaceTranslatorMachines")].objects
	}
	// dangle tiles
	if (this.worldMap.objects.findIndex(x => x.name === "DangleTiles") !== -1) {
		this.dangleTilesLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "DangleTiles")].objects
	}
	// multi hand
	if (this.worldMap.objects.findIndex(x => x.name === "MultiHandAccess") !== -1) {
		this.multiHandLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "MultiHandAccess")].objects
	}
	// spikes
	this.spikesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Spikes")].objects

	// observer cams
	this.observerCamsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "ObserverCams")].objects

	// keys and gates
	this.keysAndGatesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "KeysAndGates")].objects

	// shootable bricks layer
	this.shootableBricksObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "ShootableBricks")].objects

	// gifts
	if (this.worldMap.objects.findIndex(x => x.name === "Gifts") !== -1) {
		this.giftsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Gifts")].objects
	}
	// elevators
	this.elevatorsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Elevators")].objects

	// bouncer guards
	if (this.worldMap.objects.findIndex(x => x.name === "Guards") !== -1) {
		this.bouncerGuardsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Guards")].objects
	}
	// crocos
	if (this.worldMap.objects.findIndex(x => x.name === "Crocos") !== -1) {
		this.crocosObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Crocos")].objects
	}
	// mini robots
	this.miniRobotsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Minirobots")].objects
	// giant robos
	this.giantRobosLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Giantrobots")].objects
	// fire wheel robots
	if (this.worldMap.objects.findIndex(x => x.name === "FireWheelRobots") !== -1) {
		this.fireWheelRobotsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "FireWheelRobots")].objects
	}
	// fly robots
	if (this.worldMap.objects.findIndex(x => x.name === "FlyRobots") !== -1) {
		this.flyRobotsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "FlyRobots")].objects
	}
	// deuterium spheres
	if (this.worldMap.objects.findIndex(x => x.name === "DeuteriumSpheres") !== -1) {
		this.deuteriumSpheresObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "DeuteriumSpheres")].objects
	}
	// killer rabbits
	if (this.worldMap.objects.findIndex(x => x.name === "KillerRabbits") !== -1) {
		this.killerRabbitObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "KillerRabbits")].objects
	}
	// helicopters
	if (this.worldMap.objects.findIndex(x => x.name === "Helicopters") !== -1) {
		this.helicoptersObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Helicopters")].objects
	}
	// flame runners
	if (this.worldMap.objects.findIndex(x => x.name === "FlameRunners") !== -1) {
		this.flameRunnersObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "FlameRunners")].objects
	}
	// mines
	this.minesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Mines")].objects
	// wheel canons
	this.wheelCanonsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "WheelCanons")].objects
	// dynamite
	this.dynamiteObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Dynamite")].objects
	// glow throwers
	this.glowThrowerObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "GlowThrowers")].objects

	// needle tiles
	if (this.worldMap.objects.findIndex(x => x.name === "NeedleTiles") !== -1) {
		this.needleTilesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "NeedleTiles")].objects
	}
	// washerboss
	this.washerBossObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "WasherBosses")].objects
	// deco
	this.decoObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "AnimatedDecorations")].objects
	// level gates
	this.levelGatesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "LevelGates")].objects
}

Level0Scene.prototype.initControls = function() {	
	// constrols
	this.heroControls.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
	this.heroControls.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
	this.heroControls.key_JUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
	this.heroControls.key_FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)
	this.heroControls.key_USE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
}