import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/login',component: Login},
  {path: '/',redirect: '/login'},
  {path: '/Home',component:Home},
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to,from,next)=>{
  //next是一个函数
  // 强制跳转next('/login')


  if(to.path=='/login')return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr)return next('/login')
  next();
})

export default router
