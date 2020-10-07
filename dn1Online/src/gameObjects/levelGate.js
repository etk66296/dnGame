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
		this.on('animationcomplete', () => {
			// !!!
			// change scene here
			// !!!
			this.hero.setVisible(false)
			scene.scene.manager.start('LevelControlScene', {
				points: this.hero.collectedPointes,
				hasHighJumpShoe: this.hero.hasHighJumpShoe,
				hasDangleClaws: this.hero.hasDangleClaws,
				hasMultiHand: this.hero.hasMultiHand,
				numOfGunUps: this.hero.numOfGunUps
			})
		})
	}
	openGate() {
		this.play(this.levelGateData.properties.anim)
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