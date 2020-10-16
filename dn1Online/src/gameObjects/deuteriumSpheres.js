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
		this.worldData = dsData
		this.points = dsData.properties.points
		let animDelayTimeEvent = this.scene.time.addEvent({
			delay: 100 * index,
			callback: () => {
				this.play(dsData.properties.animA)
				animDelayTimeEvent.remove(false)
			}
		})

		this.path = new Phaser.Curves.Path()
		this.ellipse = new Phaser.Curves.Ellipse(this.x, this.y, dsData.properties.radius)
		this.path.add(this.ellipse.setRotation(index / Math.PI * 0.5))

		this.follower = { t: 0, vec: new Phaser.Math.Vector2() }
		this.myTween = scene.tweens.add({
			targets: this.follower,
			t: 1,
			// ease: 'Sine.easeInOut',
			ease: 'Linear',
			duration: dsData.properties.duration,
			yoyo: false,
			repeat: -1
		})

	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		this.path.getPoint(this.follower.t, this.follower.vec);
		this.setPosition(this.follower.vec.x, this.follower.vec.y)
		if (!this.isAlive) {
			this.myTween.remove()
		}
	}
}
class DeuteriumSperes extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, deuteriumSphereData) {
		super(scene.physics.world, scene)
		for (let i = 0; i < deuteriumSphereData.properties.numOfSpheres; i++) {
			this.add(new DeuteriumSpere(scene, hero, deuteriumSphereData, i))
		}
	}
}