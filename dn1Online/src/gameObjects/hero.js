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
		this.jumpPower = -185
		this.lastDir = 1
		this.collectedPoints = 0
		this.collectedCharacters = ''
		this.setName('hero')
		this.body.setSize(8, 30, true)
		this.body.setOffset(10, 2)
		this.setGravityY(300)
		this.setBounce(0.0)
		this.setDepth(1)
		this.scene.physics.add.collider(this, this.solidLayer)
		
		// collected equipment and level information
		this.nextLevelData = {
			key: '',
			mapData: '',
			numOfTiles: 0,
			lastScene: '',
			backgroundImageFilePath: '',
			backgroundKey: ''
		} 
		
		this.currentLevelId = 0
		this.hasDangleClaws = false
		this.hasMultiHand = false
		this.hasHighJumpShoe = false
		this.numOfGunUps = 1

		this.allowDangling = false
		this.allowDanglePullUp = false
		this.allowShooting = true
		this.movementAllowed = true
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
		if (this.movementAllowed) {
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
				if (this.gameControls.touch_JUMP.isDown || Phaser.Input.Keyboard.JustDown(this.gameControls.key_JUMP)) {
					this.setVelocityY(this.jumpPower)
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
				if ((this.gameControls.touch_FIRE.isDown || Phaser.Input.Keyboard.JustDown(this.gameControls.key_FIRE)) && this.body.velocity.x === 0) {
					if (this.lastDir === 1) {
						this.setFrame('dangleShootR_0000')
					} else {
						this.setFrame('dangleShootL_0000')
					}
					this.gun.fireBullet(this.x, this.y, this.lastDir)
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
					if (this.allowDanglePullUp) {
						if (this.gameControls.touch_JUMP.isDown || this.gameControls.key_JUMP.isDown) {
							this.body.checkCollision.up = false
							if (this.painState) {
								this.anims.play('heroPainLeft', true)
							} else {
								this.anims.play('heroDangleUpL', true)
							}
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
					if (this.allowDanglePullUp) {
						if (this.gameControls.touch_JUMP.isDown || this.gameControls.key_JUMP.isDown) {
							this.body.checkCollision.up = false
							if (this.painState) {
								this.anims.play('heroPainRight', true)
							} else {
								this.anims.play('heroDangleUpR', true)
							}
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
				this.setVelocityY(this.jumpPower)
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
		}
		
		// the bounding box offset debends on hero direction ... the bottom back edge should overlap the heros heel
		if (this.lastDir === -1) {
			this.body.setOffset(12, 2)
		} else {
			this.body.setOffset(10, 2)
		}

		// <-- hero movement

		// fire gun -->
		if ((this.gameControls.touch_FIRE.isDown || Phaser.Input.Keyboard.JustDown(this.gameControls.key_FIRE)) && this.allowShooting) {
			this.gun.fireBullet(this.x, this.y, this.lastDir)
		}
		// <-- fire gun

		// reset pain -->
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

		// game over -->
		if (this.healthBlocks.current < 0) {
			this.movementAllowed = false
			if (this.anims.currentAnim.key !== 'heroExplode') {
				this.play('heroExplode')
				this.body.checkCollision.none = true
				this.setGravityY(-200)
			}
			if (this.y < -1000 || this.y > 3000) {
				// this.scene.scene.manager.stop('Level0Scene')
				this.scene.scene.manager.start('SubmitScoreScene' , { points: this.collectedPoints })
			}
		}
		// <-- game over

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
				], resumeSceneKey: 'Level0Scene'})
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
				], resumeSceneKey: 'Level0Scene'})
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
		this.collectedPoints += points
		this.gameControls.updatePointDsp(this.collectedPoints)
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
			this.numOfGunUps += 1
			this.gameControls.upgradeGunPower()
			this.gun.upgradeGunPower()
		} else if (equipmentObj.name === 'HighJumpShoe') {
			this.hasHighJumpShoe = true
			this.upgradeJumpPower()
		} else if ((equipmentObj.keysNGatesType !== undefined)) {
			if (equipmentObj.keysNGatesType === 'Key') {
				this.collectedKeyIds.push(equipmentObj.keyID)
			}
		}
	}

	upgradeJumpPower() {
		this.jumpPower -= 20
		this.jumpSpeed += 26
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

	updateHealthBlock() {
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

	resetEquipment() {
		this.equipment.nextPosIndex = 0
		if (this.hasHighJumpShoe) {
			let highJumpShow = this.scene.add.sprite(
				this.equipment.positions[this.equipment.nextPosIndex].x,
				this.equipment.positions[this.equipment.nextPosIndex].y,
				'giftsSpriteAtlas',
				'HighJumpShoe_0000'
			)
			highJumpShow.setDepth(102)
			highJumpShow.setScrollFactor(0)
			this.equipment.nextPosIndex += 1
			this.upgradeJumpPower()
		}
		if (this.hasDangleClaws) {
			let hasDangleClaws = this.scene.add.sprite(
				this.equipment.positions[this.equipment.nextPosIndex].x,
				this.equipment.positions[this.equipment.nextPosIndex].y,
				'giftsSpriteAtlas',
				'DangleClaw_0000'
			)
			hasDangleClaws.setDepth(102)
			hasDangleClaws.setScrollFactor(0)
			this.equipment.nextPosIndex += 1
		}
		if (this.hasMultiHand) {
			let hasMultiHand = this.scene.add.sprite(
				this.equipment.positions[this.equipment.nextPosIndex].x,
				this.equipment.positions[this.equipment.nextPosIndex].y,
				'giftsSpriteAtlas',
				'MultiHand_0000'
			)
			hasMultiHand.setDepth(102)
			hasMultiHand.setScrollFactor(0)
			this.equipment.nextPosIndex += 1
		}
		for (let i = 0; i < this.numOfGunUps; i++) {
			let gunPowerUp = this.scene.add.sprite(
				this.equipment.positions[this.equipment.nextPosIndex].x,
				this.equipment.positions[this.equipment.nextPosIndex].y,
				'giftsSpriteAtlas',
				'GunUpgrade_0000'
			)
			gunPowerUp.setDepth(102)
			gunPowerUp.setScrollFactor(0)
			this.equipment.nextPosIndex += 1
			this.gameControls.upgradeGunPower()
			this.gun.upgradeGunPower()
		}
	}
}