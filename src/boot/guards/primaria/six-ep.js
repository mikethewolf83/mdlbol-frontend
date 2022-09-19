import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isSixEP = to.matched.some(item => item.meta.sixEP)
    const user = SessionStorage.getItem('user');

    // 6 EP
    if (isSixEP && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor EP') && (user.courses.list.find(x => x.CatCurso == '6 EP') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 6 EP',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
