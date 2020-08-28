class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
		super(scene, x, y, 'heroSpriteAtlas', 'bullet')
	}
	setup () {
		this.setSize(1, 1, true)
		this.setOffset(0, 1)
		this.body.checkCollision.none = true
		this.on('animationcomplete', () => {
			if (this.anims.currentAnim.key === 'heroExplode') {
				this.body.checkCollision.none = true
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
		this.body.reset(x, y + 2)
		this.setActive(true)
		this.setVisible(true)
		this.setVelocityX(300 * dir)
		this.setFrame('bullet')
	}
}

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor (scene, solidLayer) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 5,
      key: 'bullets',
      active: false,
      visible: false,
      classType: Bullet
		})
		scene.physics.add.collider(solidLayer, this, bullet => {
			bullet.body.checkCollision.none = true
			bullet.play('heroExplode')
		})
  }
	fireBullet (x, y, dir) {
		let bullet = this.getFirstDead(false)
    if (bullet) {
      bullet.fire(x, y, dir)
		}
  }
}