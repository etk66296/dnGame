// depends on intro scene, which is loading the enemiesSpriteAtlas sprite sheet
// glow thrower -->
class GlowThrowerSegment extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, segmentIndex, type) {
		super(scene, -150, -150, 'enemiesSpriteAtlas')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.segmentIndex = segmentIndex
		this.type = type
		this.nextGlowPowerUpDelay = 1200
		this.elapsedTimeToNextPowerUp = 0
		this.glowPowerLevel = 0
		this.segmentPos = {x: x, y: y}
		//possible animations
		//'GlowThrowerStartL'
		//'GlowThrowerStartR'
		//'GlowThrowerHalfL'
		//'GlowThrowerHalfR'
		//'GlowThrowerFullL'
		//'GlowThrowerFullR'
	}
	setup () {
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(false)
		this.segmentPos.y = this.segmentPos.y + 8
		if (this.type === 'R') {
			this.segmentPos.x = this.segmentPos.x + 8 + this.segmentIndex * 16
			if (this.segmentIndex === 0) {
				this.play('GlowThrowerStartR')
				this.setVisible(true)
			}
		} else {
			this.segmentPos.x = this.segmentPos.x + 8 - this.segmentIndex * 16
			if (this.segmentIndex === 0) {
				this.play('GlowThrowerStartL')
				this.setVisible(true)
			}
		}
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		this.elapsedTimeToNextPowerUp += delta
		if (this.elapsedTimeToNextPowerUp >= this.nextGlowPowerUpDelay) {
			this.elapsedTimeToNextPowerUp = 0
			this.glowPowerLevel += 1
			switch (this.glowPowerLevel) {
				case 1:
					if (this.segmentIndex === 0) {
						this.setVisible(true)
						this.setPosition(this.segmentPos.x, this.segmentPos.y)
						if(this.type === 'R') {
							this.play('GlowThrowerStartR')
						} else {
							this.play('GlowThrowerStartL')
						}
					}
					break
				case 2:
					if (this.segmentIndex === 0) {
						if(this.type === 'R') {
							this.play('GlowThrowerHalfR')
						} else {
							this.play('GlowThrowerHalfL')
						}
					}
					break
				case 3:
					if (this.segmentIndex === 0) {
						if(this.type === 'R') {
							this.play('GlowThrowerFullR')
						} else {
							this.play('GlowThrowerFullL')
						}
					}
					break
				case 4:
					if (this.segmentIndex === 0) {
						this.play('GlowThrowerSegment')
					} else if (this.segmentIndex === 1) {
						this.setVisible(true)
						this.setPosition(this.segmentPos.x, this.segmentPos.y)
						this.play('GlowThrowerSegment')
					} else {
						this.setVisible(true)
						this.setPosition(this.segmentPos.x, this.segmentPos.y)
						if(this.type === 'R') {
							this.play('GlowThrowerFullR')
						} else {
							this.play('GlowThrowerFullL')
						}
					}
				case 5:
					break
				default:
						this.setPosition(-150, -150)
						this.glowPowerLevel = 0
						this.setVisible(false)
					break
			}
		}
	}
}

class GlowThrower extends Phaser.Physics.Arcade.Group {
  constructor (scene, glowThrowerData) {
		super(scene.physics.world, scene)
		for (let i = 0; i < 3; i++) {
			this.add(new GlowThrowerSegment(scene, glowThrowerData.x, glowThrowerData.y, i, glowThrowerData.type))
		}
	}
}
// <-- glow thrower