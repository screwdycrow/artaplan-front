import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import Slot from "../views/Slots/Slot"
import Slots from "../views/Slots/Slots"
import Customers from "@/views/Customers/Customers"
import Customer from "@/views/Customers/Customer"
import NewCustomer from "../views/Customers/NewCustomer"
import JobOverview from "../views/Jobs/JobOverview"
import JobDetails from "../views/Jobs/JobDetails"
import JobReferences from "../views/Jobs/JobReferences"


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
        path: '/customers',
        name: 'Customers',
        component: () => import(/* webpackChunkName: "customers" */ '../views/Customers/Customers.vue'),
        children: [
            {
                path: '/',
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: ':id',
                component: Customer,
                meta: {
                    requiresAuth: true,
                },
            }
        ],

    },
    {
        path: '/newCustomer',
        name: 'New Customer',
        component: NewCustomer,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/preview',
        name: 'Preview',

        component: () => import(/* webpackChunkName: "about" */ '../views/Preview.vue'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/slots',
        component: Slots,
        children: [
            {
                path: '/',
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: ':id',
                component: Slot,
                meta: {
                    requiresAuth: true,
                }
            }
        ],


    },
    {
        path: '/newSlot',
        name: 'New Slot',
        component: () => import(/* webpackChunkName: "newslot" */ '../views/Slots/NewSlot'),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/jobs',
        name: 'jobs',
        component: () => import(/* webpackChunkName: "jobs" */ '../views/Jobs/Jobs'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/jobs/:id',
        name: 'job',
        component: () => import(/* webpackChunkName: "job" */ '../views/Jobs/Job'),
        children: [
            {
                path: '/',
                component: JobOverview,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: 'details',
                component: JobDetails,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: 'references',
                component: JobReferences,
                meta: {
                    requiresAuth: true,
                }
            }
        ],
        meta: {
            requiresAuth: true,
        },
    },

    {
        path: '/newJob',
        name: 'New job',
        component: () => import(/* webpackChunkName: "newjob" */ '../views/Jobs/NewJob'),
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
    },

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
    }, {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings'),
        meta: {
            requiresAuth: true,

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
        } else {
            store.dispatch('getUserFromToken').then(resp => {
                next()
            }).catch(err => {
                console.log(err);
                next('/login');
            })
            return;
        }
    }
    next()
});

export default router
