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
	setCollected () {
	}
}