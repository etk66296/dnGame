class GiftBox extends PhysicsObj {
	constructor (scene, hero, x, y, gift) {
		super(scene, x, y, 'giftsSpriteAtlas', gift.giftData.properties.boxframe)
		this.body.setSize(16, 18, true)
		// after the box explode remove the sprite
		this.boxAnimCompleteEvent = this.on('animationcomplete', () => {
			this.body.reset(-100, -100)
			this.setActive(false)
			this.setVisible(false)
			scene.physics.world.removeCollider(this.boxAnimCompleteEvent)
		})
		// register box as shootable
		this.shootableBoxEvent = this.scene.physics.add.overlap(this, hero.gun, (box, bullet) => {
			bullet.explode()
			this.body.checkCollision.none = true
			this.play(gift.giftData.properties.boxanim)
			// activate the box content
			gift.setActive(true)
			gift.body.checkCollision.none = false
			scene.physics.world.removeCollider(this.shootableBoxEvent)
		})
	}
}

class JustCollectGift extends GiftObj {
	constructor (scene, hero, giftData) {
		super(scene, hero, giftData.x + 8, giftData.y + 8, 'giftsSpriteAtlas', giftData.properties.frame)
		this.box = null
		this.alpha = 1.0
		this.giftData = giftData
		this.overlapHeroEvent = this.scene.physics.add.overlap(this, this.hero, () => {
			this.hero.addPoints(giftData.points)
			// this.setActive(false)
			this.play('Points' + String(giftData.properties.points))
			this.setVelocityY(-10)
			scene.physics.world.removeCollider(this.overlapHeroEvent)
			this.isCollected = true
		})
		if (giftData.properties.anim !== "") {
			this.play(giftData.properties.anim)
		}
		// if packed => pack it
		if (giftData.type === "packed") {
			this.setActive(false)
			this.body.checkCollision.none = true
			this.box = new GiftBox(scene, hero, giftData.x + 8, giftData.y + 8, this)
		}
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.isCollected) {
			this.setAlpha(this.alpha)
			this.alpha -= 0.0025
			if(this.alpha <= 0.0) {
				this.setActive(false)
				this.setVisible(false)
			}
		}
	}
}

class HealthUpGift extends GiftObj {
	constructor (scene, hero, giftData) {
		super(scene, hero, giftData.x + 8, giftData.y + 8, 'giftsSpriteAtlas', giftData.properties.frame)
		this.name = giftData.name
		this.box = null
		this.alpha = 1.0
		this.giftData = giftData
		this.body.setSize(16, 18, true) // thus, the gun is able to hit it while hero is touching the floor
		this.giftState = 0  /* Exaple ... 0: tin touches the floor, 1: tin was shoot and flys up*/
		this.overlapHeroEvent = this.scene.physics.add.overlap(this, this.hero, () => {
			// cola tin
			if (this.giftState === 0) {
				this.hero.addHealth(giftData.properties.healthA)
				this.hero.addPoints(giftData.pointsA)
				this.play('Points' + String(giftData.properties.pointsA))
				scene.physics.world.removeCollider(this.shootableGiftEvent)
				this.isCollected = true
				if (this.name === 'ColaTin') {
					this.setVelocityY(-20)
				}
				if (this.name === 'ChopOfMeat') {
					this.setVelocityY(-10) // point flyer
				}
				scene.physics.world.removeCollider(this.overlapHeroEvent)
			} else {
				this.hero.addHealth(giftData.properties.healthB)
				this.hero.addPoints(giftData.pointsB)
				this.play('Points' + String(giftData.properties.pointsB))
				this.setVelocityY(-10)
				this.isCollected = true
				scene.physics.world.removeCollider(this.shootableGiftEvent)
				scene.physics.world.removeCollider(this.overlapHeroEvent)
			}
		})

		// the unpacked gitft is also shootable
		this.shootableGiftEvent = this.scene.physics.add.overlap(this, this.hero.gun, (box, bullet) => {
			bullet.explode()
			this.play(this.giftData.properties.animB)
			this.giftState = 1
			if (this.name === 'ColaTin') {
				this.setVelocityY(-20)
			}
			scene.physics.world.removeCollider(this.shootableGiftEvent)
		})

		// set the start animation
		if (giftData.properties.animA !== "") {
			this.play(giftData.properties.animA)
		}

		// if packed => pack it
		if (giftData.type === "packed") {
			this.setActive(false)
			this.body.checkCollision.none = true
			this.box = new GiftBox(scene, hero, giftData.x + 8, giftData.y + 8, this)
		}
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.isCollected) {
			this.setAlpha(this.alpha)
			this.alpha -= 0.0025
			if(this.alpha <= 0.0) {
				this.setActive(false)
				this.setVisible(false)
			}
		}
	}
}

