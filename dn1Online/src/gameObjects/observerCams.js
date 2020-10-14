class ObserverCam extends EnemyObj {
  constructor (scene, hero, camData) {
		super(
			scene,
			hero,
			camData.x + 8,
			camData.y + 8,
			'enemiesSpriteAtlas',
			camData.properties.frame
		)
		this.camData = camData
		this.points = camData.properties.points
		this.setSize(16, 18)
		this.setOffset(0, 2)
		// extra sprite for showing points after the cam was shot
		this.activeAfterDead = true
		this.pointFlyerAnimObj = this.scene.add.sprite(camData.x + 8, camData.y + 8, 'giftsSpriteAtlas')
		this.pointFlyerAnimObj.setVisible(false)
		this.pointFlyerAnimObj.setActive(false)
		this.pointFlyerAnim = 'Points' + String(camData.properties.points)
		this.pointFlyerAlpha = 1.0
		this.pointFlyerAnimObj.on('animationcomplete', () => {
			this.pointFlyerAnimObj.setPosition(this.pointFlyerAnimObj.x, this.pointFlyerAnimObj.y - 0.25)
			this.pointFlyerAlpha -= 0.015
			this.pointFlyerAnimObj.setAlpha(this.pointFlyerAlpha)
			if (this.pointFlyerAlpha <= 0) {
				this.pointFlyerAnimObj.setVisible(false)
				this.pointFlyerAnimObj.setActive(false)
				// active after dead was enabled => child class have to deactivate the sprite
				this.setActive(false)
			}
		})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.isAlive) {
			if(!this.anims.isPlaying) {
				if ((this.x + 16) < this.hero.x) {
					if(this.frame !== 'camera_R') {
						this.setFrame('camera_R')
					}
				} else if (this.x < this.hero.x && (this.x + 16) >= this.hero.x) {
					if(this.frame !== 'camera_M') {
						this.setFrame('camera_M')
					}
				} else {
					if(this.frame !== 'camera_L') {
						this.setFrame('camera_L')
					}
				}
			}
		} else { // dead
			this.pointFlyerAnimObj.setVisible(true)
			this.pointFlyerAnimObj.setActive(true)
			this.pointFlyerAnimObj.play(this.pointFlyerAnim)
		}
	}
}
class ObserverCams extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, camsData) {
		super(scene.physics.world, scene)
		camsData.forEach((camData) => {
			this.add(new ObserverCam(scene, hero, camData))
		})
  }
}