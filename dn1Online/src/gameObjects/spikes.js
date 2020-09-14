class Spike extends PhysicsObj {
  constructor (scene, hero, spikeData) {
		super(scene, spikeData.x + 8, spikeData.y + 8, 'enemiesSpriteAtlas', 'SpikeBottomUp_0000')
		this.hero = hero
		this.scene.physics.add.overlap(this, this.hero, () => {
			this.hero.painState = true
		})
		this.scene.time.addEvent({
			// delay: Phaser.Math.Between(0, 5000),
			delay: 5000,
			callback: () => {
				this.play('SpikeBottomUp')
			},
			loop: true
		})
	}
	// preUpdate (time, delta) {
	// 	super.preUpdate(time, delta)
	// }
}
class Spikes extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, spikesData) {
		super(scene.physics.world, scene)
		spikesData.forEach((spikeData) => {
			this.add(new Spike(scene, hero, spikeData))
		})
  }
}