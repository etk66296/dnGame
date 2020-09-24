class DeuteriumSpere extends EnemyObj {
  constructor (scene, hero, dsData) {
		super(
			scene,
			hero,
			dsData.x + dsData.width / 2,
			dsData.y + dsData.height / 2,
			'enemiesSpriteAtlas',
			dsData.properties.frameL
		)
		this.play(dsData.properties.animA)
		// var stars = this.add.group({ key: 'star', repeat: 30 });

	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class DeuteriumSperes extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, deuteriumSpheresData) {
		super(scene.physics.world, scene)
		deuteriumSpheresData.forEach((deuteriumSphereData) => {
			this.add(new DeuteriumSpere(scene, hero, deuteriumSphereData, this.circle))
		})
		this.circle = new Phaser.Geom.Circle(997, 112, 100);
		Phaser.Actions.PlaceOnCircle(this, this.circle);

    scene.tweens.add({
        targets: this.circle,
        radius: 64,
        ease: 'Quintic.easeInOut',
        duration: 1500,
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
					// Phaser.Actions.RotateAroundDistance(this.getChildren(), { x: 997, y: 112 }, 0.02, this.circle.radius)
					Phaser.Actions.RotateAround(this.getChildren(), { x: 997, y: 112 }, 0.02)
        }
		})
		console.log(Phaser.Actions)
		// scene.physics.add.collider(solidLayer, this)
		// this.children.iterate(robo => {
		// 	robo.setGravityY(200)
		// })
  }
}