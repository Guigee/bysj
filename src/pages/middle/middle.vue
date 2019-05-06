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
            <p class="line-one">请上传6张</p>
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
        <img @click="previewImg(index)" v-for="(src,index) in urls" :key="src" :src="src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" >
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
          <img @click="previewImg(index)" v-for="(src,index) in urls" :key="src" :src="src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" >
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
      </div>
    </div>
  </div>
</template>
 
<script>
    export default {
      props:["width","height","max","srcs"],
      data(){
        return {
          urls: [],
          msg: '留影纪念',
          isTextOne: "我的",
          isTextTwo: "毕业故事",
          isTextThree: "星星 著",
          showImgStore: false,
          showStory: false,
          showImgSelect: false,
          showGradeStory: false,
          isShowText: false,
          isDom: true,
          x: 0,
          y: 0,
          scale: 2
        }
      },
      // mounted(){
      //   this.urls = this.\|| [];
      // },
      methods:{

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
                that.urls.push(v);
              });
              that.$emit("choosed",{all:that.urls,currentUpload:res.tempFilePaths});
            }
          })
        },

        previewImg(index){
          let that = this;
          wx.showActionSheet({
            itemList:["预览","删除"],
            success: function(res) {
              if(res.tapIndex === 0){
                wx.previewImage({
                  current:that.urls[index],
                  urls:that.urls
                });
              } else {
                that.urls.splice(index,1);
                that.$emit("delete",that.urls);
              }
            },
          });
        },


        showEleImgStore() {
          this.showImgStore = !this.showImgStore
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
        }
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
</style>