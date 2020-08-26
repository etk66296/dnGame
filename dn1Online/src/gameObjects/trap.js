class TrapSegment extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, index, guards) {
		super(scene, x, y, 'enemiesSpriteAtlas')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.isLeftTrapSegment = true
		if (index % 2 === 1) {
			this.isLeftTrapSegment = false
		}
		this.trapped = false
		this.elapsedTrapTime = 0
		this.breakTime = 2000
		this.guards = guards
	}
	setup () {
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(true)
		if (this.isLeftTrapSegment) {
			this.setFrame('TrapSegmentL_0000')
		} else {
			this.setFrame('TrapSegmentR_0000')
		}
		this.on('animationcomplete', () => {
			this.setActive(false)
			this.setVisible(false)
			this.setPosition(-200, -200)
			this.guards.forEach(guard => {
				if (guard.body !== undefined) {
					guard.body.checkCollision = {
						none: false,
						left: true,
						right: true,
						down: true,
						up: true
					}
				}
			})
		})
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.trapped && this.elapsedTrapTime < this.breakTime) {
			this.elapsedTrapTime += delta
		} else if (this.elapsedTrapTime >= this.breakTime) {
			this.setGravityY(150)
			if (!this.anims.isPlaying) {
				if (this.isLeftTrapSegment) {
					console.log("play left")
					this.play('FallingTrapSegmentL')
				} else {
					this.play('FallingTrapSegmentR')
				}
			}
		}
		this.trapped = false
	}
}

class Trap extends Phaser.Physics.Arcade.Group {
  constructor (scene, trapSegmentsData, hero, guards) {
		super(scene.physics.world, scene)
		this.hero = hero
		this.alreadyTrapped = true
		trapSegmentsData.forEach((trapSegmentData, index) => {
			this.add(new TrapSegment(scene, trapSegmentData.x + 8, trapSegmentData.y + 8, index, guards))
		})
		
		guards.forEach(guard => {
			if (guard.body !== undefined) {
				guard.body.checkCollision.none = true
			}
		})
		this.scene.physics.add.collider(hero, this, () => {
			// set onFloor true
			hero.body.blocked.down = true
			this.children.iterate((segment) => {
				segment.trapped = true
			})
		})

	}
	setup () {
	}
}