class Croco extends EnemyObj {
  constructor (scene, hero, crocosData) {
		super(scene, hero, crocosData.x + crocosData.width / 2, crocosData.y + crocosData.height / 2, 'enemiesSpriteAtlas')
		this.worldData = crocosData
		this.type = crocosData.type // rightcrawler | leftcrawler
		this.lastDir = -1
		this.definedVelocity = 12
		this.setSize(16, 16)
		this.setOffset(0, 0)
		if (this.type === 'leftcrawler') {
			this.play('crocoL')
		} else {
			this.play('crocoR')
		}
	}
	preUpdate (time, delta) {
		super.preUpdate(time, delta)
		if (this.body.velocity.y === 0) {
			this.lastDir *= -1
			this.setVelocityY(this.lastDir * this.definedVelocity)
		}
	}
}
class Crocos extends Phaser.Physics.Arcade.Group {
  constructor (scene, hero, crocosData, solidLayer) {
		super(scene.physics.world, scene)
		crocosData.forEach((crocoData) => {
			this.add(new Croco(scene, hero, crocoData))
		})
		scene.physics.add.collider(solidLayer, this)
  }
}