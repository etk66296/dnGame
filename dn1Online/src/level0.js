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
	this.trapsObjLayerData = null
	this.conveyorsObjLayerData = null

	// scene objects
	this.bgImage = null
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
	this.deuteriumSpheres = []
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
	this.traps = []
	this.conveyors = []
}

Level0Scene.prototype = Object.create(Phaser.Scene.prototype)
Level0Scene.prototype.constructor = Level0Scene

Level0Scene.prototype.init = function (data) {
	this.heroData = data
	this.scene.manager.stop(this.heroData.levelData.lastScene)
}

Level0Scene.prototype.preload = function () {
	// all preloads are done in the intro scene
	console.log(this.heroData.levelData.backgroundKey, this.heroData.levelData.backgroundImageFilePath)
	if (this.heroData.levelData.backgroundImageFilePath !== '') {
		this.load.image(this.heroData.levelData.backgroundKey, this.heroData.levelData.backgroundImageFilePath)
	}
}

Level0Scene.prototype.create = function() {
	// reset every game object and pass it to the garbage collection
	this.add.displayList.removeAll()
	
	// // background
	if (this.bgImage !== null) {
		this.bgImage.destroy()
	}
	if (this.heroData.levelData.backgroundKey !== '') {
		this.bgImage = this.add.sprite(-50, 0, this.heroData.levelData.backgroundKey)
		this.bgImage.setOrigin(0)
		this.bgImage.setDepth(-100)
		this.bgImage.setScrollFactor(0.15, 0.1)
	}

	// level tiles
	this.createWorld(this.heroData.levelData)
	// decoration
	if (this.decoObjLayerData !== null) {
		this.decoTiles = new AnimatedDeco(this, this.decoObjLayerData)
	}
	
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
	this.hero.currentLevelId = this.heroData.currentLevelId

	// define the data for changing the scene to the next level control scene
	this.hero.nextLevelData = {
		key: 'LevelControlScene',
		mapData: 'maplevelCtrl',
		numOfTiles: 64 * 32,
		lastScene: 'Level0Scene',
		backgroundImageFilePath: '',
		backgroundKey: ''
	}

	// set the heros eqipment, points and health
	this.hero.addPoints(this.heroData.points)
	this.hero.hasHighJumpShoe = this.heroData.hasHighJumpShoe
	this.hero.hasDangleClaws = this.heroData.hasDangleClaws
	this.hero.hasMultiHand = this.heroData.hasMultiHand
	this.hero.numOfGunUps = this.heroData.numOfGunUps
	this.hero.currentLevelId = this.heroData.currentLevelId
	this.hero.healthBlocks.current = this.heroData.numOfHealthBlocks
	this.hero.resetEquipment()
	this.hero.updateHealthBlock()
	
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
	if (this.keysAndGatesObjLayerData !== null) {
		this.keysNGatesGroup = new KeysNGates(this, this.hero, this.keysAndGatesObjLayerData)
	}

	// enemy bullets
	if (this.solidLayer !== null) {
		this.enemyBullets = new EnemyBullets(this, this.hero, this.solidLayer)
	}

	// gifts
	if (this.giftsObjLayerData !== null) {
		this.giftsGroup = new Gifts(this, this.hero, this.giftsObjLayerData, this.solidLayer)
	}

	// shootable bricks
	if (this.shootableBricksObjLayerData !== null) {
		this.shootableBricksGroup = new ShootableBricks(this, this.hero, this.shootableBricksObjLayerData, this.giftsGroup)
		this.enemyBullets.registerBulletBlockers(this.shootableBricksGroup)
	}

	// spikes
	if (this.spikesObjLayerData !== null) {
		this.spikesGroup = new Spikes(this, this.hero, this.spikesObjLayerData)
	}

	// observer cams
	if (this.observerCamsObjLayerData !== null) {
		this.observerCamsGroup = new ObserverCams(this, this.hero, this.observerCamsObjLayerData)
		this.observerCamsGroup.children.iterate(cam => {
			cam.registerAsShootable()
		})
	}
	
	// // deuterium spheres
	if (this.deuteriumSpheresObjLayerData !== null) {
		this.deuteriumSpheresObjLayerData.forEach(deuteriumSphereData => {
			this.deuteriumSpheres.push(new DeuteriumSperes(this, this.hero, deuteriumSphereData))
		})
		this.deuteriumSpheres.forEach(dtSphere => {
			dtSphere.children.iterate((dtElem) => {
				dtElem.registerAsPainful()
				dtElem.registerAsShootable()
			})
		})
	}
	
	// crocos
	if (this.crocosObjLayerData !== null) {
		this.crocosGroup = new Crocos(this, this.hero, this.crocosObjLayerData, this.solidLayer)
		this.crocosGroup.children.iterate((croco) => {
			croco.registerAsPainful()
			croco.registerAsShootable()
		})
	}

	// mini robots
	if (this.miniRobotsObjLayerData !== null && this.solidLayer !== null) {
		this.miniRobotsGroup = new Minirobots(this, this.hero, this.miniRobotsObjLayerData, this.solidLayer)
		this.miniRobotsGroup.children.iterate((miniRobo) => {
			miniRobo.registerAsPainful()
			miniRobo.registerAsShootable()
		})
	}

	// giant robot
	if (this.giantRobosLayerData !== null && this.solidLayer !== null) {
		this.giantRobots = new Giantrobots(this, this.hero, this.giantRobosLayerData, this.solidLayer, this.enemyBullets)
		this.giantRobots.children.iterate(giantRobo => {
			giantRobo.registerAsPainful()
			giantRobo.registerAsShootable()
		})
	}

	// fire wheel robots
	if (this.fireWheelRobotsObjLayerData !== null && this.solidLayer !== null) {
		this.fireWheelRobots = new FireWheelRobots(this, this.hero, this.fireWheelRobotsObjLayerData, this.solidLayer)
		this.fireWheelRobots.children.iterate(fireWheelRobo => {
			fireWheelRobo.registerAsPainful()
			fireWheelRobo.registerAsShootable()
		})
	}

	// fly robots
	if (this.flyRobotsObjLayerData !== null && this.solidLayer !== null) {
		this.flyRobots = new FlyRobots(this, this.hero, this.flyRobotsObjLayerData, this.solidLayer, this.enemyBullets)
		this.flyRobots.children.iterate(flyRobot=> {
			flyRobot.registerAsPainful()
			flyRobot.registerAsShootable()
		})
	}
	// killer rabbits
	if (this.killerRabbitObjLayerData !== null && this.solidLayer !== null) {
		this.killerRabbits = new KillerRabbits(this, this.hero, this.killerRabbitObjLayerData, this.solidLayer)
		this.killerRabbits.children.iterate(killerRabbit => {
			killerRabbit.registerAsPainful()
			killerRabbit.registerAsShootable()
		})
	}

	// helicopters
	if (this.helicoptersObjLayerData !== null && this.solidLayer !== null) {
		this.helicopters = new Helicopters(this, this.hero, this.helicoptersObjLayerData, this.solidLayer)
		this.helicopters.children.iterate(heli => {
			heli.registerAsPainful()
			heli.registerAsShootable()
		})
	}

	// flame runners
	if (this.flameRunnersObjLayerData !== null && this.solidLayer !== null) {
		this.flameRunners = new FlameRunners(this, this.hero, this.flameRunnersObjLayerData, this.solidLayer)
		this.flameRunners.children.iterate(flamerunner => {
			flamerunner.registerAsPainful()
		})
	}

	// mines
	if (this.minesObjLayerData !== null && this.solidLayer !== null) {
		this.mines = new Mines(this, this.hero, this.minesObjLayerData, this.solidLayer)
		this.mines.children.iterate(mine => {
			mine.registerAsPainful()
			mine.registerAsShootable()
		})
	}

	// wheel canons
	if (this.wheelCanonsObjLayerData !== null && this.solidLayer !== null) {
		this.wheelCanons = new WheelCanons(this, this.hero, this.wheelCanonsObjLayerData, this.solidLayer, this.enemyBullets)
		this.wheelCanons.children.iterate(wc => {
			wc.registerAsPainful()
			wc.registerAsShootable()
		})
	}

	// dynamite
	if (this.dynamiteObjLayerData !== null && this.solidLayer !== null) {
		this.dynamiteBoxes = new DynamiteBoxes(this, this.hero, this.dynamiteObjLayerData, this.solidLayer)
		this.dynamiteBoxes.children.iterate(dynamite => {
			dynamite.registerAsPainful()
			dynamite.registerAsShootable()
		})
	}

	// glow throwers
	if (this.glowThrowerObjLayerData !== null) {
		this.glowThrowerObjLayerData.forEach(glowThrowerData => {
			this.glowThrowers.push(new GlowThrower(this, this.hero, glowThrowerData))
		})
		this.glowThrowers.forEach(glowThrower => {
			glowThrower.children.iterate(segment => {
				segment.registerAsPainful()
			})
		})
	}

	// needle tiles
	if (this.needleTilesObjLayerData !== null) {
		this.needleTiles = new NeedleTiles(this, this.hero, this.needleTilesObjLayerData)
	}

	// washer boss
	if (this.washerBossObjLayerData !== null) {
		this.washerBossObjLayerData.forEach(washerBossData => {
			this.washerBosses.push(new WasherBoss(this, this.hero, washerBossData))
		})
		this.washerBosses.forEach(washerBoss => {
			washerBoss.children.iterate(washerBossSegment => {
				washerBossSegment.registerAsPainful()
				washerBossSegment.registerAsShootable()
			})
		})
	}


	// bouncer
	if (this.bouncerGuardsObjLayerData !== null) {
		this.bouncerGuards = new BouncerGuards(this, this.bouncerGuardsObjLayerData, [
			this.crocosGroup,
			this.miniRobotsGroup,
			this.giantRobots,
			this.fireWheelRobots,
			this.flyRobots,
			this.killerRabbits,
			this.flameRunners,
			this.wheelCanons
		]/*collider groups(mini robots, crocos, ...)*/)
	}

	// traps
	if (this.trapsObjLayerData !== null) {
		this.trapsObjLayerData.forEach(trapData => {
			this.traps.push(new Trap(this, this.hero, trapData, this.bouncerGuards))
		})
	}

	// elevators
	if (this.elevatorsObjLayerData !== null) {
		this.elevators = []
		this.elevatorsObjLayerData.forEach((elevatorData) => {
			this.elevators.push(new Elevator(this, elevatorData, this.hero))
		})
	}

	// level gates
	if (this.levelGatesObjLayerData !== null) {
		this.levelGates = new LevelGates(this, this.hero, this.levelGatesObjLayerData)
	}

	// level gates
	if (this.conveyorsObjLayerData !== null) {
		this.conveyors = new Conveyors(this, this.hero, this.conveyorsObjLayerData)
	}

	// camera
	this.cameras.main.startFollow(this.hero)
}

