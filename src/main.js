import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
// const loc='http://localhost:3000'
// const loc='http://192.168.31.254:3000'
// const loc='http://192.168.43.75:3000'
const loc='http://192.168.2.149:3000'
// const loc='http://172.31.102.196:3000'
import qs from 'qs'
Vue.prototype.$qs=qs
Vue.prototype.$url=loc
app.$mount()
function Ajax(obj){ 
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        // readyState == 4说明请求已完成
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
          // 从服务器获得数据 
          obj.success(xhr.responseText)
        }
      };
      xhr.open(obj.methods,loc+url, true);
      xhr.send(obj.obj?obj.obj:'');
}
Vue.prototype.$Ajax=Ajax
// this.$Ajax({
//     url:'/login',
//     methods:'POST',
//     obj:obj,
//     success:res=>{

//     }
// })
export default {
    //相当于原生小程序的app.json
    config: {
        pages: [
            "pages/middle/main",
            "pages/index/main"
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: '毕业纪念册',
            navigationBarTextStyle: 'black'
        }
    }
}
