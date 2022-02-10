<template>
  <el-container>
    <el-header>
      <h1>Image
      </h1>
      <el-button class="msg-btn" type="primary" @click="openDialog">点击上传</el-button>
      <el-dialog
          title="上传"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
        <el-upload
            class="upload"
            drag
            :http-request="upload"
            action=""
            ref="cleanFile"
            :limit="1"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="upload2Github()" :loading="loading">确 定</el-button>
  </span>
      </el-dialog>
    </el-header>
  </el-container>

</template>

<script>
import moment from "moment";
import cryptoAES from "../utlis/cryptoAES.js"

export default {
  name: "Layout",
  data() {
    return {
      dialogVisible: false,
      body: {},
      file: {},
      loading: false,
      newTime:""
    };
  },
  methods: {
    image2Base64(img, callback) {
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        callback(reader.result);
      }, false);
      reader.readAsDataURL(img);

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.closeDialog();
            console.log(_)
            done();
          })
          .catch(_ => {
            console.log(_)
          });
    },
    upload2Github() {
      console.log(this.file.name)
      if (!this.file.name) {
        this.$message({
          message: '请上传文件',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.loading = true;
      let token = cryptoAES.decrypt("+LSaqqzSAOxDFl5Pl6Sh3IhY5/4rFkQI13JQgfnGQd1OdEAWygfSdKLtIlgci3JN")
      this.$http.put("https://api.github.com/repos/Yoki-Hua/image/contents/pic/" + this.newTime + "_" + this.file.name,
       this.body
      ,{
        headers: {
          "Authorization": "token " + token
        }
      }).then(res => {
        this.loading = false;
        this.closeDialog();
        this.$message({
          message: '上传成功！你的url:' + res.data.content['download_url'],
          type: 'success',
          duration: 4000
        });
        console.log(res.data.content['download_url'])
      }).catch(err => {
        this.loading = false;
        this.dialogVisible = true;
        this.$message({
          message: '上传失败！原因：' + err.response.data.message,
          type: 'error',
          duration: 4000
        });
      })
    },
    upload(e) {
      this.file = e['file'];
      let back = (res) => {
        /**处理base64*/
        let base64Arr = res.split(",");
        let picBase64 = base64Arr[1];
        let nowTime = new Date().getTime();
        this.newTime = moment(nowTime).format("yyyyMMDDHHmmss");
        this.body = {
          "message": "上传时间:" + this.newTime,
          "content": picBase64
        }

      }
      this.image2Base64(this.file, back)
    },
    openDialog() {

      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$refs.cleanFile.clearFiles();
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