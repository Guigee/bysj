<template>
  <div class="all-background">
    <div class="container" >
        <div class="message">{{msg}}</div>
    </div>

  <!-- 毕业照主页面 -->
    <div class="middle-create-template"> 
      <img src="../../../static/images/middle-background.jpg" alt="毕业照" class="images">

      <div class="middle-create-text">
        <p class="middle-create-textone">因为你们</p>
        <p class="middle-create-textone">青春才值得纪念</p>
        <p class="middle-create-texttwo">我们的毕业纪念</p>
      </div>

      <div class="middle-create-enter" @click="showStoryCreate">开始制作</div>
      <div class="middle-create-info">
        <span class="middle-create-info-img" @click="showEleImgStore"><span class="img-book"></span>我的电子相册</span>
        <span class="middle-create-info-store"><span class="img-person"></span>我的毕业故事</span>
      </div>
    </div>

      <!-- 制作毕业故事页面 -->
    <div class="story-create-index-and-background" v-if="showStory">
      <div class="story-create-index" >
        <div class="story-create-selectimg">
          <img class="story-img" src="../../../static/images/img-story-create.jpg" >
          <div class="story-create-text">
            <p class="line-one">请上传5张</p>
            <p class="line-one">你觉得毕业时最有意思的照片吧</p>
            <p class="line-two">你的毕业故事</p>
            <p class="line-two">很快就可以生成哦</p>
          </div>
          <div class="story-create-btn" @click="imgSelect">挑选照片→</div>
        </div>
        <span @click="closeStoryCreate" class="close-story">取消</span>
      </div>
      <!-- 背景层 -->
      <div class="storyBackground"></div> 
    </div>
    

  <!-- 电子相册页面 -->
    <div class="ele-img-store" v-if="showImgStore">
      <div class="container">
        <div class="title">电子相册</div>
      </div>
      <div class="j-pic-upload">
        <div class="j-upload-btn" @click="uploadImg" :style="{'width':width || '120rpx','height':height || '120rpx'}">
            <span class="j-upload-add">+</span>
        </div>
        <img @click="previewImg(index,item)" v-for="(item,index) in urls" :key="item.src" :src="item.src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" >
      </div>
      <div @click="hideEleImgStore" class="backIndex">back</div>
    </div>

   <!--选择照片页面  -->
    <div class="img-select-index" v-if="showImgSelect">
      <div class="img-select-box">
        <div class="j-pic-upload">
          <div class="j-upload-btn" @click="uploadImg" :style="{'width':width || '120rpx','height':height || '120rpx'}">
              <span class="j-upload-add">+</span>
          </div>
          <img @click="previewImg(index,item)" v-for="(item,index) in urls" :key="item.src" :src="item.src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" >
        </div>

        <div class="attention">
          <p class="attention-one">温馨提示</p>
          <p>第一张图片为书的封面</p>
          <p>点击图片可删除并替换</p>
        </div>
      </div>

      <div class="img-submit">
        <span @click="hideEleImgStore" class="backIndex">取消上传</span>
        <span class="submit-btn" @click="showGrade">
          提交
        </span>
      </div>
    </div>

      <!--毕业故事制作页面 -->
    <div class="grade-story-diy" v-if="showGradeStory">

      <!-- test -->
        <!-- <div v-if="numberArr.length == 0">{{showMessage}}</div>
        <div class="container" v-for="(item, index) in getCurPageContent(numberArr, curPage, itemNumPerPage)" :key="index">
          <div class="content">{{item}}</div>
          <div class="pageButtonList">
            <button class="leftBtn" @click="handleClick('leftBtn')">上一页</button>
            <span class="pagination">{{curPage}}/{{totalPage}}</span>
            <button class="rightBtn" @click="handleClick('rightBtn')">下一页</button>
          </div>
        </div> -->
      

      <!-- 第一页 -->
      <div class="index-one" v-if="isIndex===1">
        1
        <view class="page-section">
          <div class="page-section-text">
            <p class="text-one">{{isTextOne}}</p>
            <p class="text-one">{{isTextTwo}}</p>
            <div class="page-section-text-two">
              <p class="text-two">{{isTextThree}}</p>
            </div>
          </div>

          <movable-area scale-area>
            <!-- <div class="testOne"></div> -->
            <movable-view direction="all" bindchange="onChange" bindscale="onScale" scale scale-min="0.5" scale-max="4" :scale-value="scale">
              <img src="../../../static/images/headPhoto.jpg" class="diyimg">
            </movable-view>
          </movable-area>
        </view>
        <div class="changeText" v-if="isShowText">
          <input type="text" v-model="isTextOne">
          <input type="text" v-model="isTextTwo">
          <input type="text" v-model="isTextThree">
          <span @click="closeChangeText">提交</span>
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <span class="backIndex" @click="resetGradeStory">重新制作</span>
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex">提交</span>
        </div>
      </div>
      
      <!-- 第二页 -->
      <div class="index-two" v-if="isIndex===2">
        2
        <view class="page-section">
          <div class="page-section-texttwo">
            <p>{{twoisTextOne}}</p>
            <p>{{twoisTextTwo}}</p>
            <p>{{twoisTextThree}}</p>
            <p>{{twoisTextFour}}</p>
          </div>

          <movable-area scale-area class="area-two">
            <!-- <div class="testOne"></div> -->
            <movable-view class="view-two" direction="all" bindchange="onChange" bindscale="onScale" scale scale-min="0.5" scale-max="4" :scale-value="scale">
              <img src="../../../static/images/headPhoto.jpg" class="diyimg diyimg-two">
            </movable-view>
          </movable-area>
        </view>
        <div class="changeText" v-if="isShowText">
          <input type="text" v-model="twoisTextOne">
          <input type="text" v-model="twoisTextTwo">
          <input type="text" v-model="twoisTextThree">
          <input type="text" v-model="twoisTextFour">
          <span @click="closeChangeText">提交</span>
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <span class="backIndex" @click="resetGradeStory">重新制作</span>
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex">提交</span>
        </div>
      </div>

      <!-- 第三页 -->
      <div class="index-three" v-if="isIndex===3">
        3
        <view class="page-section">

          <movable-area scale-area class="area-three">
            <!-- <div class="testOne"></div> -->
            <movable-view class="view-three" direction="all" bindchange="onChange" bindscale="onScale" scale scale-min="0.5" scale-max="4" :scale-value="scale">
              <img src="../../../static/images/headPhoto.jpg" class="diyimg diyimg-three">
            </movable-view>
          </movable-area>

          <div class="page-section-textthree">
            <p>{{threeisTextOne}}</p>
            <p>{{threeisTextTwo}}</p>
            <p>{{threeisTextThree}}</p>
            <span class="love"></span>
          </div>
        </view>
        <div class="changeText" v-if="isShowText">
          <input type="text" v-model="threeisTextOne">
          <input type="text" v-model="threeisTextTwo">
          <input type="text" v-model="threeisTextThree">
          <span @click="closeChangeText">提交</span>
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <span class="backIndex" @click="resetGradeStory">重新制作</span>
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex">提交</span>
        </div>
      </div>

      <!-- 第四页 -->
      <div class="index-four" v-if="isIndex===4">
        4
        <view class="page-section">
          
          <movable-area scale-area class="area-four">
            <!-- <div class="testOne"></div> -->
            <movable-view class="view-four" direction="all" bindchange="onChange" bindscale="onScale" scale scale-min="0.5" scale-max="4" :scale-value="scale">
              <img src="../../../static/images/headPhoto.jpg" class="diyimg diyimg-four">
            </movable-view>
          </movable-area>
          <div class="page-section-textfour">
            <h1>HAPPY</h1>
            <p>{{fourisTextOne}}</p>
            <p>{{fourisTextTwo}}</p>
            <p>{{fourisTextThree}}</p>
            <p>{{fourisTextFour}}</p>
          </div>
        </view>
        <div class="changeText" v-if="isShowText">
          <input type="text" v-model="fourisTextOne">
          <input type="text" v-model="fourisTextTwo">
          <input type="text" v-model="fourisTextThree">
          <input type="text" v-model="fourisTextFour">
          <span @click="closeChangeText">提交</span>
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <span class="backIndex" @click="resetGradeStory">重新制作</span>
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex">提交</span>
        </div>
      </div>

      <!-- 第五页 -->
      <div class="index-five" v-if="isIndex===5">
        5
        <view class="page-section">
          
          <movable-area scale-area class="area-five">
            <movable-view class="view-five" direction="all" scale scale-min="0.5" scale-max="4" :scale-value="scale">
              <img src="../../../static/images/headPhoto.jpg" class="diyimg diyimg-five">
            </movable-view>
          </movable-area>
          <div class="page-section-textfive">
            <h1>Memory</h1>
            <p>{{fiveisTextOne}}</p>
            <p>{{fiveisTextTwo}}</p>
            <p>{{fiveisTextThree}}</p>
            <p>{{fiveisTextFour}}</p>
          </div>
        </view>
        <div class="changeText" v-if="isShowText">
          <input type="text" v-model="fiveisTextOne">
          <input type="text" v-model="fiveisTextTwo">
          <input type="text" v-model="fiveisTextThree">
          <input type="text" v-model="fiveisTextFour">
          <span @click="closeChangeText">提交</span>
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <span class="backIndex" @click="resetGradeStory">重新制作</span>
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex">提交</span>
        </div>
        
      </div>
    </div>
  </div>
