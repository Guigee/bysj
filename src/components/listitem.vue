<template>
  <div class="list-item">
    <li class="content" @click="detail">{{content}}</li>
    <span class="remove" @click="remove"></span>
  </div>
</template>

<script>
export default {
  props: ['content','ind'],

  data () {
    return {
      hide: false
    }
  },

  methods: {
    remove () {
      this.$emit('deleate', this.ind)
    },

    detail() {
      this.$emit('detailpage',this.ind)
    }
  }
}
</script>

<style scoped>
    .content {
        display: inline-block;
        width: 78%;
        padding: 15px;
        background: #eeeeee;
        border-radius: 6px;
        box-shadow: 2px 2px 1px #ffffff;
        vertical-align: middle;
        font-size: 12px;
        margin-bottom: 10px;
    }
      
     .remove {
         display: inline-block;
         background-image: url(../../static/images/remove-circle-outline.png);
         width: 25px;
         height: 25px;
         background-size: 25px 25px;
         background-repeat: no-repeat;
         margin-left: 5px;
         vertical-align: middle;
     }

    

</style>
