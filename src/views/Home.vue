<template>
  <!-- div-center -->
  <div class="box jcc">
    <div style="margin-top: 20%;">欢迎来到小爱后台管理系统</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {

    let a = ref<any>(6)
    onMounted(() => {
      // console.log(toFixed(a, 2));
    })
    return {
      a
    }
  }
})
                                                                                                                    </script>

<style scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #000;
}
</style>