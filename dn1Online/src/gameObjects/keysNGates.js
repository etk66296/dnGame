class Key extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, keyData, hero, pointsFlyers) {
		super(scene, x, y, 'giftsSpriteAtlas', keyData.name)
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.hero = hero
		this.name = keyData.name
		this.collected = false
		this.pointsFlyers = pointsFlyers
	}
	setup () {
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(true)
		this.scene.physics.add.overlap(this, this.hero, (key, hero) => {
			if (!this.collected) {
				hero.inventory.push(this.name)
				this.collected = true
				this.setActive(false)
				this.setVisible(false)
				this.pointsFlyers.showUp(this.x, this.y, 'Points_1000')
				this.setPosition(-123, -123)
			}
		})
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class KeyPlate extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, keyData, hero, key_USE, touch_USE, gates) {
		super(scene, x, y)
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.hero = hero
		this.name = keyData.name
		this.matchingKeyName = keyData.properties.key
		this.key_USE  = key_USE
		this.touch_USE = touch_USE
		this.keyUsed = false
		this.gates = gates
	}
	setup () {
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(false)
		this.scene.physics.add.overlap(this, this.hero, () => {
			if (!this.keyUsed) {
				this.hero.inventory.forEach((inventoryItem) => {
					if (inventoryItem === this.matchingKeyName && (this.key_USE.isDown || this.touch_USE.isDown)) {
						this.gates.children.iterate((gate) => {
							// the plates and keys are alo in the group =>
							// it is better to make sure the current object is a gate
							if (gate['gateName'] !== undefined) {
								if (gate.matchingGatePlate === this.name) {
									gate.open(gate.gateName)
								}
							}
						})
						this.setActive(false)
						this.keyUsed = true
					}
				})
			}
		})
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class Gate extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, gateData, hero, openGateSound) {
		super(scene, x, y, 'enemiesSpriteAtlas', gateData.name + '_0000')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.hero = hero
		this.matchingGatePlate = gateData.properties.plate
		this.gateName = gateData.name
		this.openGateSound = openGateSound
	}
	setup () {
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(true)
		this.scene.physics.add.collider(this.hero, this, () => {
			// block the hero
			this.hero.body.blocked = {
				none: false,
				up: false,
				down: false,
				left: true,
				right: true
			}
		})
		this.on('animationcomplete', () => {
			this.setActive(false)
			this.setVisible(false)
			this.setPosition(-200, -200)
		})
	}

	open (gateName) {
		if (!this.openGateSound.isPlaying) {
			this.openGateSound.play()
		}
		this.play(gateName)
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}

class KeysNGates extends Phaser.Physics.Arcade.Group {
  constructor (scene, keysData, hero, pointsFlyers, key_USE, touch_USE, openGateSound) {
		super(scene.physics.world, scene)
		this.hero = hero
		keysData.forEach(keyData => {
			if (keyData.type === 'Gate') {
				this.add(new Gate(scene, keyData.x + 8, keyData.y + 8, keyData, hero, openGateSound))
			}
			if (keyData.type === 'Key') {
				this.add(new Key(scene, keyData.x + 8, keyData.y + 8, keyData, hero, pointsFlyers))
			}
			if (keyData.type === 'Plate') { // with the reference to this group the plates can trigger the gates
				this.add(new KeyPlate(scene, keyData.x + 8, keyData.y + 8, keyData, hero, key_USE, touch_USE, this))
			}
		})
	}
	setup () {
	}
}