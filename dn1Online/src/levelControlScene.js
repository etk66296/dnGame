function LevelControlScene() {
	Phaser.Scene.call(this, 'LevelControlScene')
	this.heroData = null
	this.nextLevelId = -1

	// hud and controls
	this.headUpDsp = null
	this.gameControls = null

	// scne tile data
	this.worldMap = null
	this.tileset = null
	this.decorationLayer = null
	this.solidLayer = null
	this.heroObjLayerData = null
	this.levelGatesObjLayerData = null
	 
	// game objects
	this.heroGun = null
	this.hero = null
	this.levelGates = null
}

LevelControlScene.prototype = Object.create(Phaser.Scene.prototype)
LevelControlScene.prototype.constructor = LevelControlScene

LevelControlScene.prototype.init = function(data) {
	console.log(data)
	this.heroData = data
	this.scene.remove('Level0Scene')
	this.initWorld()
}

LevelControlScene.prototype.preload = function () {
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
	this.hero.addPoints(this.heroData.points)
	this.hero.hasHighJumpShoe = this.heroData.hasHighJumpShoe
	this.hero.hasDangleClaws = this.heroData.hasDangleClaws
	this.hero.hasMultiHand = this.heroData.hasMultiHand
	this.hero.numOfGunUps = this.heroData.numOfGunUps
	this.hero.resetEquipment()

	// level gates
	this.levelGates = new LevelGates(this, this.hero, this.levelGatesObjLayerData)
	
	// camera
	this.cameras.main.startFollow(this.hero)
}

LevelControlScene.prototype.create = function() {
	
}

LevelControlScene.prototype.update = function() {
}

LevelControlScene.prototype.initWorld = function() {	
	// map
	this.worldMap = this.make.tilemap({ key: "maLlevelCtrl" })
	this.tileset = this.worldMap.addTilesetImage("TilesNoTileBleeding", "TilesNoTileBleeding")
	this.decorationLayer = this.worldMap.createStaticLayer("Decoration", this.tileset)
	this.solidLayer = this.worldMap.createStaticLayer("Solid", this.tileset) //, 0, 0)
	this.solidLayer.setCollisionBetween(0, 1388)

	// hero
	this.heroObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Hero")].objects

	// level gates
	this.levelGatesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "LevelGates")].objects
}
