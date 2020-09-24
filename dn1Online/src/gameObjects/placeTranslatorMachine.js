class PlaceTranslatorMachine extends PhysicsObj {
	constructor(scene, hero, placeTranslatorData) {
			super(
				scene,
				placeTranslatorData.x + placeTranslatorData.width / 2,
				placeTranslatorData.y + placeTranslatorData.height / 2,
				'heroSpriteAtlas',
				placeTranslatorData.properties.frame
			)
			this.setActive(true)
			this.setDepth(9)
			this.hero = hero
			this.play(placeTranslatorData.properties.animA)
			this.homePos = { x: this.x, y: this.y }
			this.isAtHomePos = true
			this.deviceBlocked = false
			this.heroOverlapEvent = scene.physics.add.overlap(this, hero, () => {
				  if (!this.deviceBlocked) {
				  if (this.hero.gameControls.touch_USE.isDown || this.hero.gameControls.key_USE.isDown) {
						this.hero.setFrame('useTranslator_0000')
						this.hero.setPosition(this.x, this.y)
						this.hero.movementAllowed = false
						this.hero.setVelocity(0, 0)
					  this.deviceBlocked = true
					  this.play(placeTranslatorData.properties.animB)
					   let placeTranlateTimeEvent = this.scene.time.addEvent({
						  	delay: 1000,
						  	callback: () => {
						  		this.play(placeTranslatorData.properties.animA)
						  		if (this.isAtHomePos) {
						  			this.setPosition(placeTranslatorData.properties.xPosB, placeTranslatorData.properties.yPosB)
						  			this.hero.setPosition(placeTranslatorData.properties.xPosB, placeTranslatorData.properties.yPosB)
						  			this.isAtHomePos = false
						  		} else {
						  			this.setPosition(this.homePos.x, this.homePos.y)
						  			this.hero.setPosition(this.homePos.x, this.homePos.y)
						  		  this.isAtHomePos = true
						  		}
									this.deviceBlocked = false
									this.hero.movementAllowed = true
						  		placeTranlateTimeEvent.remove(false)
						  	}
						  })
					}
				}
			})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}