<template>
  <div class="navigate">
    <el-container>
      <el-aside width="220px">
        <el-row class="banner">
          <el-col :span="6">
          </el-col>
          <el-col :span="18">
            <div style="padding-top: 18px; color:white" >辅助工具</div>
          </el-col>
        </el-row>
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              :router="true"
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">发车工单</span>
                </template>
                <el-menu-item index="/note">发车工单</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">信息维护</span>
                </template>
                <el-menu-item index="/info">信息维护</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header></el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Navigate',
    data(){
      return {
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed : {
    },
    watch: {

    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header{
    padding: 0;
    background-color: #545c64;
  }
  .el-main {
    color: #333;
    background-color: white;
    height: 1080px;
  }
  .el-menu {
    background-color: #2B3245;
    border-right:0px;
  }

  .banner {
    height: 60px;
    background-color: #434A50;
  }


</style>
