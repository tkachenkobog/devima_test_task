<script setup lang="ts">
import { ElContainer, ElHeader, ElMain, ElFooter, ElMenu, ElMenuItem, ElLink } from "element-plus";
</script>

<template>
  <ElContainer class="layout">
    <ElHeader>
      <ElMenu 
        mode="horizontal" 
        :router="true" 
        default-active="/"
        class="menu"
      >
        <ElMenuItem index="/">Home</ElMenuItem>
        <ElMenuItem index="/about">About</ElMenuItem>
      </ElMenu>
    </ElHeader>

    <ElMain class="main-content">
      <router-view />
    </ElMain>

    <ElFooter class="footer">
      <div class="content">
        <span>© 2025</span>
        <ElLink 
          href="https://www.linkedin.com/in/tkachenko-bohdan" 
          target="_blank"
          :underline="false"
          type="primary"
          class="f-link"
        >
          Bohdan Tkachenko.
        </ElLink>
        <span>Footer as a Service™</span>
      </div>
    </ElFooter>
  </ElContainer>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.menu {
  display: flex;
  justify-content: center;
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-top: 0.5px solid #e0e0e0;
  margin-top: auto;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;
  flex-wrap: wrap;
}
</style>
