function LogoScene() {
	Phaser.Scene.call(this, 'LogoScene')
	this.logoDelay = 2000
	this.elapsedLogoTime = 0
}

LogoScene.prototype = Object.create(Phaser.Scene.prototype)
LogoScene.prototype.constructor = LogoScene


LogoScene.prototype.preload = function () {

}

LogoScene.prototype.create = function() {
	this.add.sprite(0, 0, 'logoScreen').setOrigin(0)
}

LogoScene.prototype.update = function (time, delta) {
	if (this.elapsedLogoTime > this.logoDelay) {
		this.scene.stop('LogoScene')
		this.scene.start('GameScene')
	}
	this.elapsedLogoTime += delta
}
