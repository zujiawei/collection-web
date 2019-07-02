<template>
  <div class="demo-search">
    <el-row class="1" :gutter="24">
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" @click="handleCreate('driver')">添加司机信息</el-button>
          <el-table
            :data="tableData"
            border
            style="width: 100% ; height:auto">
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
            :data="tableData1"
            border
            style="width: 100% ; height:auto">
            <el-table-column
              prop="carNumber"
              label="车牌号">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" @click="handleCreate('area')">添加库区信息</el-button>
          <el-table
            :data="tableData2"
            border
            style="width: 100% ; height:auto">
            <el-table-column
              prop="number"
              label="库区">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" icon="el-icon-edit" @click="handleCreate('frame')">添加大架号</el-button>
          <el-table
            :data="tableData3"
            border
            style="width: 100% ; height:auto">
            <el-table-column
              prop="number"
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
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit(type)">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        type: '',
        name: '',
        phoneNumber: '',
        carNum: '',
        area: '',
        frameNum: '',
        startDate: '',
        dialogFormVisible: false,
        driverInput: true,
        carInput: true,
        areaInput: true,
        frameInput: true,
        tableData: [],
        tableData1: [],
        tableData2: [],
        tableData3: [],
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
        axios.get('api/from/getInfos')
          .then((response) => {
            let res = response.data
            console.log(res)
            let driver = res.drivers
            let carNumbers = res.carNumbers
            let shelves = res.shelves
            let warehouses = res.warehouses
            for (let i = 0; i < driver.length; i++) {
              this.tableData.push(driver[i])
            }
            console.log(this.tableData)
            for (let i = 0; i < carNumbers.length; i++) {
              this.tableData1.push(carNumbers[i])
            }
            for (let i = 0; i < shelves.length; i++) {
              this.tableData2.push(shelves[i])
            }
            for (let i = 0; i < warehouses.length; i++) {
              this.tableData3.push(warehouses[i])
            }
            // console.log(this.nameOptions)
            // console.log(this.carNumberOptions)
            // console.log(this.shelvesOptions)
            // console.log(this.wareHousesOptions)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      handleCreate (type) {
        if (type === 'driver') {
          this.driverInput = false
          this.type = 'driver'
        } else if (type === 'car') {
          this.type = 'car'
          this.carInput = false
        } else if (type === 'area') {
          this.type = 'area'
          this.areaInput = false
        } else if (type === 'frame') {
          this.type = 'frame'
          this.frameInput = false
        }
        this.dialogFormVisible = true
      },
      search () {
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
      submit (type) {
        let name = this.name
        let phoneNumber = this.phoneNumber
        let carNum = this.carNum
        let area = this.area
        let frameNum = this.frameNum
        if (type === 'driver') {
          if (name == null || name == '') {
            this.$message.error('司机姓名不能为空')
            return
          }
          if (phoneNumber == null || phoneNumber == '') {
            this.$message.error('司机电话号码不能为空')
            return
          }
          let data = {
            name: name,
            phoneNumber: phoneNumber
          }
          this.addName(data)
          this.dialogFormVisible = false
          this.name = ''
          this.phoneNumber = ''
          this.driverInput = true
        } else if (type === 'car') {
          if (carNum == null || carNum == '') {
            this.$message.error('车牌号不能为空')
            return
          }
          let data = {
            carNumber: carNum,
          }
          this.addCarNum(data)
          this.dialogFormVisible = false
          this.carNum = ''
          this.carInput = true
        } else if (type === 'area') {
          if (area == null || area == '') {
            this.$message.error('车牌号不能为空')
            return
          }
          let data = {
            number: area,
          }
          this.addarea(data)
          this.dialogFormVisible = false
          this.area = ''
          this.areaInput = true
        } else if (type === 'frame') {
          if (frameNum == null || frameNum == '') {
            this.$message.error('车牌号不能为空')
            return
          }
          let data = {
            number: frame,
          }
          this.addshelves(data)
          this.dialogFormVisible = false
          this.frame = ''
          this.frameInput = true
        }
      },
      async addName (data) {
        try {
          let res = axios.post('/api/driver', data)
          this.$message.success('提交信息成功，祝您一路顺风')
        } catch (error) {
          console.log(error)
          this.$message.error(error)
        }
      },
      async addCarNum (data) {
        try {
          let res = axios.post('/api/carNumber', data)
          this.$message.success('提交信息成功，祝您一路顺风')
        } catch (error) {
          console.log(error)
          this.$message.error(error)
        }
      },
      async addarea (data) {
        try {
          let res = axios.post('/api/warehouse', data)
          this.$message.success('提交信息成功，祝您一路顺风')
        } catch (error) {
          console.log(error)
          this.$message.error(error)
        }
      },
      async addshelves (data) {
        try {
          let res = axios.post('/api/shelves', data)
          this.$message.success('提交信息成功，祝您一路顺风')
        } catch (error) {
          console.log(error)
          this.$message.error(error)
        }
      },
      cancel () {
        this.dialogFormVisible = false
        this.driverInput = true
        this.carInput = true
        this.areaInput = true
        this.frameInput = true
        this.name = ''
        this.phoneNumber = ''
        this.carNum = ''
        this.area = ''
        this.frame = ''
      }
    },
    created () {
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
