class WasherBossSegment extends EnemyObj {
  constructor (scene, hero, washerBossData, index) {
		super(
			scene,
			hero,
			washerBossData.x + 8,
			washerBossData.y + 8 - index * washerBossData.height,
			'enemiesSpriteAtlas',
			washerBossData.properties.frameA
		)
		this.lifes = washerBossData.properties.lifes
		this.play(washerBossData.properties.animA)
		this.group = null
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.lifes <= 0) {
			this.group.children.iterate(segment => {
				segment.setDestroyed()
				segment.lifes = 0
				segment.isAlive = false
			})
		}
	}
}

class WasherBoss extends Phaser.Physics.Arcade.Group {
		constructor (scene, hero, washerBossData) {
			super(scene.physics.world, scene)
			for (let i = 0; i < washerBossData.properties.height; i++) {
				this.add(new WasherBossSegment(scene, hero, washerBossData, i))
			}
			scene.physics.add.collider(hero, this, () => {
				hero.painState = true
			})
			this.children.iterate(segment => {
				segment.setImmovable(true)
				segment.group = this
			})
		}
	}