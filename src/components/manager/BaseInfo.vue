<template>
  <div class="demo-search">
    <el-row class="1" :gutter="24">
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" @click="handleCreate('driver')">添加司机信息</el-button>
          <el-table
            :data="tableData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="司机姓名">
            </el-table-column>
            <el-table-column
              prop="phoneNumber"
              label="手机号">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" @click="handleCreate('car')">添加车牌信息</el-button>
          <el-table
            :data="tableData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="carNum"
              label="车牌号">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" @click="handleCreate('area')">添加库区信息</el-button>
          <el-table
            :data="tableData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="area"
              label="库区">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" @click="handleCreate('frame')">添加大架号</el-button>
          <el-table
            :data="tableData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="frameNum"
              label="大架号">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <div class="demo-block">
        司机姓名:
        <el-input placeholder="请输入司机姓名" v-model="name" :disabled="driverInput" clearable></el-input>
      </div>
      <div class="demo-block">
        司机手机:
        <el-input placeholder="请输入司机手机号" v-model="phoneNumber" :disabled="driverInput" clearable></el-input>
      </div>
      <div class="demo-block">
        车牌号:
        <el-input placeholder="请输入车牌号" v-model="carNum" :disabled="carInput" clearable></el-input>
      </div>
      <div class="demo-block">
        库区:
        <el-input placeholder="请输入库区" v-model="area" :disabled="areaInput" clearable></el-input>
      </div>
      <div class="demo-block">
        大架号:
        <el-input placeholder="请输入大架号" v-model="frameNum" :disabled="frameInput" clearable></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        name: '',
        phoneNumber: '',
        carNum: '',
        area: '',
        frameNum: '',
        startDate: '',
        dialogFormVisible: true,
        driverInput: true,
        carInput: true,
        areaInput: true,
        frameInput: true,

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
      init() {
      },
      handleCreate(type) {
        if (type === 'driver') {
          this.driverInput = false
        } else if (type === 'car') {
          this.carInput = false
        } else if (type === 'area') {
          this.areaInput = false
        } else if (type === 'frame') {
          this.frameInput = false
        }
        this.dialogFormVisible = true;
      },
      excel() {
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
        axios.post('api/from/excel', date, {responseType: 'arraybuffer'}).then((response) => {
          console.log(response)
          let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        })
      },
      search() {
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
        axios.post('api/from/search', date).then((response) => {
          console.log(response)
          let res1 = response.data
          for (let i = 0; i < res1.length; i++) {
            this.tableData.push(res1[i])
          }
          console.log(this.tableData)
        })
      },
      parseResult(result) {
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
    created() {
      this.init()
    }
  }
</script>
<style>
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    height: auto;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
