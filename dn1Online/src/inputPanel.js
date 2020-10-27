function InputPanel() {
	Phaser.Scene.call(this, 'InputPanel')
	this.chars = [
		[ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I' ],
		[ 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R' ],
		[ 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-' ],
		[ '.', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ]
	]

	this.charArrayWidth = 8
	this.charArrayHeight = 3

	this.gridCellWidth = 52
	this.gridCellHeight = 32

	this.cursor = new Phaser.Math.Vector2()
	this.text
	this.block
	this.name = ''
	this.charLimit = 12
}

InputPanel.prototype = Object.create(Phaser.Scene.prototype)
InputPanel.prototype.constructor = InputPanel
InputPanel.prototype.create = function() {	
	this.text = this.add.bitmapText(18, 10, 'arcade', 'ABCDEFGHI\nJKLMNOPQR\nSTUVWXYZ-\n.      ')
  this.text.setLetterSpacing(20)
  this.text.setInteractive()
  this.add.image(434, 120, 'end').setOrigin(0)
  this.add.image(382, 120, 'rub').setOrigin(0)
  this.block = this.add.image(8, 8, 'block').setOrigin(0)
	this.input.keyboard.on('keyup_LEFT', this.moveLeft, this)
	this.input.keyboard.on('keyup_RIGHT', this.moveRight, this)
	this.input.keyboard.on('keyup_UP', this.moveUp, this)
	this.input.keyboard.on('keyup_DOWN', this.moveDown, this)
	this.input.keyboard.on('keyup_ENTER', this.pressKey, this)
	// this.input.keyboard.on('keyup_SPACE', this.pressKey, this)
	this.input.keyboard.on('keyup', this.anyKey, this)
  this.text.on('pointermove', this.moveBlock, this)
  this.text.on('pointerup', this.pressKey, this)
  this.tweens.add({
    targets: this.block,
    alpha: 0.2,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
    duration: 350
	})
	this.events.emit('updateName', this.name)
}

InputPanel.prototype.moveBlock = function(pointer, x, y) {
	/*
	┌────┬───────────────┬────┬────┬──┬──┬───────────────┐
	│0,0 │     ...       │ 5,0│ 6,0│  ...                │
	├────┘ (52, 32)      ┼────┼────┼─                    │
	│                    │ 5,1│ 6,1│                     │
	│                    ┼────┼────┼─ ...                │
	│                  .                                 │
	│                  .                                 │
	│                  .                           ┌─────┤
	│                                          ... │ 8,3 │
	└──────────────────────────────────────────────┴─────┘(500, 280)
	*/

	let cx = Phaser.Math.Snap.Floor(x, this.gridCellWidth, 0, true) // 
	let cy = Phaser.Math.Snap.Floor(y, this.gridCellHeight, 0, true)
	this.cursor.set(cx, cy)
  this.block.x = this.text.x - 10 + (cx * this.gridCellWidth)
	this.block.y = this.text.y - 2 + (cy * this.gridCellHeight)
}

InputPanel.prototype.moveLeft = function() {
	if (this.cursor.x > 0) {
		this.cursor.x--
    this.block.x -= this.gridCellWidth
  } else {
  	this.cursor.x = this.charArrayWidth
    this.block.x += this.gridCellWidth * this.charArrayWidth
  }
}

InputPanel.prototype.moveRight = function() {
	if (this.cursor.x < this.charArrayWidth) {
		this.cursor.x++
		this.block.x += this.gridCellWidth
	} else {
		this.cursor.x = 0
		this.block.x -= this.gridCellWidth * this.charArrayWidth
	}
}

InputPanel.prototype.moveUp = function() {
	if (this.cursor.y > 0) {
		this.cursor.y--
		this.block.y -= this.gridCellHeight
	} else {
		this.cursor.y = this.charArrayHeight
		this.block.y += this.gridCellHeight * this.charArrayHeight
	}
}

InputPanel.prototype.moveDown = function() {
	if (this.cursor.y < this.charArrayHeight) {
		this.cursor.y++
		this.block.y += this.gridCellHeight
	} else {
		this.cursor.y = 0
		this.block.y -= this.gridCellHeight * this.charArrayHeight
	}
}

InputPanel.prototype.anyKey = function(event) {
	//  Only allow A-Z . and -
	let code = event.keyCode
	if (code === Phaser.Input.Keyboard.KeyCodes.MINUS) {
		this.cursor.set(7, 3)
		this.pressKey()
	}
	 else if (code === Phaser.Input.Keyboard.KeyCodes.BACKSPACE || code === Phaser.Input.Keyboard.KeyCodes.DELETE){
		this.cursor.set(7, 3)
		this.pressKey()
	}
	else if (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z) {
		code -= 65
		let y = Math.floor(code / 9)
		let x = code - (y * 9)
		this.cursor.set(x, y)
		this.pressKey()
	}
}

InputPanel.prototype.pressKey = function() {
	let x = this.cursor.x
  let y = this.cursor.y
  let nameLength = this.name.length
  this.block.x = this.text.x - 10 + (x * this.gridCellWidth)
  this.block.y = this.text.y - 2 + (y * this.gridCellHeight)
  if (x === 8 && y === 3 && nameLength > 0) {
		//  Submit
		this.events.emit('submitName', this.name)
  } else if (x === 7 && y === 3 && nameLength > 0) {
		//  Rub
		this.name = this.name.substr(0, nameLength - 1)
		this.events.emit('updateName', this.name)
	} else if (this.name.length < this.charLimit) {
		//  Add
		this.name = this.name.concat(this.chars[y][x])
		this.events.emit('updateName', this.name)
	}
}
