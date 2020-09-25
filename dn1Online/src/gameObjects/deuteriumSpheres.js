class DeuteriumSpere extends EnemyObj {
  constructor (scene, hero, dsData, index) {
		super(
			scene,
			hero,
			dsData.x + dsData.width / 2,
			dsData.y + dsData.height / 2,
			'enemiesSpriteAtlas',
			dsData.properties.frame
		)
		let animDelayTimeEvent = this.scene.time.addEvent({
			delay: 100 * index,
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
class DeuteriumSperes {
  constructor (scene, hero, deuteriumSpheresData) {
		// super(scene.physics.world, scene)
		this.deuteriumCircles = []
		deuteriumSpheresData.forEach((deuteriumSphereData) => {
			this.deuteriumCircles.push({group: new Phaser.Physics.Arcade.Group(scene), circle: null, data: deuteriumSphereData})
			for (let i = 0; i < deuteriumSphereData.properties.numOfSpheres; i++) {
				this.deuteriumCircles[this.deuteriumCircles.length - 1].group.add(new DeuteriumSpere(scene, hero, deuteriumSphereData, i))
			}
			this.deuteriumCircles[this.deuteriumCircles.length - 1].circle = new Phaser.Geom.Circle(
				deuteriumSphereData.x,
				deuteriumSphereData.y,
				deuteriumSphereData.properties.rotInnerRadius
			)
			Phaser.Actions.PlaceOnCircle(this.deuteriumCircles[this.deuteriumCircles.length - 1].group.getChildren(), this.deuteriumCircles[this.deuteriumCircles.length - 1].circle)
			this.deuteriumCircles[this.deuteriumCircles.length - 1].group.children.iterate((dts) => {
				dts.registerAsPainful()
				dts.registerAsShootable()
			})
		})

		// add the tweens
		this.deuteriumCircles.forEach((dtc) => {
			scene.tweens.add({
        targets: dtc.circle,
        radius: dtc.data.properties.rotOuterRadius,
        ease: 'Quintic.easeInOut',
        duration: dtc.data.properties.duration,
        yoyo: true,
        repeat: -1,
        onUpdate: function ()
        {
            Phaser.Actions.RotateAroundDistance(
							dtc.group.getChildren(),
							{ x: dtc.data.x, y: dtc.data.y },
							dtc.data.properties.rotateDelta,
							dtc.circle.radius
						)
        }
    	})
		})
  }
}