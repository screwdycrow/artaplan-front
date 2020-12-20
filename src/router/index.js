import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
        }
    },

    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/preview',
        name: 'Preview',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Preview.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/slots',
        name: 'slots',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "slots" */ '../views/Slots/Slots'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/slots/new',
        name: 'New Slot',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "newslot" */ '../components/Slots/NewSlot'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/jobs',
        name: 'jobs',
        component: () => import(/* webpackChunkName: "jobs" */ '../views/Jobs'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/jobs/new',
        name: 'New job',
        component: () => import(/* webpackChunkName: "newjob" */ '../components/Jobs/NewJob'),
        meta: {
            requiresAuth: false,
        }
    },
    {
        path: '/schedule',
        name: 'schedule',
        component: () => import(/* webpackChunkName: "schedule" */ '../views/Schedule'),
        meta: {
            requiresAuth: true,
        }
    }
    ,

    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
        meta: {
            noMenu: true,
        }
    }
    , {
        path: '/registration',
        name: 'registration',
        component: () => import(/* webpackChunkName: "register" */ '../views/Registration'),
        meta: {
            noMenu: true,

        }
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {

        if (store.getters['isAuthenticated']) {
            next()
            return
        }else{
            store.dispatch('getUserFromToken').then(resp=>{
                next()
            }).catch(err=>{
                next ('/login');
            })
            return;
        }
    }
    next()
});

export default router
