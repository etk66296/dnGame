class WheelCanon extends EnemyObj {
  constructor (scene, hero, wheelCanonData) {
		super(
			scene,
			hero,
			wheelCanonData.x + wheelCanonData.width / 2,
			wheelCanonData.y + wheelCanonData.height / 2,
			'enemiesSpriteAtlas',
			wheelCanonData.properties.frame
		)
		this.lifes = 2
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class WheelCanons extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, wheelCanonsData, solidLayer) {
		super(scene.physics.world, scene)
		wheelCanonsData.forEach((wheelCanonDataData) => {
			this.add(new WheelCanon(scene, hero, wheelCanonDataData))
		})
		scene.physics.add.collider(solidLayer, this)
  }
}