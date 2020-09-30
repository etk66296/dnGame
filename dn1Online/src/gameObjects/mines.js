class Mine extends EnemyObj {
  constructor (scene, hero, mineData) {
		super(scene, hero, mineData.x + 8, mineData.y + 8, 'enemiesSpriteAtlas', mineData.properties.frame)
		this.type = mineData.type
		
		this.lifes = 10
		this.body.mass = 500
	}
}

class Mines extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, minesData, solidLayer) {
    super(scene.physics.world, scene)
    minesData.forEach((mineData) => {
			this.add(new Mine(scene, hero, mineData))
		})
		scene.physics.add.collider(solidLayer, this)

		this.children.iterate(mine => {
			mine.setActive(true)
			mine.setVisible(true)
			mine.setImmovable(true)
			if(mine.type === 'jumper') {
				mine.setBounce(1.0)
				mine.setGravityY(Phaser.Math.Between(200, 250))
			}
		})
	}
}