class MultiHandPlate extends PhysicsObj {
	constructor(scene, hero, multiHandPlateData) {
			super(
				scene,
				multiHandPlateData.x + multiHandPlateData.width / 2,
				multiHandPlateData.y + multiHandPlateData.height / 2,
				'giftsSpriteAtlas',
				multiHandPlateData.properties.frame
			)
			scene.add.existing(this)
			scene.physics.add.existing(this)
			this.setActive(true)
			this.body.immovable = true
			this.hero = hero
			this.play('MultiHandPlate')
			this.setDepth(-1)
			this.heroOverlapEvent = scene.physics.add.overlap(this, hero)
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (!this.body.touching.none && this.hero.hasMultiHand) {
			this.scene.physics.world.removeCollider(this.heroOverlapEvent)
			console.log('on overlap')
			
		}
		if (this.hero.hasMultiHand) {
			if (this.hero.gameControls.key_USE.isDown || this.hero.gameControls.touch_USE.isDown) {
				// enable all multihand tiles
				this.setActive(false)
				console.log('enable multi hand tiles')
			}
		}
	}
}
class MultiHandTile extends PhysicsObj {
	constructor(scene, hero, multiHandTileData) {
			super(
				scene,
				multiHandTileData.x + multiHandTileData.width / 2,
				multiHandTileData.y + multiHandTileData.height / 2,
				'giftsSpriteAtlas',
				multiHandTileData.properties.frame
			)
			scene.add.existing(this)
			scene.physics.add.existing(this)
			this.setActive(true)
			this.setVisible(true)
			this.play(multiHandTileData.properties.anim)
			this.body.immovable = true
			this.hero = hero
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}

class MultiHandPlateAndTiles extends Phaser.GameObjects.Group {
  constructor (scene, hero, multiHandData) {
		super(scene.physics.world, scene)
		multiHandData.forEach((mhData) => {
			if (mhData.type === 'plate') {
				this.add(new MultiHandPlate(scene, hero, mhData))
			} else {
				this.add(new MultiHandTile(scene, hero, mhData))
			}
		})
		
  }
}