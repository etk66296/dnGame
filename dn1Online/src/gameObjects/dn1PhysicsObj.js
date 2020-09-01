class PhysicsObj extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, spriteSheet, frame) {
		super(scene, x, y, spriteSheet, frame)
		scene.add.existing(this)
		scene.physics.add.existing(this)
	}
}