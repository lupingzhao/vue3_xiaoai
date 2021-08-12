import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Layout from '../views/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [

  // 登陆 注册
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登陆',
      index: '/Login',

    }
  },
  // 父路由
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
          title: '首页',
          index: '/',

        }
      },
      {
        path: "/users",
        name: "users",
        component: () => import('../views/users/UserView.vue'),
        meta: {
          title: '用户管理',
          index: '/users',

        }
      },
      {
        path: "/roles",
        name: "roles",
        component: () => import('../views/roles/Roles.vue'),
        meta: {
          title: '角色列表',
          index: '/roles',

        }
      },
      {
        path: "/rights",
        name: "rights",
        component: () => import('../views/rootRight/RootRight.vue'),
        meta: {
          title: '权限列表',
          index: '/rights',

        }
      },
      {
        path: "/params",
        name: "params",
        component: () => import('../views/goods/params/Params.vue'),
        meta: {
          title: '分类参数',
          index: '/params',

        }
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import('../views/goods/goods/Goods.vue'),
        meta: {
          title: '商品列表',
          index: '/goods',

        }
      },
      {
        path: "/addgoods",
        name: "addgoods",
        component: () => import('../views/goods/addGoods/AddGoods.vue'),
        meta: {
          title: '添加商品',
          index: '/goods',
        }
      },
      {
        path: "/categories",
        name: "categories",
        component: () => import('../views/goods/categories/Categories.vue'),
        meta: {
          title: '商品分类',
          index: '/categories',

        }
      },
      {
        path: "/orders",
        name: "orders",
        component: () => import('../views/orders/Orders.vue'),
        meta: {
          title: '订单列表',
          index: '/orders',

        }
      },
      {
        path: "/reports",
        name: "reports",
        component: () => import('../views/reports/Reports.vue'),
        meta: {
          title: '订单列表',
          index: '/reports',

        }
      }
    ]
  },
  // 404
  // 404路由
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404/404.vue'),
    meta: {
      title: '页面不存在',
      index: '/:catchAll(.*)',

    }
  }


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  const token = localStorage.getItem('token')

  if (to.path === '/Login') {
    // console.log(22);
    next()
  } else {
    // console.log(11);
    token ? next() : next('/Login')
  }

})


export default router;
