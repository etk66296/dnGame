class DeuteriumSpere extends EnemyObj {
  constructor (scene, hero, dsData) {
		super(
			scene,
			hero,
			dsData.x + dsData.width / 2,
			dsData.y + dsData.height / 2,
			'enemiesSpriteAtlas',
			dsData.properties.frame
		)
		let animDelayTimeEvent = this.scene.time.addEvent({
			delay: 100 * dsData.properties.index,
			callback: () => {
				this.play(dsData.properties.animA)
				animDelayTimeEvent.remove(false)
			}
		})
		
		// var stars = this.add.group({ key: 'star', repeat: 30 });

	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class DeuteriumSperes extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, deuteriumSphereData) {
		super(scene.physics.world, scene)
		deuteriumSphereData.forEach((deuteriumSphereData) => {
			this.add(new DeuteriumSpere(scene, hero, deuteriumSphereData, this.circle))
		})
		this.circle = new Phaser.Geom.Circle(
			deuteriumSphereData[0].properties.rotCenterX,
			deuteriumSphereData[0].properties.rotCenterY,
			deuteriumSphereData[0].properties.rotRadius
		)
		Phaser.Actions.PlaceOnCircle(this.getChildren(), this.circle)
    scene.tweens.add({
				targets: this.circle,
				radius: deuteriumSphereData[0].properties.rotRadius + 30,
				ease: 'Quintic.easeInOut',
				duration: 1500,
				yoyo: true,
				repeat: -1,
        onUpdate: () => {
					Phaser.Actions.RotateAroundDistance(
						this.getChildren(),
						{
							x: deuteriumSphereData[0].properties.rotCenterX,
							y: deuteriumSphereData[0].properties.rotCenterY
						},
						0.1,
						this.circle.radius
					)
        }
		})
		// scene.physics.add.collider(solidLayer, this)
		// this.children.iterate(robo => {
		// 	robo.setGravityY(200)
		// })
  }
}