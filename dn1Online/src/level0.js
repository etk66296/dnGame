function Level0Scene() {
	Phaser.Scene.call(this, 'Level0Scene')
	this.worldMap = null
	
	// world layers
	this.solidLayer = null

	// scene objects
	this.hero = null
}

Level0Scene.prototype = Object.create(Phaser.Scene.prototype)
Level0Scene.prototype.constructor = Level0Scene

Level0Scene.prototype.preload = function () {
	// all preloads are done in the intro scene
}

Level0Scene.prototype.create = function() {
	this.initMapData()
	// moveable objects
	this.hero = new Hero(this, 30, 20, this.solidLayer)
	this.hero.setup()

	// camera
	this.cameras.main.startFollow(this.hero)
}

Level0Scene.prototype.update = function (time, delta) {
}

Level0Scene.prototype.initMapData = function() {	
	// map
	this.worldMap = this.make.tilemap({ key: "level0map" })
	const tileset = this.worldMap.addTilesetImage("TilesNoTileBleeding", "TilesNoTileBleeding")
	this.solidLayer = this.worldMap.createStaticLayer("Solid", tileset) //, 0, 0)
	this.solidLayer.setCollisionBetween(0, 11519)
}
