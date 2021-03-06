class EnemyObj extends PhysicsObj {
  constructor (scene, hero, x, y, spriteSheet, frame, finishAnim = 'explodeEnemy') {
		super(scene, x, y, spriteSheet, frame)
		this.lifes = 1
		this.hero = hero
		this.finishAnim = finishAnim
		this.isAlive = true
		this.activeAfterDead = false
		this.vulnerable = true
		this.painEnabled = true
		this.fumeHoodVel = -100
		this.points = 25
		this.on('animationcomplete', () => {
			if (this.anims.currentAnim.key === this.finishAnim) {
				this.body.reset(-100, -100)
				if (!this.activeAfterDead) {
					this.setActive(false)
				}
				this.setVisible(false)
			}
		})
	}
	registerAsPainful() {
		this.scene.physics.add.overlap(this, this.hero, () => {
			if (this.painEnabled) {
				this.hero.painState = true
			}
		})
	}
	registerAsShootable() {
		this.scene.physics.add.overlap(this, this.hero.gun, (enemy, bullet) => {
			bullet.explode()
			if (this.vulnerable) {
				enemy.lifes -= 1
				if (enemy.lifes <= 0) {
					enemy.setDestroyed()
					this.isAlive = false
				}
			}
		})
	}
	setDestroyed () {
		this.hero.addPoints(this.points)
		this.play(this.finishAnim)
		this.body.checkCollision.none = true
		this.setVelocityX(this.body.velocity.x / 10)
		this.setVelocityY(this.fumeHoodVel)
	}
}