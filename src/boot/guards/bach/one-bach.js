import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isOneBACH = to.matched.some(item => item.meta.oneBACH)
    const user = SessionStorage.getItem('user');

    // 1 BACH
    if (isOneBACH && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor BACH') && (user.courses.list.find(x => x.CatCurso == '1 BACH') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 1 BACH',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
