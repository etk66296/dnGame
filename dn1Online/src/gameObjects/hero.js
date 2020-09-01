class Hero extends PhysicsObj {
  constructor (scene, x, y, solidLayer, gameControls, gun) {
		super(scene, x, y, 'heroSpriteAtlas', 'idleR_0000')
		// scene.add.existing(this)
		// scene.physics.add.existing(this)
		this.solidLayer = solidLayer
		this.equipment = null
		this.gameControls = gameControls
		this.lastDir = 0
		this.jumpSpeed = 0
		this.painState = false
		this.gun = gun
		return this
	}
	setup() {
		this.jumpSpeed = 85
		this.lastDir = 1
		this.setName('hero')
		this.body.setSize(12, 32, true)
		this.body.setOffset(9, 0)
		this.setGravityY(300)
		this.setBounce(0.0)
		this.scene.physics.add.collider(this, this.solidLayer)
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
		]}
	}

	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		// hero movement -->
		if (this.gameControls.key_LEFT.isDown || this.gameControls.touch_LEFT.isDown) {
			if(this.body.onFloor()) {
				this.setVelocityX(-140)
				if (this.PainState) {
					this.anims.play('heroPainLeft', true)
				} else {
					this.anims.play('heroWalkLeft', true)
				}
			} else {
				this.setVelocityX(-this.jumpSpeed)
				if (this.PainState) {
					this.anims.play('heroPainLeft', true)
				} else {
					this.anims.play('heroJumpLeft', true)
				}
			}
			this.lastDir = -1
		}  else if (this.gameControls.key_RIGHT.isDown || this.gameControls.touch_RIGHT.isDown) {
			if(this.body.onFloor()) {
				this.setVelocityX(140)
				if (this.PainState) {
					this.anims.play('heroPainRight', true)
				} else {
					this.anims.play('heroWalkRight', true)
				}
			} else {
				this.setVelocityX(this.jumpSpeed)
				if (this.PainState) {
					this.anims.play('heroPainRight', true)
				} else {
					this.anims.play('heroJumpRight', true)
				}
			}
			this.lastDir = 1
		} else {
			this.setVelocityX(0)
			if(this.lastDir === -1) {
				if (this.painState) {
					this.anims.play('heroPainLeft', true)
				} else {
					this.anims.play('heroIdleLeft')
				}
			} else {
				if (this.painState) {
					this.anims.play('heroPainRight', true)
				} else {
					this.anims.play('heroIdleRight')
				}
			}
		}
		if ((this.gameControls.touch_JUMP.isDown || this.gameControls.key_JUMP.isDown) && this.body.onFloor()) {
			this.setVelocityY(-185)
		}
		// <-- hero movement
		// fire gun -->
		if (this.gameControls.touch_FIRE.isDown || this.gameControls.key_FIRE.isDown) {
			this.gun.fireBullet(this.x, this.y, this.lastDir)
			// console.log(this.gun)
		}
	// <-- fire
	}
}