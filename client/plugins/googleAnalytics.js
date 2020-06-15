import Vue from 'vue'
import VueGtag from "vue-gtag";
import vueAnalytics from 'vue-analytics'

const getGDPR = localStorage.getItem('GDPR:accepted')

if (typeof getGDPR !== 'undefined' && getGDPR === 'true') {
  Vue.use(VueGtag, {
    config: {
      id: 'UA-169405606-1',
      disabled: false,

      debug: {
        enabled: true,
        sendHitTask: true
      },

    }
  })
} else if (typeof getGDPR !== 'undefined' && getGDPR === 'false') {
  Vue.use(VueGtag, {
    config: {
      id: 'UA-169405606-1',
      disabled: true,

      debug: {
        enabled: true,
        sendHitTask: true
      },

    }
  })
}
