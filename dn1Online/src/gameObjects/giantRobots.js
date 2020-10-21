class Giantrobot extends EnemyObj {
  constructor (scene, hero, roboData, enemyBullets) {
		super(
			scene,
			hero,
			roboData.x + roboData.width / 2,
			roboData.y + roboData.height / 2,
			'enemiesSpriteAtlas',
			'giantRobotL',
			'EplodeGiantRobotL'
		)
		this.points = roboData.properties.points
		this.worldData = roboData
		this.jumpDeltaTime = 0
		this.timeToNextJump = 2000
		this.fireDeltaTime = 0
		this.timeToNextShot = 2000
		this.enemyBullets = enemyBullets
		this.dir = -1
		// overwrite from super class
		this.lifes = 3
		this.activationDistance = 140
		this.activated = false
		if (this.worldData.properties.activationDistance !== undefined) {
			this.activationDistance = this.worldData.properties.activationDistance
		}
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		// the roboto is activated when the hero is in activation distance
		if (Phaser.Math.Distance.Between(this.hero.x, this.hero.y, this.x, this.y) < this.activationDistance && !this.activated) {
			this.activated = true
		}
		if (this.activated) {
			if (this.isAlive) {
				// jump -->
				this.jumpDeltaTime += delta
				if (this.timeToNextJump <= this.jumpDeltaTime) {
					this.setVelocityY(-200)
					this.setVelocityX(this.dir * 30)
					this.timeToNextJump = Phaser.Math.Between(3000, 5000)
					this.jumpDeltaTime = 0
				} else if (this.body.onFloor()) {
					this.setVelocityX(0)
				}
				// <-- jump
				// shot -->
				this.fireDeltaTime += delta
				if (this.timeToNextShot <= this.fireDeltaTime) {
					this.timeToNextShot = Phaser.Math.Between(100, 3000)
					this.fireDeltaTime = 0
					this.enemyBullets.fireBullet(this.x, this.y, this.dir)
				}
				// <-- shot
				// set the direction -->
				if (this.hero.x >= this.x) {
					this.dir = 1
				} else {
					this.dir = -1
				}
				// <-- set the direction
				
				if (this.body.onFloor()) {
					if (this.dir === 1) {
						this.setFrame('giantRobotR')
					} else {
						this.setFrame('giantRobotL')
					}
				} else {
					if (this.dir === 1) {
						this.setFrame('giantRobotJumpR')
					} else {
						this.setFrame('giantRobotJumpL')
					}
				}
			}
		}
	}

	// // override
	// setDestroyed () {
	// 	if (this.dir === -1) {
	// 		this.play('EplodeGiantRobotL')
	// 	} else {
	// 		this.play('EplodeGiantRobotR')
	// 	}
	// }
}
class Giantrobots extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, giantRobotsData, solidLayer, enemyBullets) {
		super(scene.physics.world, scene)
		giantRobotsData.forEach((robotData) => {
			this.add(new Giantrobot(scene, hero, robotData, enemyBullets))
		})
		scene.physics.add.collider(solidLayer, this)
		this.children.iterate(robo => {
			robo.setGravityY(200)
		})
  }
}
// <-- minirobots