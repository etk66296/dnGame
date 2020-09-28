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
		this.constantVelocity = {x: 50, y: 5}
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		this.currentDist = Phaser.Math.Distance.Between(this.x, this.y, this.hero.x, this.hero.y)
		if (this.currentDist < this.heliData.properties.startMovingDist &&
			this.currentDist > 30) {
			if (this.x < this.hero.x && this.lastDirX != 1) {
				this.lastDirX = 1
				this.play(this.heliData.properties.animAR)
			}
			if (this.x >= this.hero.x && this.lastDirX != -1) {
				this.lastDirX = -1
				this.play(this.heliData.properties.animAL)
			}
			this.body.setVelocityX(this.lastDirX * this.constantVelocity.x)
			this.body.setVelocityY(this.lastDirY * this.constantVelocity.y)
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