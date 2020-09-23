class EnemyBullet extends PhysicsObj {
  constructor (scene, x, y) {
		super(scene, x, y, 'enemiesSpriteAtlas')
		this.setSize(1, 1, true)
		this.body.checkCollision.none = true
		this.on('animationcomplete', () => {
			if (this.anims.currentAnim.key === 'explodeEnemy') {
				this.body.reset(-100, -100)
				this.setActive(false)
				this.setVisible(false)
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
}

class EnemyBullets extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, solidLayer) {
		super(scene.physics.world, scene)
		this.hero = hero
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
		scene.physics.add.collider(this.hero, this, (hero, bullet) => {
			bullet.body.checkCollision.none = true
			bullet.play('explodeEnemy')
			this.hero.painState = true
		})
  }
	fireBullet (x, y, dir) {
		let bullet = this.getFirstDead(false)
    if (bullet) {
      bullet.fire(x, y, dir)
		}
  }
}