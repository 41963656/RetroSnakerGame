class Snake {
  static UP = 38
  static DOWN = 40
  static LEFT = 37
  static RIGHT = 39

  static FAST = 1
  static LONG = 2
  static FIRE = 3
  static NONE = 0

  constructor (arrow, len, x, y) {
    this.sbody = []
    this.arrow = arrow
    this.len = len
    this.x = x
    this.y = y
    this._generator()
    this.power = Snake.NONE
  }

  _generator () {
    for (let i = 0; i < this.len; i++) {
      let x = this.x
      let y = this.y
      switch (this.arrow) {
        case Snake.UP:
          y = this.y - i * 10
          break
        case Snake.DOWN:
          y = this.y + i * 10
          break
        case Snake.LEFT:
          x = this.x - i * 10
          break
        case Snake.RIGHT:
          x = this.x + i * 10
          break
      }
      this.sbody.push({top: y, left: x})
    }
  }

  move (getPower) {
    let powerType = getPower.call(this, this)
    if (powerType === 2) {
      console.log('hahaha')
    }
    switch (this.arrow) {
      case Snake.UP:
        this._moveUP()
        break
      case Snake.DOWN:
        this._moveDown()
        break
      case Snake.LEFT:
        this._moveLeft()
        break
      case Snake.RIGHT:
        this._moveRight()
        break
    }
  }

  setArrow (keyCode) {
    switch (keyCode) {
      case Snake.UP:
        if (this.arrow !== Snake.DOWN) { this.arrow = keyCode }

        break
      case Snake.DOWN:
        if (this.arrow !== Snake.UP) { this.arrow = keyCode }

        break
      case Snake.LEFT:
        if (this.arrow !== Snake.RIGHT) { this.arrow = keyCode }

        break
      case Snake.RIGHT:
        if (this.arrow !== Snake.LEFT) { this.arrow = keyCode }

        break
    }
  }

  _moveDown () {
    let [_first] = this.sbody
    this._movePoint({top: _first.top + 10, left: _first.left})
  }

  _moveUP () {
    let [_first] = this.sbody
    this._movePoint({top: _first.top - 10, left: _first.left})
  }

  _moveLeft () {
    let [_first] = this.sbody
    this._movePoint({top: _first.top, left: _first.left - 10})
  }

  _moveRight () {
    let [_first] = this.sbody
    this._movePoint({top: _first.top, left: _first.left + 10})
  }

  _movePoint (point) {
    this.x = point.left
    this.y = point.top
    this.sbody.unshift(point)
    this.sbody.pop()
    // this.isOver()
  }
}

export default Snake

// let snake = new Snake(RIGHT, 5, 50, 10)
// // snake.generator()
// console.log(snake.sbody)
// snake.move()
// console.log(snake.sbody)
// snake.setArrow(DOWN)
// snake.move()
// console.log(snake.sbody)
