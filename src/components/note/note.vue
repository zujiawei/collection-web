<template>
  <div class="Upgrade">
    <div class="demo-search">
      <el-row class="input" :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label>司机姓名:</label>
            <el-input v-model="name" placeholder="请输入司机姓名"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label>车号:</label>
            <el-input v-model="carNum" placeholder="请输入车号"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label>库区:</label>
            <el-input v-model="area" placeholder="请输入库区"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label>大架号:</label>
            <el-input v-model="frameNum" placeholder="请输入大架号"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label>发车日期:</label>
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>

      </el-row>

      <el-row class="submit" :gutter="20">
        <el-col :span="1" offset="8">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="1" offset="1">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-refresh-left">重置</el-button>
          </div>
        </el-col>
        <el-col :span="1" offset="1">
          <div class="grid-content bg-purple">
            <el-button type="primary"><i class="el-icon-upload el-icon--right" @click="excel()">导出Excel</i></el-button>
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="demo-block">
      <div style="font-weight: bold;">发车工单</div>
      <div id="table">
        <el-table
          :data="tableData"
          height="700"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="司机姓名">
          </el-table-column>
          <el-table-column
            prop="carNum"
            label="车号">
          </el-table-column>
          <el-table-column
            prop="area"
            label="库区">
          </el-table-column>
          <el-table-column
            prop="frameNum"
            label="大架号">
          </el-table-column>
          <el-table-column
            prop="startDate"
            label="发车日期">
          </el-table-column>
        </el-table>


      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Upgrade',
    data () {
      return {
        name: '',
        carNum: '',
        area: '',
        frameNum: '',
        startDate: '',
        dialogFormVisible: false,
        tableData: [],
        rules: {
          tag: [
            {required: true, message: '请输入标签名称', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          region: [{required: true, message: '请选择接口类型', trigger: 'blur'}],
          content: [{required: true, message: '请输入内容', trigger: 'blur'}],
        }
      }
    },
    methods: {
      init () {
        axios.get('api/from/getNoteData').then((response) => {
          console.log(response.data.data)
          let res = response.data.data
          let virtual = []
          for (let i = 0; i < res.length; i++) {
            this.tableData.push(res[i])
          }
          console.log(this.tableData)
        }).catch((error) => {
          console.log(error)
          this.$notify.error({
            title: '错误',
            message: error,
            duration: 0
          })
        })
      },
      excel(){
        let name = this.name
        let carNum = this.carNum
        let area = this.area
        let frameNum = this.frameNum
        let startDate = this.startDate
        let date = {
          name: name,
          carNum: carNum,
          area: area,
          frameNum: frameNum,
          startDate: startDate
        }
        axios.post('api/from/excel',date,{responseType: 'arraybuffer'}).then((response) => {
          console.log(response)
          let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        })
        },
      search(){
        let name = this.name
        let carNum = this.carNum
        let area = this.area
        let frameNum = this.frameNum
        let startDate = this.startDate
        let date = {
          name: name,
          carNum: carNum,
          area: area,
          frameNum: frameNum,
          startDate: startDate
        }
        axios.post('api/from/search',date).then((response) => {
          this.tableData = []
          console.log(response)
          let res1 = response.data.data
          for (let i = 0; i < res1.length; i++) {
            this.tableData.push(res1[i])
          }
          console.log(this.tableData)
        })
      },
      parseResult (result) {
        if (result.resultCode === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: result.resultMsg,
            type: 'error'
          })
        }
      }
    },
    created () {
      this.init()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .demo-block {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 24px;
    margin-top: 10px;
  }

  .demo-search {
    border: 1px solid #ebebeb;
    border-radius: 1px;
    padding: 24px;
    margin-top: 5px;
  }

  .el-input {
    width: 80%;
  }

  .el-dialog__body {
    padding: 0px 20px;
  }

  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 8px;
  }

  /*.bg-purple-dark {*/
  /*background: #99a9bf;*/
  /*}*/

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }


</style>
