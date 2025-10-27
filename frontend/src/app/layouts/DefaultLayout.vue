<template>
  <ElContainer class="common-layout">
    <ElHeader>
      <ElMenu mode="horizontal" :router="true">
        <ElMenuItem index="/"> Home </ElMenuItem>
        <ElMenuItem index="/about"> About </ElMenuItem>
      </ElMenu>
    </ElHeader>
    <ElMain>
      <router-view />
    </ElMain>
    <ElFooter>Footer</ElFooter>
  </ElContainer>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElMain, ElFooter, ElMenu, ElMenuItem } from "element-plus";
</script>

<style scoped>
.common-layout {
  min-height: 100vh;
}

.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
  padding: 0;
}

.el-menu {
  border-bottom: none;
}

.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  padding: 20px;
}
</style>
