class DangleTile extends Phaser.GameObjects.Rectangle {
	constructor(scene, dangleTileData) {
			super(
				scene,
				dangleTileData.x + dangleTileData.width / 2,
				dangleTileData.y + dangleTileData.height / 2,
				dangleTileData.width,
				dangleTileData.height
			)
			scene.add.existing(this)
			scene.physics.add.existing(this)
			this.body.immovable = true
	}
}

class DangleTiles extends Phaser.GameObjects.Group {
  constructor (scene, dangleTilesData) {
		super(scene.physics.world, scene)
		dangleTilesData.forEach((dangleTileData) => {
			this.add(new DangleTile(scene, dangleTileData))
		})
  }
}