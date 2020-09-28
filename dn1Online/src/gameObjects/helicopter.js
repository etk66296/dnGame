class Helicopter extends EnemyObj {
  constructor (scene, hero, heliData) {
		super(
			scene,
			hero,
			heliData.x + heliData.width / 2,
			heliData.y + heliData.height / 2,
			'enemiesSpriteAtlas',
			heliData.properties.frameL
		)
		this.lifes = 4
		this.heliData = heliData
		this.lastDirX = -1
		this.lastDirY = -1
		this.play(heliData.properties.animAL)
		this.currentDist = 0
		this.constantVelocity = {x: 50, y: 10}

		// exhaust animation
		this.exhaust = this.scene.add.sprite(
			this.x,
			this.y,
			'enemiesSpriteAtlas'
		)
		this.exhaust.play('exhaust')
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		this.currentDist = Phaser.Math.Distance.Between(this.x, this.y, this.hero.x, this.hero.y)
		if (this.currentDist < this.heliData.properties.startMovingDist &&
			Math.abs(this.x - this.hero.x) > 25) {
			if (this.x < this.hero.x && this.lastDirX != 1) {
				this.lastDirX = 1
				this.play(this.heliData.properties.animAR)
			}
			if (this.x >= this.hero.x && this.lastDirX != -1) {
				this.lastDirX = -1
				this.play(this.heliData.properties.animAL)
			}
			// if the hero is under the helicopter go down and fight
			if (Math.abs(this.x - this.hero.x) <= 60 && this.lastDirY !== 1) {
				this.constantVelocity.y = 30
				this.lastDirY = 1
			}
			if (Math.abs(this.x - this.hero.x) > 60 && this.lastDirY !== -1) {
				this.constantVelocity.y = 10
				this.lastDirY = -1
			}
			this.body.setVelocityY(this.lastDirY * this.constantVelocity.y)
			this.body.setVelocityX(this.lastDirX * this.constantVelocity.x)
		}
		if (!this.exhaust.anims.isPlaying) {
			this.exhaust.setPosition(
				Phaser.Math.Between(this.x - 10, this.x + 10),
				Phaser.Math.Between(this.y - 10, this.y + 10),
			)
			this.exhaust.play('exhaust')
		}
		if (!this.isAlive) {
			this.exhaust.setVisible(false)
			this.exhaust.setActive(false)
		}
	}
}
class Helicopters extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, helisData, solidLayer) {
		super(scene.physics.world, scene)
		helisData.forEach((heliData) => {
			this.add(new Helicopter(scene, hero, heliData))
		})
		scene.physics.add.collider(solidLayer, this)
  }
}