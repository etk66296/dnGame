class GameCam extends EnemyObj {
  constructor (scene, hero, camData) {
		super(
			scene,
			hero,
			camData.x + 8,
			camData.y + 8,
			'enemiesSpriteAtlas',
			camData.properties.frame
		)
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
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
	}
}
class GameCams extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, camsData) {
		super(scene.physics.world, scene)
		camsData.forEach((camData) => {
			console.log(camData)
			this.add(new GameCam(scene, hero, camData))
		})
  }
}