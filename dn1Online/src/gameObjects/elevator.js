// depends on intro scene, which is loading the enemiesSpriteAtlas sprite sheet
// bullets -->
class ElevatorSegment extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, headModule) {
		super(scene, x, y, 'giftsSpriteAtlas', 'ElevatorSegment')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.headModule = headModule
	}
	setup () {
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(false)
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
  constructor (scene, x, y, hero) {
		super(scene, x, y, 'giftsSpriteAtlas', 'ElevatorHead')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.hero = hero
		this.goUp = false
		this.backToOrigin = false
		this.originY = y
	}
	setup () {
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(true)
		this.body.checkCollision = {
			down: false,
			left: false,
			none: false,
			right: false,
			up: true
		}
		this.scene.physics.add.collider(this.hero, this)
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.touching.up) {
			// this.hero.body.blocked.down = true
			if(this.goUp) {
				this.setVelocityY(-150)
				this.goUp = false
			} else {
				this.hero.setVelocityY(0) // the elevetor is not a catapult
				this.setVelocityY(0)
			}
		} else { // back to elevator origin
			if (this.y < this.originY) {
				this.setVelocityY(150)
			} else {
				this.y = this.originY
				this.setVelocityY(0)
			}
		}
	}
}

class Elevator extends Phaser.Physics.Arcade.Group {
  constructor (scene, elevatorData, hero, key_USE) {
		super(scene.physics.world, scene)
		this.headModule = new ElevatorHead (scene, elevatorData.x + 8, elevatorData.y + 8, hero)
		for (let i = 0; i < elevatorData.properties.numberOfSegments; i++) {
			this.add(new ElevatorSegment(scene, elevatorData.x + 8, elevatorData.y + 8 - 16 * i, this.headModule))
		}
		this.headModule.setDepth(1)
		this.add(this.headModule)
		this.key_USE = key_USE
	}
	setup () {
	}
	enable () {
		if (this.key_USE.isDown && this.headModule.body.touching.up) {
			this.headModule.goUp = true
		}
	}
}
// <-- bullets