class WasherBossSegment extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, whaserBossData, pointCounterDsp, hero, whaserBossNoise) {
		super(scene, whaserBossData.x + 8, whaserBossData.y + 8, 'enemiesSpriteAtlas', 'WasherBoss_0000')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.destroyedPos = this.y + 120
		this.pointCounterDsp = pointCounterDsp
		this.hero = hero
		this.whaserBossNoise = whaserBossNoise
		if (this.whaserBossNoise !== null) {
			this.whaserBossNoise.setVolume(0)
			this.whaserBossNoise.config.loop = true
				if (!this.whaserBossNoise.isPaused) {
				this.whaserBossNoise.play()
			}
		}
	}
	setup () {
		this.setImmovable(true)
		this.play('WasherBossSegment')
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.whaserBossNoise !== null) {
			// whaser boss noise volume depends on distance between hero and washer boss
			if (Math.abs(this.hero.y - this.y) < 50) {
				this.whaserBossNoise.setVolume(1.0 - Math.sqrt(Math.pow(this.hero.x - this.x, 2) + Math.pow(this.hero.y - this.y, 2)) / 400)
			} else {
				this.whaserBossNoise.setVolume(0.0)
			}
		}
		if (this.y > this.destroyedPos) {
			this.setGravityX(0)
			this.setGravityY(0)
			this.setPosition(-250, -250)
			this.setVisible(false)
			this.setActive(false)
		}
	}
	setDestroyed () {
		if (this.whaserBossNoise !== null) {
			this.whaserBossNoise.stop()
		}
		this.pointCounterDsp.amount += 9999
		this.setImmovable(false)
		this.setGravityX(Phaser.Math.Between(-10, 20))
		this.setGravityY(Phaser.Math.Between(80, 120))
		this.setVelocityY(Phaser.Math.Between(-50, -120))
	}
}
class WasherBoss extends Phaser.Physics.Arcade.Group {
  constructor (scene, washerBossData, hero, heroBullets, pointCounterDsp, whaserBossNoise) {
		super(scene.physics.world, scene)
		this.heroHits = 8
		washerBossData.forEach((wcdata, index) => {
			if (index === 0) {
				this.add(new WasherBossSegment(scene, wcdata, pointCounterDsp, hero, whaserBossNoise))
			} else {
				this.add(new WasherBossSegment(scene, wcdata, pointCounterDsp, hero, null))
			}
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