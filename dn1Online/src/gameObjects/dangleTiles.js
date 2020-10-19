class DangleTile extends Phaser.GameObjects.Rectangle {
	constructor(scene, hero, dangleTileData, railGroup) {
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
			this.worldData = dangleTileData
			this.railGroup = railGroup
			this.railInUse = false

	}
	preUpdate (time, delta) {
		if (!this.railGroup.inUse || this.railInUse) {
			this.railGroup.inUse = true // if one dangle rail gets hangs the hero it must block all others, thus the other dangle tiles do not let the hero fall
			this.railInUse = true
			if (this.body.touching.down && this.hero.hasDangleClaws) {
				this.hero.allowDangling = true
				this.hero.allowDanglePullUp = this.worldData.properties.allowPullUp
				this.hero.setGravityY(-300)
				this.railGroup.inUse = true
			} else {
				this.hero.allowDangling = false
				this.hero.setGravityY(300)
				this.railGroup.inUse = false
				this.railInUse = false
			}
		}
	}
}

class DangleTiles extends Phaser.GameObjects.Group {
  constructor (scene, hero, dangleTilesData) {
		super(scene.physics.world, scene)
		this.inUse = false 
		dangleTilesData.forEach((dangleTileData) => {
			this.add(new DangleTile(scene, hero, dangleTileData, this))
		})
		this.children.iterate(dangleTile => {
			scene.physics.add.collider(dangleTile, hero)
		})
  }
}