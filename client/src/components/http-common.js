import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export const AXIOS = axios.create({
  
//baseURL: 'https://petcontroller.herokuapp.com/',
  baseURL: 'https://localhost:3000/',

  headers: {
    "Content-type": "application/json"
  }
})
