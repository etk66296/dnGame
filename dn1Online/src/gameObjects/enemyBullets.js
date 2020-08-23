class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
		super(scene, x, y, 'enemiesSpriteAtlas')
	}
	setup () {
		this.setSize(2, 5, true)
		this.body.checkCollision.none = true
		this.on('animationcomplete', () => {
			if (this.anims.currentAnim.key === 'explodeEnemy') {
				this.setDestroyed()
			}
		})
	}
  fire (x, y, dir) {
		this.body.checkCollision = {
			down: false,
			left: true,
			none: false,
			right: true,
			up: false
		}
		this.body.reset(x, y)
		this.setActive(true)
		this.setVisible(true)
		this.setVelocityX(200 * dir)
		if (dir < 0) {
			this.setFrame('enemyBulletL')
		} else {
			this.setFrame('enemyBulletR')
		}
	}
	setDestroyed () {
		this.body.checkCollision.none = true
		this.body.reset(-100, -100)
		this.setActive(false)
		this.setVisible(false)
	}
}

class EnemyBullets extends Phaser.Physics.Arcade.Group {
  constructor (scene, solidLayer) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 5,
      key: 'enemybullets',
      active: false,
      visible: false,
      classType: EnemyBullet
		})
		scene.physics.add.collider(solidLayer, this, (bullet) => {
			bullet.play('explodeEnemy')
		})
  }
	fireBullet (x, y, dir) {
		let bullet = this.getFirstDead(false)
    if (bullet) {
      bullet.fire(x, y, dir)
		}
  }
}