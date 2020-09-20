class Key extends GiftObj {
  constructor (scene, hero, keyData) {
		super(
			scene,
			hero,
			keyData.x + 8,
			keyData.y + 8,
			'giftsSpriteAtlas',
			keyData.properties.frame
		)
		this.hero = hero
		this.name = keyData.name
		this.keyID = keyData.properties.keyID
		this.keysNGatesType = keyData.type
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(true)
		this.play(keyData.properties.anim)
		this.heroOverlapEvent = this.scene.physics.add.overlap(this, this.hero, () => {
			if (!this.isCollected) {
				// create an equipment sprite with the necessary data
				let equipmentSprite = this.scene.add.sprite(100, 100, 'giftsSpriteAtlas', keyData.properties.frame)
				equipmentSprite.keyID = keyData.properties.keyID
				equipmentSprite.keysNGatesType = keyData.type
				equipmentSprite.setScrollFactor(0,0)
				equipmentSprite.setDepth(200)
				equipmentSprite.setVisible(true)
				console.log(equipmentSprite)
				this.hero.appendEquipment(equipmentSprite)
				this.isCollected = true
			}
			this.play('Points' + String(keyData.properties.points))
			this.setVelocityY(-10)
			scene.physics.world.removeCollider(this.heroOverlapEvent)
		})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}
class KeyPlate extends PhysicsObj {
  constructor (scene, hero, plateData, gates) {
		super(
			scene,
			plateData.x + 8,
			plateData.y + 8,
			'giftsSpriteAtlas',
			plateData.properties.frameA
		)
		this.gates = gates
		this.hero = hero
		this.name = plateData.name
		this.keyID = plateData.properties.keyID
		this.keysNGatesType = plateData.type
		this.doorOpenedFrame = plateData.properties.frameB
		this.setImmovable(true)
		this.setActive(true)
		this.setVisible(true)
		this.heroOverlapEvent = this.scene.physics.add.overlap(this, this.hero, (plate, hero) => {
			if ((this.hero.gameControls.touch_USE.isDown || this.hero.gameControls.key_USE.isDown) && this.hero.hasKey(this.keyID)) {
				this.setFrame(this.doorOpenedFrame)
				this.gates.children.iterate(gate => {
					if (gate.keysNGatesType === 'Gate') {
						if (gate.keyID === this.keyID) {
							gate.open()
						}
					}
				})
				scene.physics.world.removeCollider(this.heroOverlapEvent)
			}
		})
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}



class Gate extends PhysicsObj {
  constructor (scene, hero, gateData) {
		super(
			scene,
			gateData.x + 8,
			gateData.y + 8,
			'enemiesSpriteAtlas',
			gateData.properties.frame
		)
		this.openAnim = gateData.properties.anim
		this.hero = hero
		this.gateName = gateData.name
		this.keyID = gateData.properties.keyID
		this.keysNGatesType = gateData.type
		this.setActive(true)
		this.setVisible(true)
		this.scene.physics.add.collider(this.hero, this)
		this.openedEvent = this.on('animationcomplete', () => {
			this.setActive(false)
			this.setVisible(false)
			this.setPosition(-200, -200)
			scene.physics.world.removeCollider(this.openedEvent)
		})
	}

	open (gateName) {
		this.play(this.openAnim)
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
	}
}

class KeysNGates extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, keysData) {
		super(scene.physics.world, scene)
		this.hero = hero
		keysData.forEach(keyData => {
			if (keyData.type === 'Gate') {
				this.add(new Gate(scene, hero, keyData))
			}
			if (keyData.type === 'Key') {
				this.add(new Key(scene, hero, keyData))
			}
			if (keyData.type === 'Plate') { // with the reference to this group the plates can trigger the gates
				this.add(new KeyPlate(scene, hero, keyData, this))
			}
		})
		this.children.iterate(keyPlateGate => {
			keyPlateGate.setImmovable(true)
		})
	}
}