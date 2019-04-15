<template>
    <div>
        <div class="head">
            <div class="title">{{xinxi}}</div>
        </div>
        <div class="showorhide">
            <input v-model="name" class="input" placeholder="eg：记录同学姓名">
            <input v-model="number" class="input" placeholder="eg：记录同学号码">
            <span class="add" @click="shipp"></span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            xinxi: "信息填入",
            name: '',
            number: ''
        }
    },

    methods: {
        skipp() {
            this.$emit('change',this.name,this.number)
        }
    }
}
</script>

<style scoped>
    .add {
        float: right; 
        display: inline-block;
        background-image: url(../../../static/images/add.png);
        width: 32px;
        height: 32px;
        background-size: 32px 32px;
        background-repeat: no-repeat;
        margin-right: 24px; 
        vertical-align: middle;
    }
    .input {
        display: inline-block;
        width: 70%;
        padding: 15px;
        border-radius: 6px;
        background: #F5F5F5;
        outline: none;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        border: 0;
        /* vertical-align: top; */
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
    }
</style>
