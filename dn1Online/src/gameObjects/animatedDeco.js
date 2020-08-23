class CyberWindow extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, animation, index) {
		super(scene, x, y, 'decorationSpriteAtlas')
		scene.add.existing(this)
		this.infiniteAnimation = animation
		this.index = index
	}
	setup () {
		this.setActive(true)
		this.setVisible(true)
		this.play(this.infiniteAnimation)
		this.anims.currentAnim.delay = this.index * 100
	}
}
class AnimatedDeco extends Phaser.GameObjects.Group {
  constructor (scene, decosData) {
		super(scene)
		decosData.forEach((decoData, index) => {
			if (decoData.name === 'CyberWindow') {
				this.add(new CyberWindow(scene, decoData.x + 8, decoData.y + 8, decoData.properties.animation, index + 1))
			}
		})
	}
}