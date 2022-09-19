import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { SessionStorage } from "quasar";

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const isTwoESO = to.matched.some(item => item.meta.twoESO)
    const user = SessionStorage.getItem('user');

    // 2 ESO
    if (isTwoESO && (user.profile.role != 'Admin') && (user.profile.role != 'Manager') && (user.profile.role != 'Supervisor ESO') && (user.courses.list.find(x => x.CatCurso == '2 ESO') == undefined)) {
      Notify.create({
        message: 'No tienes autorización para entrar a 2 ESO',
        type: 'negative',
        position: 'bottom',
        timeout: 1000
      })
    } else {
      next()
    };
  })
})
