class EmptyBox extends PhysicsObj {
	constructor (scene, hero, boxData) {
		super(scene, boxData.x + 8, boxData.y + 8, 'giftsSpriteAtlas', boxData.properties.boxframe)
		this.body.setSize(16, 18, true)
		this.hero = hero
		this.giftData = boxData
		this.box = null
		// after the box explode remove the sprite
		this.boxAnimCompleteEvent = this.on('animationcomplete', () => {
			this.body.reset(-100, -100)
			this.setActive(false)
			this.setVisible(false)
			scene.physics.world.removeCollider(this.boxAnimCompleteEvent)
		})
		// register box as shootable
		this.shootableBoxEvent = this.scene.physics.add.overlap(this, hero.gun, (box, bullet) => {
			this.hero.addPoints(boxData.properties.points) // open a box points
			bullet.explode()
			this.body.checkCollision.none = true
			this.play(boxData.properties.boxanim)
			scene.physics.world.removeCollider(this.shootableBoxEvent)
		})
	}
}

class GiftBox extends PhysicsObj {
	constructor (scene, hero, x, y, gift) {
		super(scene, x, y, 'giftsSpriteAtlas', gift.giftData.properties.boxframe)
		this.body.setSize(16, 18, true)
		this.hero = hero
		this.teased = false
		this.gift = gift
		// after the box explode remove the sprite
		this.boxAnimCompleteEvent = this.on('animationcomplete', () => {
			this.body.reset(-100, -100)
			this.setActive(false)
			this.setVisible(false)
			scene.physics.world.removeCollider(this.boxAnimCompleteEvent)
		})
		// register box as shootable
		this.shootableBoxEvent = this.scene.physics.add.overlap(this, hero.gun, (box, bullet) => {
			this.hero.addPoints(1) // open a box points
			bullet.explode()
			this.body.checkCollision.none = true
			this.setGravityY(0)
			this.play(gift.giftData.properties.boxanim)
			// activate the box content
			gift.setActive(true)
			gift.body.checkCollision.none = false
			scene.physics.world.removeCollider(this.shootableBoxEvent)
		})
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.gift.giftData.properties.teaser && !this.teased) {
			let currentDst = Phaser.Math.Distance.Between(this.hero.x, this.hero.y, this.x, this.y)
			if (currentDst < this.gift.giftData.properties.teaserDist) {
				this.setGravityY(300)
				this.teased = true
			}
		}
		if (this.body.velocity.y !== 0) {
			this.gift.setVisible(false)
			this.gift.y = this.y - 2 // gift must be shootable => subtract the offset of 2 this.body.setSize(16, --> 18 <--, true)
		} else {
			this.gift.setVisible(true)
		}
	}
}

class JustCollectGift extends GiftObj {
	constructor (scene, hero, giftData) {
		super(scene, hero, giftData.x + 8, giftData.y + 8, 'giftsSpriteAtlas', giftData.properties.frame)
		this.box = null
		this.alpha = 1.0
		this.giftData = giftData
		this.overlapHeroEvent = this.scene.physics.add.overlap(this, this.hero, () => {
			this.hero.addPoints(this.giftData.properties.points)
			// play sound
			this.pikUpSound.play()
			// this.setActive(false)
			this.play('Points' + String(giftData.properties.points))
			this.setGravityY(0)
			this.body.checkCollision.none = true // none collision must be set to lift up the point flyer
			this.setVelocityY(-10)
			scene.physics.world.removeCollider(this.overlapHeroEvent)
			this.isCollected = true

			// character gift
			// add it to the heros equipment
			if (this.giftData.name === 'GiftCharacter') {
				this.hero.collectedCharacters += giftData.properties.character
				if (this.hero.collectedCharacters === 'ogvw') {
					for (let i = 0; i < 5; i++) {
						let pointFlyer = this.scene.add.sprite(this.hero.x + i * 18, this.hero.y - i * 10, 'giftsSpriteAtlas')
						pointFlyer.play('Points10000')
						this.hero.addPoints(this.giftData.properties.points * 5)
						this.scene.time.addEvent({
							delay: 3000,
							callback: () => {
								pointFlyer.setActive(false)
								pointFlyer.setVisible(false)
							},
							loop: false
						})
					}
				}
			}
		})
		if (giftData.properties.animA !== "") {
			this.play(giftData.properties.animA)
		}
		// if packed => pack it
		if (giftData.type === "packed") {
			this.setActive(false)
			this.setVisible(false)
			this.body.checkCollision.none = true
			this.box = new GiftBox(scene, hero, giftData.x + 8, giftData.y + 8, this)
		}

		// sound
		this.pikUpSound = scene.sound.add('pickupGift')
	}
}

