/* eslint-disable comma-dangle */
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import game from '@/components/game'
import over from '@/components/over'
import message from '@/components/message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'game',
      component: game,
    }, {
      path: '/over',
      name: 'over',
      component: over,
    }, {
      path: '/message',
      name: 'message',
      component: message,
    },
  ],
})
