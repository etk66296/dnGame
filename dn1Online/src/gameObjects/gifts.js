class GiftBox extends PhysicsObj {
	constructor (scene, hero, x, y, gift) {
		super(scene, x, y, 'giftsSpriteAtlas', gift.giftData.properties.boxframe)
		this.body.setSize(16, 18, true)
		this.hero = hero
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
			this.hero.addPoints(this.giftData.properties.points)
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
}

class SpecialGift extends GiftObj {
	constructor (scene, hero, giftData) {
		super(scene, hero, giftData.x + 8, giftData.y + 8, 'giftsSpriteAtlas', giftData.properties.frame)
		this.box = null
		this.alpha = 1.0
		this.giftData = giftData
		this.name = giftData.name
		this.overlapHeroEvent = this.scene.physics.add.overlap(this, this.hero, () => {
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
			if (this.giftState === 0) {
				this.hero.addPoints(giftData.properties.pointsA)
				this.play('Points' + String(giftData.properties.pointsA))
			} else {
				this.hero.addPoints(giftData.properties.pointsB)
				this.play('Points' + String(giftData.properties.pointsB))
			}
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
			this.body.checkCollision.none = true
			this.box = new GiftBox(scene, hero, giftData.x + 8, giftData.y + 8, this)
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
			if (this.giftState === 0) {
				this.hero.addHealth(giftData.properties.healthA)
				this.hero.addPoints(giftData.properties.pointsA)
				this.play('Points' + String(giftData.properties.pointsA))
				scene.physics.world.removeCollider(this.shootableGiftEvent)
				this.isCollected = true
				if (this.name === 'ColaTin') {
					this.setVelocityY(-20) // the tin itself
				}
				if (this.name === 'ChopOfMeat' || this.name === 'FullPowerUp') {
					this.setVelocityY(-10) // point flyer
				}
				scene.physics.world.removeCollider(this.overlapHeroEvent)
			} else {
				this.hero.addHealth(giftData.properties.healthB)
				this.hero.addPoints(giftData.properties.pointsB)
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
			} else if(giftData.name === 'Balloon') {
				this.add(new FragileGift(scene, hero, giftData))
			} else {
				this.add(new JustCollectGift(scene, hero, giftData))
			}
		})
		scene.physics.add.collider(this, solidLayer)
	}
}
