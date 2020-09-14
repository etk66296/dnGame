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

	this.load.image('textbox', 'assets/sprites/bgs/textbox.png')
	
	// CONTROL BUTTONS
	this.load.atlas('controlButtonsAtlas', 'assets/buttons/buttons.png', 'assets/buttons/buttons.json')


	// MAPS
	this.load.tilemapTiledJSON("level0map", "assets/maps/dn1MapTutorial.json")
	this.load.tilemapTiledJSON("level1map", "assets/maps/dn1MapLevel1.json")

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
		frameRate: 8
	})
	this.anims.create({
		key: 'EplodeGiantRobotL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'giantRobotLExplode_',
				end: 10,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 6
	})
	this.anims.create({
		key: 'GlowThrowerStartR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerStartR_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'GlowThrowerStartL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerStartL_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'GlowThrowerHalfR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerHalfR_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'GlowThrowerHalfL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerHalfL_',
				end: 1,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 6
	})
	this.anims.create({
		key: 'GlowThrowerFullR',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerFullR_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'GlowThrowerFullL',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerFullL_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
	})
	this.anims.create({
		key: 'GlowThrowerSegment',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GlowThrowerSegment_',
				end: 1,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 6
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
		key: 'RedGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'RedGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 6
	})
	this.anims.create({
		key: 'BlueGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'BlueGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 6
	})
	this.anims.create({
		key: 'GreenGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'GreenGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 6
	})
	this.anims.create({
		key: 'PurpleGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'PurpleGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 6
	})
	this.anims.create({
		key: 'YellowGate',
		frames: this.anims.generateFrameNames('enemiesSpriteAtlas', {
				prefix: 'YellowGate_',
				end: 7,
				zeroPad: 4
			}),
		repeat: 0,
		frameRate: 6
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
	// <-- decoration
	// level gate -->
	this.anims.create({
		key: 'LevelGateTL',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'LevelGateTL_',
				end: 6,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'LevelGateTR',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'LevelGateTR_',
				end: 6,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'LevelGateBL',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'LevelGateBL_',
				end: 6,
				zeroPad: 4
			}),
		yoyo: true,
		repeat: 0,
		frameRate: 12
	})
	this.anims.create({
		key: 'LevelGateBR',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'LevelGateBR_',
				end: 6,
				zeroPad: 4
			}),
		yoyo: true,
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
		this.scene.start('Level0Scene')
	}
	this.elapsedIntroTime += delta
}
