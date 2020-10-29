function StartDialogScene() {
	Phaser.Scene.call(this, 'StartDialogScene')
	this.heroPortrait = null
	this.bossPortrait = null
	this.step = 0
}

StartDialogScene.prototype = Object.create(Phaser.Scene.prototype)
StartDialogScene.prototype.constructor = StartDialogScene


StartDialogScene.prototype.preload = function () {
	
}

StartDialogScene.prototype.create = function() {

	this.heroPortrait = this.add.sprite(0, 144, 'heroPortrait').setOrigin(0)
	this.heroPortrait.setVisible(false)
	this.bossPortrait = this.add.sprite(320, 144, 'bossPortrait').setOrigin(0)
	this.bossPortrait.setVisible(false)
	
}

StartDialogScene.prototype.update = function() {
	switch(this.step) {
		case 0:
			this.heroPortrait.setVisible(false)
			this.bossPortrait.setVisible(false)
			this.heroPortrait.setVisible(true)
			this.step += 1
			this.scene.manager.pause('StartDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'HAAAALT - STANDA BLEIBA!!!',
					'!!!Doktor Zement!!!',
					'',
					'duuuuuu',
					'hondselendiger Schåfseggl!!!'
				], 
				resumeSceneKey: 'StartDialogScene',
				msgBoxPos: { x: 140, y: 30 },
				fontSize: 24,
				boxScale: 0.9
			})	
			break
		case 1:
			this.heroPortrait.setVisible(false)
			this.bossPortrait.setVisible(false)
			this.bossPortrait.setVisible(true)
			this.step += 1
			this.scene.manager.pause('StartDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'HAHAHAHA Dieter du Affagsichd.',
					'',
					'Gang mr fort mit deim Garda.',
					'Bis du di uffrabblsch war i',
					'dreimol mit meim Beddomischer do.',
					''
				], 
				resumeSceneKey: 'StartDialogScene',
				msgBoxPos: { x: 20, y: 30 },
				fontSize: 22,
				boxScale: 0.9
			})	
			break
		case 2:
			this.heroPortrait.setVisible(false)
			this.bossPortrait.setVisible(false)
			this.heroPortrait.setVisible(true)
			this.step += 1
			this.scene.manager.pause('StartDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'Groddafalsch!',
					'Mit meiner Garda ond Wiesa',
					'Ausrüschdung ben i schneller',
					'als du denksch.'
				], 
				resumeSceneKey: 'StartDialogScene',
				msgBoxPos: { x: 140, y: 30 },
				fontSize: 24,
				boxScale: 0.9
			})	
			break
		case 3:
			this.heroPortrait.setVisible(false)
			this.bossPortrait.setVisible(false)
			this.bossPortrait.setVisible(true)
			this.step += 1
			this.scene.manager.pause('StartDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'La mi gau mit deim Ograut.',
					'',
					'Mi krigsch du oms veregga ed!',
					''
				], 
				resumeSceneKey: 'StartDialogScene',
				msgBoxPos: { x: 20, y: 30 },
				fontSize: 22,
				boxScale: 0.9
			})	
			break
		case 4:
			this.heroPortrait.setVisible(false)
			this.bossPortrait.setVisible(false)
			this.heroPortrait.setVisible(true)
			this.step += 1
			this.scene.manager.pause('StartDialogScene')
			this.scene.manager.start('InfoTextScene', {
				text: [
					'Du ond dei 4.0 Robodder Armee.',
					'Vor eich han i koi angschd.',
					'',
					'I schnab di du Rasabaddschr!'
				], 
				resumeSceneKey: 'StartDialogScene',
				msgBoxPos: { x: 140, y: 30 },
				fontSize: 24,
				boxScale: 0.9
			})	
			break
		case 5:
			this.scene.manager.stop('StartDialogScene')
			this.scene.manager.start('LevelControlScene' , {
				points: 0,
				hasHighJumpShoe: false,
				hasDangleClaws: false,
				hasMultiHand: false,
				numOfGunUps: 0,
				numOfHealthBlocks: 10,
				levelData: {
					key: '',
					mapData: '',
					numOfTiles: 128 * 90,
					lastScene: 'IntroScene',
					backgroundImageFilePath: '',
					backgroundKey: ''
				},
				currentLevelId: 0,
			})
			break
	}
}

