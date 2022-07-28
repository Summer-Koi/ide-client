<template>
  <el-config-provider namespace="ep">
    <!-- <BaseHeader /> -->
    <el-container>
      <BaseSide />
        <!-- <img alt="Vue logo" class="element-plus-logo" src="../assets/logo.png" /> -->
        <!-- <div>userID: {{$route.params.userid}}</div> -->
        <RouterView/>
    </el-container>
  </el-config-provider>
</template>