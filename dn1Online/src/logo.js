function LogoScene() {
	Phaser.Scene.call(this, 'LogoScene')
	this.logoDelay = 2000
	this.elapsedLogoTime = 0
}

LogoScene.prototype = Object.create(Phaser.Scene.prototype)
LogoScene.prototype.constructor = LogoScene

LogoScene.prototype.init = function(data) {
	this.doRestart = data.doRestart
}

LogoScene.prototype.preload = function () {

}

LogoScene.prototype.create = function() {
	this.add.sprite(0, 0, 'logoScreen').setOrigin(0)
}

LogoScene.prototype.update = function (time, delta) {
	if (this.elapsedLogoTime > this.logoDelay) {
		this.scene.stop('LogoScene')
		if (this.doRestart) {
			this.scene.restart('Level1Scene')
		} else {
			this.scene.start('Level1Scene')
		}
	}
	this.elapsedLogoTime += delta
}
