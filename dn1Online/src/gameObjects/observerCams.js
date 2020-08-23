class GameCam extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
		super(scene, x, y, 'enemiesSpriteAtlas', 'camera_M')
		scene.add.existing(this)
		scene.physics.add.existing(this)
	}
	setup() {
		this.on('animationcomplete', () => {
			this.setDestroyed()
		})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if(!this.anims.isPlaying) {
			if ((this.x + 16) < this.scene.hero.x) {
				if(this.frame !== 'camera_R') {
					this.setFrame('camera_R')
				}
			} else if (this.x < this.scene.hero.x && (this.x + 16) >= this.scene.hero.x) {
				if(this.frame !== 'camera_M') {
					this.setFrame('camera_M')
				}
			} else {
				if(this.frame !== 'camera_L') {
					this.setFrame('camera_L')
				}
			}
		}
	}
	setDestroyed () {
		this.body.reset(-100, -100)
		this.setActive(false)
		this.setVisible(false)
	}
}
class GameCams extends Phaser.Physics.Arcade.Group {
  constructor (scene, camsData, bullets, pointFlyers, explosionSound) {
		super(scene.physics.world, scene)
		camsData.forEach((camData) => {
			this.add(new GameCam(scene, camData.x + 8, camData.y + 8))
		})
		scene.physics.add.collider(this, bullets, (cam, bullet) => {
			if (!explosionSound.isPlaying) {
				explosionSound.play()
			}
			bullet.body.checkCollision.none = true
			cam.body.checkCollision.none = true
			cam.setVelocityX(cam.body.velocity.x / 10)
			cam.setVelocityY(15)
			bullet.setVelocityX(bullet.body.velocity.x / 5)
			bullet.play('heroExplode')
			cam.play('explodeEnemy')
			pointFlyers.showUp(cam.x, cam.y, 'Points_100') // 100 points for a destroyed camera
		})
  }
}