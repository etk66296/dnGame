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
		this.points = washerBossData.properties.points
		this.play(washerBossData.properties.animA)
		this.group = null
		this.noiseSound = null
		this.index = index
		if (index === 1) {
			this.noiseSound = scene.sound.add('washerNoise')
			this.noiseSound.config.loop = true
			this.noiseSound.config.volume = 0
			this.noiseSound.play()
		}
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.lifes <= 0) {
			this.group.children.iterate(segment => {
				segment.lifes = 0
				segment.isAlive = false
				if (this.index === 1) {
					this.noiseSound.stop()
				}
				segment.setDestroyed()
			})
		}
		if (this.index === 1) {
			if(this.hero.y >= (this.y - 32) && this.hero.y <= (this.y + 64)) {
				this.noiseSound.setVolume(1.0 - (Math.abs(this.x - this.hero.x)) / 180)
			} else {
				this.noiseSound.setVolume(0)
			}
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