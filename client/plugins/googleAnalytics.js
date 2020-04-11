import Vue from 'vue'
import vueAnalytics from 'vue-analytics'

const getGDPR = localStorage.getItem('GDPR:accepted')

if (typeof getGDPR !== 'undefined' && getGDPR === 'true') {
  Vue.use(vueAnalytics, {
    id: 'UA-163421171-1',
    disabled: false,
    checkDuplicatedScript: true,
    autoTracking: {
      pageviewTemplate(route) {
        return {
          page: route.path,
          title: document.title,
          location: window.location.href
        }
      }
    },
    debug: {
      enabled: true,
      sendHitTask: true
    },
    ecommerce: {
      enabled: true,
      enhanced: true
    }
  })
} else if (typeof getGDPR !== 'undefined' && getGDPR === 'false') {
  Vue.use(vueAnalytics, {
    id: 'UA-163421171-1',
    disabled: true,
    debug: {
      enabled: true,
      trace: true,
      sendHitTask: true
    }
  })
}
