class FireWheelRobot extends EnemyObj {
  constructor (scene, hero, roboData) {
		super(
			scene,
			hero,
			roboData.x + roboData.width / 2,
			roboData.y + roboData.height / 2,
			'enemiesSpriteAtlas',
			roboData.properties.frame
		)
		this.points = roboData.properties.points
		this.lifes = 2
		this.play(roboData.properties.animB)
		this.lastDir = -1
		this.definedVelocity = 70
		this.setVelocityX(this.lastDir * this.definedVelocity)
		this.activeFireTime = 5000
		this.deltaActiveFire = 0
		this.activeFireSwitch = 1
		this.animA = roboData.properties.animA
		this.animB = roboData.properties.animB
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.velocity.x === 0) {
			this.lastDir *= -1
			this.setVelocityX(this.lastDir * this.definedVelocity)
		}
		this.deltaActiveFire += delta
		if (this.deltaActiveFire >= this.activeFireTime) {
			this.deltaActiveFire = 0
			this.activeFireSwitch *= -1
			if (this.activeFireSwitch === 1) {
				this.play(this.animA)
				this.vulnerable = true
			} else {
				this.play(this.animB)
				this.vulnerable = false
			}
		}
	}
}
class FireWheelRobots extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, fireWheelRobotsData, solidLayer) {
		super(scene.physics.world, scene)
		fireWheelRobotsData.forEach((robotData) => {
			this.add(new FireWheelRobot(scene, hero, robotData))
		})
		scene.physics.add.collider(solidLayer, this)
		// this.children.iterate(robo => {
		// 	robo.setGravityY(200)
		// })
  }
}