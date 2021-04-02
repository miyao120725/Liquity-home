import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

// aixo配置

axios.defaults.withCredentials = true;
if (process.env.NODE_ENV !== 'development') {
  // 正式打包用配置里的API，开发环境用代理vue.config.js里的配置，方便联调，解决跨域问题
  axios.defaults.baseURL = 'https://liquity.fi/';
}
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
    return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use((response: AxiosResponse): any => {
      // return Promise.reject(response.data);
  if (response.data.code === 200) {
    return response;
  } else {
    return Promise.reject(response.data.msg);
   }
  
}, (errors) => {
  return Promise.reject(errors);
});