Level0Scene.prototype.update = function (time, delta) {
	// if (this.stopScene) {
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
	if (this.worldMap.objects.findIndex(x => x.name === "Hero") !== -1) {
		this.heroObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Hero")].objects
	}

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
	if (this.worldMap.objects.findIndex(x => x.name === "Spikes") !== -1) {
		this.spikesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Spikes")].objects
	}

	// observer cams
	if (this.worldMap.objects.findIndex(x => x.name === "ObserverCams") !== -1) {
		this.observerCamsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "ObserverCams")].objects
	}

	// keys and gates
	if (this.worldMap.objects.findIndex(x => x.name === "KeysAndGates") !== -1) {
		this.keysAndGatesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "KeysAndGates")].objects
	}

	// shootable bricks layer
	if (this.worldMap.objects.findIndex(x => x.name === "ShootableBricks") !== -1) {
		this.shootableBricksObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "ShootableBricks")].objects
	}

	// gifts
	if (this.worldMap.objects.findIndex(x => x.name === "Gifts") !== -1) {
		this.giftsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Gifts")].objects
	}

	// elevators
	if (this.worldMap.objects.findIndex(x => x.name === "Elevators") !== -1) {
		this.elevatorsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Elevators")].objects
	}

	// bouncer guards
	if (this.worldMap.objects.findIndex(x => x.name === "Guards") !== -1) {
		this.bouncerGuardsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Guards")].objects
	}
	// crocos
	if (this.worldMap.objects.findIndex(x => x.name === "Crocos") !== -1) {
		this.crocosObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Crocos")].objects
	}
	// mini robots
	if (this.worldMap.objects.findIndex(x => x.name === "Minirobots") !== -1) {
		this.miniRobotsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Minirobots")].objects
	}
	
	// giant robos
	if (this.worldMap.objects.findIndex(x => x.name === "Giantrobots") !== -1) {
		this.giantRobosLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Giantrobots")].objects
	}
	
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
	if (this.worldMap.objects.findIndex(x => x.name === "Mines") !== -1) {
		this.minesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Mines")].objects
	}

	// wheel canons
	if (this.worldMap.objects.findIndex(x => x.name === "WheelCanons") !== -1) {
		this.wheelCanonsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "WheelCanons")].objects
	}

	// dynamite
	if (this.worldMap.objects.findIndex(x => x.name === "Dynamite") !== -1) {
		this.dynamiteObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Dynamite")].objects
	}

	// glow throwers
	if (this.worldMap.objects.findIndex(x => x.name === "GlowThrowers") !== -1) {
		this.glowThrowerObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "GlowThrowers")].objects
	}

	// needle tiles
	if (this.worldMap.objects.findIndex(x => x.name === "NeedleTiles") !== -1) {
		this.needleTilesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "NeedleTiles")].objects
	}
	// washerboss
	if (this.worldMap.objects.findIndex(x => x.name === "WasherBosses") !== -1) {
		this.washerBossObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "WasherBosses")].objects
	}

	// deco
	if (this.worldMap.objects.findIndex(x => x.name === "AnimatedDecorations") !== -1) {
		this.decoObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "AnimatedDecorations")].objects
	}

	// level gates
	if (this.worldMap.objects.findIndex(x => x.name === "LevelGates") !== -1) {
		this.levelGatesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "LevelGates")].objects
	}

	// traps
	if (this.worldMap.objects.findIndex(x => x.name === "Traps") !== -1) {
		this.trapsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Traps")].objects
	}

	// Conveyors
	if (this.worldMap.objects.findIndex(x => x.name === "Conveyors") !== -1) {
		this.conveyorsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Conveyors")].objects
	}
}

Level0Scene.prototype.initControls = function() {	
	// constrols
	this.heroControls.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
	this.heroControls.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
	this.heroControls.key_JUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
	this.heroControls.key_FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)
	this.heroControls.key_USE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
}