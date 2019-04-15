<template>
    <div>
        <div class="container">
            <div class="title">聊天窗口功能</div>
        </div>

        <div class="chatList">
            <div class="noChatConent" v-if="showNoContent">
                <img class="noConent" src="../../../static/images/noChatConent.png">
                <span class="noText">{{text}}</span>
            </div>
            <div class="chatConentList"></div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            text: "暂无会话内容",
            showNoContent: true
        }
    }
}
</script>

<style scoped>
    .title {
        color: black;
        padding: 5px;
        display: inline-block;
    }
    
    .chatList {
        position: absolute;
    }

    .noChatConent {
        position: absolute;
        min-width: 100px;
    }

    .noConent {
        position: relative;
        width: 100px;
        height: 100px;
        left: 140px;
        top: 100px;
    }
    
    .noText {
        position:relative;
        /* display: block; */
        top: 100px;
        left: 140px;
        font-size: 15px;
        color: gray;
    }
</style>
