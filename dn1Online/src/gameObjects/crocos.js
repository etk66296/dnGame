class Croco extends EnemyObj {
  constructor (scene, x, y, type, pointCounterDsp) {
		super(scene, x, y, 'enemiesSpriteAtlas')
		this.type = type // rightcrawler | leftcrawler
		this.pointCounterDsp = pointCounterDsp
	}
	setup() {
		this.play('crocoR')
		this.lastDir = -1
		this.definedVelocity = 12
		this.heroHits = 1
		this.setVelocityX(this.lastDir * this.definedVelocity)
		if (this.type === 'leftcrawler') {
			this.setGravityX(200)
			this.play('crocoL')
		} else {
			this.setGravityX(-200)
			this.play('crocoR')
		}
		this.on('animationcomplete', () => {
			if (this.heroHits <= 0) {
				this.setDestroyed()
			}
		})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.velocity.y === 0) {
			this.lastDir *= -1
			this.setVelocityY(this.lastDir * this.definedVelocity)
		}
	}
	setDestroyed () {
		this.pointCounterDsp.amount += 61
		this.body.reset(-100, -100)
		this.setActive(false)
		this.setVisible(false)
	}
}
class Crocos extends Phaser.Physics.Arcade.Group {
  constructor (scene, crocosData, solidLayer, bullets, explosionSound, pointCounterDsp) {
		super(scene.physics.world, scene)
		crocosData.forEach((crocoData) => {
			this.add(new Croco(scene, crocoData.x + 8, crocoData.y + 8, crocoData.type, pointCounterDsp))
		})
		scene.physics.add.overlap(this, bullets, (croco, bullet) => {
			if (!explosionSound.isPlaying) {
				explosionSound.play()
			}
			croco.body.checkCollision.none = true
			bullet.body.checkCollision.none = true
			bullet.setVelocityX(0)
			bullet.play('heroExplode')
			croco.setVelocityX(croco.body.velocity.x / 10)
			croco.setVelocityY(-100)
			croco.play('explodeEnemy')
			croco.heroHits -= 1
		})
		scene.physics.add.collider(solidLayer, this)
  }
}