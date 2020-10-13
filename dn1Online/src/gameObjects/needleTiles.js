class NeedleTile extends EnemyObj {
  constructor (scene, hero, needleTileData) {
		super(
			scene,
			hero,
			needleTileData.x + needleTileData.width / 2,
			needleTileData.y + needleTileData.height / 2 - 4,
			'enemiesSpriteAtlas',
			needleTileData.properties.frameA
		)
		this.setSize(16, 17)
		this.setOffset(0, 8)
		this.setDepth(2) // just one layer over the hero sprite
		this.needleTileData = needleTileData
		this.touched = false
		this.allowAnimation = false
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.touching.up) {
			if (!this.touched) {
				this.setFrame(this.needleTileData.properties.frameB)
				this.touched = true
				this.allowAnimation = true
			}
		} else {
			if (this.frame.name === this.needleTileData.properties.frameB && this.allowAnimation) {
				this.play(this.needleTileData.properties.animA)
				this.allowAnimation = false
				this.touched = false
			}
		}
	}
}
class NeedleTiles extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, needleTilesData) {
		super(scene.physics.world, scene)
		needleTilesData.forEach((needleTileData) => {
			this.add(new NeedleTile(scene, hero, needleTileData))
		})
		scene.physics.add.collider(hero, this, (hero, tile) => {
			if (tile.body.touching.up) {
				hero.body.blocked.down = true
				hero.painState = true
			}
		})
		// dont know why, but physics stuff must be done after instantiating
		this.children.iterate(tile => {
			tile.setImmovable(true)
		})
  }
}