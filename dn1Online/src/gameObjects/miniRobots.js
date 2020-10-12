class Minirobot extends EnemyObj {
  constructor (scene, hero, robotData) {
		super(scene, hero, robotData.x + 8, robotData.y + 10, 'enemiesSpriteAtlas')
		this.lastDir = -1
		this.points = robotData.properties.points
		this.worldData = robotData
		this.definedVelocity = 50
		this.play('minirobotAlive')
		this.setSize(16, 20)
		this.setVelocityX(this.lastDir * this.definedVelocity)
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.velocity.x === 0) {
			this.lastDir *= -1
			this.setVelocityX(this.lastDir * this.definedVelocity)
		}
	}
}
class Minirobots extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, robotsData, solidLayer) {
		super(scene.physics.world, scene)
		robotsData.forEach((robotData) => {
			this.add(new Minirobot(scene, hero, robotData))
		})
		scene.physics.add.collider(solidLayer, this)
  }
}