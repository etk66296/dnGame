function InfoTextScene() {
	Phaser.Scene.call(this, 'InfoTextScene')
	this.innerText = ''
	this.textObj = null
	this.bgImage = null
	this.boxPos = { x: 60, y: 40 }
}

InfoTextScene.prototype = Object.create(Phaser.Scene.prototype)
InfoTextScene.prototype.constructor = InfoTextScene

InfoTextScene.prototype.init = function(data) {
	this.innerText = data.text
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
	this.bgImage.on('pointerdown', () => {
		this.scene.manager.stop('InfoTextScene')
		this.scene.manager.resume('Level0Scene')
	})
	this.textObj = this.add.text(this.boxPos.x + 20, this.boxPos.y + 20, 'Static Text Object', { fontFamily: 'VT323-Regular', fontSize: 28, color: '#FFFFFF' })
	this.textObj.setFontStyle('bold')
	this.textObj.setOrigin(0, 0)
	this.textObj.setScrollFactor(0,0)
	this.textObj.setText(this.innerText)
}

InfoTextScene.prototype.update = function() {
	if (this.key_ENTER.isDown) {
		this.scene.manager.stop('InfoTextScene')
		this.scene.manager.resume('Level0Scene')
	}
}
