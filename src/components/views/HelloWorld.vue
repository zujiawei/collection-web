<template>
  <div class="navigate">
    <el-row>
        <el-col :xs="3" :xl="2">
        <el-aside style="width: 100%">
          <div class="banner" style=" padding:0;text-align:center; color:white"><span>辅助工具</span></div>
            <el-menu
              :router="true"
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <div>
                <el-menu-item style="text-align: center;padding: 0" index="/note">工单</el-menu-item>
                <el-menu-item style="text-align: center;padding: 0" index="/info">录入</el-menu-item>
              </div>
            </el-menu>
          </el-aside>
        </el-col>
      <el-col :xs="21" :xl="22">
            <el-header></el-header>
            <el-main>
              <router-view/>
            </el-main>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'Navigate',
    data() {
      return {}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed: {},
    watch: {}
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    padding: 0;
    background-color: #545c64;
  }

  .el-menu-item {
    color: white;
    text-align: center;

  }

  .el-menu-item.is-active {
    color: white;
    text-align: center;

  }

  .el-main {
    color: #333;
    background-color: white;
    height: 1080px;
    padding: 0
  }

  .el-menu {
    background-color: #2B3245;
    border-right: 0px;
  }

  .banner {
    height: 60px;
    background-color: #434A50;
  }
</style>
