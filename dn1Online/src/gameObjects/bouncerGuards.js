class BouncerGuard extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, width, height, type) {
			super(scene, x, y, width, height)
			scene.add.existing(this)
			scene.physics.add.existing(this)
			this.body.immovable = true
			this.bouncerType = type
	}
}

class BouncerGuards extends Phaser.GameObjects.Group {
  constructor (scene, bouncerData, colliderGroups = []) {
		super(scene.physics.world, scene)
		// special guards -->
		this.trapBouncerGuards = []
		// <-- special guards
		bouncerData.forEach((bouncer) => {
			let tmpGuard = this.add(new BouncerGuard(scene, bouncer.x + 8, bouncer.y + 8, bouncer.width, bouncer.height, bouncer.type))
			if (bouncer.type === "Trapguard") {
				this.trapBouncerGuards.push(tmpGuard)
			}
			colliderGroups.forEach(colGrp => {
				scene.physics.add.collider(tmpGuard, colGrp)
			})
		})
  }
}