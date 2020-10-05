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

		// point flyer
		this.points = killerRabbitData.properties.pointsA
		this.pointFlyerAnim = 'Points' + String(killerRabbitData.properties.pointsA)
		this.pointFlyerAlpha = 1.0
		this.pointFlyerAnimObj = this.scene.add.sprite(
			-100,
			-100,
			'giftsSpriteAtlas'
		)
		this.pointFlyerAnimObj.setVisible(false)
		this.pointFlyerAnimObj.setActive(false)
		this.pointFlyerAnimObj.on('animationcomplete', () => {
			if (this.pointFlyerAlpha === 1.0) {
				this.pointFlyerAnimObj.setPosition(this.x, this.y)
			}
			this.pointFlyerAnimObj.y -= 1
			this.pointFlyerAlpha -= 0.015
			this.pointFlyerAnimObj.setAlpha(this.pointFlyerAlpha)
			if (this.pointFlyerAlpha <= 0) {
				this.pointFlyerAnimObj.setVisible(false)
				this.pointFlyerAnimObj.setActive(false)
			}
		})

		// motion
		this.killerRabbitData = killerRabbitData
		this.definedVelocity = -65
		this.lastDir = -1
		this.setVelocityX(this.lastDir * this.definedVelocity)
		this.play(killerRabbitData.properties.animL)

		// hero hit
		this.scene.physics.add.overlap(this, this.hero, () => {
			this.setVelocityX(0)
			this.body.checkCollision.none = true
			this.play(killerRabbitData.properties.animDie)
			let animDelayTimeEvent = this.scene.time.addEvent({
				delay: 1500,
				callback: () => {
					this.setDestroyed()
					animDelayTimeEvent.remove(false)
				}
			})
			this.hero.painState = true
			this.isAlive = false
			this.points = killerRabbitData.properties.pointsB
			this.pointFlyerAnim = 'Points' + String(killerRabbitData.properties.pointsB)
		})
		
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		// animation
		if (!this.isAlive) {
			this.pointFlyerAnimObj.setVisible(true)
			this.pointFlyerAnimObj.setActive(true)
			this.pointFlyerAnimObj.play(this.pointFlyerAnim)
		} else {
		// motion
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
}
class KillerRabbits extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, killerRabbitsData, solidLayer) {
		super(scene.physics.world, scene)
		killerRabbitsData.forEach((killerRabbitData) => {
			this.add(new KillerRabbit(scene, hero, killerRabbitData))
		})
		scene.physics.add.collider(solidLayer, this)
  }
}
