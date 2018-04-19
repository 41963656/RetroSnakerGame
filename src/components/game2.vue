<template>
  <div class="context" :style="{width:context.width, height:context.height}">
    <div class="point" v-for="point in points" :style="{ top:point.top+'px',left: point.left+'px' }"></div>
    <div class="point" :hidden="!power1.active"
         :style="{top:power1.top+'px',left:power1.left+'px',background:'red'}"></div>
  </div>
</template>

<script>
  import Snake from '@/Snake.js'

  const UP = 38
  const DOWN = 40
  const LEFT = 37
  const RIGHT = 39

  export default {
    name: 'game',
    data () {
      return {
        arrow: RIGHT,
        timeIdls: {},
        context: {
          width: '800px',
          height: '600px',
        },
        points: [
          {
            top: 10,
            left: 50,
          },
          {
            top: 10,
            left: 40,
          },
          {
            top: 10,
            left: 30,
          },
          {
            top: 10,
            left: 20,
          },
          {
            top: 10,
            left: 10,
          }],
        power1: {top: 0, left: 0, active: false},
      }
    },
    destroyed () {
      window.clearInterval(this.timeIdls.time1)
      window.clearInterval(this.timeIdls.time2)
    },
    mounted () {
      let snake1 = new Snake(RIGHT, 5, 50, 10)
      let snake2 = new Snake(LEFT, 5, 700, 500)
      let snake3 = new Snake(UP, 5, 10, 500)
      let snake4 = new Snake(DOWN, 5, 700, 10)

      window.onkeydown = this.initKey
      this.timeIdls.time1 = window.setInterval(this.control, 200)
      this.timeIdls.time2 = window.setInterval(this.radomPower, 10000)

    },
    methods: {
      initKey (e) {
        let keyCode = e.keyCode
        switch (keyCode) {
          case UP:
            if (this.arrow != DOWN) {this.arrow = UP}

            break
          case DOWN:
            if (this.arrow != UP) {this.arrow = DOWN}

            break
          case LEFT:
            if (this.arrow != RIGHT) {this.arrow = LEFT}

            break
          case RIGHT:
            if (this.arrow != LEFT) {this.arrow = RIGHT}

            break
        }
      },
      control () {
        switch (this.arrow) {
          case DOWN:
            this.moveDown()
            break
          case UP:
            this.moveUP()
            break
          case LEFT:
            this.moveLeft()
            break
          case RIGHT:
            this.moveRight()
            break
        }
      },
      radomPower () {
        let x = Math.floor(Math.random() * 80) * 10
        let y = Math.floor(Math.random() * 60) * 10
        this.power1.top = y
        this.power1.left = x
        this.power1.active = true
        console.log(`${x} ${y}`)
      },
      moveDown () {
        let [_first, ..._points] = this.points
        this.movePoint({top: _first.top + 10, left: _first.left})
      },
      moveUP () {
        let [_first, ..._points] = this.points
        this.movePoint({top: _first.top - 10, left: _first.left})
      },
      moveLeft () {
        let [_first, ..._points] = this.points
        this.movePoint({top: _first.top, left: _first.left - 10})
      },
      moveRight () {
        let [_first, ..._points] = this.points
        this.movePoint({top: _first.top, left: _first.left + 10})
      },
      isPower1 () {
        let pt = this.power1.top
        let pl = this.power1.left
        let [{top: pot, left: pol}, ...temp] = this.points
        if (this.power1.active == true && pt == pot && pl == pol) {
          this.power1.active = false
          return true
        }
        return false
      },
      isOver () {
        let [{top: pot, left: pol}, ...body] = this.points
        for (let _point of body) {
          // console.log(`${pot} ${pol} ${_point.top} ${_point.left}`)
          if ((_point.top == pot && _point.left == pol) || (pol < 0 || pot < 0 || pot > 600 || pol > 800)) {
            console.log('game over')

            this.$router.push({name: 'over'})
          }
        }
      },
      movePoint (point) {
        this.points.unshift(point)
        if (!this.isPower1()) {
          this.points.pop()
        }
        this.isOver()
      },

    },
  }

</script>

<style scoped>
  .context {
    /*width: 90%;*/
    /*height: 90%;*/
    background: bisque;
    position: absolute;
  }

  .point {
    width: 10px;
    height: 10px;
    background: black;
    position: absolute;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
  }
</style>
