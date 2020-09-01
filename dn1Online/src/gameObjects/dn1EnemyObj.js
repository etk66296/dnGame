class EnemyObj extends PhysicsObj {
  constructor (scene, x, y, spriteSheet, frame, ) {
		super(scene, x, y, spriteSheet, frame)
		this.lifes = 1
	}
	registerAsPainful(hero) {
		this.scene.physics.add.overlap(this, hero, () => {
			hero.painState = true
		})
	}
	registerAsShootable(hero) {
		this.scene.physics.add.overlap(this, hero.gun, () => {
			this.lifes -= 1
			hero.gun.registerEnemy(this)
		})
	}
}