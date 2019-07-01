<template>
  <div class="Upgrade">
    <div class="demo-block">
      <div style="font-weight: bold;">接口模拟</div>
      <div id="table">
        <el-button @click="handleCreate()" type="primary" size="small" style="margin-top: 10px">新增</el-button>
        <el-table
          :data="tableData"
          height=100%
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
    data() {
      return {
        dialogFormVisible: false,
        addForm: {
          id: '',
          url: '',
          tag: '',
          region: '',
          state: 0,
          content: ''
        },

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
        axios.get('api/from/getNoteData').then((response) => {
          console.log(response);
          let virtual = response.data;
          this.tableData = virtual;
        }).catch((error) => {
          console.log(error);
          this.$notify.error({
            title: '错误',
            message: error,
            duration: 0
          });
        });
      },
      parseResult(result) {
        if (result.resultCode === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: result.resultMsg,
            type: 'error'
          });
        }
      }
    },
    created() {
      this.init();
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

  .el-input {
    width: 80%;
  }

  .el-dialog__body {
    padding: 0px 20px;
  }

</style>
