<template>
  <div id="message">
    <div v-html="text"></div>
    输入消息&nbsp;&nbsp; <input id="msgInput" type="text" v-model="message" placeholder="请输入信息"/>&nbsp;&nbsp;
    <input type="button" value="发送" v-on:click="sendMsg"/>
  </div>
</template>

<script>
  const ws = new WebSocket('ws://192.168.1.191:8081/demowSocket')

  export default {
    name: 'message',
    mounted () {
      let msgInput =  document.getElementById('msgInput')
      console.log(msgInput)
      msgInput.onkeydown = this.initKey
      this.initListen()
    },
    methods: {
      initKey (e) {
        let keyCode = e.keyCode
        console.log(keyCode)
        if (keyCode == 13) {
          this.sendMsg()
        }
      },
      sendMsg () {
        console.log(this.message)
        ws.send(this.message)
        this.message = ''
      },
      initListen () {
        ws.onopen = evt => {
          console.log('Connection open ...')
        }

        ws.onmessage = evt => {
          console.log('Received Message: ' + evt.data)
          this.text += `${evt.data}<br/>`
          let msgInput =  document.getElementById('msgInput')
          msgInput.focus()
          msgInput.scrollIntoView()
        }

        ws.onclose = evt => {
          console.log('Connection closed.')
        }

        ws.onerror = evt => {
          console.log('Connection errored')
        }
      },
    },
    data () {
      return {
        message: '',
        text: '',
      }
    }
    ,
  }
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
