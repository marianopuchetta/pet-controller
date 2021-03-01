import Vue from 'vue'
import Vuex from 'vuex'

import decode from 'jwt-decode'
import router from './src/router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token:'',
        userDB: '' ,
        role: '',
        username:'',
         user_id:'',
        search_result: []
        },
    mutations:{
        getUser(state,payload){
            state.token = payload;
            if(payload === ''){
                state.userDB = ''
            } else {
                state.userDB = decode(payload);
                router.push({name:'home'}).catch(err =>err);
            }
        },
        fill_search_result (state, search_result) {
            state.search_result = search_result; 
        },

    },
    actions: {
        logIn({commit},payload){
            localStorage.setItem('token',payload);
            commit('getUser',payload)
        },
        logOut({commit}){
            commit('getUser','');
            localStorage.removeItem('token');     
            router.push({name:'login'}).catch(err => {console.log(err)});
        },
        getToken({commit}){
            const token = localStorage.getItem('token');
            if(token){
                commit('getUser',token);
            } else {
                commit('getUser','')
            }
        }
    },
    getters: {
        isActive: state => !!state.token,
        username: state => state.userDB.user.username,
        user_id: state => state.userDB.user._id,  
        role: state => state.userDB.user.role,
        search_result : state => state.search_result
    }
})