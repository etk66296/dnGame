// depends on intro scene, which is loading the enemiesSpriteAtlas sprite sheet
// minirobots -->
class Giantrobot extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, enemyBullets, hero) {
		super(scene, x, y, 'enemiesSpriteAtlas', 'giantRobotL')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.lastDir = -1
		this.heroHits = 3
		this.fireDeltaTime = 3000
		this.jumpDeltaTime = Phaser.Math.Between(2000, 4000)
		this.elapsedTimeAfterLastShot = 0
		this.elapsedTimeAfterLastJump = 0
		this.enemyBullets = enemyBullets
		this.hero = hero
		this.isDestroyed = false
	}
	setup() {
		this.setActive(true)
		this.setVisible(true)
		this.setGravityY(200)
		this.on('animationcomplete', () => {
			this.setDestroyed()
		})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if(!this.isDestroyed) {
			if (this.body.onFloor()) {
				this.setVelocityX(0)
				if (this.hero.x > this.x) {
					this.lastDir = 1
					this.setFrame('giantRobotR')
				} else {
					this.lastDir = -1
					this.setFrame('giantRobotL')
				}
			} else {
				if (this.lastDir === 1) {
					this.setFrame('giantRobotJumpR')
				} else {
					this.setFrame('giantRobotJumpL')
				}
			}
			this.elapsedTimeAfterLastShot += delta
			this.elapsedTimeAfterLastJump += delta
			if (this.elapsedTimeAfterLastShot > this.fireDeltaTime) {
				this.elapsedTimeAfterLastShot = 0
				this.enemyBullets.fireBullet(this.x + this.lastDir * 5, this.y - 5, this.lastDir)
			}
			if (this.elapsedTimeAfterLastJump > this.jumpDeltaTime) {
				this.jumpDeltaTime = Phaser.Math.Between(2000, 4000)
				this.elapsedTimeAfterLastJump = 0
				if (this.lastDir === -1) {

				}
				this.setVelocityY(-200)
				this.setVelocityX(50 * this.lastDir)
			}
		}
	}
	setDestroyed() {
		this.body.checkCollision = { none: false, up: false, down: true, left: false, right: false }
		this.setPosition(-100, -100)
		this.setActive(false)
		this.setVisible(false)
	}
	
	explode() {
		this.isDestroyed = true
		if (this.lastDir === -1) {
			this.play('EplodeGiantRobotL')
		} else {
			this.play('EplodeGiantRobotR')
		}
	}
}
class Giantrobots extends Phaser.Physics.Arcade.Group {
  constructor (scene, giantRobotsData, solidLayer, enemyBullets, hero, bullets) {
		super(scene.physics.world, scene)
		giantRobotsData.forEach((robotData) => {
			this.add(new Giantrobot(scene, robotData.x, robotData.y, enemyBullets, hero))
		})
		scene.physics.add.overlap(this, bullets, (robo, bullet) => {
			bullet.body.checkCollision.none = true
			bullet.setVelocityX(bullet.body.velocity.x / 5)
			bullet.play('heroExplode')
			robo.heroHits -= 1
			if (robo.heroHits <= 0) {
				robo.setVelocityX(robo.body.velocity.x / 10)
				robo.setVelocityY(-100)
				robo.explode()
			}
		}, null, this)
		scene.physics.add.collider(solidLayer, this)
  }
}
// <-- minirobots