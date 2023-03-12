import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth.vue'),
      meta: {
        isAuth: false,
        guestOnly: true,
      }
    }
  ]
})

router.beforeEach( (to, from, next)=>{
    if(to.matched.some(r => r.meta.isAuth)){
      let token = localStorage.getItem('user-token');
      if(!token){
        next('/login');
      }
      
    }else if(to.matched.some(r => r.meta.guestOnly)){
        let token = localStorage.getItem('user-token');
        if(token){
          next('/');
        }
    }
    next();
  } );

export default router
