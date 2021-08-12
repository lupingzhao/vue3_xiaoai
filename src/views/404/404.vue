<template>
  <div class="w jcc">
    <div class="img">
      <img src="../../assets/404.jpg" alt />

      <div @click="click" class="btn m-c shou">返回首页</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router'
export default defineComponent({
  setup() {



    // 定义方法
    let click = () => {
      router.push('/Login')
    }

    return {
      click
    }
  }
})
</script>

<style lang='scss' scoped>
.img {
  transform: translateY(50%);
  img {
    width: 600px;
  }
}
.btn {
  font-size: 18px;
  padding: 10px;
  color: white;
  border-radius: 10px;
  width: fit-content;
  background-color: rgb(113, 166, 209);
}
</style>