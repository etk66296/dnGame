function InfoTextScene() {
	Phaser.Scene.call(this, 'InfoTextScene')
	this.innerText = ''
	this.textObj = null
	this.boxPos = {x: 60, y: 40}
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
	this.add.image(this.boxPos.x, this.boxPos.y, 'textbox').setScrollFactor(0,0).setOrigin(0, 0)
	this.textObj = this.add.text(this.boxPos.x + 20, this.boxPos.y + 20, 'Static Text Object', { fontFamily: 'Arial', fontSize: 16, color: '#FFFFFF' })
	this.textObj.setFontStyle('bold')
	this.textObj.setOrigin(0, 0)
	this.textObj.setScrollFactor(0,0)
	this.textObj.setText(this.innerText)
}
