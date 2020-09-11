class Brick extends PhysicsObj {
  constructor (scene, hero, brickData) {
		super(scene, brickData.x + 8, brickData.y + 8, 'giftsSpriteAtlas', 'ShootableBrick')
		this.hero = hero
		this.body.setSize(16, 18, true)
		this.birckShotEvent = this.scene.physics.add.overlap(this, this.hero.gun, (brick, bullet) => {
			bullet.explode()
			brick.setActive(false)
			brick.setVisible(false)
			brick.setPosition(-300, -300)
			scene.physics.world.removeCollider(this.birckShotEvent)
		})
	}
	preUpdate (time, delta) {
	}
}

class ShootableBricks extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, brickData) {
		super(scene.physics.world, scene)
		this.hero = hero
    brickData.forEach((brickData) => {
			this.add(new Brick(scene, hero, brickData))
		})
		scene.physics.add.collider(hero, this)
		this.children.iterate(brick => {
			brick.setImmovable(true)
		})
	}
}