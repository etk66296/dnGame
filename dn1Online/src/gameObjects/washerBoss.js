class WasherBossSegment extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, whaserBossData, pointCounterDsp) {
		super(scene, whaserBossData.x + 8, whaserBossData.y + 8, 'enemiesSpriteAtlas', 'WasherBoss_0000')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.destroyedPos = this.y + 120
		this.pointCounterDsp = pointCounterDsp
	}
	setup () {
		this.setImmovable(true)
		this.play('WasherBossSegment')
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.y > this.destroyedPos) {
			this.setGravityX(0)
			this.setGravityY(0)
			this.setPosition(-250, -250)
			this.setVisible(false)
		}
	}
	setDestroyed () {
		// this.setActive(false)
		this.pointCounterDsp.amount += 9999
		this.setImmovable(false)
		this.setGravityX(Phaser.Math.Between(-10, 20))
		this.setGravityY(Phaser.Math.Between(80, 120))
		this.setVelocityY(Phaser.Math.Between(-50, -120))
	}
}
class WasherBoss extends Phaser.Physics.Arcade.Group {
  constructor (scene, washerBossData, hero, heroBullets, pointCounterDsp) {
		super(scene.physics.world, scene)
		this.heroHits = 8
		washerBossData.forEach((wcdata) => {
			this.add(new WasherBossSegment(scene, wcdata, pointCounterDsp))
		})
		this.scene.physics.add.collider(hero, this, () => {
			scene.heroPain = true
		})
		this.scene.physics.add.collider(heroBullets, this, (bullet, segment) => {
			// console.log(bullet, segment)
			bullet.body.checkCollision.none = true
			bullet.setVelocityX(bullet.body.velocity.x / 5)
			bullet.play('heroExplode')
			this.heroHits -= 1
			if (this.heroHits <= 0) {
				this.children.iterate((destroyedSegment => {
					destroyedSegment.setDestroyed()
				}))
			}
		})
  }
}