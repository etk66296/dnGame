class TouchButton extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, frame, ctrlSwitch, buttonScale = 1.0) {
		super(scene, x, y, 'controlButtonsAtlas', frame)
		scene.add.existing(this)
		this.ctrlSwitch = ctrlSwitch
		this.nonePressedFrame = frame
		this.buttonScale = buttonScale
	}
	setup() {
		this.setName(this.nonePressedFrame)
		this.setInteractive()
		this.setDepth(102)
		this.setScrollFactor(0,0)
		this.setScale(this.buttonScale)
		this.on('pointerdown', () => {
			this.ctrlSwitch.isDown = true
			this.setFrame(this.nonePressedFrame + 'Pressed')
		})
		this.on('pointerup', () => {
			this.ctrlSwitch.isDown = false
			this.setFrame(this.nonePressedFrame)
		})
	}
}
class Controls extends Phaser.GameObjects.Group {
  constructor (scene) {
		super(scene.physics.world, scene)
		this.key_RIGHT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
		this.key_LEFT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
		this.key_JUMP = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
		this.key_FIRE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y)
		this.key_USE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
		this.touch_USE = { isDown: false }
		this.touch_RIGHT = { isDown: false }
		this.touch_LEFT = { isDown: false }
		this.touch_JUMP = { isDown: false }
		this.touch_FIRE = { isDown: false }
	
		scene.input.addPointer(5)
		this.add(new TouchButton(scene, 418, 145, 'UseButton', this.touch_USE, 0.6))
		this.add(new TouchButton(scene, 70, 240, 'RArrowButton', this.touch_RIGHT))
		this.add(new TouchButton(scene, 35, 180, 'LArrowButton', this.touch_LEFT))
		this.add(new TouchButton(scene, 430, 240, 'AButton', this.touch_JUMP))
		this.add(new TouchButton(scene, 465, 180, 'BButton', this.touch_FIRE))

		this.gunPowerAmount = 1
		this.gunPowerTxtObj = scene.add.text(
			480,
			95,
			String(this.gunPowerAmount),
			{
				fontFamily: 'Arial',
				fontSize: 16, color: '#FFFFFF'
			}
		)
		this.gunPowerTxtObj.setScrollFactor(0, 0)
		this.gunPowerTxtObj.setDepth(102)

		return this
	}
	setup() {
		this.setName('ControlsGroup')
		this.children.iterate( button => {
			button.setup()
		})
	}
	release() {
		this.touch_USE.isDown = false
		this.touch_RIGHT.isDown = false
		this.touch_LEFT.isDown = false
		this.touch_JUMP.isDown = false
		this.touch_FIRE.isDown = false
		this.key_RIGHT.isDown = false
		this.key_LEFT.isDown = false
		this.key_JUMP.isDown = false
		this.key_FIRE.isDown = false
		this.key_USE.isDown = false
	}
	upgradeGunPower() {
		this.gunPowerAmount += 1
		this.gunPowerTxtObj.setText(String(this.gunPowerAmount))
	}
}