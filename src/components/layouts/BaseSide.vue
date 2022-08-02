<template>
<el-aside width="200px">
  <el-menu
    default-active="projects"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
  >
    <el-menu-item index="projects">
      <el-icon><icon-menu /></el-icon>
      <template #title>我的项目</template>
    </el-menu-item>

    <el-menu-item index="settings">
      <el-icon><Setting /></el-icon>
      <template #title>设置</template>
    </el-menu-item>

    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>SubMenu Test</span>
      </template>
        <el-menu-item index="hw">hello world</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="hw">
      <el-icon><document /></el-icon>
      <template #title>HelloWorld</template>
    </el-menu-item>

  </el-menu>
</el-aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo{
  width: 200px;
  min-height: 400px;
  height: 100vh;
}
</style>