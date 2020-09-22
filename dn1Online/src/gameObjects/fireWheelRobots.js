class FireWheelRobot extends EnemyObj {
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
		this.lifes = 2
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
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