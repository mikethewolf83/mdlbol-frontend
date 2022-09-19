import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isOneEP = to.matched.some(item => item.meta.oneEP)
    const user = SessionStorage.getItem('user');

    // 1 EP
    if (isOneEP && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor EP') && (user.courses.list.find(x => x.CatCurso == '1 EP') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 1 EP',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
