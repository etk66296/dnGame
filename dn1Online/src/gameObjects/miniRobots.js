class Minirobot extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
		super(scene, x + 8, y + 10, 'enemiesSpriteAtlas')
		scene.add.existing(this)
		scene.physics.add.existing(this)
	}
	setup() {
		this.play('minirobotAlive')
		this.lastDir = -1
		this.definedVelocity = 50
		this.heroHits = 1
		this.setVelocityX(this.lastDir*this.definedVelocity)
		this.on('animationcomplete', () => {
			if (this.heroHits <= 0) {
				this.setDestroyed()
			}
		})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.velocity.x === 0) {
			this.lastDir *= -1
			this.setVelocityX(this.lastDir*this.definedVelocity)
		}
	}
	setDestroyed () {
		this.body.reset(-100, -100)
		this.setActive(false)
		this.setVisible(false)
	}
}
class Minirobots extends Phaser.Physics.Arcade.Group {
  constructor (scene, robotsData, solidLayer, bullets) {
		super(scene.physics.world, scene)
		robotsData.forEach((robotData) => {
			this.add(new Minirobot(scene, robotData.x, robotData.y))
		})
		scene.physics.add.overlap(this, bullets, (minirobo, bullet) => {
			bullet.body.checkCollision.none = true
			bullet.setVelocityX(bullet.body.velocity.x / 5)
			bullet.play('heroExplode')
			minirobo.body.checkCollision.none = true
			minirobo.setVelocityX(minirobo.body.velocity.x / 10)
			minirobo.setVelocityY(-100)
			minirobo.play('minirobotDestroyed')
			minirobo.heroHits -= 1
		})
		scene.physics.add.collider(solidLayer, this)
  }
}