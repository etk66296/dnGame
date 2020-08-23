class LevelGateSegment extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, segmentData, hero) {
		super(scene, x, y, 'giftsSpriteAtlas', segmentData.name + '_0000')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.hero = hero
		this.openGateAnimation = segmentData.name
	}
	setup () {
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(true)
		this.setDepth(-1)
		// only one door segment must hold the level completed code
		if (this.openGateAnimation === 'LevelGateBR') {
			this.on('animationcomplete', () => {
				console.log('level completed => change scene here')
				this.hero.setVisible(false)
			})
		}
	}

	openGate() {
		this.play(this.openGateAnimation)
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}

class LevelGate extends Phaser.Physics.Arcade.Group {
  constructor (scene, levelGateData, hero, key_USE) {
		super(scene.physics.world, scene)
		this.hero = hero
		this.levelComplete = false
		this.key_USE = key_USE
		levelGateData.forEach((levelGateSegmentData) => {
			this.add(new LevelGateSegment(scene, levelGateSegmentData.x + 8, levelGateSegmentData.y + 8, levelGateSegmentData, hero))
		})
	}
	setup () {
		this.scene.physics.add.overlap(this.hero, this, () => {
			if (!this.levelComplete) {
				if (this.key_USE.isDown) {
					this.levelComplete = true
					this.children.iterate((doorSegment) => {
						doorSegment.openGate()
					})
				}
			}
		})
	}
}