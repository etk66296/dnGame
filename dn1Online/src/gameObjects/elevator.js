// depends on intro scene, which is loading the enemiesSpriteAtlas sprite sheet
// bullets -->
class ElevatorSegment extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, headModule) {
		super(scene, x, y, 'giftsSpriteAtlas', 'ElevatorSegment')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(false)
		this.headModule = headModule

	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if((this.headModule.y - 2) < this.y) {
			this.setVisible(true)
		} else {
			this.setVisible(false)
		}
	}
}

class ElevatorHead extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, hero, maxHeight) {
		super(scene, x, y, 'giftsSpriteAtlas', 'ElevatorHead')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.maxHeight = maxHeight
		this.hero = hero
		this.goUp = false
		this.backToOrigin = false
		this.originY = y
		this.currentVelocity = 0
		this.acceleration = 3
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(true)
		// this.setBounce(0, 0)
		this.set
		this.body.checkCollision = {
			down: false,
			left: false,
			none: false,
			right: false,
			up: true
		}
		this.scene.physics.add.collider(this.hero, this, () => {
			this.hero.body.blocked.down = true
		})
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		this.setImmovable(true)
		if(this.body.touching.up) {
			if (this.hero.gameControls.key_USE.isDown || this.hero.gameControls.touch_USE.isDown) {
				if (this.y > (this.originY - this.maxHeight + 24)) {
					// smoothly speed up the elevator
					this.currentVelocity -= this.acceleration
					if (this.currentVelocity < -80) {
						this.currentVelocity = -80
					}
					this.setVelocityY(this.currentVelocity)
				} else if (this.y > (this.originY - this.maxHeight) && this.currentVelocity < 0) {
					// smoothly slow down the elevator
					this.currentVelocity += this.acceleration
					this.setVelocityY(this.currentVelocity)
				} else {
					this.currentVelocity = 0
					this.setVelocityY(this.currentVelocity)
				}
			} else {
				this.currentVelocity += this.acceleration
				if (this.currentVelocity > 0) {
					this.currentVelocity = 0
				}
				this.setVelocityY(this.currentVelocity)
			}
		} else {
			if (this.y < this.originY) {
				this.currentVelocity += this.acceleration
				if (this.currentVelocity < 80) {
					this.currentVelocity = 80
				}
				this.setVelocityY(this.currentVelocity)
			} else {
				this.currentVelocity = 0
				this.setVelocityY(this.currentVelocity)
				this.y = this.originY
			}
		}
		// if (this.maxHeight < (this.originY - this.y) && this.body.touching.up) {
		// 	this.y = this.originY - this.y
		// }
		// if (this.hero.gameControls.key_USE.isDown ||
		// 		this.hero.gameControls.touch_USE.isDown) {
		// 	if (this.maxHeight > (this.originY - this.y)) { //  &&this.body.touching.up) 
		// 		if(this.body.touching.up) {
		// 			this.currentVelocity -= this.acceleration
		// 			if (this.currentVelocity < -80) {
		// 				this.currentVelocity = -80
		// 			}
		// 			this.setVelocityY(this.currentVelocity)
		// 		}
		// 	}
		// }
		// else {
		// 	if (this.y < this.originY && this.currentVelocity > 0) {
		// 		this.currentVelocity += this.acceleration
		// 		this.setVelocityY(this.currentVelocity)
		// 		// if (this.body.touching.up) {
		// 		// 	this.currentVelocity = 0
		// 		// 	this.setVelocityY(this.currentVelocity)
		// 		// }
		// 	}
		// }
	}
}

class Elevator extends Phaser.Physics.Arcade.Group {
  constructor (scene, elevatorData, hero) {
		super(scene.physics.world, scene)
		this.hero = hero
		this.maxHeight = elevatorData.properties.numberOfSegments * 16
		this.headModule = new ElevatorHead (scene, elevatorData.x + 8, elevatorData.y + 8, hero, this.maxHeight)
		for (let i = 0; i < elevatorData.properties.numberOfSegments; i++) {
			this.add(new ElevatorSegment(scene, elevatorData.x + 8, elevatorData.y + 8 - 16 * i, this.headModule))
		}
		this.headModule.setDepth(1)
		this.add(this.headModule)
	}
}
// <-- bullets