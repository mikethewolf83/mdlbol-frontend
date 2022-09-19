import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isTwoEP = to.matched.some(item => item.meta.twoEP)
    const user = SessionStorage.getItem('user');

    // 2 EP
    if (isTwoEP && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor EP') && (user.courses.list.find(x => x.CatCurso == '2 EP') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 2 EP',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
