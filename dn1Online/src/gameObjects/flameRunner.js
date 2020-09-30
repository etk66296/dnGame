class FlameRunner extends EnemyObj { /*the flame runners are not shootable*/
  constructor (scene, hero, flameData) {
		super(scene, hero, flameData.x + 7, flameData.y + 14, 'enemiesSpriteAtlas')
		this.lastDir = -1
		this.definedVelocity = 65
		this.play(flameData.properties.animL)
		this.setVelocityX(this.lastDir * this.definedVelocity)
		this.flameData = flameData
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta) // blocked by a bouncer or a solid layer tile
		if (this.body.velocity.x === 0) {
			this.lastDir *= -1
			if (this.lastDir === 1) {
				this.play(this.flameData.properties.animR)
			} else {
				this.play(this.flameData.properties.animL)
			}
			this.setVelocityX(this.lastDir * this.definedVelocity)
		}
	}
}
class FlameRunners extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, flamesData, solidLayer) {
		super(scene.physics.world, scene)
		flamesData.forEach((flameData) => {
			this.add(new FlameRunner(scene, hero, flameData))
		})
		scene.physics.add.collider(solidLayer, this)
  }
}