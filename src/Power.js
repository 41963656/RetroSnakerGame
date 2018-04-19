class Power {
  _active = false
  _x = 0
  _y = 0

  enable () {
    this._generatorPoint()
    this._active = true
  }

  disable () {
    this._active = false
  }

  _generatorPoint () {
    this._x = Math.floor(Math.random() * 80) * 10
    this._y = Math.floor(Math.random() * 60) * 10
  }

  getTop () {
    return this._y
  }

  getLeft () {
    return this._x
  }

  isActive () {
    return this._active
  }
}

export default Power
