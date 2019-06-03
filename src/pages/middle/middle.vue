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
        <span class="middle-create-info-store" @click="imgStorySubmittwo"><span class="img-person"></span>我的毕业故事</span>
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
        <div class="j-upload-btn" @click="uploadImg('/api/album')" :style="{'width':width || '120rpx','height':height || '120rpx'}">
            <span class="j-upload-add">+</span>
        </div>
        <img @click="previewImg(index,item)" v-for="(item,index) in urls" :key="item.src" :src="item.src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" >
      </div>
      <div @click="hideEleImgStore" class="backIndex fanhui">返回</div>
    </div>

   <!--选择照片页面  -->
    <div class="img-select-index" v-if="showImgSelect">
      <div class="img-select-box">
        <div class="j-pic-upload">
          <div class="j-upload-btn" @click="uploadImg()" :style="{'width':width || '120rpx','height':height || '120rpx'}">
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
        <span class="backIndex submit-btn" @click="showSelectModel">下一步(选择模版)</span>
        <!-- <span class="submit-btn" @click="showGrade('/api/graduationAlbum')">
          提交
        </span> -->
      </div>
    </div>

    <!-- 模版选择页面 -->
    <div class="select-model" v-if="ismodel">
      
      <p class="model-select-title">选择模板</p>
      <div class="model-title-one"></div>
      <div class="model-title-two"></div>
      <div class="model-one" :class="{'border-model':isborderone}" @click="borderone"><p>模版一<br>憧憬与期盼<br></p></div>

      <div class="model-two" :class="{'border-model':isbordertwo}" @click="bordertwo"><p>模版二<br>相逢与别离<br></p></div>

      <span @click="closeSelectModel" class="backIndex model-close">取消选择(默认)</span>
      <!-- 需要点击模版再确认 -->
      <span @click="showGrade('/api/graduationAlbum')" class="backIndex model-close">确定</span> 
    </div>

    <!-- 毕业故事制作页面1 -->
    <div class="grade-story-diy" v-if="showGradeStoryone">
      model 1

      <audio src="http://sc1.111ttt.cn/2015/1/04/21/97211105213.mp3" id="Audio"></audio>
      <view>
        <img :src="musicUrl" :class="{'rotateAn': isplay}" @click="controlMusic" id="musicstyle"/>
      </view>

      <div class="model-info">
        <span class="backIndex zhujiemian" v-if="showclose" @click="closeFinishedStory">返回主界面</span>
        <span class="backIndex" @click="indexBack" v-if="showclose">上一页</span>
        <span class="backIndex" @click="indexNext" v-if="showclose">下一页</span>
        
      </div>
    
      <!-- 第一页 -->
      <div class="index-one" v-show="isIndex===1">
        1
        <view class="page-section" :class="{'boxShadow': isShadow}">
          <div class="page-section-text">
            <p class="text-one">{{isTextOne}}</p>
            <p class="text-one">{{isTextTwo}}</p>
            <div class="page-section-text-two">
              <p class="text-two">{{isTextThree}}</p>
            </div>
          </div>

          <div class="movable-area">
            <div class="movable-view" >
              <img :src="urls[isIndex-1].src" class="diyimg" @click="tap">
            </div>
          </div>
        </view>
        <div class="changeText" v-if="isShowText">
          <div class="changeText-type">
            <input type="text" v-model="isTextOne">
            <input type="text" v-model="isTextTwo">
            <input type="text" v-model="isTextThree">
            <div @click="closeChangeText(isIndex)">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText(isIndex-1)">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
      </div>
      
      <!-- 第二页 -->
      <div class="index-two" v-show="isIndex===2">
        2
        <view class="page-section" :class="{'boxShadow': isShadow}">
          <div class="page-section-texttwo">
            <p>{{twoisTextOne}}</p>
            <p>{{twoisTextTwo}}</p>
            <p>{{twoisTextThree}}</p>
            <p>{{twoisTextFour}}</p>
          </div>

          <div  class="movable-area area-two">
            <!-- <div class="testOne"></div> -->
            <div  class="movable-view view-two">
              <img :src="urls[isIndex-1].src" class="diyimg diyimg-two">
            </div>
          </div>
        </view>
        <div class="changeText" v-if="isShowText">
          <div changeText-type>
            <input type="text" v-model="twoisTextOne">
            <input type="text" v-model="twoisTextTwo">
            <input type="text" v-model="twoisTextThree">
            <input type="text" v-model="twoisTextFour">
            <div @click="closeChangeText">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
      </div>

      <!-- 第三页 -->
      <div class="index-three" v-show="isIndex===3">
        3
        <view class="page-section" :class="{'boxShadow': isShadow}">

          <div scale-area class="movable-area area-three">
            <!-- <div class="testOne"></div> -->
            <div class="movable-view view-three" >
              <img :src="urls[isIndex-1].src" class="diyimg diyimg-three">
            </div>
          </div>

          <div class="page-section-textthree">
            <p>{{threeisTextOne}}</p>
            <p>{{threeisTextTwo}}</p>
            <p>{{threeisTextThree}}</p>
            <span class="love"></span>
          </div>
        </view>
        <div class="changeText" v-if="isShowText">
          <div class="changeText-type">
            <input type="text" v-model="threeisTextOne">
            <input type="text" v-model="threeisTextTwo">
            <input type="text" v-model="threeisTextThree">
            <div @click="closeChangeText">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
      </div>

      <!-- 第四页 -->
      <div class="index-four" v-show="isIndex===4">
        4
        <view class="page-section" :class="{'boxShadow': isShadow}">
          
          <div class="movable-area area-four">
            <!-- <div class="testOne"></div> -->
            <div class="movable-view view-four">
              <img :src="urls[isIndex-1].src" class="diyimg diyimg-four">
            </div>
          </div>
          <div class="page-section-textfour">
            <h1>HAPPY</h1>
            <p>{{fourisTextOne}}</p>
            <p>{{fourisTextTwo}}</p>
            <p>{{fourisTextThree}}</p>
            <p>{{fourisTextFour}}</p>
          </div>
        </view>
        <div class="changeText" v-if="isShowText">
          <div class="changeText-type">
            <input type="text" v-model="fourisTextOne">
            <input type="text" v-model="fourisTextTwo">
            <input type="text" v-model="fourisTextThree">
            <input type="text" v-model="fourisTextFour">
            <div @click="closeChangeText">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
      </div>

      <!-- 第五页 -->
      <div class="index-five" v-show="isIndex===5">
        5
        <view class="page-section" :class="{'boxShadow': isShadow}">
          
          <div class="movable-area area-five">
            <div class="movable-view view-five">
              <img :src="urls[isIndex-1].src" class="diyimg diyimg-five">
            </div>
          </div>
          <div class="page-section-textfive">
            <h1>Memory</h1>
            <p>{{fiveisTextOne}}</p>
            <p>{{fiveisTextTwo}}</p>
            <p>{{fiveisTextThree}}</p>
            <p>{{fiveisTextFour}}</p>
          </div>
        </view>
        <div class="changeText" v-if="isShowText">
          <div class="changeText-type">
            <input type="text" v-model="fiveisTextOne">
            <input type="text" v-model="fiveisTextTwo">
            <input type="text" v-model="fiveisTextThree">
            <input type="text" v-model="fiveisTextFour">
            <div @click="closeChangeText">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
        
      </div>
    </div>
      <!--毕业故事制作页面2 -->
    <div class="grade-story-diy" v-if="showGradeStory">
      model 2
      <audio src="http://sc1.111ttt.cn/2015/1/05/16/98162231335.mp3" id="Audio"></audio>
      <view>
        <img :src="musicUrl" :class="{'rotateAn': isplay}" @click="controlMusic" id="musicstyle"/>
      </view>

      <div class="model-info">
        <span class="backIndex zhujiemian" v-if="showclose" @click="closeFinishedStory">返回主界面</span>
        <span class="backIndex" @click="indexBack" v-if="showclose">上一页</span>
        <span class="backIndex" @click="indexNext" v-if="showclose">下一页</span>
        
      </div>

      <!-- 第一页 -->
      <div class="index-one" v-show="isIndex===1">
        1
        <view class="page-section page-two" :class="{'boxShadow': isShadow}">

          <div class="modeltwo-movable-area">
            <div class="modeltwo-movable-view">
              <img :src="urls[isIndex-1].src" class="modeltwo-diyimg">
            </div>
          </div>

          <div class="modeltwo-page-section-text">
            <p class="text-one">{{isTextOne}}</p>
            <p class="text-one">{{isTextTwo}}</p>
            <div class="modeltwo-page-section-text-two">
              
              <p class="text-two">{{isTextThree}}</p>
              <span class="gradeimg"></span>
            </div> 
          </div>

        </view>
        <div class="changeText" v-if="isShowText">
          <div class="changeText-type">
            <input type="text" v-model="isTextOne">
            <input type="text" v-model="isTextTwo">
            <input type="text" v-model="isTextThree">
            <div @click="closeChangeText">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
      </div>
      
      <!-- 第二页 -->
      <div class="index-two" v-show="isIndex===2">
        2
        <view class="page-section page-two" :class="{'boxShadow': isShadow}">
          <h1 class="two-yihao">“</h1>
          <div class="modeltwo-page-section-texttwo">
            <p>{{twoisTextOne}}</p>
            <p>{{twoisTextTwo}}</p>
            <p>{{twoisTextThree}}</p>
            <p>{{twoisTextFour}}</p>
          </div>

          <div class="modeltwo-movable-area modeltwo-area-two">
            
            <div class="modeltwo-movable-view modeltwo-view-two">
              <img :src="urls[isIndex-1].src" class="modeltwo-diyimg-two">
            </div>
          </div>
          <div class="shupai">L<br>O<br>V<br>E<br></div>
        </view>
        <div class="changeText" v-if="isShowText">
          <div class="changeText-type">
            <input type="text" v-model="twoisTextOne">
            <input type="text" v-model="twoisTextTwo">
            <input type="text" v-model="twoisTextThree">
            <input type="text" v-model="twoisTextFour">
            <div @click="closeChangeText">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
      </div>

      <!-- 第三页 -->
      <div class="index-three" v-show="isIndex===3">
        3
        <view class="page-section page-two" :class="{'boxShadow': isShadow}">

          <div class="shupai3">G<br>R<br>A<br>D<br>U<br>A<br>T<br>I<br>O<br>N<br>|<br></div>
          <div scale-area class="modeltwo-area-three">
            <div class="modeltwo-view-three">
              <img :src="urls[isIndex-1].src" class="modeltwo-diyimg-three">
            </div>
          </div>

          <div class="modeltwo-page-section-textthree">
            <p>{{threeisTextOne}}</p>
            <p>{{threeisTextTwo}}</p>
            <p>{{threeisTextThree}}</p>
          </div>
          <span class="threeimg"></span>
        </view>
        <div class="changeText" v-if="isShowText">
          <div class="changeText-type">
            <input type="text" v-model="threeisTextOne">
          <input type="text" v-model="threeisTextTwo">
          <input type="text" v-model="threeisTextThree">
          <div @click="closeChangeText">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
      </div>

      <!-- 第四页 -->
      <div class="index-four" v-show="isIndex===4">
        4
        <view class="page-section page-two" :class="{'boxShadow': isShadow}">
          
          <div class="modeltwo-area-four">
            <!-- <div class="testOne"></div> -->
            <div class="modeltwo-view-four">
              <img :src="urls[isIndex-1].src" class="modeltwo-diyimg-four">
              <!-- <div class="sanjiaoxing"></div> -->
            </div>
            
          </div>
          <div class="modeltwo-page-section-textfour">
            <p>{{fourisTextOne}}</p>
            <p>{{fourisTextTwo}}</p>
            <p>{{fourisTextThree}}</p>
            <p>{{fourisTextFour}}</p>
          </div>
          <div class="four-infoone">----</div>
          <div class="four-infotwo">You & Me</div>
        </view>
        <div class="changeText" v-if="isShowText">
          <div class="changeText-type">
            <input type="text" v-model="fourisTextOne">
          <input type="text" v-model="fourisTextTwo">
          <input type="text" v-model="fourisTextThree">
          <input type="text" v-model="fourisTextFour">
          <div @click="closeChangeText">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
      </div>

      <!-- 第五页 -->
      <div class="index-five" v-show="isIndex===5">
        5
        <view class="page-section page-two" :class="{'boxShadow': isShadow}">
          
          <div class=".info-yinhao">“<span class="bemine"></span></div>
          <div class="modeltwo-page-section-textfive">
            <p>{{fiveisTextOne}}</p>
            <p>{{fiveisTextTwo}}</p>
            <p>{{fiveisTextThree}}</p>
            <p class="teshu">{{fiveisTextFour}} ”</p>
          </div>
          

          <div class="modeltwo-area-five">
            <div class="modeltwo-view-five">
              <img :src="urls[isIndex-1].src" class="modeltwo-diyimg-five">
            </div>
          </div>
          
        </view>
        <div class="changeText" v-if="isShowText">
          <div class="changeText-type">
            <input type="text" v-model="fiveisTextOne">
            <input type="text" v-model="fiveisTextTwo">
            <input type="text" v-model="fiveisTextThree">
            <input type="text" v-model="fiveisTextFour">
            <div @click="closeChangeText">提交</div>
          </div>
          
        </div>
        <div class="dom-text" v-if="isDom">
          <span class="backIndex" @click="showChangeText">修改文字</span>
          <!-- <span class="backIndex" @click="resetGradeStory">重新制作</span> -->
          <span class="backIndex" @click="closeGradeStory">取消制作</span>
          <span class="backIndex" @click="indexBack" v-if="isBack">上一页</span>
          <span class="backIndex" @click="indexNext" v-if="isNext">下一页</span>
          <span class="backIndex" @click="imgStorySubmit">提交</span>
        </div>
        
      </div>

    </div>

  </div>
