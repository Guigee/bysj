<template>
    <div>
        <div class="container" >
            <div class="message" @click="clickHandle">{{msg}}</div>
            <a  class="skip">
                <span class="add" @click="showadd"></span>
            </a>
        </div>
        <div class="showorhide" v-if="show">
            <div class="container"><div class="title">{{xinxi}}</div></div>
            <div class="detail">
                <div>
                    <div class="photo" @click.stop="uploadHeadImg">
                        <!-- <img :src="imgSrc"> -->
                        <img :src="userInfo.avatar" />
                        <span class="img-title">头像</span>
                    </div>
                    <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
                </div>
                <div class="information">姓名：</div>
                <input v-model="person.name" class="input" placeholder="eg：记录同学姓名">
                <div class="information">电话：</div>
                <input v-model="person.number" class="input" placeholder="eg：记录同学号码">
                <div class="information">毕业班级：</div>
                <input v-model="person.grade" class="input" placeholder="eg：记录同学班级">
                <div class="information">地区：</div>
                <input v-model="person.area" class="input" placeholder="eg：记录同学地区">
                <div class="information">留言：</div>
                <textarea v-model="person.notes" class="notesinfor" placeholder="eg：记录同学留言"></textarea>
                <div>
                    <span class="close" @click="closeadd"></span>
                    <span class="add append" @click="addItem"></span>
                </div>
            </div>
        </div>

        <div class="particular" v-if="hide">
            <div class="container"><div class="nav">详情页</div></div>
            <img src="../../../static/images/head.jpg" class="img">
            <div class="headright">
                <div class="name">{{list[index].name}}<span class="headphoto"></span></div>
                
                
                <div class="number">电话号码：{{list[index].number}}</div>
                
                <div class="number">毕业班级：{{list[index].grade}}</div>

                <div class="number">地区：{{list[index].area}}</div>

                <div class="number">毕业纪念照<a href="../middle/main" class="changeto"><span ></span></a></div>
                
            </div>
            <div class="notestyle">好友留言：{{list[index].notes}}</div>
            <div class="min">发消息</div>
            <div @click="closedetail" class="min">关闭</div>
        </div>

        <div class="content-list">
            <ul>
                <listitem v-for="(item,index) in list" :key="index" :content="item.name" :ind="index"
                @deleate="removeItem(index)"
                @detailpage="detailshow"
                ></listitem>
            </ul>
        </div>
        
    </div>
</template>

<script>
import listitem from '../../components/listitem.vue'

export default {
    data() {
        return {
            userInfo: {
                avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
            },
            person: {
                name: '',
                number: '',
                area: '',
                notes: '',
                grade: ''
            },
            xinxi: '信息填入',
            msghead: true,
            list: [],
            show: false,
            hide: false,
            index: 0
        }
    },

    computed: {
        msg() {
            return this.msghead ? '通讯录' : '点击右侧添加好友名片'
        }
    },

    methods: {
        clickHandle(event) {
            this.msghead = !this.msghead
        },

        showadd() {
            this.show = !this.show
        },

        closeadd() {
            this.show = false
        },

        closedetail() {
            this.hide = false
        },

        detailshow(index) {
            this.index = index
            this.hide = true
        },

        addItem() {
            if (!this.person.name) {
                return this
            } else {
                let { name, number, area, notes, grade} = this.person
                let p = {
                    name,
                    number,
                    area,
                    notes,
                    grade
                }
                this.list.push(p)
                this.person.name = ''
                this.person.number=''
                this.person.area=''
                this.person.notes=''
                this.person.grade=''
            }
            if(this.show){
                this.closeadd();
            }
        },

        removeItem(e) {
            this.list.splice(e,1)
        },
       // 打开图片上传
        uploadHeadImg() {
            // 点击的时候触发input打开图片上传的点击事件
            this.$el.querySelector(".hiddenInput").click();
        },
        // 将头像显示
        handleFile(e) {
            //获取当前点击事件的target元素对其进行兼容
            let $target = e.target || e.srcElement;
            //   取第一个元素
            let file = $target.files[0];
            /**
             * 使用FileReader对象，
             * web应用程序可以异步的读取存储在用户计算机上的文件(或者原始数据缓冲)内容，
             * 可以使用File对象或者Blob对象来指定所要处理的文件或数据。
             *  */ 
            var reader = new FileReader();// //读取本地文件，以gbk编码方式输出
            reader.onload = data => {//成功读取后
                console.log(data)
                let res = data.target || data.srcElement;
                //读取完毕后输出结果
                this.userInfo.avatar = res.result;
            };
            reader.readAsDataURL(file);
        }
    },

    components: {
    'listitem': listitem
  }
}
</script>

