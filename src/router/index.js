import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue')
const Login = () => import(/* webpackChunkName: "login" */ '../components/login.vue')

function loadView(view){
    return() => import(/* webpackChunkName: "view-[request]" */ `../components/dashboardContents/${view}.vue`)
}

const routes = [
    {
        path: '/dashboard',
        component: DashboardLayout,
        children: [
            {
                name: 'UserController',
                path: '/user',
                component: loadView('userController')
            },
            {
                name: 'SparepartController',
                path: '/sparepart',
                component: loadView('sparepartController')
            }
        ]
    },
    {
        path: '/',
        component: Login,
        name: 'Login'
    }
]

Vue.use(Router)

const router = new Router({mode:'history', routes: routes})

export default router