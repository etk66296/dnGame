class Brick extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
		super(scene, x, y, 'giftsSpriteAtlas', 'ShootableBrick')
		scene.add.existing(this)
		scene.physics.add.existing(this)
	}
	setup () {
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(true)
	}

	preUpdate (time, delta) {
	}
}

class ShootableBrick extends Phaser.Physics.Arcade.Group {
  constructor (scene, brickData, hero, bullets) {
		super(scene.physics.world, scene)
		this.hero = hero
    brickData.forEach((brickData) => {
			// this.add.sprite(scene, brickData.x + 8, brickData.y + 8)
			this.add(new Brick(scene, brickData.x + 8, brickData.y + 8))
		})
		scene.physics.add.collider(hero, this)
		scene.physics.add.collider(bullets, this, (bullet, brick) => {
			brick.setActive(false)
			brick.setVisible(false)
			brick.setPosition(-300, -300)
			bullet.play('heroExplode')
		})
	}
}