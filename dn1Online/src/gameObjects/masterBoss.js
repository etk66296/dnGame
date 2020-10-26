class MasterBoss extends EnemyObj {
  constructor (scene, hero, masterBossData, solidLayer, enemyBullets) {
		super(
			scene,
			hero,
			masterBossData.x + masterBossData.width / 2,
			masterBossData.y + masterBossData.height / 2,
			'enemiesSpriteAtlas',
			masterBossData.properties.frameAL
		)
		this.worldData = masterBossData
		this.points = this.worldData.properties.points
		this.lifes = 10
		this.lastDirX = 1
		this.lastDirY = -1
		this.enemyBullets = enemyBullets
		this.tweenIn = 0
		
		this.moveXDeltaTime = 3000
		this.elapsedMoveXDeltaTime = 0
		this.moveYDeltaTime = 2000
		this.elapsedMoveYDeltaTime = 0
		this.startMovingX = false
		this.startMovingY = false
		scene.physics.add.collider(solidLayer, this)
		this.startMoving = false
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (!this.startMoving && Phaser.Math.Distance.Between(this.x, this.y, this.hero.x, this.hero.y) < 230) {
			this.startMoving = true
		}
		if (this.startMoving && this.isAlive) {
			this.tweenIn += 0.1
			// hover up and down
			this.setVelocityY(this.body.velocity.y + 10 * Math.sin(this.tweenIn))
			if (this.body.velocity.y >= 0) {
				if (this.lastDirX === 1) {
					this.setFrame(this.worldData.properties.frameAR)
				} else {
					this.setFrame(this.worldData.properties.frameAL)
				}
			} else if (this.body.velocity.y < 0) {
				if (this.lastDirX === 1) {
					this.setFrame(this.worldData.properties.frameBR)
				} else {
					this.setFrame(this.worldData.properties.frameBL)
				}
			}

			// trigger moving on the x axis
			if (Phaser.Math.Distance.Between(this.x, this.y, this.hero.x, this.hero.y) > 32) {
				this.elapsedMoveXDeltaTime += delta
				if (this.elapsedMoveXDeltaTime > this.moveXDeltaTime) {
					this.startMovingX = true
					this.elapsedMoveXDeltaTime = 0
				}
			}

			// trigger moving on the y axis
			if (Phaser.Math.Distance.Between(this.x, this.y, this.hero.x, this.hero.y) > 32) {
				this.elapsedMoveYDeltaTime += delta
				if (this.elapsedMoveYDeltaTime > this.moveYDeltaTime) {
					this.startMovingY = true
					this.elapsedMoveYDeltaTime = 0
				}
			}
			
			
			
			// move to the other side
			if (this.startMovingX) {
				if (Math.abs(this.body.velocity.x) < 100){
					this.setVelocityX(this.body.velocity.x + (1 * this.lastDirX))
				} else {
					this.startMovingX = false
					this.setVelocityX(0)
				}
			}

			// move up and down
			if (this.startMovingY) {
				if (Math.abs(this.body.velocity.y) < 75){
					this.setVelocityY(this.body.velocity.y + (1 * this.lastDirY))
				} else {
					this.startMovingY = false
					this.setVelocityY(0)
				}
			}


			// orientation always to the hero
			if (this.hero.x <= this.x) {
				this.lastDirX = -1
			} else if (this.hero.x > this.x) {
				this.lastDirX = 1
			}

			if (this.hero.y >= this.y) {
			this.lastDirY = 1
			} else if (this.hero.x < this.x) {
				this.lastDirY = -1
			}
		}
	}
}
