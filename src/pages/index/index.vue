<template>
    <div>
        <!-- 标题栏 -->
        <div class="container" >
            <div class="message" @click="clickHandle">{{msg}}</div>
            <a  class="skip">
                <span class="add" @click="showadd"></span>
            </a>
        </div>
        <button open-type="getUserInfo" lang="zh_CN" class="hideuserInfo">
            获取用户信息
        </button>
        <!-- 无好友图标 -->
        <div class="no-person" v-if="isPersonList">
            <img src="../../../static/images/noaddress.png" class="no-address"/>
            <span class="no-person-text">暂无通讯录列表</span>
            <span class="no-person-text-two">点击右上角图标创建同学名片<span class="top-right"></span></span>
            
        </div>

        <!-- 添加好友页 -->
        <div class="showorhide" v-if="show">
            <div class="container"><div class="title">{{message}}</div></div>
            <div class="detail">

                <view class='top_head_border' @click="headimage">   
                    <image class='top_head' mode="aspecFill" :src='head'></image>  
                    <!-- <view class='top_text' mode="aspecFill" >更换头像</view> -->
                </view>

                <div class="information">姓名：</div>
                <input v-model="person.name" class="input" placeholder="eg：记录同学姓名" @click="handleUsernameInputCheack">
                <span class="checkInput" v-if="checkUsernameShow">*请输入用户名.</span>

                <div class="information">手机号码：</div>
                <input v-model="person.number" class="input" placeholder="eg：记录同学号码" @click="handleNumberInputCheack">
                <span class="checkInput" v-if="checkNumberShow">*请输入电话号码.</span>

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

        <!-- 好友详情页 -->
        <div class="particular" v-if="hide">
            <div class="container"><div class="nav">详情页</div></div>
            <img :src="detailPic" 
                class="img"
                @click="headimage">
            <div class="headright">
                <div class="name">{{list[index].name}}<span class="headphoto"></span></div>
                
                
                <div class="number">电话号码：{{list[index].number}}</div>
                
                <div class="number">毕业班级：{{list[index].grade}}</div>

                <div class="number">地区：{{list[index].area}}</div>

                <div class="number">毕业纪念照<a href="../../pages/middle/main" class="changeto"></a></div>
                
            </div>
            <div class="notestyle">好友留言：{{list[index].notes}}</div>
            <!-- <div class="min">发消息</div> -->
            <div @click="closedetail" class="min">关闭</div>
        </div>

        <!-- 同学列表 -->
        <div class="content-list">
            <ul>
              
                <listitem v-for="(item,index) in list" :key="index" :content="item.name" :ind="index"
                @deleate="removeItem(index,item)"
                @detailpage="detailshow(index,item)"
                ></listitem>
            </ul>
        </div>
        
    </div>
</template>

