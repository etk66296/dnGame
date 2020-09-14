function Level0Scene() {
	Phaser.Scene.call(this, 'Level0Scene')
	this.worldMap = null
	this.tileset = null

	// controls
	this.gameControls = null
	
	// world layers
	this.solidLayer = null
	this.decorationLayer = null
	this.giftsObjLayerData = null
	this.elevatorsObjLayerData = null
	this.bouncerGuardsObjLayerData = null
	this.crocosObjLayerData = null
	this.miniRobotsObjLayerData = null
	this.shootableBricksObjLayerData = null
	this.spikesObjLayerData = null

	// scene objects
	this.heroGun = null
	this.hero = null
	this.crocosGroup = null
	this.elevators = null
	this.shootableBricksGroup = null
}

Level0Scene.prototype = Object.create(Phaser.Scene.prototype)
Level0Scene.prototype.constructor = Level0Scene

Level0Scene.prototype.preload = function () {
	// all preloads are done in the intro scene
}

Level0Scene.prototype.init = function () {
	this.initWorld()
}

Level0Scene.prototype.create = function() {
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
	this.hero = new Hero(this, 860, 1150, this.solidLayer, this.gameControls, this.heroGun)

	// gifts
	this.giftsGroup = new Gifts(this, this.hero, this.giftsObjLayerData, this.solidLayer)

	// spikes
	this.spikesGroup = new Spikes(this, this.hero, this.spikesObjLayerData)

	// shootable bricks
	this.shootableBricksGroup = new ShootableBricks(this, this.hero, this.shootableBricksObjLayerData)

	// crocos
	this.crocosGroup = new Crocos(this, this.hero, this.crocosObjLayerData, this.solidLayer)
	this.crocosGroup.children.iterate((croco) => {
		croco.registerAsPainful()
		croco.registerAsShootable()
	})
	// mini robots
	this.miniRobotsGroup = new Minirobots(this, this.hero, this.miniRobotsObjLayerData, this.solidLayer)
	this.miniRobotsGroup.children.iterate((miniRobo) => {
		miniRobo.registerAsPainful()
		miniRobo.registerAsShootable()
	})

	// bouncer
	this.bouncerGuards = new BouncerGuards(this, this.bouncerGuardsObjLayerData, [
		this.crocosGroup,
		this.miniRobotsGroup
	]/*collider groups(mini robots, crocos, ...)*/)

	// elevators
	this.elevators = []
	this.elevatorsObjLayerData.forEach((elevatorData) => {
		this.elevators.push(new Elevator(this, elevatorData, this.hero))
	})

	// camera
	this.cameras.main.startFollow(this.hero)
}

Level0Scene.prototype.update = function (time, delta) {
}

Level0Scene.prototype.initWorld = function() {	
	// map
	this.worldMap = this.make.tilemap({ key: "level0map" })
	this.tileset = this.worldMap.addTilesetImage("TilesNoTileBleeding", "TilesNoTileBleeding")
	this.solidLayer = this.worldMap.createStaticLayer("Solid", this.tileset) //, 0, 0)
	this.solidLayer.setCollisionBetween(0, 11519)
	this.decorationLayer = this.worldMap.createStaticLayer("Decoration", this.tileset)
	// spikes
	this.spikesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Spikes")].objects


	// shootable bricks layer
	this.shootableBricksObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "ShootableBricks")].objects

	// gifts
	this.giftsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Gifts")].objects
	
	// elevators
	this.elevatorsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Elevators")].objects

	// bouncer guards
	this.bouncerGuardsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Guards")].objects
	// crocos
	this.crocosObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Crocos")].objects
	// mini robots
	this.miniRobotsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Minirobots")].objects
}

Level0Scene.prototype.initControls = function() {	
	// constrols
	this.heroControls.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
	this.heroControls.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
	this.heroControls.key_JUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
	this.heroControls.key_FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)
	this.heroControls.key_USE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
}