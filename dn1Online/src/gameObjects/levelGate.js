class LevelGate extends PhysicsObj {
  constructor (scene, hero, levelGateData) {
		super(
			scene,
			levelGateData.x + levelGateData.width / 2,
			levelGateData.y + levelGateData.height / 2,
			'giftsSpriteAtlas',
			levelGateData.properties.frame
		)
		this.hero = hero
		this.levelGateData = levelGateData
		this.setActive(true)
		this.setVisible(true)
		this.setDepth(-1)
		this.passTroughFinished = false
		this.on('animationcomplete', () => {
			// !!!
			// change scene here
			// !!!
			if (this.anims.currentAnim.key === this.levelGateData.properties.animA) {
				this.hero.setVisible(false)
				this.play(this.levelGateData.properties.animB)
			} else {
				// console.log('levelID: ', this.hero.currentLevelId)
				if (this.hero.currentLevelId !== 12) {
					let heroData = {
						points: this.hero.collectedPoints,
						hasHighJumpShoe: this.hero.hasHighJumpShoe,
						hasDangleClaws: this.hero.hasDangleClaws,
						hasMultiHand: this.hero.hasMultiHand,
						numOfGunUps: this.hero.numOfGunUps,
						numOfHealthBlocks: this.hero.healthBlocks.current,
						levelData: {
							key: this.hero.nextLevelData.key,
							mapData: this.hero.nextLevelData.mapData,
							numOfTiles: this.hero.nextLevelData.numOfTiles,
							lastScene: this.hero.nextLevelData.lastScene,
							backgroundImageFilePath: this.hero.nextLevelData.backgroundImageFilePath,
							backgroundKey: this.hero.nextLevelData.backgroundKey
						},
						currentLevelId: this.hero.currentLevelId,
					}
					// save cookies only when entering the level control scene
					if (this.hero.nextLevelData.lastScene === 'Level0Scene') {
						// Build the expiration date string:
						var expiration_date = new Date()
						var cookie_string = '';
						expiration_date.setFullYear(expiration_date.getFullYear() + 1)
						// Build the set-cookie string:
						cookie_string = "; path=/; expires=" + expiration_date.toUTCString()
						document.cookie = "dn1SaveGameData=" + JSON.stringify(heroData) + "; samesite=strict" + cookie_string
					}
					scene.scene.manager.start(this.hero.nextLevelData.key , heroData)
				} else {
					// final dialog
					cookie_string = "; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
					document.cookie = "dn1SaveGameData=" + '' + "; samesite=strict" + cookie_string
					scene.scene.start('FinalDialogScene', { points: this.hero.collectedPoints })
				}
				
			}
		})
	}
	openGate() {
		this.play(this.levelGateData.properties.animA)
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}

class LevelGates extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, levelGatesData) {
		super(scene.physics.world, scene)
		this.hero = hero
		this.levelComplete = false
		// sound
		this.openSound = scene.sound.add('openGate')
		levelGatesData.forEach((levelGateData) => {
			this.add(new LevelGate(scene, hero, levelGateData))
		})
		this.children.iterate((gate) => {
			gate.setImmovable(true)
			// hero is allowed to open the door
			scene.physics.add.overlap(this.hero, gate, () => {
				if (!this.levelComplete) {
					if (this.hero.gameControls.touch_USE.isDown || this.hero.gameControls.key_USE.isDown) {
						this.openSound.play()
						this.levelComplete = true
						gate.openGate()
					}
				}
			})
		})
	}
}