class EnemyObj extends PhysicsObj {
  constructor (scene, hero, x, y, spriteSheet, frame,) {
		super(scene, x, y, spriteSheet, frame)
		this.lifes = 1
		this.hero = hero
		this.on('animationcomplete', () => {
			if (this.anims.currentAnim.key === 'explodeEnemy') {
				this.body.reset(-100, -100)
				this.setActive(false)
				this.setVisible(false)
			}
		})
	}
	registerAsPainful() {
		this.scene.physics.add.overlap(this, this.hero, () => {
			this.hero.painState = true
		})
	}
	registerAsShootable() {
		this.scene.physics.add.overlap(this, this.hero.gun, (enemy, bullet) => {
			bullet.explode()
			enemy.lifes -= 1
			if (enemy.lifes <= 0) {
				enemy.setDestroyed()
			}
		})
	}
	setDestroyed () {
		this.play('explodeEnemy')
		this.body.checkCollision.none = true
		this.setVelocityX(this.body.velocity.x / 10)
		this.setVelocityY(-100)
	}
}