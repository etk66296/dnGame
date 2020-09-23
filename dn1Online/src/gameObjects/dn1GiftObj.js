class GiftObj extends PhysicsObj {
  constructor (scene, hero, x, y, spriteSheet, frame) {
		super(scene, x, y, spriteSheet, frame)
		this.hero = hero
		this.isCollected = false
	}
	// registerAsCollectable() {
	// 	this.scene.physics.add.overlap(this, this.hero, () => {
	// 		// this.hero.painState = true
	// 	})
	// }
	registerAsShootable() {
		this.scene.physics.add.overlap(this, this.hero.gun, (gift, bullet) => {
			bullet.explode()
		})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.isCollected) {
			this.setAlpha(this.alpha)
			this.alpha -= 0.0025
			if(this.alpha <= 0.0) {
				this.setActive(false)
				this.setVisible(false)
				this.setPosition(-200, -200)
			}
		}
	}
}