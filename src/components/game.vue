<template>
  <div class="context" :style="{width:context.width, height:context.height}">
    <div v-for="snake in snakes">
      <div class="point" v-for="point in snake.sbody" :style="{ top:point.top+'px',left: point.left+'px' }"></div>
    </div>
    <div class="point" :hidden="!power.isActive()"
         :style="{top:power.getTop()+'px',left:power.getLeft()+'px',background:'red'}"></div>
  </div>
</template>

<script>
  import Snake from '@/Snake.js'
  import LongPower from '@/Power.js'

  const UP = 38
  const DOWN = 40
  const LEFT = 37
  const RIGHT = 39

  export default {
    name: 'game',
    data () {
      return {
        snakes: [],
        timeIdls: {},
        idx: 2,
        context: {
          width: '800px',
          height: '600px',
        },
        power: {},
      }
    },
    destroyed () {
      window.clearInterval(this.timeIdls.time1)
      window.clearInterval(this.timeIdls.time2)
    },
    mounted () {
      this.snakes.push(new Snake(RIGHT, 5, 50, 10))
      this.snakes.push(new Snake(LEFT, 5, 700, 500))
      this.snakes.push(new Snake(UP, 5, 10, 500))
      this.snakes.push(new Snake(DOWN, 5, 700, 10))

      window.onkeydown = this.listenKeyAdpter
      this.timeIdls.time1 = window.setInterval(this.targetMove, 200)
      this.timeIdls.time2 = window.setInterval(this.radomPower, 10000)
    },
    methods: {
      listenKeyAdpter (e) {
        let keyCode = e.keyCode
        this.snakes[this.idx].setArrow(keyCode)
      },
      targetMove () {
        for (let snake of this.snakes) {
          snake.move((_s) => {
            let pt = this.power.top
            let pl = this.power.left
            if (this.power.active == true && pt == _s.y && pl == _s.x) {
              this.power1.active = false
              return 2
            }
            return 0
          })
        }
      },
      radomPower () {
        let power = new LongPower()
        power.enable()
        // this.power1.top = power.getTop()
        // this.power1.left = power.getLeft()
        // this.power1.active = power.isActive()
        this.power = power
        // console.log(`${x} ${y}`)
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
