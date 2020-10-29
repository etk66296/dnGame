function FinalDialogScene() {
	Phaser.Scene.call(this, 'FinalDialogScene')
	this.heroPortrait = null
	this.bossPortrait = null
	this.step = 0
	this.points = 0
}

FinalDialogScene.prototype = Object.create(Phaser.Scene.prototype)
FinalDialogScene.prototype.constructor = FinalDialogScene

FinalDialogScene.prototype.init = function (data) {
	this.points = data.points
}

FinalDialogScene.prototype.preload = function () {
	
}

FinalDialogScene.prototype.create = function() {

	this.heroPortrait = this.add.sprite(0, 144, 'heroPortrait').setOrigin(0)
	this.heroPortrait.setVisible(false)
	
}

FinalDialogScene.prototype.update = function() {
	switch(this.step) {
		case 0:
			this.heroPortrait.setVisible(true)
			this.step += 1
			this.scene.manager.pause('FinalDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'Guck i nom guck i rom',
					'lauder Daggl om mi rom.',
					'Hehe, so der Fernsehturm isch',
					'au wieder befreid.',
					'Hano! Hano!'
				], 
				resumeSceneKey: 'FinalDialogScene',
				msgBoxPos: { x: 140, y: 30 },
				fontSize: 24,
				boxScale: 0.9
			})	
			break
		case 1:
			this.step += 1
			this.scene.manager.pause('FinalDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'I glaub jetzt miss mer',
					'mit m ufrooma ofanga.',
				], 
				resumeSceneKey: 'FinalDialogScene',
				msgBoxPos: { x: 140, y: 30 },
				fontSize: 22,
				boxScale: 0.9
			})	
			break
		case 2:
			this.step += 1
			this.scene.manager.pause('FinalDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'sag amol,',
					'hosch n koi luschd',
					'beim Obst- ond Gardabauverei',
					'midzommacha.'
				], 
				resumeSceneKey: 'FinalDialogScene',
				msgBoxPos: { x: 140, y: 30 },
				fontSize: 24,
				boxScale: 0.9
			})	
			break
		case 3:
			this.step += 1
			this.scene.manager.pause('FinalDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'Do kenn mer zamma was doa',
					'gegas Insektasterba.',
					'Mir bewahred au onsre alde Werde',
					'ond gucket noch onsre Stickla.'
				], 
				resumeSceneKey: 'FinalDialogScene',
				msgBoxPos: { x: 140, y: 30 },
				fontSize: 22,
				boxScale: 0.9
			})	
			break
		case 4:
			this.step += 1
			this.scene.manager.pause('FinalDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'Vergess ed dein Highscore',
					'einzomtraga.',
					'',
					'Also machs guad!'
				], 
				resumeSceneKey: 'FinalDialogScene',
				msgBoxPos: { x: 140, y: 30 },
				fontSize: 24,
				boxScale: 0.9
			})	
			break
		case 5:
			this.scene.manager.stop('FinalDialogScene')
			this.scene.manager.start('SubmitScoreScene' , { points: this.points })
			break
	}
}

