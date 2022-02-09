<template>
  <el-container>
    <el-header>
      <h1>Image
      </h1>
      <el-button class="msg-btn" type="primary" @click="dialogVisible = true">点击打开 Dialog</el-button>
      <el-dialog
          title="上传"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">

        <el-upload
            class="upload-demo"
            drag
            :http-request="upload"
            action=""
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="upload2Github()" >确 定</el-button>
  </span>
      </el-dialog>
    </el-header>
  </el-container>

</template>

<script>
import moment from "moment";

export default {
  name: "Layout",
  data() {
    return {
      dialogVisible: false,
      body:{},
      file:{}
    };
  },
  methods: {
    image2Base64(img,callback) {
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        callback(reader.result);
      }, false);
      reader.readAsDataURL(img);

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            console.log(_)
            done();
          })
          .catch(_ => {
            console.log(_)
          });
    },
    upload2Github(){
      let nowTime =new Date().getTime();
      let newTime=moment(nowTime,).format("yyyyMMDDHHmmss");
      fetch("https://api.github.com/repos/Yoki-Hua/image/contents/pic/"+newTime+"_"+this.file.name,{
        method:'PUT',
        body:JSON.stringify(this.body),
        headers:{
          "Authorization":"token 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"
        }
      })
          .then(res => res.json())
          .then(response=>{
        this.dialogVisible=false;
            this.$message({
              message: '上传成功！你的url:'+response.content['download_url'],
              type: 'success',
              duration:4000
            });
        console.log(response.content['download_url'])
      })
    },
    upload(e){
      this.file=e['file'];
      let back =  (res)=> {
        /**处理base64*/
        let base64Arr= res.split(",");
       let picBase64=base64Arr[1];
        let nowTime =new Date().getTime();
        let newTime=moment(nowTime).format("yyyyMMDDHHmmss");
        this.body={
          "message": "上传时间:"+newTime,
          "content":picBase64
        }

      }
      this.image2Base64(this.file,back)
    }
  }
}
</script>

<style scoped>
.el-header {
  position: relative;
  background-color: #777acd;
  color: #2b00ff;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.msg-btn {
  /*float: right;*/
  position: absolute;
  right: 10px;
}



</style>