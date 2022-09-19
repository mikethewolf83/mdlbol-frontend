
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Profile.vue'), name: 'profile',
        meta: { private: true }
      },
      {
        path: 'admin', component: () => import('pages/Admin.vue'), name: 'admin',
        meta: { private: true, admin: true }
      },
      { // #### PRIMARIA ####
        path: 'primaria/1ep', component: () => import('pages/primaria/1ep/OneEP.vue'), name: '1ep',
        meta: { private: true, oneEP: true },
        props: true
      },
      {
        path: 'primaria/1ep/group', component: () => import('pages/primaria/1ep/Group.vue'), name: '1epGroup',
        meta: { private: true, oneEP: true },
        props: true
      },
      {
        path: 'primaria/1ep/student', component: () => import('pages/primaria/1ep/Student.vue'), name: '1epStudent',
        meta: { private: true, oneEP: true },
        props: true
      },
      {
        path: 'primaria/2ep', component: () => import('pages/primaria/2ep/TwoEP.vue'), name: '2ep',
        meta: { private: true, twoEP: true },
        props: true
      },
      {
        path: 'primaria/3ep', component: () => import('pages/primaria/3ep/ThreeEP.vue'), name: '3ep',
        meta: { private: true, threeEP: true },
        props: true
      },
      {
        path: 'primaria/4ep', component: () => import('pages/primaria/FourEP.vue'), name: '4ep',
        meta: { private: true, fourEP: true }
      },
      {
        path: 'primaria/5ep', component: () => import('pages/primaria/FiveEP.vue'), name: '5ep',
        meta: { private: true, fiveEP: true }
      },
      {
        path: 'primaria/6ep', component: () => import('pages/primaria/SixEP.vue'), name: '6ep',
        meta: { private: true, sixEP: true }
      },
      { // #### ESO ####
        path: 'eso/1eso', component: () => import('pages/eso/OneESO.vue'), name: '1eso',
        meta: { private: true, oneESO: true }
      },
      {
        path: 'eso/2eso', component: () => import('pages/eso/TwoESO.vue'), name: '2eso',
        meta: { private: true, twoESO: true }
      },
      {
        path: 'eso/3eso', component: () => import('pages/eso/ThreeESO.vue'), name: '3eso',
        meta: { private: true, threeESO: true }
      },
      {
        path: 'eso/4eso', component: () => import('pages/eso/FourESO.vue'), name: '4eso',
        meta: { private: true, fourESO: true }
      },
      { // #### BACH ####
        path: 'bach/1bach', component: () => import('pages/bach/OneBACH.vue'), name: '1bach',
        meta: { private: true, oneBACH: true }
      },
      {
        path: 'bach/2bach', component: () => import('pages/bach/TwoBACH.vue'), name: '2bach',
        meta: { private: true, twoBACH: true }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/Login.vue'), name: 'login' }
    ]
  },

  // 404 Not Found
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
