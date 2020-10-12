class DecoTile extends Phaser.GameObjects.Sprite {
  constructor (scene, decoData) {
		super(
			scene,
			decoData.x + decoData.width / 2,
			decoData.y + decoData.height / 2,
			'decorationSpriteAtlas'
		)
		scene.add.existing(this)
		this.decoData = decoData
		this.setActive(true)
		this.setVisible(true)
		this.timeEvent = null
		if (decoData.name === 'CyberWindow') {
			this.timeEvent = this.scene.time.addEvent({
				// delay: Phaser.Math.Between(0, 5000),
				delay: decoData.properties.delay,
				callback: () => {
					this.play(this.decoData.properties.anim)
					this.timeEvent.remove(false)
				}
			})
		} else {
			this.play(this.decoData.properties.anim)
		}
	}
}
class AnimatedDeco extends Phaser.GameObjects.Group {
  constructor (scene, decosData) {
		super(scene)
		decosData.forEach((decoData, index) => {
			this.add(new DecoTile(scene, decoData))
		})
	}
}