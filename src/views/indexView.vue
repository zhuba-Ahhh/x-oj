<template>
  <NavBar></NavBar>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'

</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #49b1f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

a:hover {
  text-decoration-color: #49b1f5;
}

header {
  .el-image {
    width: 26px;
    margin: 0 20px;
  }

  .loading {
    right: 13px;
    margin-left: 40px;

    .loadingBtn {
      margin-top: 13px;
    }
  }
}
</style>