import { boot } from 'quasar/wrappers'

const version = require('../../package.json').version

export default boot(({ app }) => {
  app.config.globalProperties.$version = version
})

export { version }
