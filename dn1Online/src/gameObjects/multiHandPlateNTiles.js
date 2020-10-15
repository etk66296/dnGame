class MultiHandPlate extends PhysicsObj {
	constructor(scene, hero, multiHandPlateData, multiHandSystem) {
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
			this.setDepth(0)
			this.heroOverlapEvent = scene.physics.add.overlap(this, hero, () => {
				if (this.hero.hasMultiHand) {
					if (this.hero.gameControls.key_USE.isDown ||
							this.hero.gameControls.touch_USE.isDown) {
						// enable all multihand tiles
						this.setActive(false)
						this.multiHandSystem.tilesEnabled = true
						this.scene.physics.world.removeCollider(this.heroOverlapEvent)
					}
				}
			})
			this.multiHandSystem = multiHandSystem
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class MultiHandTile extends PhysicsObj {
	constructor(scene, hero, multiHandTileData, multiHandSystem) {
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
			this.setVisible(false)
			this.play(multiHandTileData.properties.anim)
			this.tileIndex = multiHandTileData.properties.index
			this.body.immovable = true
			this.hero = hero
			this.multiHandSystem = multiHandSystem
			this.delayTime = 200
			this.enabled = false
			this.timeDelayEvent = null
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.multiHandSystem.tilesEnabled && !this.enabled) {
			// start enable time
			this.enabled = true
			this.timeDelayEvent = this.scene.time.addEvent({
				delay: this.tileIndex * this.delayTime,
				callback: () => {
					this.setVisible(true)
					this.timeDelayEvent.remove(false)
					this.scene.physics.add.collider(this, this.hero, () => {
						if (this.body.touching.up) {
							this.hero.body.blocked.down = true
						}
					})
				}
			})
		}
	}
}

class MultiHandPlateAndTiles extends Phaser.GameObjects.Group {
  constructor (scene, hero, multiHandData) {
		super(scene.physics.world, scene)
		this.tilesEnabled = false
		multiHandData.forEach((mhData) => {
			if (mhData.type === 'plate') {
				this.add(new MultiHandPlate(scene, hero, mhData, this))
			}
		})
		multiHandData.forEach((mhData) => {
			if (mhData.type === 'tile') {
				this.add(new MultiHandTile(scene, hero, mhData, this))
			}
		})
		
  }
}