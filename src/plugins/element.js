import Vue from 'vue'
import { Button, Input, Form, FormItem 
} from 'element-ui'
//组件太多允许换行
import {Message} from 'element-ui'
//导入弹框提示组件,它需要全局挂载




Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$message = Message
//前一个message是自命名,后一个是定好的