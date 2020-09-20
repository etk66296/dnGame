class Hero extends PhysicsObj {
  constructor (scene, x, y, solidLayer, gameControls, gun) {
		super(scene, x, y, 'heroSpriteAtlas', 'idleR_0000')
		// scene.add.existing(this)
		// scene.physics.add.existing(this)
		this.solidLayer = solidLayer
		this.gameControls = gameControls
		this.jumpSpeed = 0
		this.gun = gun
		this.jumpSpeed = 85
		this.walkSpeed = 140
		this.lastDir = 1
		this.collectedPointes = 0
		this.setName('hero')
		this.body.setSize(12, 30, true)
		this.body.setOffset(9, 2)
		this.setGravityY(300)
		this.setBounce(0.0)
		this.setDepth(1)
		this.scene.physics.add.collider(this, this.solidLayer)
		this.allowDangling = false
		this.allowShooting = true
		this.hasDangleClaws = false
		this.hasMultiHand = false
		this.collectedKeyIds = []
		this.equipment = { nextPosIndex: 0, positions: [
			{ x: 16, y: 16 },
			{ x: 16 + 18, y: 16 },
			{ x: 16 + 18 * 2, y: 16 },
			{ x: 16 + 18 * 3, y: 16 },
			{ x: 16 + 18 * 4, y: 16 },
			{ x: 16, y: 16 + 18 },
			{ x: 16 + 18, y: 16 + 18 },
			{ x: 16 + 18 * 2, y: 16 + 18 },
			{ x: 16 + 18 * 3, y: 16 + 18 },
			{ x: 16 + 18 * 4, y: 16 + 18 },
			{ x: 16, y: 16 + 18 * 2 },
			{ x: 16 + 18, y: 16 + 18 * 2 },
			{ x: 16 + 18 * 2, y: 16 + 18 * 2 },
			{ x: 16 + 18 * 3, y: 16 + 18 * 2 },
			{ x: 16 + 18 * 4, y: 16 + 18 * 2 },
			{ x: 16, y: 16 + 18 * 3 },
			{ x: 16 + 18, y: 16 + 18 * 3 },
			{ x: 16 + 18 * 2, y: 16 + 18 * 3 },
			{ x: 16 + 18 * 3, y: 16 + 18 * 3 },
			{ x: 16 + 18 * 4, y: 16 + 18 * 3 },
			{ x: 16, y: 16 + 18 * 4 },
			{ x: 16 + 18, y: 16 + 18 * 4 },
			{ x: 16 + 18 * 2, y: 16 + 18 * 4 },
			{ x: 16 + 18 * 3, y: 16 + 18 * 4 },
			{ x: 16 + 18 * 4, y: 16 + 18 * 4 },
			{ x: 16, y: 16 + 18 * 5 },
			{ x: 16 + 18, y: 16 + 18 * 5 },
			{ x: 16 + 18 * 2, y: 16 + 18 * 5 },
			{ x: 16 + 18 * 3, y: 16 + 18 * 5 },
			{ x: 16 + 18 * 4, y: 16 + 18 * 5 }
		],
		objects: []}
		this.tutorialMode = false
		this.tutorialInfos = [true, true]

		// health blocks
		this.painTime = 750
		this.painState = false
		this.painStopWatch = 0
		// this.painEvent = null
		this.healthBlocks = { current: 10, max: 10 }
		this.heroHealthGroup = this.scene.add.group()
		for (let i = 0; i < this.healthBlocks.max; i++) {
			let rect = this.scene.add.rectangle(405 +  i * 9, 14, 7, 22, 0x00ff00)
			rect.setOrigin(0, 0)
			rect.setDepth(102)
			rect.setScrollFactor(0)
			this.heroHealthGroup.add(rect)
		}
		return this
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		// hero movement -->
		// move LEFT -->
		if(this.body.onFloor()) {
			if (!this.body.checkCollision.up) {
				this.body.checkCollision.up = true // reset checking collision up
			}
			if (this.gameControls.key_LEFT.isDown || this.gameControls.touch_LEFT.isDown) {
				this.lastDir = -1
				this.setVelocityX(this.walkSpeed * this.lastDir)
				// walk left animations -->
				if (this.painState) {
					this.anims.play('heroPainLeft', true)
				} else {
					this.anims.play('heroWalkLeft', true)
				}
				// <-- walk left animations
			} // <-- move LEFT
			// move RIGHT -->
			else if (this.gameControls.key_RIGHT.isDown || this.gameControls.touch_RIGHT.isDown) {
				this.lastDir = 1
				this.setVelocityX(this.walkSpeed * this.lastDir)
				// walk right animations -->
				if (this.painState) {
					this.anims.play('heroPainRight', true)
				} else {
					this.anims.play('heroWalkRight', true)
				}
				// <-- walk right animations
			} //<-- move RIGHT
			else { // STOP -->
				this.setVelocityX(0)
				if (this.lastDir === 1) { // RIGHT -->
					if (this.painState) {
						this.anims.play('heroPainRight', true)
					} else {
						this.anims.play('heroIdleRight', true)
					} // <-- RIGHT
				} else if (this.lastDir === -1) { // LEFT -->
					if (this.painState) {
						this.anims.play('heroPainLeft', true)
					} else {
						this.anims.play('heroIdleLeft', true)
					} // <-- LEFT
				}
			} // <-- STOP
			// JUMP -->
			if (this.gameControls.touch_JUMP.isDown || this.gameControls.key_JUMP.isDown) {
				this.setVelocityY(-185)
			}
			// <-- JUMP
			//////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////
			// DANGLING -->
		} else if (this.allowDangling && this.hasDangleClaws) {
			if (this.gameControls.touch_USE.isDown || this.gameControls.key_USE.isDown) { // fall down again
				this.allowShooting = true
				this.y += 2
				this.setGravityY(300)
			}
			if ((this.gameControls.touch_FIRE.isDown || this.gameControls.key_FIRE.isDown) && this.body.velocity.x === 0) {
				if (this.lastDir === 1) {
					this.setFrame('dangleShootR_0000')
				} else {
					this.setFrame('dangleShootL_0000')
				}
			}
			// dangling LEFT -->
			if (this.gameControls.key_LEFT.isDown || this.gameControls.touch_LEFT.isDown) {
				this.allowShooting = false
				this.lastDir = -1
				this.setVelocityX(this.walkSpeed * this.lastDir)
				// dangle left animations -->
				if (this.painState) {
					this.anims.play('heroPainLeft', true)
				} else {
					this.anims.play('heroDangleL', true)
				}
				// <-- dangle left animations
				// jump up -->
				if (this.gameControls.touch_JUMP.isDown || this.gameControls.key_JUMP.isDown) {
					this.body.checkCollision.up = false
					if (this.painState) {
						this.anims.play('heroPainLeft', true)
					} else {
						this.anims.play('heroDangleUpL', true)
					}
				}
				// <-- jump up
			} // <-- dangle LEFT
			// dangle RIGHT -->
			else if (this.gameControls.key_RIGHT.isDown || this.gameControls.touch_RIGHT.isDown) {
				this.allowShooting = false
				this.lastDir = 1
				this.setVelocityX(this.walkSpeed * this.lastDir)
				// dangle right animations -->
				if (this.painState) {
					this.anims.play('heroPainRight', true)
				} else {
					this.anims.play('heroDangleR', true)
				}
				// <-- dangle right animations
				// jump up -->
				if (this.gameControls.touch_JUMP.isDown || this.gameControls.key_JUMP.isDown) {
					this.body.checkCollision.up = false
					if (this.painState) {
						this.anims.play('heroPainRight', true)
					} else {
						this.anims.play('heroDangleUpR', true)
					}
				}
				// <-- jump up
			} //<-- dangle RIGHT
			else { // STOP -->
				this.setVelocityX(0)
				this.allowShooting = true
				if (this.lastDir === 1) { // RIGHT -->
					if (this.painState) {
						this.anims.play('heroPainRight', true)
					} else {
						if (this.frame.name !== 'dangleShootR_0000') {
							this.anims.play('heroDangleIdleR', true)
						}
					} // <-- RIGHT
				} else if (this.lastDir === -1) { // LEFT -->
					if (this.painState) {
						this.anims.play('heroPainLeft', true)
					} else {
						if (this.frame.name !== 'dangleShootL_0000') {
							this.anims.play('heroDangleIdleL', true)
						}
					} // <-- LEFT
				}
			} // <-- STOP
			// <-- dangling
			//////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////
		// JUMP -->
		if (this.gameControls.touch_JUMP.isDown || this.gameControls.key_JUMP.isDown) {
			this.setVelocityY(-185)
			this.allowShooting = true
		}
		// <-- JUMP
		} else { // hero in the air -->
			this.allowShooting = true
			if (this.gameControls.key_LEFT.isDown || this.gameControls.touch_LEFT.isDown) {
				this.lastDir = -1
				this.setVelocityX(this.jumpSpeed * this.lastDir)
			} else if (this.gameControls.key_RIGHT.isDown || this.gameControls.touch_RIGHT.isDown) {
				this.lastDir = 1
				this.setVelocityX(this.jumpSpeed * this.lastDir)
			} else {
				this.setVelocityX(0)
			}
			if (this.lastDir === 1) { // JUMP RIGHT -->
				if (this.painState) {
					this.anims.play('heroPainRight', true)
				} else {
					if (this.anims.currentAnim != null) {
						if (this.anims.currentAnim.key !== 'heroDangleUpR') {
							this.anims.play('heroJumpRight', true)
						}
					}
				} // <-- JUMP RIGHT
			} else if (this.lastDir === -1) { // JUMP LEFT -->
				if (this.painState) {
					this.anims.play('heroPainLeft', true)
				} else {
					if (this.anims.currentAnim != null) {
						if (this.anims.currentAnim.key !== 'heroDangleUpL') {
							this.anims.play('heroJumpLeft', true)
						}
					}
				} // <-- JUMP LEFT
			}
		} // <-- hero in the air

		// <-- hero movement

		// fire gun -->
		if ((this.gameControls.touch_FIRE.isDown || this.gameControls.key_FIRE.isDown) && this.allowShooting) {
			this.gun.fireBullet(this.x, this.y, this.lastDir)
			// console.log(this)
		}
		// <-- fire gun

		// reset values -->
		// <-- reset values

		// reset pain -->
		// if (this.painState) {
		// 	this.painEvent = this.scene.time.addEvent({
		// 		delay:this.painTime,
		// 		callback: () => {
		// 			if (this.painState) {
		// 				this.healthBlocks.current -= 1
		// 				this.painState = false
		// 			}
		// 			this.painEvent.remove(false)
		// 		}
		// 	})
		// }
		if (this.painState) {
			this.painStopWatch += delta
		}
		if(this.painStopWatch > this.painTime) {
			this.painState = false
			this.painStopWatch = 0
			this.healthBlocks.current -= 1
		}
		this.updateHealthBlock()
		// <-- reset pain

		//###########################################################################
		//###########################################################################
		//###########################################################################
		// Tutorial TEXT
		// trigger info if hero reach defined rect -->
		if(this.tutorialMode) {
			if (this.x >= 50 && this.x < 55 && this.y > 1375 && this.tutorialInfos[0]) {
				this.gameControls.release()
				this.scene.scene.manager.pause('Level0Scene')
				this.scene.scene.manager.start('InfoTextScene', {text: [
					'Die Krokocrawler an der Kiste',
					'wollen dich aufhalten.',
					'',
					'Terminiere sie mit deiner Blasterkanone.',
					'Die Blasterkanone reagiert auf den',
					'"Y" - Knopf deiner Tastatur',
					'oder den Tastknopf "B" auf am HUD.'
				]})
				this.setPosition(this.x + 5, this.y)
				this.tutorialInfos[0] = false
			}
			if (this.x >= 290 && this.x < 295 && this.y > 1375 && this.tutorialInfos[1]) {
				this.gameControls.release()
				this.scene.scene.manager.pause('Level0Scene')
				this.scene.scene.manager.start('InfoTextScene', {text: [
					'Miniroboter schleichen durch die Gegend.',
					'',
					'Es wird Zeit diesen hier weg zu pusten'
				]})
				this.setPosition(this.x + 5, this.y)
				this.tutorialInfos[1] = false
			}
		}
		// <-- trigger info if hero reach defined rect
		//###########################################################################
		//###########################################################################
		//###########################################################################
	}

	addPoints(points) {
		this.collectedPointes += points
	}

	addHealth(amount) {
		this.healthBlocks.current += amount
		if (this.healthBlocks.current > this.healthBlocks.max) {
			this.healthBlocks.current = this.healthBlocks.max
		}
	}

	appendEquipment(equipmentObj) {
		equipmentObj.setScrollFactor(0,0)
		this.equipment.objects.push(equipmentObj)
		let currentIndex = this.equipment.nextPosIndex
		equipmentObj.setPosition(this.equipment.positions[currentIndex].x, this.equipment.positions[currentIndex].y)
		equipmentObj.setDepth(200)
		equipmentObj.anims.pause()
		this.equipment.nextPosIndex += 1
		if (equipmentObj.name === 'DangleClaw') {
			this.hasDangleClaws = true
		} else if (equipmentObj.name === 'MultiHand') {
			this.hasMultiHand = true
		} else if (equipmentObj.name === 'GunUpgrade') {
			this.gameControls.upgradeGunPower()
			this.gun.upgradeGunPower()
		} else if ((equipmentObj.keysNGatesType !== undefined)) {
			if (equipmentObj.keysNGatesType === 'Key') {
				this.collectedKeyIds.push(equipmentObj.keyID)
			}
		}
	}

	hasKey(keyID) {
		let returnVal = false
		this.collectedKeyIds.forEach(id => {
			if (id === keyID) {
				returnVal = true
			}
		})
		return returnVal
	}

	updateHealthBlock = function() {
		if (this.heroPainState) {
			this.heroPainStopWatch += delta
		}
		if(this.heroPainStopWatch > this.heroPainTime) {
			this.heroPainState = false
			this.heroPainStopWatch = 0
			this.healthBlocks.current -= 1
		}
		this.heroHealthGroup.children.iterate((healthBlock, index) => {
			if (index >= this.healthBlocks.current) {
				healthBlock.setVisible(false)
			} else {
				healthBlock.setVisible(true)
			}
		})
	}
}