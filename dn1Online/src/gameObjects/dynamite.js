class Floorfire extends EnemyObj {
  constructor (scene, hero, dynamiteData) {
		super(scene, hero, dynamiteData.x + 8, dynamiteData.y + 8, 'enemiesSpriteAtlas', dynamiteData.properties.frame)
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	
	}
}

class DynamiteBoxes extends Phaser.Physics.Arcade.Group {
	constructor (scene, hero, dynamiteDatas, solidLayer) {
		super(scene.physics.world, scene)
		dynamiteDatas.forEach((dynamiteData) => {
			this.add(new Floorfire(scene, hero, dynamiteData))
		})
		scene.physics.add.collider(solidLayer, this)
	}
}