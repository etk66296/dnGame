class NeedleTile extends EnemyObj {
  constructor (scene, hero, needleTileData) {
		super(
			scene,
			hero,
			needleTileData.x + needleTileData.width / 2,
			needleTileData.y + needleTileData.height / 2,
			'enemiesSpriteAtlas',
			needleTileData.properties.frame
		)
		this.setSize(16, 16)
		this.setOffset(0, 10)
		this.setDepth(2) // just one layer over the hero sprite
		this.needleTileData = needleTileData
		this.ontouched = false
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.touching.up && !this.ontouched) {
			this.play(this.needleTileData.properties.animA)
			this.ontouched = true
		} else {
			this.ontouched = false
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