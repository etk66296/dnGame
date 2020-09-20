class PlaceTranslatorMachine extends PhysicsObj {
	constructor(scene, hero, multiHandPlateData, multiHandSystem) {
			super(
				scene,
				multiHandPlateData.x + multiHandPlateData.width / 2,
				multiHandPlateData.y + multiHandPlateData.height / 2,
				'giftsSpriteAtlas',
				multiHandPlateData.properties.frame
			)
			scene.add.existing(this)
			scene.physics.add.existing(this)
			this.setActive(true)
			this.body.immovable = true
			this.hero = hero
			this.play('MultiHandPlate')
			this.setDepth(0)
			this.heroOverlapEvent = scene.physics.add.overlap(this, hero, () => {
				if (this.hero.hasMultiHand) {
					if (this.hero.gameControls.key_USE.isDown ||
							this.hero.gameControls.touch_USE.isDown) {
						// enable all multihand tiles
						this.setActive(false)
						this.multiHandSystem.tilesEnabled = true
						this.scene.physics.world.removeCollider(this.heroOverlapEvent)
					}
				}
			})
			this.multiHandSystem = multiHandSystem
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}