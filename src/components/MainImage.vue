<template>
  <el-row>
    <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="imgUrl" class="image">
        <div style="padding: 14px;">
          <span>aaa</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "MainImage",
  data() {
    return {
      currentDate: new Date(),
      imgUrl:""
    };

  },
  methods:{
    getImage(){
      let requireModule = require.context(
          "/pic",
          false
      );
      let imagesNameArr = [];
      for (let i = 0; i < requireModule.keys().length; i++) {
        imagesNameArr.push(requireModule.keys()[i].substr(2, requireModule.keys()[i].length));
      }
      imagesNameArr.forEach(imgUrl=>{
        this.imgUrl=require("/pic/"+imgUrl)
      })

    }
  },
  created() {
    this.getImage();
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 10%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>