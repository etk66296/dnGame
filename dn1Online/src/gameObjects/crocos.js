class Croco extends EnemyObj {
  constructor (scene, hero, x, y, type) {
		super(scene, hero, x, y, 'enemiesSpriteAtlas')
		this.type = type // rightcrawler | leftcrawler
		this.lastDir = -1
		this.definedVelocity = 12
		// crocos yield the default points... see parent class
		this.play('crocoR')
		this.setVelocityX(this.lastDir * this.definedVelocity)
		if (this.type === 'leftcrawler') {
			this.setGravityX(200)
			this.play('crocoL')
		} else {
			this.setGravityX(-200)
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
			this.add(new Croco(scene, hero, crocoData.x + 8, crocoData.y + 8, crocoData.type))
		})
		scene.physics.add.collider(solidLayer, this)
  }
}