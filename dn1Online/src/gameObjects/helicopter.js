class Helicopter extends EnemyObj {
  constructor (scene, hero, roboData) {
		super(
			scene,
			hero,
			roboData.x + roboData.width / 2,
			roboData.y + roboData.height / 2,
			'enemiesSpriteAtlas',
			roboData.properties.frameL
		)
	
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class Helicopters extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, helisData, solidLayer) {
		super(scene.physics.world, scene)
		helisData.forEach((heliData) => {
			this.add(new Helicopter(scene, hero, heliData))
		})
		scene.physics.add.collider(solidLayer, this)
  }
}