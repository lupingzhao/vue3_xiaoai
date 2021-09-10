<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>



<script lang="ts">
// 中文u
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus';
import { defineComponent } from 'vue'
import * as echarts from 'echarts'
import { provide } from 'vue'
export default defineComponent({
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup() {

    provide('ec', echarts)//provide
    return {
      locale: zhCn,
    }
  }

})
</script>

<style lang="scss">
@import "./style/common.scss";
@import "./style/ui.scss";
</style>