// depends on intro scene, which is loading the enemiesSpriteAtlas sprite sheet
// the canaon needs an enemy canon better known as enemyBullet object
// wheelcanon -->
class Wheelcanon extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, enemyCanon, pointCounterDsp) {
		super(scene, x, y, 'enemiesSpriteAtlas')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.enemyBullets = enemyCanon
		this.fireDeltaTime = 3000
		this.elapsedTimeAfterLastShot = 0
		this.pointCounterDsp = pointCounterDsp
	}
	setup () {
		this.setSize(16, 17)
		this.setOffset(8, -1)
		this.lastDir = 1
		this.definedVelocity  = 80
		this.heroHits = 2
		this.play('wheelcanonR')
		this.on('animationcomplete', () => {
			if (this.heroHits <= 0 && this.anims.currentAnim.key === 'explodeEnemy') {
				this.setDestroyed()
			}
		})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.velocity.x === 0) {
			this.lastDir *= -1
			this.setVelocityX(this.lastDir * this.definedVelocity)
			if(this.lastDir < 0) {
				this.play('wheelcanonL')
			} else {
				this.play('wheelcanonR')
			}
		}
		this.elapsedTimeAfterLastShot += delta
		if (this.elapsedTimeAfterLastShot > this.fireDeltaTime) {
			this.elapsedTimeAfterLastShot = 0
			this.enemyBullets.fireBullet(this.x + this.lastDir * 5, this.y - 5, this.lastDir)
		}
	}
	setDestroyed () {
		this.pointCounterDsp.amount += 863
		this.body.reset(-100, -100)
		this.setActive(false)
		this.setVisible(false)
	}
}
class Wheelcanons extends Phaser.Physics.Arcade.Group {
  constructor (scene, wheelcanonData, solidLayer, canon, bullets, pointCounterDsp) {
		super(scene.physics.world, scene)
		wheelcanonData.forEach((wcdata) => {
			this.add(new Wheelcanon(scene, wcdata.x + 8, wcdata.y + 8, canon, pointCounterDsp))
		})
		scene.physics.add.overlap(this, bullets, (wheelcanon, bullet) => {
			bullet.body.checkCollision.none = true
			bullet.setVelocityX(0)
			bullet.play('heroExplode')
			wheelcanon.heroHits -= 1
			if (wheelcanon.heroHits <= 0) {
				wheelcanon.body.checkCollision.none = true
				wheelcanon.setVelocityX(wheelcanon.body.velocity.x / 10)
				wheelcanon.setVelocityY(-100)
				wheelcanon.play('explodeEnemy')
			}
		})
		scene.physics.add.collider(solidLayer, this)
  }
}
// <-- wheelcanon