<style scoped>
    .message {
        color: black;
        padding: 5px;
        display: inline-block;
    }
    .title {
        color: black;
        padding: 5px;
        display: inline-block;
    }
    .detail {
        margin-top: 5px;
    }
    .skip {
        display: inline-block;
        float: right;
    }
    .headphoto {
        display: inline-block;
        background-image: url(../../../static/images/head.png);
        width: 25px;
        height: 25px;
        background-size: 25px 25px;
        background-repeat: no-repeat;
        margin-left: 10px;
        /* padding-bottom: 5px; */
        vertical-align: middle;
    }
    .changeto {
        display: inline-block;
        background-image: url(../../../static/images/arrive.png);
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        background-repeat: no-repeat;
        margin-left: 5px;
        /* padding-bottom: 5px; */
        vertical-align: middle;
    }
    
    .add {
        /* float: right;  */
        display: inline-block;
        background-image: url(../../../static/images/add.png);
        width: 32px;
        height: 32px;
        background-size: 32px 32px;
        background-repeat: no-repeat;
        margin-right: 20px;
        vertical-align: middle;
    }
    .close {
        display: inline-block;
        background-image: url(../../../static/images/back.png);
        width: 32px;
        height: 32px;
        background-size: 32px 32px;
        background-repeat: no-repeat;
        vertical-align: middle;
        margin-right: 208px;
        /* background-color: #ffffff; */
    }
    .input {
        display: inline-block;
        width: 70%;
        padding: 8px;
        border-radius: 6px;
        background: #F5F5F5;
        outline: none;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        border: 0;
        /* vertical-align: top; */
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
        margin-left: 4px;
        margin-bottom: 3px;
    }
    .notesinfor {
        display: inline-block;
        width: 70%;
        padding: 10px;
        border-radius: 6px;
        background: #F5F5F5;
        outline: none;
        font-size: 12px;
        height: 60px;
        border: 0;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
        margin-left: 4px;
    }
    .showorhide{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        /* z-index: 10; */
        background-color: #fff;
    }
    .information {
        font-size: 15px;
        margin-left: 5px;
        font-family: 'Courier New', Courier, monospace;
    }

    .particular{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        /* z-index: 10; */
        background-color: antiquewhite;
    }
    .nav {
        color: black;
        padding: 5px;
        display: inline-block;
    }
    .img {
        width: 45%;
        height: 200px;
        border-radius: 8px;
        /* overflow: hidden; */
    }
    .name {
        font-size: 30px;
        font-family: 'Courier New', Courier, monospace;
        margin-left: 10px;
        margin-top: 30px;
    }
    .number {
        font-size: 12px;
        font-family: 'Courier New', Courier, monospace;
        margin-left: 10px;
        margin-top: 10px;
    }
    .headright {
        display: inline-block;
        vertical-align: top;
    }
    .headname {
        display: inline-block;
        margin-left: 10px;
    }
    .notestyle {
        margin: 10px 0 0 5px;
        padding: 5px;
        font-size: 10px;
    }
    .min {
        text-align: center;
        margin: 10px 0;
        padding: 10px;
        border-top: 1px solid #eeeeee;
        font-size: 20px;
        font-family: 'Courier New', Courier, monospace
    }

    /* 更改头像css */
.photo {
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.266667rem;
  background-color: #fff;
  padding: 0.4rem;
}
  .photo img {
    width: 1.333333rem;
    height: 1.333333rem;
  }
  .img-title {
    margin-right: 0.4rem;
    color: rgb(102, 102, 102);
    font-size: 0.426667rem;
  }

.hiddenInput{
    display: none;
}
/* 更改头像结束 */
</style>
