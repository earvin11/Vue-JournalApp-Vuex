
export default {

    name: 'auth',
    component: () => import(/* webpackChunckName: "authLayout" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '',
            name: 'login',
            component: () => import(/* webpackChunckName: "Login" */ '@/modules/auth/views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import(/* webpackChunckName: "Register" */ '@/modules/auth/views/Register.vue')
        }
    ]

}