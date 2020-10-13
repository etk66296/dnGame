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
				scene.scene.manager.start(this.hero.nextLevelData.key , {
					points: this.hero.collectedPoints,
					hasHighJumpShoe: this.hero.hasHighJumpShoe,
					hasDangleClaws: this.hero.hasDangleClaws,
					hasMultiHand: this.hero.hasMultiHand,
					numOfGunUps: this.hero.numOfGunUps,
					levelData: {
						key: this.hero.nextLevelData.key,
						mapData: this.hero.nextLevelData.mapData,
						numOfTiles: this.hero.nextLevelData.numOfTiles,
						lastScene: this.hero.nextLevelData.lastScene
					},
					currentLevelId: this.hero.currentLevelId
				})
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
		levelGatesData.forEach((levelGateData) => {
			this.add(new LevelGate(scene, hero, levelGateData))
		})
		this.children.iterate((gate) => {
			gate.setImmovable(true)
			// hero is allowed to open the door
			scene.physics.add.overlap(this.hero, gate, () => {
				if (!this.levelComplete) {
					if (this.hero.gameControls.touch_USE.isDown || this.hero.gameControls.key_USE.isDown) {
						this.levelComplete = true
						gate.openGate()
					}
				}
			})
		})
	}
}