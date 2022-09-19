import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isFiveEP = to.matched.some(item => item.meta.fiveEP)
    const user = SessionStorage.getItem('user');

    // 3 EP
    if (isFiveEP && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor EP') && (user.courses.list.find(x => x.CatCurso == '5 EP') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 5 EP',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
