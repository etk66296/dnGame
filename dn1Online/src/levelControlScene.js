function LevelControlScene() {
	Phaser.Scene.call(this, 'LevelControlScene')
	this.hero = null
	this.nextLevelId = -1
}

LevelControlScene.prototype = Object.create(Phaser.Scene.prototype)
LevelControlScene.prototype.constructor = LevelControlScene

LevelControlScene.prototype.init = function(data) {
	this.hero = data.hero
	this.scene.remove('Level0Scene')
}

LevelControlScene.prototype.preload = function () {
	// this.load.image('textbox', 'assets/sprites/bgs/textbox.png')
}

LevelControlScene.prototype.create = function() {
	
}

LevelControlScene.prototype.update = function() {
}
