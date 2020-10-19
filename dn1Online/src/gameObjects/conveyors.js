class Conveyor extends Phaser.GameObjects.Rectangle {
	constructor(scene, hero, worldData) {
			super(
				scene,
				worldData.x + worldData.width / 2,
				worldData.y + worldData.height / 2,
				worldData.width,
				worldData.height
			)
			scene.add.existing(this)
			scene.physics.add.existing(this)
			this.setActive(true)
			this.hero = hero
			this.body.immovable = true
			this.dir = worldData.properties.dir
			scene.physics.add.overlap(this, hero)
	}
	preUpdate (time, delta) {
		if (this.body.touching.up) {
			this.hero.x += this.dir
		}
	}
}

class Conveyors extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, worldData) {
		super(scene.physics.world, scene)
		this.hero = hero
    worldData.forEach((wd) => {
			this.add(new Conveyor(scene, hero, wd))
		})
	}
}