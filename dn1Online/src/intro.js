function IntroScene() {
	Phaser.Scene.call(this, 'IntroScene')
	this.introDelay = 2000
	this.elapsedIntroTime = 0
}

IntroScene.prototype = Object.create(Phaser.Scene.prototype)
IntroScene.prototype.constructor = IntroScene


IntroScene.prototype.preload = function () {
	this.load.image('introScreen', 'statics/introScreen.png')
	this.load.image('logoScreen', 'statics/myLogo.png')
	this.load.image('TilesNoTileBleeding', 'statics/sprites/TilesNoTileBleeding.png')
	this.load.image('headUpDsp', 'statics/headUpDsp.png')
	// MAPS
	this.load.tilemapTiledJSON("level1map", "statics/maps/dn1MapLevel1.json")

	// SPRITESHEETS
	this.load.atlas('heroSpriteAtlas', 'statics/sprites/Hero.png', 'statics/sprites/Hero.json')
	this.load.atlas('enemiesSpriteAtlas', 'statics/sprites/Enemies.png', 'statics/sprites/Enemies.json')
	this.load.atlas('giftsSpriteAtlas', 'statics/sprites/Gifts.png', 'statics/sprites/Gifts.json')
	this.load.atlas('decorationSpriteAtlas', 'statics/sprites/TilesNoTileBleeding.png', 'statics/sprites/Decoration.json')
}

IntroScene.prototype.create = function() {
	this.add.sprite(0, 0, 'introScreen').setOrigin(0)
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
		key: 'ColaTin',
		frames: this.anims.generateFrameNames('giftsSpriteAtlas', {
				prefix: 'ColaTin_',
				end: 3,
				zeroPad: 4
			}),
		repeat: -1,
		frameRate: 12
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
	///////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////
	// <-- ANIMATIONS
	///////////////////////////////////////////////////////////////////////////////////////////////
}

IntroScene.prototype.update = function (time, delta) {
	if (this.elapsedIntroTime > this.introDelay) {
		this.scene.stop('IntroScene')
		this.scene.start('LogoScene')
	}
	this.elapsedIntroTime += delta
}