</template>
 
<script>
// import { constants } from 'fs';
    export default {
      props:["width","height","max","srcs"],
      data(){
        return {
          urls: [],
          userInfo:{

          },
          msg: '留影纪念',
          isTextOne: "我的",
          isTextTwo: "毕业故事",
          isTextThree: "星星 著",

          twoisTextOne: "新生的第一次见面",
          twoisTextTwo: "在学校的400米操场",
          twoisTextThree: "听着开学典礼的阵阵言语",
          twoisTextFour: "开始憧憬一个美好的大学梦",

          threeisTextOne: "班级的第一次聚会",
          threeisTextTwo: "紧张的只敢喝杯中的水",
          threeisTextThree: "慌乱的间隙 无意中瞥见了TA",

          fourisTextOne: "课堂的欢乐",
          fourisTextTwo: "让我们倍加珍惜学校的时光",
          fourisTextThree: "时光匆匆，略过青涩的我们",
          fourisTextFour: "往事不再，终将走向终点",

          fiveisTextOne: "终于到了离别的这一天" ,
          fiveisTextTwo: "大学让我拥有了无数回不去的时光",
          fiveisTextThree: "接下来的路，也要好好走",
          fiveisTextFour: "毕业快乐",

          isIndex: 1,
          showImgStore: false,
          showStory: false,
          showImgSelect: false,
          showGradeStory: false,
          isShowText: false,
          isDom: true,
          isBack: true,
          isNext: true,
          x: 0,
          y: 0,
          scale: 2
        }
      },
      mounted(){
        // this.urls = this.\|| [];
        this.onLoad()
      },
      methods:{
          onLoad() {
    // 查看是否授权
     let _this=this
     wx.getSetting({
      success(res) {
         
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success:(res) =>{
                console.log(res.userInfo,'用户信息')
              _this.userInfo=res.userInfo
              _this.userInfo.avatarUrl=_this.userInfo.avatarUrl.slice(20).split('/').join('')
            }
          })
        }else{
            _this.userInfo={
                avatarUrl:'admin'
            }
        }
      }
    })
          },
        /**
         * 图片滑动
         */
        tap(e) {
          this.setData({
            x: 30,
            y: 30
          })
        },
        tap2() {
          this.setData({
            scale: 3
          })
        },
        onChange(e) {
          console.log(e.detail)
        },
        onScale(e) {
          console.log(e.detail)
        },

        /**
         * 电子相册的js方法
         */
        uploadImg(){
          let that = this;
          wx.chooseImage({
            count: that.max || 3,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              res.tempFilePaths.forEach(v=>{
                that.urls.push({src:v});
              });
  
              that.uploadFile(res.tempFilePaths[0],{
                 avatarUrl:that.userInfo.avatarUrl

              },'/api/album')
             
              that.$emit("choosed",{all:that.urls,currentUpload:res.tempFilePaths});
            }
          })
        },
        uploadFile(filePath,option,target){
               wx.uploadFile({
                    url:this.$url+target,
                    filePath:filePath, 
                    formData:option,
                    name:'file',
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
        },
        previewImg(index,item){
          let that = this;
          wx.showActionSheet({
            itemList:["预览","删除"],
            success: (res) =>{
              if(res.tapIndex === 0){
                wx.previewImage({
                  current:that.urls[index],
                  urls:that.urls
                });
              } else {
                wx.request({
                  method:'delete',
                  url:this.$url+`/api/album/${item._id}`,
                  success:(res)=>{
                    console.log(`删除照片成功`)
                  }
                })
                that.urls.splice(index,1);
                that.$emit("delete",that.urls);
              }
            },
          });
        },


        showEleImgStore() {
          this.showImgStore = !this.showImgStore
          wx.request({
             method:'get',
             url:this.$url+`/api/album/${this.userInfo.avatarUrl}`,
             success: (res)=>{
                 this.urls=[]
                 res.data.forEach(item=>{
                   this.urls.push({...item,src:this.$url+`/image/${item.imgUrl}`})
                   console.log(this.urls)
                 })
             }
          })
        },

        indexBack() {
          this.isIndex = this.isIndex - 1
          
          if(this.isIndex===0) {
            this.isBack = false
          } else {
            this.isBack = true
          }
        },

        indexNext() {
          this.isIndex = this.isIndex + 1
          if(this.isIndex===6) {
            this.isNext = false
          } else {
            this.isNext = true
          }
        },

        hideEleImgStore() {
          this.showImgStore = false
          this.showImgSelect = false
        },

        showStoryCreate() {
          this.showStory = true
        },

        closeStoryCreate() {
          this.showStory = false
        },

        imgSelect() {
          this.showImgSelect = true
        },

        showGrade() {
          this.showGradeStory = true
        },

        resetGradeStory() {
          this.showGradeStory = false
        },

        closeGradeStory() {
          this.showGradeStory = false
          this.showImgSelect = false
          this.showStory = false
        },

        showChangeText() {
          this.isShowText = true
          this.isDom = false
        },

        closeChangeText() {
          this.isShowText = false
          this.isDom = true
        },

        // test
        // init(){
        //   this.totalPage = Math.ceil(this.numberArr.length / this.itemNumPerPage)
        //   this.totalPage = this.totalPage < 1 ? 1 : this.totalPage
        // },
        // getCurPageContent: function(numberArr, curPage, itemNumPerPage){
        //   return numberArr.filter(function(element, index){
        //     if(index >= (curPage -1)* itemNumPerPage && index < curPage *itemNumPerPage){
        //       return true
        //     }else{
        //       return false
        //     }
        //   })
        // },
        // handleClick: function(arg){
        //   if(arg == 'leftBtn'){
        //     this.curPage = this.curPage > 1 ? --this.curPage : this.totalPage
        //   }else if (arg == 'rightBtn'){
        //     this.curPage = this.curPage < this.totalPage ? ++this.curPage: 1
        //   }
        // }
      }
    }
