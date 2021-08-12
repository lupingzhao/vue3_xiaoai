<template>
    <div>
        <div id="myChart" class="tb" ref="bar"></div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api';
import { defineComponent, onMounted, ref, inject } from 'vue'
export default defineComponent({
    setup() {
        let echarts = ref<any>(inject("ec"));//引入
        onMounted(() => {
            //需要获取到element,所以是onMounted的Hook
            let myChart = echarts.value.init(document.getElementById("myChart"));
            api.tj().then((res: any) => {
                // 给对象真假属性 是需要先定义一个属性名  赋值 就直接用对象.属性名
                let color = ref<string[]>([])
                let tooltip = ref<any>()
                color.value = ['#B2D8C6', '#E1A793', '#90BCC2', '#6D7C87', '#D4716E']
                //经过数据图表时的提示
                tooltip.value = {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                }
                res.data.color = color.value
                res.data.tooltip = tooltip.value
                // 绘制图表
                myChart.setOption(res.data)
            })
            window.onresize = function () {//自适应大小
                myChart.resize();
            };
        });
        return {

        }
    }
})
</script>

<style scoped lang="scss">
.tb {
    width: 100%;
    height: 400px;
}
</style>