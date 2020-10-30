function SubmitScoreScene() {
	Phaser.Scene.call(this, 'SubmitScoreScene')
	this.updateName = ''
	this.submitName = ''
	this.points = 0

	this.pointsTextObj
	this.hindTextObj
	this.typedNameTextObj
}

SubmitScoreScene.prototype = Object.create(Phaser.Scene.prototype)
SubmitScoreScene.prototype.constructor = SubmitScoreScene

SubmitScoreScene.prototype.init = function (data) {
	this.points = data.points
	// this.points = 12345678901
	this.scene.manager.stop('Level0Scene')
}

SubmitScoreScene.prototype.preload = function () {
}

SubmitScoreScene.prototype.create = function() {

	// show the typed name
	this.pointsTextObj = this.add.bitmapText(18, 150, 'ice', String(this.points) + ' points', 42)
	this.hindTextObj = this.add.bitmapText(18, 200, 'arcade', 'type your name and press "END"', 12)
	this.add.bitmapText(18, 218, 'arcade', 'use "RUB" to delete a letter', 12)
	this.typedNameTextObj = this.add.bitmapText(18, 240, 'ice', 'Name: ', 36)

	this.scene.launch('InputPanel')
	this.panel = this.scene.get('InputPanel')
	//  Listen to events from the Input Panel scene
	this.panel.events.on('updateName', (event) => {
		this.typedNameTextObj.setText('Name: ' + event)
	})
	this.panel.events.on('submitName', (event) => {
		// post data
		// axios.post('http://htmlpreview.github.io/?https://github.com/etk66296/games/blob/master/dn1Online/score.php', JSON.stringify({ name: event, points: this.points }))
		axios.post('http://localhost:9999/score.php', JSON.stringify({ name: event, points: this.points }))
			.then(response => {
				this.scene.stop('InputPanel')
				this.scene.stop('SubmitScoreScene')
				this.scene.start('MenuScene')
			})
		.catch(error => {
			console.log(error)
			this.scene.stop('InputPanel')
			this.scene.stop('SubmitScoreScene')
			this.scene.start('MenuScene')
		})
	})
}
