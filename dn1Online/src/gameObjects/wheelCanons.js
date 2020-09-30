class WheelCanon extends EnemyObj {
  constructor (scene, hero, wheelCanonData, enemyBullets) {
		super(
			scene,
			hero,
			wheelCanonData.x + wheelCanonData.width / 2,
			wheelCanonData.y + wheelCanonData.height / 2,
			'enemiesSpriteAtlas',
			wheelCanonData.properties.frame
		)
		this.wheelCanonData = wheelCanonData
		this.lifes = 2
		this.lastDir = -1
		this.definedVelocity = 80
		this.enemyBullets = enemyBullets
		this.constFireDeltaTime = 1500
		this.fireElapsedTime = 0
		this.setSize(32, 17)
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.velocity.x === 0) {
			this.lastDir *= -1
			if (this.lastDir === -1) {
				this.play(this.wheelCanonData.properties.animL)
			} else {
				this.play(this.wheelCanonData.properties.animR)
			}
			this.setVelocityX(this.lastDir * this.definedVelocity)
		}
		// fire bullet
		this.fireElapsedTime += delta
		if (this.fireElapsedTime >= this.constFireDeltaTime ) {
			this.fireElapsedTime = 0
			this.enemyBullets.fireBullet(this.x, this.y - 4, this.lastDir)
		}
	}
}
class WheelCanons extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, wheelCanonsData, solidLayer, enemyBullets) {
		super(scene.physics.world, scene)
		wheelCanonsData.forEach((wheelCanonDataData) => {
			this.add(new WheelCanon(scene, hero, wheelCanonDataData, enemyBullets))
		})
		scene.physics.add.collider(solidLayer, this)
  }
}