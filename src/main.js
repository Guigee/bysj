import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
    //相当于原生小程序的app.json
    config: {
        pages: [
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
