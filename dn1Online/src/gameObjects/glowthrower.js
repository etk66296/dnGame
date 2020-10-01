class GlowThrowerHead extends EnemyObj {
  constructor (scene, hero, glowThrowerData, glowGroup) {
		super(scene, hero, glowThrowerData.x + 8, glowThrowerData.y + 8, 'enemiesSpriteAtlas', glowThrowerData.properties.frame)
		this.isHead = true
		this.glowGroup = glowGroup
		this.animHeatingUpStart = glowThrowerData.properties.animA
		this.animHeatingUpHalf = glowThrowerData.properties.animB
		this.animFullGlowPower = glowThrowerData.properties.animC
		this.animActive = glowThrowerData.properties.animD
		this.directionType = glowThrowerData.type
		this.idleTime = glowThrowerData.properties.idleTime
		this.preheatingTimePhaseA = glowThrowerData.properties.preheatingTime + this.idleTime
		this.preheatingTimePhaseB = glowThrowerData.properties.preheatingTime + this.preheatingTimePhaseA
		this.fullPowerTime = glowThrowerData.properties.fullPowerTime + this.preheatingTimePhaseB
		this.fullPowerDuration = glowThrowerData.properties.fullPowerDuration
		this.glowerElapsedTime = 0

		// glower state
		this.glowerState = 0
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		this.glowerElapsedTime += delta
		let cycleStartState = this.glowerState
		if (
				this.glowerElapsedTime >= this.idleTime &&
				this.glowerElapsedTime < this.preheatingTimePhaseA
			) {
			this.glowerState = 1
		} else if (
			this.glowerElapsedTime >= this.preheatingTimePhaseA &&
			this.glowerElapsedTime < this.preheatingTimePhaseB
		) {
			this.glowerState = 2
		} else if (
			this.glowerElapsedTime >= this.preheatingTimePhaseB &&
			this.glowerElapsedTime < this.fullPowerTime
		) {
			this.glowerState = 3
		} else if (
			this.glowerElapsedTime >= this.fullPowerTime &&
			this.glowerElapsedTime < (this.fullPowerTime + this.fullPowerDuration)
		) {
			this.glowerState = 4
		} else if (this.glowerElapsedTime > (this.fullPowerTime + this.fullPowerDuration)) {
			this.glowerElapsedTime = 0
			this.glowerState = 0
		}
		// check if state has changed
		if (cycleStartState !== this.glowerState) {
			switch (this.glowerState) {
				case 0:
					this.setVisible(false)
					this.painEnabled = false
					this.glowGroup.children.iterate(segments => {
						segments.enabled = false
						segments.painEnabled = false
					})
					break
				case 1:
					this.setVisible(true)
					this.play(this.animHeatingUpStart)
					this.painEnabled = true
					break
				case 2:
					this.play(this.animHeatingUpHalf)
					break
				case 3:
					this.play(this.animFullGlowPower)
					break
				case 4:
					this.play(this.animActive)
					this.glowGroup.children.iterate(segments => {
						segments.enabled = true
						segments.painEnabled = true
					})
					break
			}
		}
	}
}

class GlowThrowerSegment extends EnemyObj {
  constructor (scene, hero, glowThrowerData, index) {
		super(scene, hero, glowThrowerData.x + 8, glowThrowerData.y + 8, 'enemiesSpriteAtlas')
		this.isHead = false
		this.enabled = false
		this.glowerIndex = index
		this.glowThrowerData = glowThrowerData
		this.setActive(true)
		this.setVisible(true)
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.enabled) {
			if (!this.anims.isPlaying) {
				this.setVisible(true)
				if (this.glowerIndex === (this.glowThrowerData.properties.fireWidth - 1)) {
					this.play(this.glowThrowerData.properties.animC)
				} else {
					this.play(this.glowThrowerData.properties.animD)
				}
			}
		} else {
			this.anims.stop()
			this.setVisible(false)
		}
	}
}

class GlowThrower extends Phaser.Physics.Arcade.Group {
	constructor (scene, hero, glowThrowerData) {
		super(scene.physics.world, scene)
		let glowerHeadPos = { x: glowThrowerData.x, y: glowThrowerData.y }
		for (let i = 1; i < glowThrowerData.properties.fireWidth; i++) {
			if (glowThrowerData.type === 'right') {
				glowThrowerData.x = glowerHeadPos.x + i * glowThrowerData.width
				this.add(new GlowThrowerSegment(scene, hero, glowThrowerData, i))
			} else {
				glowThrowerData.x = glowerHeadPos.x - i * glowThrowerData.width
				this.add(new GlowThrowerSegment(scene, hero, glowThrowerData, i))
			}
		}
		/* after creating the segments define the glow thrower heads and injects
			the group, thus the head is able to trigger them
		*/
		glowThrowerData.x = glowerHeadPos.x
		glowThrowerData.y = glowerHeadPos.y
		this.add(new GlowThrowerHead(scene, hero, glowThrowerData, this))
	}
}