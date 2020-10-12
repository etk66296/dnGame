class TrapSegment extends PhysicsObj {
  constructor (scene, hero, trapData, index, trapSegments) {
		super(
			scene,
			trapData.x + trapData.width / 2 + trapData.width * index,
			trapData.y + trapData.height / 2,
			'enemiesSpriteAtlas'
		)
		this.index = index
		this.swingAnim = ''
		this.crashAnim = ''
		this.trapSegments = trapSegments
		if (index % 2 === 0) {
			this.setFrame(trapData.properties.frameL)
			this.swingAnim = trapData.properties.animAL
			this.crashAnim = trapData.properties.animBL
		} else {
			this.setFrame(trapData.properties.frameR)
			this.swingAnim = trapData.properties.animAR
			this.crashAnim = trapData.properties.animBR
		}
		this.hero = hero
		this.segmentIndex = index
		this.collapseTime = trapData.properties.collapseTime
		this.isCollapsed = false
		this.collapseEvent = this.on('animationcomplete', () => {
			if (this.anims.currentAnim.key === this.crashAnim) {
				this.body.checkCollision.none = true
				this.setImmovable(false)
				this.setVelocityY(100)
				scene.physics.world.removeCollider(this.collapseEvent)
			}
		})
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.touching.up) {
			this.collapseTime -= delta
		}
		if (this.collapseTime <= 0) {
			this.isCollapsed = true
		}
		// inacitve the obkect after a while
		if (this.collapseTime < -2000) {
			this.setActive(false)
			this.setVisible(false)
		}
	}
}

class Trap extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, trapSegmentsData, guards) {
		super(scene.physics.world, scene)
		this.hero = hero
		for (let i = 0; i < trapSegmentsData.properties.length; i++) {
			this.add(new TrapSegment(scene, hero, trapSegmentsData, i, this))
		}
		this.children.iterate( ts => {
			ts.setImmovable(true)
		})
		scene.physics.add.collider(this, this.hero, (hero, ts) => {
			if (ts.body.touching.up) {
				hero.body.blocked.down = true
				if (!ts.anims.isPlaying) {
					ts.play(ts.swingAnim)
				}
				if (ts.isCollapsed) {
					guards.trapBouncerGuards.forEach(bouncer => {
						bouncer.setActive(true)
						bouncer.body.checkCollision.none = false
					})
					this.children.iterate( ts => {
						ts.isCollapsed = true
						ts.play(ts.crashAnim)
					})
				}
			}
		})
	}
}