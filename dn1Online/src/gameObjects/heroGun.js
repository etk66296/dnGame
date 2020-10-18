class Bullet extends PhysicsObj {
  constructor (scene, x, y) {
		super(scene, x, y, 'heroSpriteAtlas', 'bullet')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.toggleFire = 2
		this.setSize(1, 4, true)
		this.setOffset(8, 1)
		this.body.checkCollision.none = true
		this.on('animationcomplete', () => {
			if (this.anims.currentAnim.key === 'heroExplode') {
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
		// this.toggleFire = this.toggleFire * -1
		this.setActive(true)
		this.setVisible(true)
		this.setVelocityX(300 * dir)
		this.setFrame('bullet')
	}
	explode () {
		this.setVelocityX(0)
		this.body.checkCollision.none = true
		this.play('heroExplode')
	}
}

class HeroGun extends Phaser.Physics.Arcade.Group {
  constructor (scene, solidLayer) {
		super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 20,
      key: 'bullets',
      active: false,
      visible: false,
      classType: Bullet
		})
		this.gunUpgrades = 0
		this.gunFiredCounter = 0
		this.gunIsReady = true
		this.collingDownTime = 500
		this.cooledDownEvent = null
		scene.physics.add.collider(solidLayer, this, bullet => {
			bullet.body.checkCollision.none = true
			bullet.play('heroExplode')
		})
	}
	fireBullet (x, y, dir) {
		if (this.gunIsReady) {
			// for (let i = 0; i < this.gunUpgrades; i++) {
			let bullet = this.getFirstDead(false)
    	if (bullet) {
				bullet.fire(x /* + (dir * i * 16)*/, y, dir)
			}
			this.gunFiredCounter += 1
			// }
			if (this.gunFiredCounter > this.gunUpgrades) {
				this.gunFiredCounter = 0
				this.gunIsReady = false
				this.cooledDownEvent = this.scene.time.addEvent({
					delay: this.collingDownTime ,
					callback: () => {
						this.gunIsReady = true
						this.cooledDownEvent.remove(false)
					}
				})
			}
		}
	}
	upgradeGunPower() {
		this.gunUpgrades += 1
	}
}