class Mine extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, type) {
		super(scene, x, y, 'enemiesSpriteAtlas', 'mine')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.type = type
	}
	setup() {
		this.body.mass = 500
		this.setActive(true)
		this.setVisible(true)
		this.setImmovable(true)
		this.jumper = false
		if(this.type === 'jumper') {
			this.jumper = true
		}
		if(this.jumper) {
			this.setBounce(1.0)
			this.setGravityY(Phaser.Math.Between(200, 250))
		}
	}
}

class Mines extends Phaser.Physics.Arcade.Group {
  constructor (scene, minesData, solidLayer, bullets) {
    super(scene.physics.world, scene)
    minesData.forEach((mineData) => {
			this.add(new Mine(scene, mineData.x + 8, mineData.y + 8, mineData.type))
		})
		scene.physics.add.collider(solidLayer, this)
		scene.physics.add.collider(bullets, this, (bullet) => {
			bullet.play('heroExplode')
		})
	}
}