<script>
import listitem from '../../components/listitem.vue'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            canIUse: wx.canIUse('button.open-type.getUserInfo'),
            detailPic:'',
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
            message: '信息填入',
            msghead: true,
            list: [],
            show: false,
            hide: false,
            index: 0,
            checkUsernameShow: false,
            checkNumberShow: false,
            isPersonList: true,

            showModal: false,
            head: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
        }
    },

    computed: {
        msg() {
            return this.msghead ? '通讯录' : '点击右侧添加好友名片'
        },
    },

    mounted(){
       
        if(!this.list.length){
            this.isPersonList = false
        }

      this.onLoad()
        
    },

    methods: {
         onLoad() {
    // 查看是否授权
     let _this=this
     wx.getSetting({
      success(res) {
         wx.getUserInfo()
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success:(res) =>{
                console.log(res.userInfo,'用户信息')
              _this.userInfo=res.userInfo
              _this.userInfo.avatarUrl=_this.userInfo.avatarUrl.slice(20).split('/').join('')
              _this.getUser()
            }
          })
        }else{
            _this.userInfo={
                avatarUrl:'admin'
            }
             _this.getUser()
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo,'????')
  },
        clickHandle(event) {
            this.msghead = !this.msghead
        },

        showadd() {
            this.show = !this.show
            this.isPersonList = false
        },

        closeadd() {
            this.show = false
        },

        closedetail() {
            this.hide = false
        },

        detailshow(index,item) {
            this.index = index
            this.hide = true
            this.detailPic=this.$url+`/image/${item.imgUrl}`
        },

        // 校验输入用户名是否为空
        checkUsername() {
            this.checkUsernameShow = true
        },

        checkNumber() {
            this.checkNumberShow = true
        },

        //点击input框重新校验
        handleUsernameInputCheack() {
            this.checkUsernameShow = false
        },

        handleNumberInputCheack() {
            this.checkNumberShow = false
        },

        addItem() {
            if (!this.person.name) {
                return this.checkUsername()
            } 
            if (!this.person.number) {
                return this.checkNumber()
            }
            else {
                let { name, number, area, notes, grade} = this.person
                let p = {
                    name,
                    number,
                    area,
                    notes,
                    grade,
                    avatarUrl:this.userInfo.avatarUrl
                }
                // console.log(this.list,'??sadasd')
                // this.list.push(p)
               
                let _this=this
                 wx.uploadFile({
                    // url: _this.$url+`/uploadFile?${_this.$qs.stringify(p)}`,
                    url:_this.$url+'/api/connecters',
                    filePath:_this.head[0], 
                    formData:p,
                    name:'image',
                    header: { "Content-Type": "multipart/form-data" },
                    //  formData: {
                    //    filePath:res.tempFilePaths[0]
                    //  }, // HTTP 请求中其他额外的 form data
                    success: function(res){
                        var resData = res.data;
                        console.log('上传成功')
                        // success
                    },
                    fail: function(res) {
                        // fail
                        var resData =res;
                    },
                    complete: function() {
                        // complete
                      
                            wx.hideLoading();    //上传结束，隐藏loading
                        
                      }
                    })
                // wx.request({ 
                //     data:JSON.stringify(p),
                //     method:'post',
                //     url:this.$url+'/login',
                //     success:res=>{
                //         console.log(res,'????')
                //     }
                // })
                this.person.name = ''
                this.person.number=''
                this.person.area=''
                this.person.notes=''
                this.person.grade=''
                setTimeout(()=>{
                   this.getUser()
                },0)
            }
            if(this.show){
                this.closeadd();  
            }
        }, 
        
        removeItem(e,item) {
            //this.list.splice(e,1)
            if(this.list.length===0){
                this.isPersonList = true
            }

            /**
             * 删除数据库字段
             */
             wx.request({ 
                method:'delete',
                url:this.$url+`/api/connecters/${item._id}`,
                success:res=>{
                    let listData = res.data.msg
                    listData = e
                    this.list.splice(listData, 1)
                    console.log(res,'????')
                }
            })
        },

        /**
         * 获取数据库字段
         */
        getUser(){
       console.log(`${this.userInfo.avatarUrl}`,'结果')
               wx.request({ 
                    
                    method:'get',
                    url:this.$url+`/api/connecters/${this.userInfo.avatarUrl}`,
                    success:res=>{
                        this.list=res.data
                        console.log(res,'2312424')
                    }
                })
        
               
           
        },
          headimage: function() {   
            var _this = this;
            console.log(this,'?????')
            
            wx.chooseImage({    
                count: 1, // 默认9      
                sizeType: ['original', 'compressed'],       
                // 指定是原图还是压缩图，默认两个都有      
                sourceType: ['album', 'camera'],      
                // 指定来源是相册还是相机，默认两个都有    
                success: function(res) { 
                    
                    var tempFilePaths = res.tempFilePaths
                     
                        _this.head = tempFilePaths
                        console.log(res.tempFilePaths[0],'文件路径')
                       
                          
                }    
            }) 
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
        display: block;
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
        float: right; 
        display: block;
        background-image: url(../../../static/images/add.png);
        width: 32px;
        height: 32px;
        background-size: 32px 32px;
        background-repeat: no-repeat;
        margin-right: 20px;
        /* vertical-align: middle; */
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
        width: 90%;
        padding: 8px;
        border-radius: 6px;
        background: #F5F5F5;
        outline: none;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        /* border: 0; */
        /* vertical-align: top; */
        /* box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3); */
        margin-left: 4px;
        margin-bottom: 3px;
    }
    .notesinfor {
        display: inline-block;
        width: 90%;
        padding: 10px;
        border-radius: 6px;
        background: #F5F5F5;
        outline: none;
        font-size: 12px;
        height: 50px;
        border: 0.5px solid #eeeeee;
        /* border: 0; */
        /* box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3); */
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
        margin-top: 8px;
    }

    .particular{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        /* z-index: 10; */
        background-color: #fff;
    }
    .nav {
        color: black;
        padding: 5px;
        display: inline-block;
    }
    .img {
        width: 45%;
        height: 180px;
        border-radius: 50%;
        margin-top:8px;
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
        font-size: 15px;
        line-height: 15px;
    }
    .min {
        text-align: center;
        margin: 10px 0;
        padding: 10px;
        border-top: 1px solid #eeeeee;
        font-size: 20px;
        font-family: 'Courier New', Courier, monospace
    }

    .checkInput {
        display: inline-block;
        font-size: 12px;
        color: red;
        position: relative;
        bottom: 18px;
        left: 5px;
    }

    /* 更改头像css */
    .top_head {
        margin-top: 30rpx;
        width: 100rpx; 
        height: 100rpx; 
        border-radius: 100%; 
        border: 1px solid rgba(51, 51, 51, 1);
       }
    /* 更改头像结束 */

    /* 无列表图标 */
    .no-person {
        position: absolute;
        min-width: 100px;
    }
    .no-address {
        position: relative;
        width: 100px;
        height: 100px;
        left: 140px;
        top: 100px;
    }
    .no-person-text {
        display: block;
        position:relative;
        top: 100px;
        left: 140px;
        font-size: 15px;
        color: gray;
    }
    .no-person-text-two {
        display: block;
        position:relative;
        top: 110px;
        left: 100px;
        text-align: center;
        font-size: 15px;
        color: gray;
    }
    .top-right {
        display: inline-block;
        background-image: url(../../../static/images/topRight.png);
        width: 15px;
        height: 15px;
        background-size: 15px 15px;
        background-repeat: no-repeat;
        margin-left: 5px;
        vertical-align: middle;
    }
    .hideuserInfo {
        display: none;
    }
</style>
