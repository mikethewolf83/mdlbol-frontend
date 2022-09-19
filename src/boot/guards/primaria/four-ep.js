import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isFourEP = to.matched.some(item => item.meta.fourEP)
    const user = SessionStorage.getItem('user');

    // 3 EP
    if (isFourEP && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor EP') && (user.courses.list.find(x => x.CatCurso == '4 EP') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 4 EP',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
