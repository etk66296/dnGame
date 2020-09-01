function Level0Scene() {
	Phaser.Scene.call(this, 'Level0Scene')
	this.worldMap = null
	this.tileset = null

	// controls
	this.gameControls = null
	
	// world layers
	this.solidLayer = null
	this.bouncerGuardsObjLayerData = null
	this.crocosObjLayerData = null

	// scene objects
	this.heroGun = null
	this.hero = null
	this.crocosGroup = null
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

	// moveable objects
	// hero gun
	this.heroGun = new HeroGun(this, this.solidLayer)
	this.heroGun.children.iterate((bullet) => {
		bullet.setup()
	})
	this.hero = new Hero(this, 30, 20, this.solidLayer, this.gameControls, this.heroGun)
	this.hero.setup()
	// crocos
	this.crocosGroup = new Crocos(this, this.crocosObjLayerData, this.solidLayer)
	this.crocosGroup.children.iterate((croco) => {
		croco.setup()
		croco.registerAsPainful(this.hero)
		croco.registerAsShootable(this.hero)
	})

	// bouncer
	this.bouncerGuards = new BouncerGuards(this, this.bouncerGuardsObjLayerData, [this.crocosGroup]/*collider groups(mini robots, crocos, ...)*/)

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

	// bouncer guards
	this.bouncerGuardsObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Guards")].objects
	// crocos
	this.crocosObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Crocos")].objects
}

Level0Scene.prototype.initControls = function() {	
	// constrols
	this.heroControls.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
	this.heroControls.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
	this.heroControls.key_JUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
	this.heroControls.key_FIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)
	this.heroControls.key_USE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
}