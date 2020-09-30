class GlowThrowerSegment extends EnemyObj {
  constructor (scene, hero, glowThrowerData) {
		super(scene, hero, glowThrowerData.x + 8, glowThrowerData.y + 8, 'enemiesSpriteAtlas')
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}

class GlowThrower extends Phaser.Physics.Arcade.Group {
	constructor (scene, hero, glowThrowerData) {
		super(scene.physics.world, scene)
		this.add(new GlowThrowerSegment(scene, hero, glowThrowerData))
	}
}