</script>
 
<style scoped>
    .all-background {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
      background: #eeeeee;
    }

    .message {
        color: black;
        padding: 5px;
        display: inline-block;
    }
    .images {
        width: 100%;
        height: 200px;
    }
    .title {
        color: black;
        padding: 5px;
        display: inline-block;
    }
    
    /* 电子相册 */
    .ele-img-store {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      /* z-index: 10; */
      background-color: #fff;
    }
    .j-pic-upload{
        padding: 10rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }
    .j-upload-btn{
        border: 1px dashed #ddd;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-right: 20rpx;
    }
    .j-upload-add{
        font-size: 80rpx;
        font-weight: 500;
        color:#C9C9C9;
    }
    .img{
        margin:10rpx 20rpx 10rpx 0;
    }
    /* 主页部分 */
    .middle-create-template {
      color:black;
      font-size: 18px;
      line-height: 18px;
      
    }
    /* 文本 */
    .middle-create-text {
      margin: 20px 10px;
      text-align: center;
      color: #1d1e1f;
    }
    .middle-create-textone {
      font-size: 15px;
      margin: 10px;
      line-height: 15px;
    }
    .middle-create-texttwo {
      font-size: 25px;
      line-height: 25px;
      margin-top: 20px;
      margin-bottom: 25px;
      font-weight: bold;
    }

    /* 开始制作 */
    .middle-create-enter {
      background-color: #ffffff;
      width: 70%;
      height: 32px;
      margin: 0 auto;
      text-align: center; 
      padding: 18px 0 0 0;
      border-radius: 10%;
      font-weight: bold;
      font-size: 15px;
      line-height: 15px;
    }

    /* info */
    .middle-create-info {
      width: 70%;
      margin: 10px auto;
      padding-right: 10px;
      font-size: 15px;
      line-height: 15px;
      text-decoration: underline;
    }
    .middle-create-info-img {
      padding: 10px 20px 10px 12px;
    }
    .middle-create-info-store {
      padding: 10px;
    }
    .img-book {
      display: inline-block;
      background-image: url(../../../static/images/img-book.png);
      width: 15px;
      height: 15px;
      background-size: 15px 15px;
      background-repeat: no-repeat;
      margin-right: 5px;
      vertical-align: middle;    
    }
    
    .img-person {
      display: inline-block;
      background-image: url(../../../static/images/img-person.png);
      width: 15px;
      height: 15px;
      background-size: 15px 15px;
      background-repeat: no-repeat;
      margin-right: 5px;
      vertical-align: middle;
    }


    /* 背景层和弹出框css */
    .story-create-index {
      font-size: 16px;
      line-height: 16px;
      position: relative;
      width: 300px;
      height: 230px;
      top: 240px;
      margin: 0 auto;
      text-align: center; 
      z-index: 12;
      background-color: rgba(192,192,192,1);
      border: 1px solid #ffffff;
      border-radius: 10px;
      /* background: gray; */
    }
    /* .storyBackground {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      filter: blur(50px);
    } */
    .story-create-index-and-background {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
    }

    .story-img {
      width: 300px;
      height: 60px;
      border-radius: 10px;
    }

    .story-create-text {
      margin: 5px 0 10px 0;
    }
    .line-one {
      font-weight: bold;
      padding: 5px;
    }
    .line-two {
      padding: 5px;
    }

    .story-create-btn {
      margin-top: 10px;
      color: #1296db;
      text-decoration: underline;
    }

    .close-story {
      padding: 10px;
      color: #1296db;
      float: right;
    }

    /* 点击开始制作 选择照片部分css */
    .img-select-index {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background-color: gray;
    }
    .img-select-box {
      position: relative;
      width: 80%;
      height: 70%;
      top: 60px;
      left: 30px;
      background-color: #ffffff; 
      border: 1px solid #ffffff;
    }
    .attention {
      position: fixed;
      font-size: 15px;
      font-family: 'Courier New', Courier, monospace;
      color: #888888;
      bottom: 120px;
      left: 95px;
      margin: 6px;
    }
    .attention p {
      position: relative;
      margin: 6px;
      text-align: center;
    }
    .backIndex {
      padding: 5px;
      background: #ffffff;
      color: #aaaaaa;
      border-radius: 10px;
      font-weight: blod;
      margin-right: 5px;
      font-size: 12px;
    }
    .attention-one {
      border: 1px solid #888888;
      border-radius: 10px;
      padding: 3px 0;
    }
    .img-submit {
     position: relative;
     left: 30px;
     top: 80px;
     font-size: 15px;
     font-weight: blod;
    }
    .submit-btn {
      position: relative;
      float: right;
      right: 74px;
      bottom: 6px;
      padding: 5px;
      color: #aaaaaa;
      background: #ffffff;
      border-radius: 10px;
      font-weight: blod;
    }

    /* 毕业故事制作css */
    .grade-story-diy {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: gray;
    }

    movable-view {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200rpx;
      width: 200rpx;
      background: #ffffff;
    }

    movable-area {
      position: fixed;
      top: 230px;
      height: 200px;
      width: 555rpx;
      margin: 10px;
      background-color: #ffffff;
      overflow: hidden;
      border: 1rpx solid #cccccc;
    }

    .max {
      width: 600rpx;
      height: 600rpx;
    }

    .page-section{
      position: absolute;
      top: 60px;
      right: 30px;
      width: 300px;
      height: 400px;
      background-color: burlywood;
      margin-bottom: 60rpx;
    }

    .diyimg {
      width: 200rpx;
      height: 200rpx;
    }

    .page-section-text {
      margin: 30px 0 0 10px;
      width: 300px;
      height: 150px;
    }
    .page-section-text-two {
      float: right;
      width: 50px;
      height: 150px;
      margin: 20px 20px 0 0;
    }
    .text-two {
      font-size: 15px;
      line-height: 15px;
      color: black;
    }
    .text-one {
      font-size: 25px;
      line-height: 25px;
      font-weight: bold;
      color: black;
      padding: 5px;
    }
    .dom-text {
      position: fixed;
      bottom: 40px;
      left: 42px;
    }
    .changeText {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: #fff;
    }

    /* 第二页 */
    .page-section-texttwo {
      font-size: 12px;
      line-height: 12px;
      color: black;
      margin-top: 35px;
      width: 300px;
      height: 150px;
    }
    .page-section-texttwo p {
      text-align: center;
      padding: 5px;
    }
    .area-two {
      top: 190px;
      height: 250px;
      border: 1rpx solid  burlywood;
      border-radius: 10px;
    }
    .view-two {
      width: 300rpx;
      height: 200rpx; 
    }
    .diyimg-two {
      border: 1rpx solid  burlywood;
      border-radius: 10px;
      width: 300rpx;
      height: 200rpx;
    }

    /* 第三页 */
    .page-section-textthree {
      float: right;
      position: relative;
      font-size: 12px;
      line-height: 12px;
      color: black;
      margin-top: 35px;
      width: 100px;
      height: 150px;
      top: 90px;
      right: 10px;
    }
    .page-section-textthree p {
      padding: 5px;
    }
    .area-three {
      top: 80px;
      height: 300px;
      width: 300rpx;
      box-shadow: 10px 10px 5px #aaaaaa;
      border: 1rpx solid #aaaaaa;
    }
    .view-three {
      width: 300rpx;
      height: 200px;
    }
    .diyimg-three {
      border: 1rpx solid  burlywood;
      width: 300rpx;
      height: 200px;
    }
    .love {
      display: block;
      background-image: url(../../../static/images/love.png);
      width: 80px;
      height: 80px;
      background-size: 80px 80px;
      background-repeat: no-repeat;
      margin-top: 20px;
    }

    /* 第四页 */
    .page-section-textfour {
      position: relative;
      margin-top: 210px;
      margin-right: 50px;
      width: 200px;
      height: 150px;
      left: 100px;
    }
    .page-section-textfour h1 {
      font-size: 40px;
      line-height: 40px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin-bottom: 5px;
      color: #ca1313;
    }
    .page-section-textfour p {
      font-size: 13px;
      line-height: 13px;
      color: black;
      padding: 5px;
    }
    .area-four {
      top: 60px;
      height: 200px;
      width: 500rpx;
    }
    .view-four {
      width: 400rpx;
      height: 150px;
    }
    .diyimg-four {
      border: 1rpx solid  burlywood;
      width: 400rpx;
      height: 150px;
    }

    /* 第五页 */
    .area-five {
      width: 590rpx;
      margin: 0;
      top: 120rpx;
    }
    .page-section-textfive {
      position: relative;
      top: 440rpx;
      font-size: 15px;
      line-height: 15px;
      width: 480rpx;
      height: 320rpx;
      border: 1rpx solid black;
      margin: 0 auto;
      text-align: center;
    }
    .page-section-textfive h1 {
      font-size: 35px;
      line-height: 35px;
      color: rgb(139,117,0);
      margin-bottom: 5px;
    }
    .page-section-textfive p{
      padding: 3px;
    }
</style>