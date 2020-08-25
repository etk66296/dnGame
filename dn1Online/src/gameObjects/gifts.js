class Gift extends Phaser.Physics.Arcade.Sprite {
	constructor (scene,
		x,
		y,
		name,
		type,
		points,
		pointsFlyers,
		frame,
		heroBullets,
		floorfire,
		backdraft,
		pickupGiftSound,
		explosionSound,
		healthBlocks
	) {
		super(scene, x, y, 'giftsSpriteAtlas')
		scene.add.existing(this)
		scene.physics.add.existing(this)
		this.name = name
		this.type = type
		this.boxAnimation = frame + 'Explode'
		this.points = points
		this.pointsFlyers = pointsFlyers
		this.frame = frame
		this.heroBullets = heroBullets
		this.floorfire = floorfire
		this.backdraft = backdraft
		this.allowCollect = true 
		this.hits = 0
		this.pickupGiftSound = pickupGiftSound
		this.explosionSound = explosionSound
		this.healthBlocks = healthBlocks
	}
	setup () {
		this.setGravityY(200)
		if (this.type === 'packed') {
			this.hits = 1
			this.allowCollect = false
			this.setFrame(this.frame)
			this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
				if (!this.explosionSound.isPlaying) {
					this.explosionSound.play()
				}
				if (this.hits > 0) {
					bullet.body.checkCollision.none = true
					bullet.setVelocityX(0)
					bullet.play('heroExplode')
					this.play(this.boxAnimation)
					if (this.name === 'ColaTin') {
						this.setFrame('ColaTin_0000')
					}
					this.hits -= 1
				}
			}, null, this)
			this.on('animationcomplete', () => {
				if (this.hits <= 0) {
					this.allowCollect = true
					switch(this.name) {
						case 'Flag':
							this.play('Flag')
							break
						case 'Football':
							this.setFrame('Football')
							break
						case 'Radio':
							this.setFrame('Radio')
							break
						case 'Joystick':
							this.setFrame('Joystick')
							break
						case 'FloppyDisk':
							this.setFrame('FloppyDisk')
							break
						case 'FullPowerUp':
								this.play('FullPowerUp')
							break
						case 'GiftCharacter':
								this.setFrame(this.frame)
							break
						case 'Balloon':
							this.setGravityY(-20)
							this.play('Balloon')
							this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
									bullet.body.checkCollision.none = true
									bullet.setVelocityX(0)
									bullet.play('heroExplode')
									this.setActive(false)
									this.setVisible(false)
									this.setPosition(-123, -123)
							}, null, this)
							break
						case 'ColaTin':
							this.setFrame('ColaTin_0000')
							this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
								bullet.body.checkCollision.none = true
								bullet.setVelocityX(0)
								bullet.play('heroExplode')
								this.setGravityY(-100)
								this.play('ColaTin')
								this.body.checkCollision.up = false
						}, null, this)
							break
						case 'ChopOfMeat':
								this.setFrame('SingleChopOfMeat')
								this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
									bullet.body.checkCollision.none = true
									bullet.setVelocityX(0)
									bullet.play('heroExplode')
									this.setFrame('DoubleChopOfMeat')
							}, null, this)
								break
						case 'Dynamite':
							this.floorfire.detonate(this.x, this.y, this.backdraft)
							this.collected()
							break
						case 'Empty':
								this.collected()
								break
					}
				} else {
					this.setFrame(this.frame)
				}
			})
		} else {
			switch(this.name) {
				case 'Flag':
					this.play('Flag')
					break
				case 'Football':
					this.setFrame('Football')
					break
				case 'Joystick':
					this.setFrame('Joystick')
					break
				case 'Radio':
					this.setFrame('Radio')
					break
				case 'FloppyDisk':
					this.setFrame('FloppyDisk')
					break
				case 'GiftCharacter':
					this.setFrame(this.frame)
					break
				case 'Balloon':
					this.play('Balloon')
					this.setGravityY(-20)
					this.scene.physics.add.overlap(this, this.heroBullets, function(gift, bullet) {
						bullet.body.checkCollision.none = true
						bullet.setVelocityX(0)
						bullet.play('heroExplode')
						this.setActive(false)
						this.setVisible(false)
						this.setPosition(-123, -123)
					}, null, this)
					break
				case 'FullPowerUp':
					this.play('FullPowerUp')
					break
				case 'ColaTin':
					this.setFrame('ColaTin_0000')
					this.scene.physics.add.overlap(this, this.heroBullets, (gift, bullet) => {
						bullet.body.checkCollision.none = true
						bullet.setVelocityX(0)
						bullet.play('heroExplode')
						this.setGravityY(-100)
						this.play('ColaTin')
						this.body.checkCollision.up = false
				})
					break
				case 'ChopOfMeat':
					this.setFrame('SingleChopOfMeat')
					this.scene.physics.add.overlap(this, this.heroBullets, (gift, bullet) => {
						bullet.body.checkCollision.none = true
						bullet.setVelocityX(0)
						bullet.play('heroExplode')
						this.setFrame('DoubleChopOfMeat')
					})
					break
			}
		}
	}
	collected () {
		if (this.allowCollect) {
			if (!this.pickupGiftSound.isPlaying) {
				this.pickupGiftSound.play()
			}
			switch(this.name) {
				case 'Flag':
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
					this.body.reset(1000, -100)
				break
				case 'Football':
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
					this.body.reset(1000, -100)
				break
				case 'Radio':
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
					this.body.reset(1000, -100)
				break
				case 'Joystick':
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
					this.body.reset(1000, -100)
				break
				case 'FloppyDisk':
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
					this.body.reset(1000, -100)
				break
				case 'GiftCharacter':
					this.scene.collectedGiftsChar += this.frame.name.substring(this.frame.name.length - 1, this.frame.name.length)
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
					if (this.scene.collectedGiftsChar === 'OGVW') {
						console.log('super power')
						this.pointsFlyers.showUp(this.x, this.y, 'Points_100')
						this.pointsFlyers.showUp(this.x + 16, this.y, 'Points_1000')
						this.pointsFlyers.showUp(this.x + 32, this.y, 'Points_5000')
						this.pointsFlyers.showUp(this.x + 48, this.y, 'Points_10000')
						this.pointsFlyers.showUp(this.x + 64, this.y, 'Points_10000')
						this.pointsFlyers.showUp(this.x + 80, this.y, 'Points_10000')
					}
					this.body.reset(1000, -100)
				break
				case 'Balloon':
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
					this.body.reset(1000, -100)
				break
				case 'FullPowerUp':
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
					this.body.reset(1000, -100)
				break
				case 'ColaTin':
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					if (this.body.onFloor()) {
						this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
						if (this.healthBlocks.current< this.healthBlocks.max) {
							this.healthBlocks.current += 1
						}
					} else {
						this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points) + '0')
					}
					this.body.reset(1000, -100)
				break
				case 'ChopOfMeat':
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					if (this.frame.name === 'SingleChopOfMeat') {
						this.pointsFlyers.showUp(this.x, this.y, 'Points_500')
						if (this.healthBlocks.current< this.healthBlocks.max) {
							this.healthBlocks.current += 1
						}
					} else {
						this.pointsFlyers.showUp(this.x, this.y, 'Points_' + String(this.points))
						if (this.healthBlocks.current< this.healthBlocks.max) {
							this.healthBlocks.current += 2
						}
					}
					this.body.reset(1000, -100)
				break
				default:
					this.body.checkCollision.none = true
					this.body.setAllowGravity(false)
					this.setActive(false)
					this.setVisible(false)
					this.body.reset(1000, -100)
			}
		}
	}
}
class Gifts extends Phaser.Physics.Arcade.Group {
	constructor (scene,
		giftsData,
		solidLayer,
		pointFlyers,
		heroBullets,
		floorfire,
		pickupGiftSound,
		explosionSound,
		healthBlocks
	) {
		super(scene.physics.world, scene)
		giftsData.forEach((giftData) => {
			this.add(new Gift(scene,
				giftData.x + 8,
				giftData.y + 8,
				giftData.name,
				giftData.type,
				giftData.properties.points,
				pointFlyers,
				giftData.properties.frame,
				heroBullets,
				floorfire,
				giftData.properties.backdraft,
				pickupGiftSound,
				explosionSound,
				healthBlocks
			))
		})
		scene.physics.add.collider(this, solidLayer)
  }
}