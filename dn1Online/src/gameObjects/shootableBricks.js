class Brick extends PhysicsObj {
  constructor (scene, hero, brickData) {
		super(scene, brickData.x + 8, brickData.y + 8, 'giftsSpriteAtlas', 'ShootableBrick')
		this.hero = hero
		this.worldData = brickData
		this.body.setSize(16, brickData.height, true)
		this.setOffset(0, 0)
		this.birckShotEvent = this.scene.physics.add.overlap(this, this.hero.gun, (brick, bullet) => {
			this.hero.addPoints(this.worldData.properties.points)
			bullet.explode()
			brick.setActive(false)
			brick.setVisible(false)
			brick.setPosition(-300, -300)
			scene.physics.world.removeCollider(this.birckShotEvent)
		})
	}
}

class ShootableBricks extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, brickData, giftsGroup) {
		super(scene.physics.world, scene)
		this.hero = hero
    brickData.forEach((brickData) => {
			this.add(new Brick(scene, hero, brickData))
		})

		// add a collider when a gift is placed between shootable bricks
		this.children.iterate(brick => {
			if (brick.worldData.properties.giftBlocker === true) {
				giftsGroup.children.iterate(gift => {
					if (gift.giftData.properties.blockerID !== undefined) {
						if (gift.giftData.properties.blockerID === brick.worldData.properties.giftBlockerID) {
							scene.physics.add.collider(gift, brick)
						}
					}
				})
			}
		})

		scene.physics.add.collider(this, this.hero, (hero, sb) => {
			if (sb.body.touching.up) {
				hero.body.blocked.down = true
			}
		})
		this.children.iterate(brick => {
			brick.setImmovable(true)
		})
	}
}