function InfoTextScene() {
	Phaser.Scene.call(this, 'InfoTextScene')
}

InfoTextScene.prototype = Object.create(Phaser.Scene.prototype)
InfoTextScene.prototype.constructor = InfoTextScene

InfoTextScene.prototype.init = function(data) {
	this.doRestart = data.doRestart
}

InfoTextScene.prototype.preload = function () {
	this.load.image('textbox', 'assets/sprites/bgs/textbox.png');
}

InfoTextScene.prototype.create = function() {
	this.add.image(60, 40, 'textbox').setScrollFactor(0,0).setOrigin(0, 0)
}
