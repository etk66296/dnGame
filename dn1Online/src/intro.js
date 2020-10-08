function IntroScene() {
	Phaser.Scene.call(this, 'IntroScene')
	this.introDelay = 2000
	this.elapsedIntroTime = 0
}

IntroScene.prototype = Object.create(Phaser.Scene.prototype)
IntroScene.prototype.constructor = IntroScene


IntroScene.prototype.preload = function () {
	this.load.image('introScreen', 'assets/introScreen.png')
	this.load.image('logoScreen', 'assets/myLogo.png')
	this.load.image('TilesNoTileBleeding', 'assets/sprites/TilesNoTileBleeding.png')
	this.load.image('headUpDsp', 'assets/headUpDsp.png')
	this.load.image('bgSunrise', 'assets/sprites/bgs/sunrise.png')
	this.load.image('skyline2', 'assets/sprites/bgs/skyline2.png')
	this.load.image('skyline1', 'assets/sprites/bgs/skyline1.png')
	this.load.image('stuttgart', 'assets/sprites/bgs/stuttgart.jpg')

	this.load.image('textbox', 'assets/sprites/bgs/textbox.png')
	
	// CONTROL BUTTONS
	this.load.atlas('controlButtonsAtlas', 'assets/buttons/buttons.png', 'assets/buttons/buttons.json')


	// MAPS
	this.load.tilemapTiledJSON("maplevelCtrl", "assets/maps/dn1MapLevelCtrl.json")
	// this.load.tilemapTiledJSON("level0map", "assets/maps/dn1MapTutorial.json")
	// this.load.tilemapTiledJSON("level1map", "assets/maps/dn1MapLevel1.json")

	// SPRITESHEETS
	this.load.atlas('heroSpriteAtlas', 'assets/sprites/Hero.png', 'assets/sprites/Hero.json')
	this.load.atlas('enemiesSpriteAtlas', 'assets/sprites/Enemies.png', 'assets/sprites/Enemies.json')
	this.load.atlas('giftsSpriteAtlas', 'assets/sprites/Gifts.png', 'assets/sprites/Gifts.json')
	this.load.atlas('decorationSpriteAtlas', 'assets/sprites/TilesNoTileBleeding.png', 'assets/sprites/Decoration.json')

	// SOUND EFFECTS
	this.load.audio('dukeStep', [
		'assets/sounds/step.ogg',
		'assets/sounds/step.mp3'
	])
	this.load.audio('dukeJump', [
		'assets/sounds/jump.ogg',
		'assets/sounds/jump.mp3'
	])
	this.load.audio('dukeFire', [
		'assets/sounds/fire.ogg',
		'assets/sounds/fire.mp3'
	])
	this.load.audio('explosion', [
		'assets/sounds/explode.ogg',
		'assets/sounds/explode.mp3'
	])
	this.load.audio('pickupGift', [
		'assets/sounds/pickupGift.ogg',
		'assets/sounds/pickupGift.mp3'
	])
	this.load.audio('floorFire', [
		'assets/sounds/floorfire.ogg',
		'assets/sounds/floorfire.mp3'
	])
	this.load.audio('pain', [
		'assets/sounds/pain.ogg',
		'assets/sounds/pain.mp3'
	])
	this.load.audio('openGate', [
		'assets/sounds/openGate.ogg',
		'assets/sounds/openGate.mp3'
	])
	this.load.audio('washerNoise', [
		'assets/sounds/washerBossNoise.ogg',
		'assets/sounds/washerBossNoise.mp3'
	])
}

