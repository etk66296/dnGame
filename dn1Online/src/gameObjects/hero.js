class Hero extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, solidLayer) {
		super(scene, x, y, 'heroSpriteAtlas')
		scene.physics.add.existing(this)
		this.solidLayer = solidLayer
		this.equipment = null
		return this
	}
	setup() {
		this.body.setSize(10, 32, true)
		this.body.setOffset(11, 0)
		this.setGravityY(300)
		this.setBounce(0.0)
		this.play('heroJumpRight')
		this.scene.physics.add.collider(this, this.solidLayer)
		this.equipment = { nextPosIndex: 0, positions: [
			{ x: 16, y: 16 },
			{ x: 16 + 18, y: 16 },
			{ x: 16 + 18 * 2, y: 16 },
			{ x: 16 + 18 * 3, y: 16 },
			{ x: 16 + 18 * 4, y: 16 },
			{ x: 16, y: 16 + 18 },
			{ x: 16 + 18, y: 16 + 18 },
			{ x: 16 + 18 * 2, y: 16 + 18 },
			{ x: 16 + 18 * 3, y: 16 + 18 },
			{ x: 16 + 18 * 4, y: 16 + 18 },
			{ x: 16, y: 16 + 18 * 2 },
			{ x: 16 + 18, y: 16 + 18 * 2 },
			{ x: 16 + 18 * 2, y: 16 + 18 * 2 },
			{ x: 16 + 18 * 3, y: 16 + 18 * 2 },
			{ x: 16 + 18 * 4, y: 16 + 18 * 2 },
			{ x: 16, y: 16 + 18 * 3 },
			{ x: 16 + 18, y: 16 + 18 * 3 },
			{ x: 16 + 18 * 2, y: 16 + 18 * 3 },
			{ x: 16 + 18 * 3, y: 16 + 18 * 3 },
			{ x: 16 + 18 * 4, y: 16 + 18 * 3 },
			{ x: 16, y: 16 + 18 * 4 },
			{ x: 16 + 18, y: 16 + 18 * 4 },
			{ x: 16 + 18 * 2, y: 16 + 18 * 4 },
			{ x: 16 + 18 * 3, y: 16 + 18 * 4 },
			{ x: 16 + 18 * 4, y: 16 + 18 * 4 },
			{ x: 16, y: 16 + 18 * 5 },
			{ x: 16 + 18, y: 16 + 18 * 5 },
			{ x: 16 + 18 * 2, y: 16 + 18 * 5 },
			{ x: 16 + 18 * 3, y: 16 + 18 * 5 },
			{ x: 16 + 18 * 4, y: 16 + 18 * 5 }
		]}
		this.setActive(true)
		this.setVisible(true)
		console.log(this)
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}