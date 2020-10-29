function InfoTextScene() {
	Phaser.Scene.call(this, 'InfoTextScene')
	this.innerText = ''
	this.textObj = null
	this.bgImage = null
	this.boxPos = { x: 60, y: 40 }
	this.resumeSceneKey = ''
	this.fontSize = 28
	this.boxScale = 1.0
}

InfoTextScene.prototype = Object.create(Phaser.Scene.prototype)
InfoTextScene.prototype.constructor = InfoTextScene

InfoTextScene.prototype.init = function(data) {
	this.innerText = data.text
	this.resumeSceneKey = data.resumeSceneKey
	if (data.msgBoxPos !== undefined) {
		this.boxPos.x = data.msgBoxPos.x
		this.boxPos.y = data.msgBoxPos.y
	}
	if (data.fontSize !== undefined) {
		this.fontSize = data.fontSize
	}
	if (data.boxScale !== undefined) {
		this.boxScale = data.boxScale
	}
}

InfoTextScene.prototype.preload = function () {
	// this.load.image('textbox', 'assets/sprites/bgs/textbox.png')
}

InfoTextScene.prototype.create = function() {
	this.input.topOnly = true
	this.key_ENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

	this.bgImage = this.add.image(this.boxPos.x, this.boxPos.y, 'textbox')
	this.bgImage.setScrollFactor(0,0)
	this.bgImage.setOrigin(0, 0)
	this.bgImage.setInteractive()
	this.bgImage.setScale(this.boxScale)
	this.bgImage.on('pointerdown', () => {
		this.scene.manager.stop('InfoTextScene')
		this.scene.manager.resume(this.resumeSceneKey)
	})
	this.textObj = this.add.text(this.boxPos.x + 18, this.boxPos.y + 18, 'Static Text Object', { fontFamily: 'VT323-Regular', fontSize: this.fontSize, color: '#FFFFFF' })
	this.textObj.setFontStyle('bold')
	this.textObj.setOrigin(0, 0)
	this.textObj.setScrollFactor(0,0)
	this.textObj.setText(this.innerText)
}

InfoTextScene.prototype.update = function() {
	if (this.key_ENTER.isDown) {
		this.scene.manager.stop('InfoTextScene')
		this.scene.manager.resume(this.resumeSceneKey)
	}
}
