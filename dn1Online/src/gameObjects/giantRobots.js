class Giantrobot extends EnemyObj {
  constructor (scene, hero, roboData, enemyBullets) {
		super(
			scene,
			hero,
			roboData.x + roboData.width / 2,
			roboData.y + roboData.height / 2,
			'enemiesSpriteAtlas',
			'giantRobotL'
		)
		this.jumpDeltaTime = 0
		this.timeToNextJump = 2000
		this.fireDeltaTime = 0
		this.timeToNextShot = 2000
		this.enemyBullets = enemyBullets
		this.dir = -1
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		// jump -->
		this.jumpDeltaTime += delta
		if (this.timeToNextJump <= this.jumpDeltaTime) {
			this.setVelocityY(-200)
			this.timeToNextJump = Phaser.Math.Between(3000, 5000)
			this.jumpDeltaTime = 0
		}
		// <-- jump
		// shot -->
		this.fireDeltaTime += delta
		if (this.timeToNextShot <= this.fireDeltaTime) {
			this.timeToNextShot = Phaser.Math.Between(100, 3000)
			this.fireDeltaTime = 0
			this.enemyBullets.fireBullet(this.x, this.y, -1)
		}
		// <-- shot
		// set the direction -->
		// <-- set the direction

		if (this.body.onFloor()) {
			this.setFrame('giantRobotL')
		} else {
			this.setFrame('giantRobotJumpL')
		}
	}
	
	explode() {
		this.isDestroyed = true
		if (this.lastDir === -1) {
			this.play('EplodeGiantRobotL')
		} else {
			this.play('EplodeGiantRobotR')
		}
	}
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