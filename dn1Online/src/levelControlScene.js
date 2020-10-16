function LevelControlScene() {
	Phaser.Scene.call(this, 'LevelControlScene')
	this.heroData = null

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
	// safe the hero data to cookies, thus the user is able to restore the current level
	document.cookie = "dn1SaveGameData=" + JSON.stringify(data) + "; samesite=strict"
	if (data.levelData.lastScene !== 'INTRO') {
		this.scene.manager.stop(data.levelData.lastScene)
		// this.scene.manager.remove(data.levelData.lastScene)
	}
	this.heroData = data
	// this.scene.remove('Level0Scene')
}

LevelControlScene.prototype.preload = function () {
	this.heroData.currentLevelId += 1
	this.levelData = this.preloadWorldData(this.heroData.currentLevelId) // load the next level json data
}

LevelControlScene.prototype.create = function() {
	// create the nex world
	this.createWorld(this.levelData)
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
	this.hero.currentLevelId = this.heroData.currentLevelId
	this.hero.nextLevelData = {
		key: this.levelData.key,
		mapData: this.levelData.mapData,
		numOfTiles: this.levelData.numOfTiles,
		lastScene: this.levelData.lastScene,
		backgroundImageFilePath: this.levelData.backgroundImageFilePath,
		backgroundKey: this.levelData.backgroundKey,
	} 
	this.hero.resetEquipment()

	// level gates
	this.levelGates = new LevelGates(this, this.hero, this.levelGatesObjLayerData)
	
	// camera
	this.cameras.main.startFollow(this.hero)
}

LevelControlScene.prototype.update = function() {
}

LevelControlScene.prototype.preloadWorldData = function(levelID) {
	console.log('level id: ', levelID)
	// levelID = 4
	switch (levelID) {
		case 1: {
			this.load.tilemapTiledJSON("mapLevel1City", "assets/maps/dn1MapLevel1City.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel1City',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: 'assets/sprites/bgs/stuttgart.jpg',
				backgroundKey: 'backgroundImageStuttgart'
			} 
		}
		case 2: {
			this.load.tilemapTiledJSON("mapLevel2City", "assets/maps/dn1MapLevel2City.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel2City',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: 'assets/sprites/bgs/stuttgart.jpg',
				backgroundKey: 'backgroundImageStuttgart'
			} 
		}
		case 3: {
			this.load.tilemapTiledJSON("mapLevel3SpaceStation", "assets/maps/dn1MapLevel3SpaceStation.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel3SpaceStation',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: 'assets/sprites/bgs/moon.jpg',
				backgroundKey: 'backgroundImageMoon'
			} 
		}
		case 4: {
			this.load.tilemapTiledJSON("mapLevel4SpaceHangar", "assets/maps/dn1MapLevel4SpaceHangar.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel4SpaceHangar',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: 'assets/sprites/bgs/hangar.jpg',
				backgroundKey: 'backgroundImageHangar'
			} 
		}
		case 5: {
			this.load.tilemapTiledJSON("mapLevel5LabBuilding", "assets/maps/dn1MapLevel5LabBuilding.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel5LabBuilding',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: '',
				backgroundKey: ''
			} 
		}
		default: {
			this.worldMap = this.make.tilemap({ key: "maplevelCtrl" })
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'LevelControlScene',
				numOfTiles: 64 * 32,
				lastScene: '',
				backgroundImageFilePath: 'assets/sprites/bgs/stuttgart.jpg',
				backgroundKey: 'backgroundImageStuttgart'
			} 
		}
	}
	return null
}

LevelControlScene.prototype.createWorld = function() {	
	// map
	this.worldMap = this.make.tilemap({key: 'maplevelCtrl'})
	this.tileset = this.worldMap.addTilesetImage("TilesNoTileBleeding", "TilesNoTileBleeding")
	this.decorationLayer = this.worldMap.createStaticLayer("Decoration", this.tileset)
	this.solidLayer = this.worldMap.createStaticLayer("Solid", this.tileset)
	this.solidLayer.setCollisionBetween(0, 64 * 32)

	// hero
	this.heroObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "Hero")].objects

	// level gates
	this.levelGatesObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "LevelGates")].objects
}