IntroScene.prototype.create = function() {
	this.add.sprite(-10, -10, 'introScreen').setOrigin(0)
	// this.add.sprite(0, 0, 'headUpDsp').setOrigin(0)
	///////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////
	// ANIMATIONS -->
	///////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////
	// hero sprite sheet -->
	this.anims.create({
		key: 'heroExplode',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
				prefix: 'explosion_',
				end: 6,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 16
	})
	this.anims.create({
		key: 'heroWalkRight', 
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'walkR_',
			end: 4,
			zeroPad: 4
		}),
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({ 
		key: 'heroIdleRight',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'idleR_',
			end: 0,
			zeroPad: 4
		}),
		repeat: 0
	})
	this.anims.create({ 
		key: 'heroJumpRight',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'jumpR_',
			end: 0,
			zeroPad: 4
		}),
		repeat: 0
	})
	this.anims.create({ 
		key: 'heroPainRight',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'painR_',
			end: 2,
			zeroPad: 4
		}),
		repeat: 1,
		frameRate: 12
	})
	this.anims.create({ 
		key: 'heroWalkLeft',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'walkL_',
			end: 4,
			zeroPad: 4
		}),
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({ 
		key: 'heroIdleLeft',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'idleL_',
			end: 0,
			zeroPad: 4
		}),
		repeat: 0
	})
	this.anims.create({ 
		key: 'heroJumpLeft',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'jumpL_',
			end: 0,
			zeroPad: 4
		}),
		repeat: 0
	})
	this.anims.create({ 
		key: 'heroPainLeft',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'painL_',
			end: 2,
			zeroPad: 4
		}),
		repeat: 1,
		frameRate: 12
	})
	this.anims.create({ 
		key: 'heroDangleR',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'dangleR_',
			end: 3,
			zeroPad: 4
		}),
		repeat: 1,
		frameRate: 12
	})
	this.anims.create({ 
		key: 'heroDangleIdleR',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'dangleR_',
			end: 0,
			zeroPad: 4
		}),
		// yoyo: true,
		repeat: 1,
		frameRate: 12
	})
	this.anims.create({ 
		key: 'heroDangleUpR',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'dangleUpR_',
			end: 2,
			zeroPad: 4
		}),
		repeat: 0,
		frameRate: 5
	})
	this.anims.create({ 
		key: 'heroDangleL',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'dangleL_',
			end: 3,
			zeroPad: 4
		}),
		repeat: 1,
		frameRate: 12
	})
	this.anims.create({ 
		key: 'heroDangleIdleL',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'dangleL_',
			end: 0,
			zeroPad: 4
		}),
		// yoyo: true,
		repeat: 1,
		frameRate: 12
	})
	this.anims.create({ 
		key: 'heroDangleUpL',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'dangleUpL_',
			end: 2,
			zeroPad: 4
		}),
		repeat: 0,
		frameRate: 5
	})
	this.anims.create({ 
		key: 'placeTranslatorIdle',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'PlaceTranslatorIdle_',
			end: 2,
			zeroPad: 4
		}),
		yoyo: true,
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({ 
		key: 'placeTranslatorTakeOff',
		frames: this.anims.generateFrameNames('heroSpriteAtlas', {
			prefix: 'PlaceTranslatorTakeOff_',
			end: 2,
			zeroPad: 4
		}),
		yoyo: true,
		repeat: -1,
		frameRate: 24
	})
	// <-- hero sprite sheet
	// enemies sprite sheet -->
	this.anims.create({
		key: 'explodeEnemy',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'enemyExpolsion_',
				end: 6,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 24
	})
	this.anims.create({
		key: 'fumeExplosion',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'enemyFume_',
				end: 6,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 5
	})
	this.anims.create({
		key: 'exhaust',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'enemyFume_',
				end: 6,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 24
	})
	this.anims.create({
		key: 'flameRunnerL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'flameRunnerL_',
				end: 2,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 16
	})
	this.anims.create({
		key: 'flameRunnerR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'flameRunnerR_',
				end: 2,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 16
	})
	this.anims.create({
		key: 'minirobotAlive',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'minirobotAlive_',
				end: 2,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({
		key: 'fireWheelActivated',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'fireWheelActivated_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'fireWheelIdle',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'fireWheelIdle_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'flyRobotCutter',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'flyRobotCutter_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'flyRobotLR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'flyRobotLR_',
				end: 3,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 2
	})
	this.anims.create({
		key: 'flyRobotRL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'flyRobotRL_',
				end: 3,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 2
	})
	this.anims.create({
		key: 'deuteriumSphere',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'deuteriumSphere_',
				end: 8,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'killerRabbitR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'killerRabbitR_',
				end: 2,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'killerRabbitL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'killerRabbitL_',
				end: 2,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'HeliIdleL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'HeliIdleL_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'HeliIdleR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'HeliIdleR_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'HeliMoveL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'HeliMoveL_',
				end: 2,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'HeliMoveR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'HeliMoveR_',
				end: 2,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'killerRabbitDie',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'killerRabbitDie_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 4
	})
	this.anims.create({
		key: 'minirobotDestroyed',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'minirobotDestroyed_',
				end: 5,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 24
	})
	this.anims.create({
		key: 'crocoR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'crocoR_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({
		key: 'crocoL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'crocoL_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({
		key: 'wheelcanonL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'wheelcanonL_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 1
	})
	this.anims.create({
		key: 'wheelcanonR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'wheelcanonR_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 1
	})
	this.anims.create({
		key: 'floorfire',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'floorfire_',
				end: 14,
				zeroPad: 4,
			}),
		repeat: 0,
		frameRate: 8
	})
	this.anims.create({
		key: 'EplodeGiantRobotR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'giantRobotRExplode_',
				end: 10,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'EplodeGiantRobotL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'giantRobotLExplode_',
				end: 10,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'BadGreyBoxExplode',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'BadGreyBoxExplode_',
				end: 4,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'GlowThrowerStartR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerStartR_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'GlowThrowerStartL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerStartL_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'GlowThrowerHalfR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerHalfR_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'GlowThrowerHalfL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerHalfL_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'GlowThrowerFullR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerFullR_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'GlowThrowerFullL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerFullL_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'GlowThrowerSegment',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerSegment_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'FallingTrapSegmentL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'TrapSegmentL_',
				end: 8,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'FallingTrapSegmentR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'TrapSegmentR_',
				end: 8,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'TileNeedle',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'TileNeedle_',
				end: 6,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 8
	})
	this.anims.create({
		key: 'RedKey',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'RedKey_',
				end: 8,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'RedGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'RedGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 16
	})
	this.anims.create({
		key: 'BlueKey',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'BlueKey_',
				end: 8,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'BlueGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'BlueGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 16
	})
	this.anims.create({
		key: 'GreenKey',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'GreenKey_',
				end: 8,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'GreenGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GreenGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 16
	})
	this.anims.create({
		key: 'PurpleKey',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'PurpleKey_',
				end: 8,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'PurpleGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'PurpleGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 16
	})
	this.anims.create({
		key: 'YellowKey',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'YellowKey_',
				end: 8,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'YellowGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'YellowGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 16
	})
	this.anims.create({
		key: 'WasherBossSegment',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'WasherBoss_',
				end: 13,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	// <-- enemies sprite sheet
	// gifts -->
	this.anims.create({
		key: 'Flag',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Flag_',
				end: 5,
				zeroPad: 4,
				yoyo: true
			}),
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'GreyBoxExplode',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'GreyBoxExplode_',
				end: 4,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'RedBoxExplode',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'RedBoxExplode_',
				end: 4,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'BlueBoxExplode',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'BlueBoxExplode_',
				end: 4,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'DynamiteBlock',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'dynamiteBlock_',
				end: 2,
				zeroPad: 4
			}),
		repeat: 5,
		frameRate: 16
	})
	this.anims.create({
		key: 'Football',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Football_',
				end: 12,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'Balloon',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Balloon_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 2
	})
	this.anims.create({
		key: 'SmallBalloon',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'SmallBalloon_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 2
	})
	this.anims.create({
		key: 'FloppyDisk',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'FloppyDisk_',
				end: 3,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 5
	})
	this.anims.create({
		key: 'FullPowerUp',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'FullPowerUp_',
				end: 20,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'RotatingColaTin',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'RotatingColaTin_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'ColaTin',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'ColaTin_',
				end: 3,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'SingleChopOfMeat',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'SingleChopOfMeat_',
				end: 3,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'DoubleChopOfMeat',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'DoubleChopOfMeat_',
				end: 3,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'Radio',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Radio_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'Joystick',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Joystick_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'MultiHand',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'MultiHand_',
				end: 2,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'GunUpgrade',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'GunUpgrade_',
				end: 2,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({
		key: 'MultiHandPlate',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'MultiHandPlate_',
				end: 2,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'MultiHandTile',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'MultiHandTile_',
				end: 5,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'DangleClaw',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'DangleClaw_',
				end: 2,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'HighJumpShoe',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'HighJumpShoe_',
				end: 2,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'Points100',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Points100_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'Points500',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Points500_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'Points1000',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Points1000_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'Points2000',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Points2000_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})	
	this.anims.create({
		key: 'Points5000',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Points5000_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'Points10000',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'Points10000_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	// <--gifts
	// decoration -->
	this.anims.create({
		key: 'CyberWindow',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'CyberWindow_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({
		key: 'WarpKernel',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'WarpKernel_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({
		key: 'PanelChart',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'PanelChart_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({
		key: 'Alert',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'Alert_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 8
	})
	this.anims.create({
		key: 'ArrowUp',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'ArrowUp_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 4
	})
	this.anims.create({
		key: 'CmdConsole',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'CmdConsole_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 2
	})
	this.anims.create({
		key: 'BlueNoise',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'BlueNoise_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'IsolatedBlueNoise',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'IsolatedBlueNoise_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 24
	})
	this.anims.create({
		key: 'GreenFluid',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'GreenFluid_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 12
	})
	this.anims.create({
		key: 'OrganicWall',
		frames: this.anims.generateFrameNames('decorationSpriteAtlas', {
				prefix: 'OrganicWall_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 12
	})
	// <-- decoration
	// level gate -->
	this.anims.create({
		key: 'LevelGateOpen',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'LevelGateOpen_',
				end: 6,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'LevelGateClose',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'LevelGateClose_',
				end: 6,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 12
	})
	// <-- level gate
	// enemies -->
	this.anims.create({
		key: 'SpikeBottomUp',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'SpikeBottomUp_',
				end: 18,
				zeroPad: 4
			}),
		// delay: Phaser.Math.Between(0, 2000),
		repeat: 0,
		frameRate: 24
	})
	// <-- enemies
	///////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////
	// <-- ANIMATIONS
	///////////////////////////////////////////////////////////////////////////////////////////////
}

IntroScene.prototype.update = function (time, delta) {
	if (this.elapsedIntroTime > this.introDelay) {
		this.scene.stop('IntroScene')
		// this.scene.start('LogoScene',  { doRestart: false })
		this.scene.start('LevelControlScene', {
			points: 0,
			hasHighJumpShoe: false,
			hasDangleClaws: false,
			hasMultiHand: false,
			numOfGunUps: 0,
			currentLevelId: 0
		})
	}
	this.elapsedIntroTime += delta
}
