<template>
  <el-form :label-position="labelPosition" ref="form" :model="form" label-width="80px">
    <el-form-item label="司机姓名:">
      <el-select v-model="form.name" placeholder="请选择">
        <el-option
          v-for="item in nameOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="车号:">
      <el-select v-model="form.carNum" placeholder="请选择">
        <el-option
          v-for="item in carNumberOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="库区">
      <el-select v-model="form.area" placeholder="请选择">
        <el-option
          v-for="item in wareHousesOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="大架号:">
      <el-select v-model="form.frameNum" placeholder="请选择">
        <el-option
          v-for="item in shelvesOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发车日期:">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        nameOptions: [],
        carNumberOptions: [],
        wareHousesOptions: [],
        shelvesOptions: [],
        labelPosition: 'left',
        form: {
          name: '',
          carNum: '',
          area: '',
          frameNum: '',
          startDate: '',
        }
      }
    },
    created () {
      this.getDriverName()
    },
    methods: {
      async getDriverName () {
        axios.get('api/from/getInfos')
          .then((response) => {
            let res =response.data;
            let driver = res.drivers;
            let carNumbers = res.carNumbers;
            let shelves = res.shelves;
            let warehouses = res.warehouses;
            for (let i = 0; i < driver.length; i++) {
              this.nameOptions.push(driver[i].name)
            }
            for (let i = 0; i < carNumbers.length; i++) {
              this.carNumberOptions.push(carNumbers[i].carNumber)
            }
            for (let i = 0; i < shelves.length; i++) {
              this.shelvesOptions.push(shelves[i].number)
            }
            for (let i = 0; i < warehouses.length; i++) {
              this.wareHousesOptions.push(warehouses[i].number)
            }
            console.log(this.nameOptions)
            console.log(this.carNumberOptions)
            console.log(this.shelvesOptions)
            console.log(this.wareHousesOptions)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      onSubmit () {
        console.log('submit!')
      }
    },
  }
</script>
