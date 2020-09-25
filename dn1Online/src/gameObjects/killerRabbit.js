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
		// animation
		this.activeAfterDead = true

		// motion
		this.killerRabbitData = killerRabbitData
		this.definedVelocity = -65
		this.lastDir = -1
		this.setVelocityX(this.lastDir * this.definedVelocity)
		this.play(killerRabbitData.properties.animL)
		
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.velocity.x === 0) {
			this.lastDir *= -1
			if (this.lastDir === 1) {
				this.play(this.killerRabbitData.properties.animR)
			} else {
				this.play(this.killerRabbitData.properties.animL)
			}
			this.setVelocityX(this.lastDir * this.definedVelocity)
		}
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

// class KillerRabbit extends EnemyObj {
//   constructor (scene, hero, killerRabbitData) {
// 		super(
// 			scene,
// 			hero,
// 			killerRabbitData.x + killerRabbitData.width / 2,
// 			killerRabbitData.y + killerRabbitData.height / 2,
// 			'enemiesSpriteAtlas',
// 			killerRabbitData.properties.frame,
// 			'fumeExplosion'
// 		)
// 		this.killerRabbitData = killerRabbitData
// 		this.points = killerRabbitData.properties.pointsA
// 		this.pointFlyerAnim = 'Points' + String(killerRabbitData.properties.pointsA)
// 		this.pointFlyerAlpha = 1.0
// 		this.activeAfterDead = true
// 		this.fumeHoodVel = -20
// 		this.pointFlyerAnimObj = this.scene.add.sprite(
// 			killerRabbitData.x + killerRabbitData.width / 2,
// 			killerRabbitData.y + killerRabbitData.height / 2,
// 			'giftsSpriteAtlas'
// 		)
// 		this.pointFlyerAnimObj.setVisible(false)
// 		this.pointFlyerAnimObj.setActive(false)
		
// 		this.pointFlyerAnimEvent = this.pointFlyerAnimObj.on('animationcomplete', () => {
// 			this.pointFlyerAnimObj.setPosition(this.pointFlyerAnimObj.x, this.pointFlyerAnimObj.y - 0.25)
// 			this.pointFlyerAlpha -= 0.015
// 			this.pointFlyerAnimObj.setAlpha(this.pointFlyerAlpha)
// 			if (this.pointFlyerAlpha <= 0) {
// 				this.pointFlyerAnimObj.setVisible(false)
// 				this.pointFlyerAnimObj.setActive(false)
// 				scene.physics.world.removeCollider(this.pointFlyerAnimEvent)
// 			}
// 		})

// 		this.dieAnimEvent = this.on('animationcomplete', () => {
// 			if (this.anims.currentAnim.key === killerRabbitData.properties.animDie) {
// 				this.setDestroyed()
// 			}
// 		})

// 		this.scene.physics.add.overlap(this, this.hero, () => {
// 			// this.body.checkCollision.none = true
// 			this.play(killerRabbitData.properties.animDie)
// 			this.hero.painState = true
// 			this.isAlive = false
// 			this.points = killerRabbitData.properties.pointsB
// 			this.pointFlyerAnim = 'Points' + String(killerRabbitData.properties.pointsB)
// 		})

// 		this.lastDir = -1
// 		this.definedVelocity = -80
// 		this.play(this.killerRabbitData.properties.animL)
// 	}
	
// 	preUpdate (time, delta) {
// 		super.preUpdate(time, delta)
// 		if (this.body.velocity.x === 0) {
// 			this.lastDir *= -1
// 			if (this.lastDir === 1) {
// 				this.play(this.killerRabbitData.properties.animR)
// 			} else if (this.lastDir === -1) {
// 				this.play(this.killerRabbitData.properties.animL)
// 			}
// 			this.setVelocityX(this.lastDir * this.definedVelocity)
// 		}
// 		if (!this.isAlive) {
// 			this.hero.addPoints(this.points)
// 			this.pointFlyerAnimObj.setVisible(true)
// 			this.pointFlyerAnimObj.setActive(true)
// 			this.pointFlyerAnimObj.play(this.pointFlyerAnim)
// 		}
// 	}
// }