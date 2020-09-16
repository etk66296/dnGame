class DangleTile extends Phaser.GameObjects.Rectangle {
	constructor(scene, hero, dangleTileData) {
			super(
				scene,
				dangleTileData.x + dangleTileData.width / 2,
				dangleTileData.y + dangleTileData.height / 2,
				dangleTileData.width,
				dangleTileData.height
			)
			scene.add.existing(this)
			scene.physics.add.existing(this)
			this.setActive(true)
			this.body.immovable = true
			this.hero = hero
			scene.physics.add.collider(this, hero)
	}
	preUpdate (time, delta) {
		if (this.body.touching.down && this.hero.hasDangleClaws) {
			this.hero.allowDangling = true
			this.hero.setGravityY(-300)
		} else {
			this.hero.allowDangling = false
			this.hero.setGravityY(300)
		}
	}
}

class DangleTiles extends Phaser.GameObjects.Group {
  constructor (scene, hero, dangleTilesData) {
		super(scene.physics.world, scene)
		dangleTilesData.forEach((dangleTileData) => {
			this.add(new DangleTile(scene, hero, dangleTileData))
		})
		
  }
}