class Gifts extends Phaser.Physics.Arcade.Group {
	constructor (scene, hero, giftsData, solidLayer) {
		super(scene.physics.world, scene)
		this.hero = hero
		giftsData.forEach((giftData) => {
			if (giftData.name === 'ColaTin' || giftData.name === 'ChopOfMeat') {
				this.add(new HealthUpGift(scene, hero, giftData))
			} else if(giftData.name === 'Dynamite') {

			} else {
				this.add(new JustCollectGift(scene, hero, giftData))
			}
		})
		scene.physics.add.collider(this, solidLayer)
	}
}

// class Gift extends Phaser.Physics.Arcade.Sprite {
// 	constructor (scene,
// 		x,
// 		y,
// 		name,
// 		type,
// 		giftPoints,
// 		pointsFlyers,
// 		frame,
// 		heroBullets,
// 		floorfire,
// 		backdraft,
// 		pickupGiftSound,
// 		explosionSound,
// 		healthBlocks,
// 		pointCounterDsp
// 	) {
// 		super(scene, x, y, 'giftsSpriteAtlas')
// 		scene.add.existing(this)
// 		scene.physics.add.existing(this)
// 		this.name = name
// 		this.type = type
// 		this.boxAnimation = frame + 'Explode'
// 		this.giftPoints = giftPoints
// 		this.pointsFlyers = pointsFlyers
// 		this.frame = frame
// 		this.heroBullets = heroBullets
// 		this.floorfire = floorfire
// 		this.backdraft = backdraft
// 		this.allowCollect = true 
// 		this.hits = 0
// 		this.pickupGiftSound = pickupGiftSound
// 		this.explosionSound = explosionSound
// 		this.healthBlocks = healthBlocks
// 		this.pointCounterDsp = pointCounterDsp
// 		this.setSize(16, 17, true)
// 		this.setOffset(0, -1)
// 	}
// 	setup () {
// 		this.setGravityY(200)
// 		if (this.type === 'packed') {
// 			this.hits = 1
// 			this.allowCollect = false
// 			this.setFrame(this.frame)
// 			this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
// 				if (!this.explosionSound.isPlaying) {
// 					this.explosionSound.play()
// 				}
// 				if (this.hits > 0) {
// 					bullet.body.checkCollision.none = true
// 					bullet.setVelocityX(0)
// 					bullet.play('heroExplode')
// 					this.play(this.boxAnimation)
// 					if (this.name === 'ColaTin') {
// 						this.setFrame('ColaTin_0000')
// 					}
// 					this.hits -= 1
// 				}
// 			}, null, this)
// 			this.on('animationcomplete', () => {
// 				if (this.hits <= 0) {
// 					this.allowCollect = true
// 					switch(this.name) {
// 						case 'Flag':
// 							this.play('Flag')
// 							this.pointCounterDsp.amount += 10
// 							break
// 						case 'Football':
// 							this.setFrame('Football')
// 							this.pointCounterDsp.amount += 10
// 							break
// 						case 'Radio':
// 							this.setFrame('Radio')
// 							this.pointCounterDsp.amount += 10
// 							break
// 						case 'Joystick':
// 							this.setFrame('Joystick')
// 							this.pointCounterDsp.amount += 10
// 							break
// 						case 'FloppyDisk':
// 							this.setFrame('FloppyDisk')
// 							this.pointCounterDsp.amount += 10
// 							break
// 						case 'FullPowerUp':
// 								this.play('FullPowerUp')
// 								this.pointCounterDsp.amount += 10
// 							break
// 						case 'GiftCharacter':
// 								this.setFrame(this.frame)
// 								this.pointCounterDsp.amount += 10
// 							break
// 						case 'Balloon':
// 							this.setGravityY(-20)
// 							this.play('Balloon')
// 							this.pointCounterDsp.amount += 10
// 							this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
// 									bullet.body.checkCollision.none = true
// 									bullet.setVelocityX(0)
// 									bullet.play('heroExplode')
// 									this.setActive(false)
// 									this.setVisible(false)
// 									this.setPosition(-123, -123)
// 							}, null, this)
// 							break
// 						case 'ColaTin':
// 							this.setFrame('ColaTin_0000')
// 							this.pointCounterDsp.amount += 10
// 							this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
// 								bullet.body.checkCollision.none = true
// 								bullet.setVelocityX(0)
// 								bullet.play('heroExplode')
// 								this.setGravityY(-100)
// 								this.play('ColaTin')
// 								this.body.checkCollision.up = false
// 						}, null, this)
// 							break
// 						case 'ChopOfMeat':
// 								this.setFrame('SingleChopOfMeat')
// 								this.pointCounterDsp.amount += 10
// 								this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
// 									bullet.body.checkCollision.none = true
// 									bullet.setVelocityX(0)
// 									bullet.play('heroExplode')
// 									this.setFrame('DoubleChopOfMeat')
// 							}, null, this)
// 								break
// 						case 'Dynamite':
// 							this.pointCounterDsp.amount += 10
// 							this.floorfire.detonate(this.x, this.y, this.backdraft)
// 							this.collected()
// 							break
// 						case 'Empty':
// 								this.pointCounterDsp.amount += 10
// 								this.collected()
// 								break
// 					}
// 				} else {
// 					this.setFrame(this.frame)
// 				}
// 			})
// 		} else {
// 			switch(this.name) {
// 				case 'Flag':
// 					this.play('Flag')
// 					break
// 				case 'Football':
// 					this.setFrame('Football')
// 					break
// 				case 'Joystick':
// 					this.setFrame('Joystick')
// 					break
// 				case 'Radio':
// 					this.setFrame('Radio')
// 					break
// 				case 'FloppyDisk':
// 					this.setFrame('FloppyDisk')
// 					break
// 				case 'GiftCharacter':
// 					this.setFrame(this.frame)
// 					break
// 				case 'Balloon':
// 					this.play('Balloon')
// 					this.setGravityY(-20)
// 					this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
// 						bullet.body.checkCollision.none = true
// 						bullet.setVelocityX(0)
// 						bullet.play('heroExplode')
// 						this.setActive(false)
// 						this.setVisible(false)
// 						this.setPosition(-123, -123)
// 					}, null, this)
// 					break
// 				case 'FullPowerUp':
// 					this.play('FullPowerUp')
// 					break
// 				case 'ColaTin':
// 					this.setFrame('ColaTin_0000')
// 					this.scene.physics.add.overlap(this, this.heroBullets, (gift, bullet) => {
// 						bullet.body.checkCollision.none = true
// 						bullet.setVelocityX(0)
// 						bullet.play('heroExplode')
// 						this.setGravityY(-100)
// 						this.play('ColaTin')
// 						this.body.checkCollision.up = false
// 				})
// 					break
// 				case 'ChopOfMeat':
// 					this.setFrame('SingleChopOfMeat')
// 					this.scene.physics.add.overlap(this, this.heroBullets, (gift, bullet) => {
// 						bullet.body.checkCollision.none = true
// 						bullet.setVelocityX(0)
// 						bullet.play('heroExplode')
// 						this.setFrame('DoubleChopOfMeat')
// 					})
// 					break
// 			}
// 		}
// 	}
// 	collected () {
// 		if (this.allowCollect) {
// 			if (!this.pickupGiftSound.isPlaying) {
// 				this.pickupGiftSound.play()
// 			}
// 			switch(this.name) {
// 				case 'Flag':
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					this.pointCounterDsp.amount += this.giftPoints
// 					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 					this.body.reset(1000, -100)
// 				break
// 				case 'Football':
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					this.pointCounterDsp.amount += this.giftPoints
// 					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 					this.body.reset(1000, -100)
// 				break
// 				case 'Radio':
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					this.pointCounterDsp.amount += this.giftPoints
// 					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 					this.body.reset(1000, -100)
// 				break
// 				case 'Joystick':
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					this.pointCounterDsp.amount += this.giftPoints
// 					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 					this.body.reset(1000, -100)
// 				break
// 				case 'FloppyDisk':
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					this.pointCounterDsp.amount += this.giftPoints
// 					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 					this.body.reset(1000, -100)
// 				break
// 				case 'GiftCharacter':
// 					this.scene.collectedGiftsChar += this.frame.name.substring(this.frame.name.length - 1, this.frame.name.length)
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					this.pointCounterDsp.amount += this.giftPoints
// 					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 					if (this.scene.collectedGiftsChar === 'OGVW') {
// 						this.pointCounterDsp.amount += 100
// 						this.pointsFlyers.showUp(this.x, this.y, 'Points_100')
// 						this.pointCounterDsp.amount += 1000
// 						this.pointsFlyers.showUp(this.x + 16, this.y, 'Points_1000')
// 						this.pointCounterDsp.amount += 5000
// 						this.pointsFlyers.showUp(this.x + 32, this.y, 'Points_5000')
// 						this.pointCounterDsp.amount += 10000
// 						this.pointsFlyers.showUp(this.x + 48, this.y, 'Points_10000')
// 						this.pointCounterDsp.amount += 10000
// 						this.pointsFlyers.showUp(this.x + 64, this.y, 'Points_10000')
// 						this.pointCounterDsp.amount += 10000
// 						this.pointsFlyers.showUp(this.x + 80, this.y, 'Points_10000')
// 					}
// 					this.body.reset(1000, -100)
// 				break
// 				case 'Balloon':
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					this.pointCounterDsp.amount += this.giftPoints
// 					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 					this.body.reset(1000, -100)
// 				break
// 				case 'FullPowerUp':
// 					this.healthBlocks.current = this.healthBlocks.max
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					this.pointCounterDsp.amount += this.giftPoints
// 					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 					this.body.reset(1000, -100)
// 				break
// 				case 'ColaTin':
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					if (this.body.onFloor()) {
// 						this.pointCounterDsp.amount += this.giftPoints
// 						this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 						if (this.healthBlocks.current< this.healthBlocks.max) {
// 							this.healthBlocks.current += 1
// 						}
// 					} else {
// 						this.pointCounterDsp.amount += 1000
// 						this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints) + '0')
// 					}
// 					this.body.reset(1000, -100)
// 				break
// 				case 'ChopOfMeat':
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					if (this.frame.name === 'SingleChopOfMeat') {
// 						this.pointCounterDsp.amount += 500
// 						this.pointsFlyers.showUp(this.x, this.y, 'Points_500')
// 						if (this.healthBlocks.current< this.healthBlocks.max) {
// 							this.healthBlocks.current += 1
// 						}
// 					} else {
// 						this.pointCounterDsp.amount += this.giftPoints
// 						this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.giftPoints))
// 						if (this.healthBlocks.current< this.healthBlocks.max) {
// 							this.healthBlocks.current += 2
// 						}
// 					}
// 					this.body.reset(1000, -100)
// 				break
// 				default:
// 					this.body.checkCollision.none = true
// 					this.body.setAllowGravity(false)
// 					this.setActive(false)
// 					this.setVisible(false)
// 					this.body.reset(1000, -100)
// 			}
// 		}
// 	}
// }
// class Gifts extends Phaser.Physics.Arcade.Group {
// 	constructor (scene,
// 		giftsData,
// 		solidLayer,
// 		pointFlyers,
// 		heroBullets,
// 		floorfire,
// 		pickupGiftSound,
// 		explosionSound,
// 		healthBlocks,
// 		pointCounterDsp
// 	) {
// 		super(scene.physics.world, scene)
// 		giftsData.forEach((giftData) => {
// 			this.add(new Gift(scene,
// 				giftData.x + 8,
// 				giftData.y + 8,
// 				giftData.name,
// 				giftData.type,
// 				giftData.properties.points,
// 				pointFlyers,
// 				giftData.properties.frame,
// 				heroBullets,
// 				floorfire,
// 				giftData.properties.backdraft,
// 				pickupGiftSound,
// 				explosionSound,
// 				healthBlocks,
// 				pointCounterDsp
// 			))
// 		})
// 		scene.physics.add.collider(this, solidLayer)
//   }
// }