class SpecialGift extends GiftObj {
	constructor (scene, hero, giftData) {
		super(scene, hero, giftData.x + 8, giftData.y + 8, 'giftsSpriteAtlas', giftData.properties.frame)
		this.box = null
		this.alpha = 1.0
		this.giftData = giftData
		this.name = giftData.name
		this.overlapHeroEvent = this.scene.physics.add.overlap(this, this.hero, () => {
			// play sound
			this.pikUpSound.play()
			this.hero.addPoints(giftData.properties.points)
			this.hero.appendEquipment(this)
			scene.physics.world.removeCollider(this.overlapHeroEvent)			
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
		// sound
		this.pikUpSound = scene.sound.add('pickupGift')
	}
}

class FragileGift extends GiftObj {
	constructor (scene, hero, giftData) {
		super(scene, hero, giftData.x + 8, giftData.y + 8, 'giftsSpriteAtlas', giftData.properties.frame)
		this.name = giftData.name
		this.box = null
		this.alpha = 1.0
		this.giftData = giftData
		this.body.setSize(16, 18, true) // thus, the gun is able to hit it while hero is touching the floor
		this.giftState = 0  /* Exaple ... 0: tin touches the floor, 1: tin was shoot and flys up*/
		this.overlapHeroEvent = this.scene.physics.add.overlap(this, this.hero, () => {
			// play sound
			this.pikUpSound.play()
			if (this.giftState === 0) {
				this.hero.addPoints(giftData.properties.pointsA)
				this.play('Points' + String(giftData.properties.pointsA))
			} else {
				this.hero.addPoints(giftData.properties.pointsB)
				this.play('Points' + String(giftData.properties.pointsB))
			}
			this.setGravityY(0)
			this.body.checkCollision.none = true // none collision must be set to lift up the point flyer
			this.setVelocityY(-10)
			scene.physics.world.removeCollider(this.overlapHeroEvent)
			scene.physics.world.removeCollider(this.shootableGiftEvent)
			this.isCollected = true
		})
		// the unpacked gitft is also shootable
		this.shootableGiftEvent = this.scene.physics.add.overlap(this, this.hero.gun, (box, bullet) => {
			bullet.explode()		
			this.giftState += 1
			if (this.giftState <= 1) {
				this.play(this.giftData.properties.animB)
				this.setVelocityY(-20)
			} else {
				// destroy it
				this.setVisible(false)
				this.setActive(false)
				this.setPosition(-100, -100)
				scene.physics.world.removeCollider(this.shootableGiftEvent)
			}
		})
		// set the start animation
		if (giftData.properties.animA !== "") {
			this.play(giftData.properties.animA)
		}
		// if packed => pack it
		if (giftData.type === "packed") {
			this.setActive(false)
			this.setVisible(false)
			this.body.checkCollision.none = true
			this.box = new GiftBox(scene, hero, giftData.x + 8, giftData.y + 8, this)
		}
		// sound
		this.pikUpSound = scene.sound.add('pickupGift')
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
			// play sound
			this.pikUpSound.play()
			if (this.giftState === 0) {
				this.hero.addHealth(giftData.properties.healthA)
				this.hero.addPoints(giftData.properties.pointsA)
				this.play('Points' + String(giftData.properties.pointsA))
				scene.physics.world.removeCollider(this.shootableGiftEvent)
				this.isCollected = true
				this.body.checkCollision.none = true
				this.setGravityY(0)
				this.setVelocityY(-20) // it looks better to give the point flyers a constant speed instead of negative gravity
				scene.physics.world.removeCollider(this.overlapHeroEvent)
			} else {
				this.hero.addHealth(giftData.properties.healthB)
				this.hero.addPoints(giftData.properties.pointsB)
				this.play('Points' + String(giftData.properties.pointsB))
				this.setGravityY(0) // constant velocity is better than gravity for point fliyers
				this.setVelocityY(-20)
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
				this.setGravityY(-60)
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
			this.setVisible(false)
			this.body.checkCollision.none = true
			this.box = new GiftBox(scene, hero, giftData.x + 8, giftData.y + 8, this)
		}

		// sound
		this.pikUpSound = scene.sound.add('pickupGift')
	}
}

class Gifts extends Phaser.Physics.Arcade.Group {
	constructor (scene, hero, giftsData, solidLayer) {
		super(scene.physics.world, scene)
		this.hero = hero
		giftsData.forEach((giftData) => {
			if (giftData.name === 'ColaTin' ||
					giftData.name === 'ChopOfMeat' ||
					giftData.name === 'FullPowerUp') {
				this.add(new HealthUpGift(scene, hero, giftData))
			} else if(giftData.name === 'Dynamite') {

			} else if(giftData.name === 'HighJumpShoe' ||
								giftData.name === 'DangleClaw' ||
								giftData.name === 'MultiHand' ||
								giftData.name === 'GunUpgrade') {
				this.add(new SpecialGift(scene, hero, giftData))
			} else if(giftData.name === 'EmptyBox') {
				this.add(new EmptyBox(scene, hero, giftData))
			} else if(giftData.name === 'Balloon') {
				this.add(new FragileGift(scene, hero, giftData))
			}	else {
				// JustCollectGift includes character gift implementation
				this.add(new JustCollectGift(scene, hero, giftData))
			}
		})
		// scene.physics.add.collider(this, solidLayer)
		this.children.iterate(mygift => {
			if (mygift.box !== null) {
				scene.physics.add.collider(mygift.box, solidLayer, () => {
					mygift.setVisible(true)
					mygift.setPosition(mygift.box.x, mygift.box.y)
				})
				if (mygift.giftData.properties.gravity) {
					mygift.box.setGravityY(300)
				} else {
					// this is neseccary, cause without gravity no collision, no collision no collider event
					mygift.setVisible(true)
					mygift.setPosition(mygift.box.x, mygift.box.y)
				}
			} // unboxed gifts are also allowed to get gravity
			else if (mygift.giftData.properties.gravity) {
				scene.physics.add.collider(mygift, solidLayer)
				mygift.setGravityY(300)
			}
		})
	}
}
