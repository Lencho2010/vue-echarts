import Vue from "vue";
import axios from "axios";

Vue.prototype.$http = axios;
// 统一方式添加token
// axios.defaults.headers['Authorization'] = `Bearer ${token}`
axios.interceptors.request.use(config=>{
  /*let token = sessionStorage.getItem('token')
  if(!token){
    console.log('登录');
  }
  config.headers.Authorization = `Bearer ${token}`*/
  // console.log(config);
  console.log('request请求拦截...');
  return config;

},error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response=>{

  // 根据服务端返回状态码，判断是token失败情况下，进行跳转登录
  // console.log('response返回拦截...');
  console.log(response);
  return response;
},error => {
  return Promise.reject(error)
});