import mainLayoutPage from './components/layouts/level1MainLayout.vue'
import simulationPage from './components/pages/simulationPage.vue'
import legalNoticePage from './components/pages/legalNoticePage.vue'
import understandingPage from './components/pages/understandingPage.vue'

export default [
  {
    path: '/',
    component: simulationPage,
    meta: { layout: mainLayoutPage }
  },
  {
    path: '/mentions',
    component: legalNoticePage,
    meta: { layout: mainLayoutPage }
  },
  {
    path: '/comprendre',
    component: understandingPage,
    meta: { layout: mainLayoutPage }
  }
]
