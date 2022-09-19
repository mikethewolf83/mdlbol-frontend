import { boot } from 'quasar/wrappers'
import { SessionStorage } from "quasar";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const isPrivate = to.matched.some(item => item.meta.private)
    const token = SessionStorage.has('token');

    // Private
    if (isPrivate && !token) {
      next({ name: 'login' })
    } else {
      next()
    };
  })
})