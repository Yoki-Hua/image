<template>
  <div class="demo-image__lazy">
    <el-image
        v-for="(url) in imgUrl"
        fit="scale-down"
        :key="url"
        :src="url"
          :preview-src-list="imgUrl"
        lazy
    ></el-image>
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
          /\w(\.gif|\.jpeg|\.png|\.jpg|\.webp|\.bmp)/i
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
.el-image {
  height: 400px;
  width: auto;
  overflow: hidden;
  margin-right: 10px;
}
</style>