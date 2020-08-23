// depends on intro scene, which is loading the giftsSpriteAtlas sprite sheet
// point fyler -->
class PointsFlyer extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
		super(scene, x, y, 'giftsSpriteAtlas', 'Points_Test')
		scene.add.existing(this)
		this.alpha = 1.0
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if(this.active) {
			this.alpha -= 0.001
			this.setAlpha(this.alpha)
			if(this.alpha <= 0) {
				this.body.reset(-100, -100)
				this.setActive(false)
				this.setVisible(false)
				this.alpha = 1.0
			}
		}
	}
	fly (x, y, frame) {
		this.body.reset(x, y)
		this.setFrame(frame)
		this.setActive(true)
		this.setVisible(true)
		this.setVelocityY(-5)
	}
}
class PointsFlyers extends Phaser.Physics.Arcade.Group {
  constructor (scene) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 20,
      key: 'pointsFlyers',
      active: false,
      visible: false,
      classType: PointsFlyer
    })
  }
	showUp (x, y, frame) {
		let pointsFlyer = this.getFirstDead(false)
    if (pointsFlyer) {
      pointsFlyer.fly(x, y, frame)
		}
  }
}
// <-- point flyer