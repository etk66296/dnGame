class MasterBoss extends EnemyObj {
  constructor (scene, hero, masterBossData, solidLayer, enemyBullets) {
		super(
			scene,
			hero,
			masterBossData.x + masterBossData.width / 2,
			masterBossData.y + masterBossData.height / 2,
			'enemiesSpriteAtlas',
			masterBossData.properties.frameAL
		)
		this.worldData = masterBossData
		this.points = this.worldData.properties.points
		this.lifes = 10
		this.lastDirX = 1
		this.lastDirY = -1
		this.enemyBullets = enemyBullets
		this.fusilladeTime = 100
		this.elapsedFusilladeTime = 0
		this.fireIdleTime = 3000
		this.elapsedFireIdleTime = 0
		this.fusilladeCounter = 0
		this.fusillade = 5

		this.tweenIn = 0
		
		this.moveXDeltaTime = 3000
		this.elapsedMoveXDeltaTime = 0
		this.moveYDeltaTime = 2000
		this.elapsedMoveYDeltaTime = 0
		this.startMovingX = false
		this.startMovingY = false
		scene.physics.add.collider(solidLayer, this)
		this.startMoving = false

		this.activeAfterDead = true
		this.step = 0

		this.waitTime = 500
		this.elapsedWaitTime = 0

		this.heroPortrait = this.scene.add.sprite(0, 144, 'heroPortrait').setOrigin(0)
		this.heroPortrait.setVisible(false)
		this.heroPortrait.setDepth(500)
		this.heroPortrait.setScrollFactor(0, 0)
		this.bossPortrait = this.scene.add.sprite(330, 144, 'bossPortrait').setOrigin(0)
		this.bossPortrait.setVisible(false)
		this.bossPortrait.setDepth(500)
		this.bossPortrait.setScrollFactor(0, 0)
	}
	
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (!this.startMoving && Phaser.Math.Distance.Between(this.x, this.y, this.hero.x, this.hero.y) < 200) {
			this.startMoving = true
		}
		if (this.startMoving && this.isAlive) {

			// fire bullets
			this.elapsedFireIdleTime += delta
			if (this.elapsedFireIdleTime > this.fireIdleTime) {
				this.elapsedFusilladeTime += delta
				if (this.elapsedFusilladeTime > this.fusilladeTime) {
					this.enemyBullets.fireBullet(this.x, this.y, this.lastDirX)
					this.elapsedFusilladeTime = 0
					this.fusilladeCounter += 1
					if (this.fusilladeCounter > this.fusillade) {
						this.elapsedFireIdleTime = 0
						this.fusilladeCounter = 0
					}
				}
			}

			this.tweenIn += 0.1
			// hover up and down
			this.setVelocityY(this.body.velocity.y + 10 * Math.sin(this.tweenIn))
			if (this.body.velocity.y >= 0) {
				if (this.lastDirX === 1) {
					this.setFrame(this.worldData.properties.frameAR)
				} else {
					this.setFrame(this.worldData.properties.frameAL)
				}
			} else if (this.body.velocity.y < 0) {
				if (this.lastDirX === 1) {
					this.setFrame(this.worldData.properties.frameBR)
				} else {
					this.setFrame(this.worldData.properties.frameBL)
				}
			}

			// trigger moving on the x axis
			if (Phaser.Math.Distance.Between(this.x, this.y, this.hero.x, this.hero.y) > 32) {
				this.elapsedMoveXDeltaTime += delta
				if (this.elapsedMoveXDeltaTime > this.moveXDeltaTime) {
					this.startMovingX = true
					this.elapsedMoveXDeltaTime = 0
				}
			}

			// trigger moving on the y axis
			if (Phaser.Math.Distance.Between(this.x, this.y, this.hero.x, this.hero.y) > 32) {
				this.elapsedMoveYDeltaTime += delta
				if (this.elapsedMoveYDeltaTime > this.moveYDeltaTime) {
					this.startMovingY = true
					this.elapsedMoveYDeltaTime = 0
				}
			}
			
			
			
			// move to the other side
			if (this.startMovingX) {
				if (Math.abs(this.body.velocity.x) < 100){
					this.setVelocityX(this.body.velocity.x + (1 * this.lastDirX))
				} else {
					this.startMovingX = false
					this.setVelocityX(0)
				}
			}

			// move up and down
			if (this.startMovingY) {
				if (Math.abs(this.body.velocity.y) < 75){
					this.setVelocityY(this.body.velocity.y + (1 * this.lastDirY))
				} else {
					this.startMovingY = false
					this.setVelocityY(0)
				}
			}


			// orientation always to the hero
			if (this.hero.x <= this.x) {
				this.lastDirX = -1
			} else if (this.hero.x > this.x) {
				this.lastDirX = 1
			}

			if (this.hero.y >= this.y) {
			this.lastDirY = 1
			} else if (this.hero.x < this.x) {
				this.lastDirY = -1
			}
		}
		if (!this.isAlive) {
			if (this.step <= 0) {
				this.body.checkCollision.none = true
				this.setVisible(true)
				if (this.lastDirX === 1) {
					this.setFrame(this.worldData.properties.frameAR)
					this.setPosition(this.hero.x - 20, this.hero.y)
				} else {
					this.setFrame(this.worldData.properties.frameAL)
					this.setPosition(this.hero.x + 20, this.hero.y)
				}
			}
			this.elapsedWaitTime += delta
			if (this.waitTime < this.elapsedWaitTime) {
				switch(this.step) {
					case 0:
						this.step += 1
						this.heroPortrait.setVisible(false)
						this.bossPortrait.setVisible(false)
						this.bossPortrait.setVisible(true)
						this.scene.scene.manager.pause('Level0Scene')
						this.scene.scene.manager.start('InfoTextScene', {
							text: [
								'Ohje Dieter,',
								'jetzadle hosch mi doch.'
							], 
							resumeSceneKey: 'Level0Scene',
							msgBoxPos: { x: 20, y: 30 },
							fontSize: 24,
							boxScale: 0.9
						})	
						break
					case 1:
						this.step += 1
						this.heroPortrait.setVisible(false)
						this.bossPortrait.setVisible(false)
						this.heroPortrait.setVisible(true)
						this.scene.scene.manager.pause('Level0Scene')
						this.scene.scene.manager.start('InfoTextScene', {
							text: [
								'Doktor Zement!',
								'',
								'Fahr deine Beddomischer do no',
								'mo se her komma send.',
								'Ond sag deine 4.0 Robodder',
								'se solled redur macha.'
							], 
							resumeSceneKey: 'Level0Scene',
							msgBoxPos: { x: 140, y: 30 },
							fontSize: 22,
							boxScale: 0.9
						})	
						break
					case 2:
						this.step += 1
						this.heroPortrait.setVisible(false)
						this.bossPortrait.setVisible(false)
						this.bossPortrait.setVisible(true)
						this.scene.scene.manager.pause('Level0Scene')
						this.scene.scene.manager.start('InfoTextScene', {
							text: [
								'Hahahah du bischd zschbäd',
								'Am Fernsehturm baued meine',
								'Robodder a neia Basis.'
							], 
							resumeSceneKey: 'Level0Scene',
							msgBoxPos: { x: 20, y: 30 },
							fontSize: 24,
							boxScale: 0.9
						})	
						break
					case 3:
						this.step += 1
						this.heroPortrait.setVisible(false)
						this.bossPortrait.setVisible(false)
						this.heroPortrait.setVisible(true)
						this.scene.scene.manager.pause('Level0Scene')
						this.scene.scene.manager.start('InfoTextScene', {
							text: [
								'Du bisch doch bled wie zweu',
								'Reua Kopfsalad.',
								'',
								'Do rom i au no uff.',
								''
							], 
							resumeSceneKey: 'Level0Scene',
							msgBoxPos: { x: 140, y: 30 },
							fontSize: 22,
							boxScale: 0.9
						})	
						break
					case 4:
						this.heroPortrait.setVisible(false)
						this.bossPortrait.setVisible(false)
						this.bossPortrait.setVisible(true)
						this.step += 1
						this.scene.scene.manager.pause('Level0Scene')
						this.scene.scene.manager.start('InfoTextScene', {
							text: [
								'Also guad, probiers.'
							], 
							resumeSceneKey: 'Level0Scene',
							msgBoxPos: { x: 20, y: 30 },
							fontSize: 24,
							boxScale: 0.9
						})	
						break
					case 5:
						this.setVelocityY(-100)
						this.setFrame(this.worldData.properties.frameBL)
						if (this.y < 450 || this.y > 2000) {
							this.step += 1
						}
							break
					case 6:
						let heroData = {
							points: this.hero.collectedPoints,
							hasHighJumpShoe: this.hero.hasHighJumpShoe,
							hasDangleClaws: this.hero.hasDangleClaws,
							hasMultiHand: this.hero.hasMultiHand,
							numOfGunUps: this.hero.numOfGunUps,
							numOfHealthBlocks: this.hero.healthBlocks.current,
							levelData: {
								key: this.hero.nextLevelData.key,
								mapData: this.hero.nextLevelData.mapData,
								numOfTiles: this.hero.nextLevelData.numOfTiles,
								lastScene: this.hero.nextLevelData.lastScene,
								backgroundImageFilePath: this.hero.nextLevelData.backgroundImageFilePath,
								backgroundKey: this.hero.nextLevelData.backgroundKey
							},
							currentLevelId: this.hero.currentLevelId,
						}
						// save cookies only when entering the level control scene
						if (this.hero.nextLevelData.lastScene === 'Level0Scene') {
							// Build the expiration date string:
							var expiration_date = new Date()
							var cookie_string = '';
							expiration_date.setFullYear(expiration_date.getFullYear() + 1);
							// Build the set-cookie string:
							cookie_string = "; path=/; expires=" + expiration_date.toUTCString();
							document.cookie = "dn1SaveGameData=" + JSON.stringify(heroData) + "; samesite=strict" + cookie_string
						}
						this.scene.scene.manager.start(this.hero.nextLevelData.key , heroData)
						break
				}
			}
		}
	}
}
