class Floorfire extends EnemyObj {
  constructor (scene, hero, dynamiteData) {
		super(scene, hero, dynamiteData.x + 8, dynamiteData.y + 8, 'enemiesSpriteAtlas', dynamiteData.properties.frame)
		this.dynamiteData = dynamiteData
		this.setDepth(2)
		this.painEnabled = false
		this.setSize(16, 17)
		this.fireTriggered = false

		// floor fires in left direction -->
		this.floorFiresL = new Phaser.Physics.Arcade.Group(scene.physics.world, scene)
		for (let i = 0; i < this.dynamiteData.properties.fireLengthL; i++) {
			this.floorFiresL.add(new EnemyObj(scene, hero, (dynamiteData.x + 8) - 16 * (i + 1), dynamiteData.y + 8, 'enemiesSpriteAtlas'))
		}
		this.floorFiresL.children.iterate( ff => {
			ff.setDepth(2)
			ff.setActive(false)
			ff.setVisible(false)
			ff.registerAsPainful()
			ff.painEnabled = false
			ff.on('animationcomplete', (anim) => {
				ff.setActive(false)
				ff.setVisible(false)
				ff.painEnabled = false
			})
		}) // <--
		// floor fires in right direction -->
		this.floorFiresR = new Phaser.Physics.Arcade.Group(scene.physics.world, scene)
		for (let i = 0; i < this.dynamiteData.properties.fireLengthR; i++) {
			this.floorFiresR.add(new EnemyObj(scene, hero, (dynamiteData.x + 8) + 16 * (i + 1), dynamiteData.y + 8, 'enemiesSpriteAtlas'))
		}
		this.floorFiresR.children.iterate( ff => {
			ff.setDepth(2)
			ff.setActive(false)
			ff.setVisible(false)
			ff.registerAsPainful()
			ff.painEnabled = false
			ff.on('animationcomplete', (anim) => {
				ff.setActive(false)
				ff.setVisible(false)
				ff.painEnabled = false
			})
		})
		// <--
		// box exbloded animation
		this.boxExplodeEvent = this.on('animationcomplete', () => {
			if (this.anims.currentAnim.key === this.dynamiteData.properties.animA) {
				this.play(this.dynamiteData.properties.animB)
			} else if (this.anims.currentAnim.key === this.dynamiteData.properties.animB) {
				this.play(this.dynamiteData.properties.animC)
				this.fireTriggered = true
				this.painEnabled = true
			} else if (this.anims.currentAnim.key === this.dynamiteData.properties.animC) {
				this.setActive(false)
				this.setVisible(false)
				this.painEnabled = false
			}
		})
	}

	registerAsShootable() {
		this.scene.physics.add.overlap(this, this.hero.gun, (enemy, bullet) => {
			bullet.explode()
			this.play(this.dynamiteData.properties.animA)
		})
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.fireTriggered) {
			// floor fires left direction
			this.floorFiresL.children.iterate( (ff, i) => {
				let animDelayTimeEvent = this.scene.time.addEvent({
					delay: 150 * i,
					callback: () => {
						ff.setActive(true)
						ff.setVisible(true)
						ff.play(this.dynamiteData.properties.animC)
						ff.painEnabled = true
						animDelayTimeEvent.remove(false)
					}
				})
			})
			// floor fire right direction
			this.floorFiresR.children.iterate( (ff, i) => {
				let animDelayTimeEvent = this.scene.time.addEvent({
					delay: 150 * i,
					callback: () => {
						ff.setActive(true)
						ff.setVisible(true)
						ff.play(this.dynamiteData.properties.animC)
						ff.painEnabled = true
						animDelayTimeEvent.remove(false)
					}
				})
			})
			this.fireTriggered = false
		}
	
	}
}

class DynamiteBoxes extends Phaser.Physics.Arcade.Group {
	constructor (scene, hero, dynamiteDatas, solidLayer) {
		super(scene.physics.world, scene)
		dynamiteDatas.forEach((dynamiteData) => {
			this.add(new Floorfire(scene, hero, dynamiteData))
		})
		scene.physics.add.collider(solidLayer, this)
	}
}