<template>
  <div class="demo-image__lazy">
    <img v-for="url in imgUrl" fit="scale-down" :key="url" :src="url" />
  </div>
</template>

<script>
export default {
  name: "MainImage",
  data() {
    return {
      imgUrl:[]
    };

  },
  methods:{
    getImage(){
      let requireModule = require.context(
          "/pic",
          false,
          /\w(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/i
      );
      let imagesNameArr = [];
      for (let i = 0; i < requireModule.keys().length; i++) {
        imagesNameArr.push(requireModule.keys()[i].substr(2, requireModule.keys()[i].length));
      }

      imagesNameArr.forEach(imgUrl=>{
        this.imgUrl.push(require("/pic/"+imgUrl))
      })

    }
  },
  created() {
    this.getImage();
  }
}
</script>

<style scoped>
.demo-image__lazy {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
  float: left;
}
img {
  height: 300px;
  width: auto;
  overflow: hidden;
  margin-right: 10px;
}
</style>