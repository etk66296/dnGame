class FlyRobot extends EnemyObj {
  constructor (scene, hero, roboData, enemyBullets) {
		super(
			scene,
			hero,
			roboData.x + roboData.width / 2,
			roboData.y + roboData.height / 2,
			'enemiesSpriteAtlas',
			roboData.properties.frameL
		)
		this.worldData = roboData
		this.points = this.worldData.properties.points
		this.lifes = 1
		this.lastDirX = -1
		this.lastDirY = -1
		this.constantVelocity = {x: 20, y: 10}
		this.enemyBullets = enemyBullets
		this.body.setSize(18, 20, true)
		// this.body.setOffset(0, 2)
		this.cutterObj = this.scene.add.sprite(roboData.x + 8, roboData.y + 16, 'enemiesSpriteAtlas')
		this.cutterObj.play(roboData.properties.animC)
		this.constFireDeltaTime = 2000
		this.fireElapsedTime = 0
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (Math.abs(this.x - this.hero.x) > 15) {
			if (this.hero.x < this.x && this.lastDirX != -1) {
				this.lastDirX = -1
				this.play(this.worldData.properties.animRL)
			}
			if (this.hero.x > this.x && this.lastDirX != 1) {
				this.lastDirX = 1
				this.play(this.worldData.properties.animLR)
			}
		}
		if (Math.abs(this.y - this.hero.y) > 15) {
			if ((this.hero.y - 24)< this.y && this.lastDirY != -1) {
				this.lastDirY = -1
			}
			if ((this.hero.y - 24) > this.y && this.lastDirY != 1) {
				this.lastDirY = 1
			}
		}
		if (Math.abs(this.hero.x - this.x) < 150) {
			this.body.setVelocityX(this.lastDirX * this.constantVelocity.x)
			this.cutterObj.setPosition(this.x, this.y + 9)
		}
		if (Math.abs(this.hero.y - this.y) < 150) {
			this.body.setVelocityY(this.lastDirY * this.constantVelocity.y)
			this.cutterObj.setPosition(this.x, this.y + 9)
		}
		
		// fire bullet
		if (!this.anims.isPlaying) {
			this.fireElapsedTime += delta
			if (this.fireElapsedTime >= this.constFireDeltaTime ) {
				this.fireElapsedTime = 0
				this.enemyBullets.fireBullet(this.x, this.y, this.lastDirX)
			}
		}
		if (!this.isAlive) {
			this.cutterObj.setActive(false)
			this.cutterObj.setVisible(false)
		}
	}
}
class FlyRobots extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, flyRobotsData, solidLayer, enemyBullets) {
		super(scene.physics.world, scene)
		flyRobotsData.forEach((robotData) => {
			this.add(new FlyRobot(scene, hero, robotData, enemyBullets))
		})
		scene.physics.add.collider(solidLayer, this)
		this.children.iterate(robot => {
			scene.physics.add.collider(robot, hero, () => {
				if (hero.body.touching.down && robot.body.touching.up) {
					robot.lifes = 0
					robot.setDestroyed()
					robot.isAlive = false
				} else {
					this.hero.painState = true
				}
			})
		})
  }
}