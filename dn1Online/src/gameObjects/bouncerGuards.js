class BouncerGuard extends Phaser.GameObjects.Rectangle {
	constructor(scene, bouncerData) {
			super(scene, bouncerData.x + 8, bouncerData.y + 8, bouncerData.width, bouncerData.height)
			scene.add.existing(this)
			scene.physics.add.existing(this)
			this.body.immovable = true
			this.worldData = bouncerData
	}
}

class BouncerGuards extends Phaser.GameObjects.Group {
  constructor (scene, bouncerData, colliderGroups = []) {
		super(scene.physics.world, scene)
		// special guards -->
		this.trapBouncerGuards = []
		// <-- special guards
		bouncerData.forEach((bouncer, index) => {
			let tmpGuard = this.add(new BouncerGuard(scene, bouncerData[index]))
			// if (bouncer.type === "Trapguard") {
			// 	this.trapBouncerGuards.push(tmpGuard)
			// }
		})

		colliderGroups.forEach(bounceGroup => {
			// run trough the guard goups and append colliders with corresponding guard ids
			bounceGroup.children.iterate(bouncer => { // loop trough the game objects (crocos, minirobots, ...)
				this.children.iterate(guard => {
					if (guard.worldData.properties.guardID === bouncer.worldData.properties.guardID) { // loup trough the bouncer guards
						scene.physics.add.collider(bouncer, guard)
					}
				})
			})
		})
  }
}