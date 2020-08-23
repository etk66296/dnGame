// depends on intro scene, which is loading the enemiesSpriteAtlas sprite sheet
// bullets -->
class Floorfire extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
		super(scene, x, y, 'enemiesSpriteAtlas', 'floorfire_0000')
		scene.add.existing(this)
		scene.physics.add.existing(this)
	}
	setup () {
		this.delay = 0
		this.burn = false
		this.on('animationcomplete', () => {
			if ((this.anims.currentAnim.key === 'DynamiteBlock')) {
				this.burn = true
			} else {
				this.setDestroyed()
			}
		})
	}
  fire (x, y, delay) {
		this.body.reset(x, y)
		this.delay = delay
		this.elapsedTime = 0
		this.setActive(true)
		this.body.checkCollision.none = true
		if (delay === 0) {
			this.setVisible(true)
			this.play('DynamiteBlock')
		} else {
			this.burn = true
			this.delay = delay + 1300
		}
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if(this.burn) {
			this.elapsedTime += delta
			if(this.elapsedTime > this.delay) {
				this.body.checkCollision = {
					down: true,
					left: true,
					none: false,
					right: true,
					up: true
				}
				this.setActive(true)
				this.setVisible(true)
				this.play('floorfire')
				this.burn = false
			}
		}
	}
	setDestroyed () {
		this.elapsedTime = 0
		this.body.checkCollision.none = true
		this.body.reset(-100, -100)
		this.setActive(false)
		this.setVisible(false)
	}
}

class Dynamite extends Phaser.Physics.Arcade.Group {
  constructor (scene) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 30,
      key: 'floorfireGroup',
      active: false,
      visible: false,
      classType: Floorfire
    })
  }
	detonate (x, y, backdraft) {
		let countdown = 250
		for (let i = 0; i < backdraft; i++) {
			let floorfire = this.getFirstDead(false)
    	if (floorfire) {
	      floorfire.fire(x - 16 * i, y - 8, countdown * i)
			}
		}
  }
}
// <-- bullets