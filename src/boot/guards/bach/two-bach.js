import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isTwoBACH = to.matched.some(item => item.meta.twoBACH)
    const user = SessionStorage.getItem('user');

    // 2 BACH
    if (isTwoBACH && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor BACH') && (user.courses.list.find(x => x.CatCurso == '2 BACH') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 2 BACH',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
