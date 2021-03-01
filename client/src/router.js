import Vue from "vue";
import Router from "vue-router";
import Pets from "@/components/Pets.vue";
import Pet from "@/components/Pet.vue";
import AddPet from "@/components/AddPet.vue";
import SearchPet from "@/components/SearchPet.vue";
import Users from "@/components/Users.vue";
import User from "@/components/User.vue";
import AddUser from "@/components/AddUser.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import NavBar from "@/components/NavBar.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";
import ChangePassword from "@/components/ChangePassword.vue";
import Picture from "@/components/Picture.vue";
import Home from "@/components/Home.vue";
import Footer from "@/components/Footer.vue";
import Comment from "@/components/Comment.vue";
import UnVerifiedHome from "@/components/UnVerifiedHome";
import store from '../store.js';





Vue.use(Router);
const router  = new Router({
// export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/navbar",
            name: "navbar",
            component: NavBar,
           
        },
        {
            path: "/",
            name: "home",
            component: Home,
           
        },
        {
            path: "/pets",
            name: "pets",
            component: Pets,
            meta: { requireAuth: true }           
        },
        {
            path: "/Pet/:_id",
            name: "pet-details",
            component: Pet,
            props: true,
            meta: { requireAuth: true }

        },
        {
            path: "/addPet",
            name: "addPet",
            component: AddPet,
            meta: { requireAuth: true }
        },
        {
            path: "/searchPet",
            name: "searchPet",
            component: SearchPet,
            meta: { requireAuth: true }
        },
        {
            path: "/users",
            name: "users",
            component: Users,
            meta: { requireAuth: true }
        },
        {
            path: "/user/:_id",
            name: "user-details",
            component: User,
            props: true,
            meta: { requireAuth: true }
        },
        {
            path: "/adduser",
            name: "adduser",
            component: AddUser,
            meta: { requireAuth: true }
        },
        {
            path: "/comment",
            name: "comment",
            component: Comment,
            props: true,
            meta: { requireAuth: true }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/register",
            name: "register",
            component: Register,
        },
        {
            path: "/forgotPassword",
            name: "forgotPassword",
            component: ForgotPassword,
        },
        {
            path: "/changePassword",
            name: "changePassword",
            component: ChangePassword,
        },
        {
            path: "/picture",
            name: "picture",
            props: true,
            meta: { requireAuth: true },
            component: Picture,
        },
        {
            path: "/footer",
            name: "footer",
            component: Footer,
        },
        {
            path: "/unverifiedhome",
            name: "unverifiedhome",
            component: UnVerifiedHome,
        }

    ]
});

router.beforeEach((to, from, next) => {
    const protectedPath = to.matched.some(record => record.meta.requireAuth);
    if (protectedPath && store.state.token === '') {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router;