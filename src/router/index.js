import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: '/',
    component: () => import('../layout'),
    redirect: '/users',
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/goods/Categories.vue')
      },
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/goods/index.vue')
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/orders/index.vue')
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('@/views/goods/Params.vue')
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('@/views/reports/index.vue')
      },
      {
        path: 'rights',
        name: 'Rights',
        component: () => import('@/views/rights/index.vue')
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/rights/Roles.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
