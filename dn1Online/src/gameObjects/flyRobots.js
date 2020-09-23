class FlyRobot extends EnemyObj {
  constructor (scene, hero, roboData) {
		super(
			scene,
			hero,
			roboData.x + roboData.width / 2,
			roboData.y + roboData.height / 2,
			'enemiesSpriteAtlas',
			roboData.properties.frame
		)
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class FlyRobots extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, flyRobotsData, solidLayer, enemyBullets) {
		super(scene.physics.world, scene)
		flyRobotsData.forEach((robotData) => {
			this.add(new FlyRobot(scene, hero, robotData))
		})
		scene.physics.add.collider(solidLayer, this)
		// this.children.iterate(robo => {
		// 	robo.setGravityY(200)
		// })
  }
}