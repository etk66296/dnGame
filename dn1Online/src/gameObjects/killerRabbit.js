class KillerRabbit extends EnemyObj {
  constructor (scene, hero, killerRabbitData) {
		super(
			scene,
			hero,
			killerRabbitData.x + killerRabbitData.width / 2,
			killerRabbitData.y + killerRabbitData.height / 2,
			'enemiesSpriteAtlas',
			killerRabbitData.properties.frame,
			'fumeExplosion'
		)
		this.fumeHoodVel = -20
		this.scene.physics.add.overlap(this, this.hero, () => {
			this.hero.addPoints(killerRabbitData.properties.pointsB)
			this.setDestroyed()
			this.hero.painState = true
			this.isAlive = false
		})
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class KillerRabbits extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, killerRabbitsData, solidLayer) {
		super(scene.physics.world, scene)
		killerRabbitsData.forEach((killerRabbitData) => {
			this.add(new KillerRabbit(scene, hero, killerRabbitData))
		})
		scene.physics.add.collider(solidLayer, this)
		// this.children.iterate(robo => {
		// 	robo.setGravityY(200)
		// })
  }
}