</template>
 
<script>
// import { constants } from 'fs';
import musicImg from '../../../static/images/music.png';
import { resolve } from 'url';
    export default {
      props:["width","height","max","srcs"],
      data(){
        return {
          finalData:[],
          model:0,
          urls: [],
          userInfo:{
          },
          msg: '留影纪念',
          isTextOne: "憧憬与期盼",
          isTextTwo: "我的毕业故事",
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
          showGradeStory: false, //here
          showGradeStoryone: false, //here
          showclose: false,
          isShowText: false,
          isDom: true,
          isBack: true,
          isNext: true,
          ismodel: false,
          x: 30,
          y: 30,
          scale: 2,
          isplay: false,
          musicUrl: musicImg,
          isborderone: false,
          isbordertwo: false,
          isShadow: false,
          stylewidth: '50px'
          
        }
      },
      mounted(){
        // this.urls = this.\|| [];
        this.onLoad()
        this.audioCtx = wx.createAudioContext('Audio')
      },
      methods:{
        updatedPPt(id){
          wx.request({
            method:'put',
            url:this.$url+`/api/graduationAlbum/${id}`,
            data:{
            },
            success:(res)=>{
              console.log(`删除照片成功`)
            }
          })
        },

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
         * 电子相册的js方法
         */
        uploadImg(target){
          let that = this;
        
          wx.chooseImage({
            count: that.max || 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            fail:(res)=>{
                 console.log(res,'错误')
            },
            success: async function (res) {
              console.log(res.tempFilePaths)
              res.tempFilePaths.forEach(v=>{
                that.urls.push({src:v});
              });
              that.num+= that.urls.length
              if(target){
                  let imgArr=[]
                for(let i=0,j=res.tempFilePaths.length;i<=j;i++  ){
                  if(res.tempFilePaths[i]){
                    that.uploadFile(res.tempFilePaths[i],{
                      avatarUrl:that.userInfo.avatarUrl,
                      index:i
                    },target)
                  }
                }
              }  
              console.log(imgArr,'sdasd')
                that.$emit("choosed",{all:that.urls,currentUpload:res.tempFilePaths});
            }
          })
        },

        uploadFile(filePath,option,target){
            return new Promise((resolve,reject)=>{
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
                  console.log('上传成功',res.data.imgUrl)
                  resolve('上传成功')
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
                  urls:that.urls.map(itme=>item.src)
                });
              } else {
                wx.request({
                  method:'delete',
                  url:this.$url+`/api/album/${item._id}`,
                  success:(res)=>{
                  console.log(`照片删除成功`)
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

        // 控制上下翻页
        indexBack() {
          this.isIndex = this.isIndex - 1
          
          if(this.isIndex===0) {
            this.isIndex = this.isIndex + 1
          }
        },

        indexNext() {
          this.isIndex = this.isIndex + 1
          
          if(this.isIndex===6) {
            this.isIndex = this.isIndex - 1
          }
        },

        hideEleImgStore() {
          this.showImgStore = false
          this.showImgSelect = false
          this.showStory = false
        },

        showStoryCreate() {
          this.showStory = true
          this.num=0;
          this.urls=[]
        },

        closeStoryCreate() {
          this.showStory = false
        },

        imgSelect() {
          this.showImgSelect = true
        },

        showGrade(target) {
          
          let that=this
   
          new Promise (async (resolve,reject)=>{
            for(let i=0,j=this.urls.length;i<=j;i++  ){
               if(this.urls[i]){
                     await this.uploadFile(this.urls[i].src,{
                 avatarUrl:this.userInfo.avatarUrl,
                 index:i
                  },target)
                   }
                }
                resolve('上传完毕')
            }).then(res=>{
              wx.request({
              method:'get',
              url:this.$url+`/api/graduationAlbum/${this.userInfo.avatarUrl}/${this.num}`,
              success:(res)=>{
                 res.data.sort((a,b)=>{
            
                    return a.index > b.index
                 })
                 this.finalData=[]
                //  console.log(res.data,'数据')
               this.urls = res.data.map(item=>{ 
                   item.src=this.$url+`/image/${item.imgUrl}`
                   item.describle= ''
                   item.position={
                     x:0,
                     y:0,
                     scale:0
                   }
                   this.finalData.push(item)
                   return item
                 })
                  
                if(this.isborderone==true&&this.isbordertwo==false||this.model===1) {
                  //原先的
                  this.model=1;
                  this.showGradeStoryone = true
                  this.showGradeStory = false
                  this.isDom = true
                  this.isIndex = 1
                  this.isTextOne = "憧憬与期盼"
                  this.isTextTwo = "我的毕业故事"

                  this.twoisTextOne = "新生的第一次见面"
                  this.twoisTextTwo = "在学校的400米操场"
                  this.twoisTextThree = "听着开学典礼的阵阵言语"
                  this.twoisTextFour = "开始憧憬一个美好的大学梦"

                  this.threeisTextOne = "班级的第一次聚会"
                  this.threeisTextTwo = "紧张的只敢喝杯中的水"
                  this.threeisTextThree = "慌乱的间隙 无意中瞥见了TA"

                  this.fourisTextOne = "课堂的欢乐"
                  this.fourisTextTwo = "让我们倍加珍惜学校的时光"
                  this.fourisTextThree = "时光匆匆，略过青涩的我们"
                  this.fourisTextFour = "往事不再，终将走向终点"

                  this.fiveisTextOne = "终于到了离别的这一天"
                  this.fiveisTextTwo = "大学让我拥有了无数回不去的时光"
                  this.fiveisTextThree = "接下来的路，也要好好走"
                  this.fiveisTextFour = "毕业快乐"
                }
                if(this.isborderone==false&&this.isbordertwo==true||this.model===2) {
                  this.model=2;
                  this.showGradeStory = true
                  this.showGradeStoryone = false
                  this.isDom = true
                  this.isIndex = 1

                  this.isTextOne = "相逢与别离"
                  this.isTextTwo = "我的毕业故事"

                  this.twoisTextOne = "耸立的高楼 "
                  this.twoisTextTwo = "走向陌生的道路"
                  this.twoisTextThree = "我不敢快步"
                  this.twoisTextFour = "怕惊醒了校园的美梦"

                  this.threeisTextOne = "笔直的回廊"
                  this.threeisTextTwo = "三三两两的人影"
                  this.threeisTextThree = "碎一地的时光"

                  this.fourisTextOne = "一路上我们曾携手并肩"
                  this.fourisTextTwo = "用汗和泪写下梦的诗篇"
                  this.fourisTextThree = "用欢笑和荣耀换来一句誓言"
                  this.fourisTextFour = "没人能代替分别的你"

                  this.fiveisTextOne = "要是没有离别和重逢"
                  this.fiveisTextTwo = "要是不敢承担欢愉和悲痛"
                  this.fiveisTextThree = "灵魂还有什么意义"
                  this.fiveisTextFour = "毕业快乐"
                }
            }
          })
        })     
      },

        resetGradeStory() {
          this.showGradeStory = false
          this.showGradeStoryone = false
          this.ismodel = false
        },

        closeGradeStory() {
          this.showGradeStory = false
          this.showGradeStoryone = false
          this.showImgSelect = false
          this.showStory = false
          this.ismodel = false
        },

        showChangeText(index) {
          this.isShowText = true
          this.isDom = false
        },

        closeChangeText(index) {
          this.isShowText = false
          this.isDom = true
        },

        closeFinishedStory() {
          this.showGradeStory = false
          this.showGradeStoryone = false
          this.showImgSelect = false
          this.showStory = false
          this.showclose = false
          this.ismodel = false
          this.isShadow = false
        },

        imgStorySubmit() {
         
          if(this.isborderone==true&&this.isbordertwo==false) {
            //原先的
            this.model=1
            this.showGradeStoryone = true
            this.showGradeStory = false
            this.isDom = true
          }
          if(this.isborderone==false&&this.isbordertwo==true) {
            this.showGradeStory = true
            this.showGradeStoryone = false
            this.isDom =true
            this.model=2
          }
          //  console.log(this.finalData)
              this.finalData = this.finalData.map((item,index)=>{
                if(index===0){item.describle=this.isTextOne+'\n'+this.isTextTwo+'\n'}
                else if(index===1){item.describle=this.twoisTextOne+'\n'+this.twoisTextTwo+'\n'+this.twoisTextThree+'\n'+this.twoisTextFour+'\n'}
                else if(index===2){item.describle=this.threeisTextOne+'\n'+this.threeisTextTwo+'\n'+this.threeisTextThree+'\n'}
                else if(index===3){item.describle=this.fourisTextOne+'\n'+this.fourisTextTwo+'\n'+this.fourisTextThree+'\n'+this.fourisTextFour+'\n'}
                else if(index===4){item.describle=this.fiveisTextOne+'\n'+this.fiveisTextTwo+'\n'+this.fiveisTextThree+'\n'+this.fiveisTextFour+'\n'}
                return item
           })
           wx.request({
             method:'post',
             url:this.$url+`/api/result`,
             data:{
                  result:{...this.finalData},
                  avatarUrl:this.userInfo.avatarUrl,
                  model:this.model
             },
             success: (res)=>{
               wx.request({
                  method:'get',
                url:this.$url+`/api/result/${this.userInfo.avatarUrl}`,
                success:(ret)=>{
                  // console.log(ret,'bishe')
                    // this.urls=ret.data[0].result;  
                    // console.log(this.urls,'123')
                    this.urls=this.urls.map((item,index)=>{
                      let arr=[]
                       if(index===0) {
                          arr=item.describle.split('\n')
                          this.isTextOne=arr[0]
                          this.isTextTwo=arr[1]
                       }else if(index===1) {
                          arr=item.describle.split('\n')
                          this.twoisTextOne=arr[0]
                          this.twoisTextTwo=arr[1]
                          this.twoisTextThree=arr[2]
                          this.twoisTextFour=arr[3]
                       }else if(index===2) {
                          arr=item.describle.split('\n')
                          this.threeisTextOne=arr[0]
                          this.threeisTextTwo=arr[1]
                          this.threeisTextThree=arr[2]
                       }else if(index===3) {
                          arr=item.describle.split('\n')
                          this.fourisTextOne=arr[0]
                          this.fourisTextTwo=arr[1]
                          this.fourisTextThree=arr[2]
                          this.fourisTextFour=arr[3]
                       }else if(index===4) {
                          arr=item.describle.split('\n')
                          this.fiveisTextOne=arr[0]
                          this.fiveisTextTwo=arr[1]
                          this.fiveisTextThree=arr[2]
                          this.fiveisTextFour=arr[3]
                       }
                   return item
                    })   
                }
               })
             }
          })

          this.showclose = true
          this.isDom = false
          this.isIndex = 1
          this.isShadow = true
         
        },

        imgStorySubmittwo() {
            wx.request({
                method:'get',
                url:this.$url+`/api/result/${this.userInfo.avatarUrl}`,
                success:(ret)=>{
                    this.urls=ret.data[0].result;
                    //  console.log(this.urls,ret.data[0]);
                    this.model=ret.data[0].model;
                    this.finalData=ret.data[0].result;

                    let textOnePage = this.finalData[0].describle.split('\n')
                    console.log(textOnePage,'文本1')
                    this.isTextOne = textOnePage[0]
                    this.isTextTwo = textOnePage[1]
                        
                    let textTwoPage = this.finalData[1].describle.split('\n')
                    console.log(textTwoPage,'文本2')
                    this.twoisTextOne = textTwoPage[0]
                    this.twoisTextTwo = textTwoPage[1]
                    this.twoisTextThree = textTwoPage[2]
                    this.twoisTextFour = textTwoPage[3]

                    let textThreePage = this.finalData[2].describle.split('\n')
                    console.log(textThreePage,'文本3')
                    this.threeisTextOne = textThreePage[0]
                    this.threeisTextTwo = textThreePage[1]
                    this.threeisTextThree = textThreePage[2]
                        
                    let textFourPage = this.finalData[3].describle.split('\n')
                    console.log(textFourPage,'文本4')
                    this.fourisTextOne = textFourPage[0]
                    this.fourisTextTwo = textFourPage[1]
                    this.fourisTextThree = textFourPage[2]
                    this.fourisTextFour = textFourPage[3]

                    let textFivePage = this.finalData[4].describle.split('\n')
                    console.log(textFivePage,'文本5')
                    this.fiveisTextOne = textFivePage[0]
                    this.fiveisTextTwo = textFivePage[1]
                    this.fiveisTextThree = textFivePage[2]
                    this.fiveisTextFour = textFivePage[3]

                    if(this.isborderone==true&&this.isbordertwo==false||this.model===1) {
                      //原先的
                      this.showGradeStoryone = true
                      this.showGradeStory = false
                      this.isDom = true
                      this.isIndex = 1
                    }
                    if(this.isborderone==false&&this.isbordertwo==true||this.model===2) {
                      
                      this.showGradeStory = true
                      this.showGradeStoryone = false
                      this.isDom = true
                      this.isIndex = 1
                    }
                    console.log(this.urls,'???')
                    this.showclose = true
                    this.isDom = false
                    this.isIndex = 1
                    this.isShadow = true
                  }
              })
        },

        // 控制背景音乐播放
        controlMusic: function() {

          if(this.isplay) {
            this.isplay = false
            this.audioCtx.pause()
          }else {
            this.isplay = true
            this.audioCtx.play()
          }
        },
        
        // 模版选择
        showSelectModel() {
          this.ismodel = true
        },
        closeSelectModel() {
          this.ismodel = false
        },
        borderone() {
          this.isborderone= true
          this.isbordertwo = false
        },
        bordertwo() {
          this.isborderone = false
          this.isbordertwo = true
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
    .middle-create-enter:hover {
      background-color: #1296db;
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
      padding: 10px;
      background: #ffffff;
      color: #aaaaaa;
      border-radius: 10px;
      font-weight: bold;
      margin-right: 8px;
      font-size: 12px;
    }
    .backIndex:hover {
     background-color: #1296db;
     color: black;
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
      font-size: 12px;
    }
    .submit-btn:hover {
      background-color: #1296db;
      color: black;
    }

    /* 毕业故事制作css */
    .grade-story-diy {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: #c0c0c0;
    } 

    .movable-area {
      position: fixed;
      top: 230px;
      height: 400rpx;
      width: 555rpx;
      margin: 10px;
      background-color: #ffffff;
      overflow: hidden;
      border: 1rpx solid #cccccc;
    }

    .movable-view {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 400rpx;
      width: 550rpx;
      background: #ffffff;
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

    .page-two {
      background-color: rgb(176,224,205);
    }

    .diyimg {
      width: 550rpx;
      height: 400rpx;
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
      background: #c0c0c0;
    }

    /* 第二页 */
    .page-section-texttwo {
      font-size: 12px;
      line-height: 12px;
      color: black;
      margin-top: 35px;
      width: 300px;
      height: 150px;
      font-family: SimHei;
    }
    .page-section-texttwo p {
      text-align: center;
      padding: 6px;
    }
    .area-two {
      top: 190px;
      height: 250px;
      /* border: 1rpx solid  burlywood;
      border-radius: 10px; */
    }
    .view-two {
      width: 277px;
      height: 250px; 
    }
    .diyimg-two {
      /* border: 1rpx solid  burlywood;
      border-radius: 10px; */
      width: 277px;
      height: 250px; 
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
      /* border: 1rpx solid #aaaaaa; */
    }
    .view-three {
      width: 150px;
      height: 300px;
    }
    .diyimg-three {
      /* border: 1rpx solid  burlywood; */
      width: 150px;
      height: 300px;
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
      width: 250px;
      height: 200px;
    }
    .diyimg-four {
      /* border: 1rpx solid  burlywood; */
      width: 250px;
      height: 202px;
    }

    /* 第五页 */
    .area-five {
      width: 590rpx;
      margin: 0;
      top: 120rpx;
    }
    .view-five {
      width: 295px;
      height: 200px;
    }
    .diyimg-five {
      width: 295px;
      height: 200px;
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

    /* music */
    #musicstyle {
      width: 30px;
      height: 30px;
      float: right;
      margin-right: 30px;
    }
    .rotateAn {
      animation: rotate 3s linear infinite;
      width: 30px;
      height: 30px;
    }
    @keyframes rotate {
      from {transform: rotate(0deg)}
      to {transform: rotate(360deg)}
    }

    /* 模版选择 */
    .select-model {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #c0c0c0;
      
    }
    .model-select-title {
      position: relative;
      top: 70px;
      font-size: 20px;
      line-height: 20px;
      font-family: SimHei;
      color: black;
      text-align: center;
    }
    .model-title-one {
      display: inline-block;
      position: fixed;
      background-image: url("../../../static/images/modelone.png");
      width: 50px;
      height: 50px;
      background-size: 50px 50px;
      background-repeat: no-repeat;
      left: 110px;
      top: 95px;
    }
    .model-title-two {
      display: inline-block;
      position: fixed;
      background-image: url("../../../static/images/modeltwo.png");
      width: 50px;
      height: 50px;
      background-size: 50px 50px;
      background-repeat: no-repeat;
      left: 220px;
      top: 95px;
    }
    .model-one {
      position: relative;
      top: 120px;
      display: inline-block;
      margin: 10px;
      margin-left: 30px;
      width: 120px;
      height: 120px;
      background-color: burlywood;
      font-size: 15px;
      line-height: 15px;
      color: #fff;
      text-align: center;
    }
    .model-one p {
      padding: 10px;
      font-size: 18px;
      line-height: 30px;
    }
    .model-two p {
      padding: 10px;
      font-size: 18px;
      line-height: 30px;
    }
    .model-two {
      position: relative;
      top: 120px;
      display: inline-block;
      width: 120px;
      height: 120px;
      margin: 10px;
      margin-left: 50px;
      background-color: rgb(176,224,205);
      font-size: 15px;
      line-height: 15px;
      color: #fff;
      text-align: center;
    }
    .model-close {
      position: relative;
      top: 150px;
      margin: 10px 50px 0 50px;
      margin-left: 80px;
    }
    .border-model {
      width: 150px;
      height: 150px;
      border: 2px solid green;
    }
    .model-info {
      position: fixed;
      bottom: 40px;
      left: 42px;
    }
    .zhujiemian {
      margin-right: 15px;
      padding: 8px;
    }

    /* 提交后阴影 */
    .boxShadow {
      box-shadow: 10px 10px 5px #B4CDCD;
    }
    
    /* 模板二css第一页 */
    .modeltwo-movable-area {
      position: fixed;
      top: 60px;
      height: 220px;
      width: 555rpx;
      margin: 10px;
      background-color: #ffffff;
      overflow: hidden;
      border: 1rpx solid #cccccc;
    }
    .modeltwo-page-section-text {
      margin: 240px 10px 0 5px;
      width: 300px;
      height: 150px;
      
    }
    .modeltwo-page-section-text-two {
      float: right;
      width: 50px;
      height: 150px;
      margin: 25px 25px 0 0;
    }
    .gradeimg {
      display: block;
      background-image: url("../../../static/images/Grade.png");
      width: 35px;
      height: 35px;
      background-size: 35px 35px;
      background-repeat: no-repeat;
      margin-top: 10px;
      margin-left: 16px;
    }

    .modeltwo-movable-view {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 220px;
      width: 550rpx;
    }
    .modeltwo-diyimg {
      width: 550rpx;
      height: 220px;
    }

    /* 模板二第二页 */
    .modeltwo-page-section-texttwo {
      font-size: 15px;
      line-height: 15px;
      color: black;
      width: 300px;
      height: 150px;
      font-family: SimHei;
    }
    .modeltwo-page-section-texttwo p {
      text-align: center;
      padding: 5px;
    }
    .two-yihao {
      font-family: SimSun;
      text-align: center;
      margin: 25px 0 0 0;
      font-size: 30px;
      line-height: 5px;
    }

    .modeltwo-area-two {
      position: fixed;
      top: 190px;
      height: 220px;
      width: 250px;
      margin: 10px;
      background-color: 	#FFDAB9;
      overflow: hidden;
    }
    .modeltwo-view-two {
      width: 250px;
      height: 220px;
    }
    .modeltwo-diyimg-two {
      width: 240px;
      height: 210px;
    }
    .shupai {
      float: right;
      position: relative;
      margin-right: 5px;
      font-size: 50px;
      line-height: 60px;
      font-family: SimSun;
      color: #CD853F;
      font-weight: bold;
      bottom: 50px;
    }

    /* 模板二第三页 */
    .modeltwo-area-three {
      position: fixed;
      top: 60px;
      right: 30px;
      height: 290px;
      width: 250px;
      margin: 10px;
      background-color:#FFDAB9;
      overflow: hidden;
      float: right;
    }
    .modeltwo-view-three {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 290px;
      width: 250px;
    }
    .modeltwo-diyimg-three {
      height: 290px;
      width: 250px;
    }
    .shupai3 {
      float: left;
      position: relative;
      margin-left: 10px;
      font-size: 35px;
      line-height: 35px;
      font-family: SimSun;
      color: #CD853F;
      font-weight: bold;
      top: 8px;
    }
    .modeltwo-page-section-textthree {
      margin: 320px 10px 0 5px;
      font-size: 15px;
      line-height: 15px;
      font-family: SimHei;
      position: relative;
      float: left;
    }
    .modeltwo-page-section-textthree p {
      padding: 5px;
    }
    .threeimg {
      display: inline-block;
      background-image: url("../../../static/images/wave.png");
      width: 50px;
      height: 50px;
      background-size: 50px 50px;
      background-repeat: no-repeat;
      margin-top: 330px;
      margin-left: 75px;
    }

    /* 模板二第四页 */
    .modeltwo-area-four {
      position: fixed;
      top: 60px;
      height: 220px;
      width: 558rpx;
      margin: 10px;
      background-color:	#FFDAB9;
      overflow: hidden;
    }
    .modeltwo-view-four {
      height: 220px;
      width: 558rpx;
    }
    .modeltwo-diyimg-four {
      height: 220px;
      width: 558rpx;
    }
    .sanjiaoxing {
      border-style: solid;
      border-width: 0px 0px 100px 100px;
      /* rgb(176,224,205) */
      border-color: transparent transparent red transparent;
      width: 0px;
      height: 0px;
      z-index: 10;
    }
    .modeltwo-page-section-textfour {
      margin-top: 250px;
      font-size: 15px;
      line-height: 15px;
      text-align: center;
      font-family: SimHei;
    }
    .modeltwo-page-section-textfour p {
      padding: 5px;
    }
    .four-infoone {
      margin-top: 10px;
      font-size: 15px;
      line-height: 15px;
      font-family: SimSun;
      text-align: center;
      color: #CD853F;
    }
    .four-infotwo{
      font-size: 15px;
      line-height: 15px;
      font-family: SimSun;
      text-align: center;
      color: #CD853F;
    }

    /* 模板二第五页 */
    .info-yinhao {
      font-family: SimSun;
      margin: 25px 0 0 0;
      font-size: 18px;
      line-height: 18px;
      margin-left: 10px;
    }
    .modeltwo-page-section-textfive {
      font-size: 15px;
      line-height: 15px;
      font-family: SimHei;
      margin-left: 10px;
      width: 200px;
    }
    .modeltwo-page-section-textfive p {
      padding: 5px;
    }
    .teshu {
      font-size: 17px;
      color: #1296db;
    }
    .modeltwo-area-five {
      position:relative;
      height: 220px;
      width: 280px;
      margin: 10px;
      background-color:	#FFDAB9;
      overflow: hidden;
    }
    .modeltwo-view-five {
      height: 220px;
      width: 280px;
    }
    .modeltwo-diyimg-five {
      height: 220px;
      width: 280px;
    }
    .bemine {
      display: inline-block;
      background-image: url(data:image/png;base64,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);
      width: 30px;
      height: 30px;
      background-size: 30px 30px;
      background-repeat: no-repeat;
      margin-left: 110px;
    }
    /* 模板二第六页 */
    /* .last-index {
      position: absolute;
      top: 60px;
      right: 30px;
      width: 300px;
      height: 400px;
      background-color: gray;
      margin-bottom: 60rpx;
      display: flex;
      align-items: center;  */
      /*定义body的元素垂直居中*/
      /* justify-content: center; */
       /*定义body的里的元素水平居中*/
    /* } */
    /* .last-txet {
      width:100px;
      height:100px;
      font-size: 30px;
      line-height: 30px;
      font-family: SimHei;
      text-align: center;
      color: #1296db;
    } */
    /* 相册返回 */
    .fanhui {
      background-color: #3c3c3c;
      width: 30px;
      padding: 6px;
    }

    /* v-model文本输入框css */
    .changeText-type {
      position: relative;
      top: 120px;
      left: 45px;
      width: 300px;
    }
    .changeText-type input {
      margin: 10px;
      padding: 6px;
      background: #fff;
      font-size: 16px;
      line-height: 16px;
      border-radius: 8px;
    }
    .changeText-type div {
      background: #8a8a8a;
      border-radius: 6px;
      padding: 10px;
      font-size: 15px;
      line-height:15px;
      margin: 10px 0 0 10px;
      width: 40px;
    }
</style>