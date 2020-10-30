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

	this.decoObjLayerData = null

}

LevelControlScene.prototype = Object.create(Phaser.Scene.prototype)
LevelControlScene.prototype.constructor = LevelControlScene

LevelControlScene.prototype.init = function(data) {
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
	this.hero.healthBlocks.current = this.heroData.numOfHealthBlocks
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
	
	// decoration
	if (this.decoObjLayerData !== null) {
		this.decoTiles = new AnimatedDeco(this, this.decoObjLayerData)
	}

	// camera
	this.cameras.main.startFollow(this.hero)
}

LevelControlScene.prototype.update = function() {
	if (this.hero.x > 450 && this.hero.x < 455) {
		switch (this.heroData.currentLevelId) {
			case 1:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Herzlich wilkommen im Kontrollzentrum.',
						'Hier finden wir uns nach jedem abgeschlossenen',
						'Mission wieder.',
						'Durch die große Stahltür verlassen wir den',
						'Kontrollraum zu neuen Herausforderungen.',
						'',
						'Lass uns los legen bevor es dunkel wird.',
						'Auf gehts in die Stadt.'
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
			break
			case 2:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Es ist mittlerweile dunkel geworden.',
						'Unser erster Einsatz in der Stadt war sehr',
						'erfolgreich. Doktor Zements Roboter konnten',
						'weit zurück gedrängt werden.',
						'Doch leider treiben einige von ihnen noch',
						'immer ihr Unwesen.',
						'Lass uns noch einmal los ziehen und für',
						'Elektronikschrott sorgen.'
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
			break
			case 3:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Gerüchten zufolge ist Doktor Zement',
						'auf seine Mondbasis geflüchtet.',
						'Auf gehts hinterher!',
						'',
						'Sein Raumgleiterhangar ist streng gesichert.',
						'Um dort hinein zu kommen benötigen wir',
						'die Platine.'
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
			break
			case 4:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Mit seinen von künstlicher Intelligenz',
						'entwickelten Raumgleitern möchte',
						'Doktor Zement den Amazonas betonieren.',
						'',
						'Wir müssen dies unbeding verhindern.'
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
			break
			case 5:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Die Entwicklung der Raumgleiter befindet',
						'sich in einem untermondischen Laborkomplex.',
						'',
						'Mach Hackschnitzel daraus.'
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
				break
			case 6:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Neben dem Raumgleiterbau lässt',
						'Doktor Zement einen speziellen Flüssigzement',
						'🧪 herstellen.',
						'',
						'Am besten du betonierst die Raffinerie',
						'mit ihrem eigenen Erzeugnis.'
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
				break
			case 7:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Die Hydraulikflüssigkeit der 4.0 Roboter',
						'besteht aus synthetischem Traubensaft.',
						'',
						'',
						'Es brächte uns strategische Vorteile',
						'die Fernleitung zu kappen.'
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
				break
			case 8:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Gerade wurde eine Nachricht von Doktor',
						'Zement abgefangen.',
						'Er ist offensichtlich zur Erde',
						'zurückgekehrt.',
						'Oh nein, seine Helfer haben begonnen die ',
						'Burg Teck einzuspinnen.',
						'Wir müssen auf schnellstem Weg dorthin.'
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
				break
			case 9:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Doktor Zement wurde im Wendlinger',
						'Frachtzentrum gesichtet.',
						'',
						'Mit dem Fahrrad entlang der Lauter schaffen',
						'wirs bis dorthin in einer halben Stunde.',
						'',
						'Ferig?',
						'Dann los!'
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
				break
			case 10:
				this.scene.manager.pause('LevelControlScene')
				this.scene.manager.start('InfoTextScene', {
					text: [
						'Wir haben Beweise dafür, dass sich Zements',
						'Hauptquartier hier in Wendlingen befindet',
						'',
						'Es wird Zeit die Sache zu beenden.',
						''
					], 
					resumeSceneKey: 'LevelControlScene',
					msgBoxPos: { x: 60, y: 50 },
					fontSize: 18,
					boxScale: 1.0
				})	
				this.hero.x += 10
				this.hero.gameControls.release()
				break
		}
	}
}

LevelControlScene.prototype.preloadWorldData = function(levelID) {
	// console.log('level id: ', levelID)
	// levelID = 10
	switch (levelID) {
		case -1: {
			this.load.tilemapTiledJSON("mapLevelTest", "assets/maps/test.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevelTest',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: 'assets/sprites/bgs/stuttgartDay.jpg',
				backgroundKey: 'backgroundImageStuttgartDay'
			} 
		}
		case 1: {
			this.load.tilemapTiledJSON("mapLevel1City", "assets/maps/dn1MapLevel1City.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel1City',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: 'assets/sprites/bgs/stuttgartDay.jpg',
				backgroundKey: 'backgroundImageStuttgartDay'
			} 
		}
		case 2: {
			this.load.tilemapTiledJSON("mapLevel2City", "assets/maps/dn1MapLevel2City.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel2City',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: 'assets/sprites/bgs/stuttgartNight.jpg',
				backgroundKey: 'backgroundImageStuttgartNight'
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
				numOfTiles: 128 * 65,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: '',
				backgroundKey: ''
			} 
		}
		case 6: {
			this.load.tilemapTiledJSON("mapLevel6FalloutShelter", "assets/maps/dn1MapLevel6FalloutShelter.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel6FalloutShelter',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: '',
				backgroundKey: ''
			} 
		}
		case 7: {
			this.load.tilemapTiledJSON("mapLevel7RedUndermost", "assets/maps/dn1MapLevel7RedUndermost.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel7RedUndermost',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: '',
				backgroundKey: ''
			} 
		}
		case 8: {
			this.load.tilemapTiledJSON("mapLevel8TeckCastle", "assets/maps/dn1MapLevel8TeckCastle.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel8TeckCastle',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: 'assets/sprites/bgs/schwaebischeAlb.jpg',
				backgroundKey: 'schwaebischeAlb'
			} 
		}
		case 9: {
			this.load.tilemapTiledJSON("mapLevel9Storehouse", "assets/maps/dn1MapLevel9Storehouse.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel9Storehouse',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: '',
				backgroundKey: ''
			} 
		}
		case 10: {
			this.load.tilemapTiledJSON("mapLevel10SecretTrainStation", "assets/maps/dn1MapLevel10SecretTrainStation.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel10SecretTrainStation',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: '',
				backgroundKey: ''
			} 
		}
		case 11: {
			this.load.tilemapTiledJSON("mapLevel11Fernsehturm", "assets/maps/dn1MapLevel11Fernsehturm.json")
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'mapLevel11Fernsehturm',
				numOfTiles: 128 * 90,
				lastScene: 'LevelControlScene',
				backgroundImageFilePath: 'assets/sprites/bgs/sky.jpg',
				backgroundKey: 'backgroundImageSky'
			} 
		}
		default: {
			this.worldMap = this.make.tilemap({ key: "maplevelCtrl" })
			return this.levelData = {
				key: 'Level0Scene',
				mapData: 'LevelControlScene',
				numOfTiles: 64 * 32,
				lastScene: '',
				backgroundImageFilePath: '',
				backgroundKey: ''
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

	// deco
	if (this.worldMap.objects.findIndex(x => x.name === "AnimatedDecorations") !== -1) {
		this.decoObjLayerData = this.worldMap.objects[this.worldMap.objects.findIndex(x => x.name === "AnimatedDecorations")].objects
	}
}
