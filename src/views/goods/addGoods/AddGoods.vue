<template>
    <el-row class="width-100">
        <el-col>
            <el-card shadow="always">
                <el-alert title="添加商品" type="info" center show-icon :closable="false"></el-alert>
                <el-steps
                    :active="active"
                    align-center
                    class="about-step m-tb-10"
                    finish-status="success"
                >
                    <el-step title description="基本信息"></el-step>
                    <el-step title description="商品参数"></el-step>
                    <el-step title description="商品属性"></el-step>
                    <el-step title description="商品图片"></el-step>
                    <el-step title description="商品内容"></el-step>
                    <el-step title description="完成"></el-step>
                </el-steps>

                <!-- 内容 -->
                <div class="flex a-i-fs">
                    <div class="step-aside">
                        <div
                            class="vertical"
                            v-for="(item,index) in step"
                            :key="index"
                            :class="[{ 'active': index === active }, orderindex.some(a => { return a === index }) ? 'colors' : 'disable', { 'click': orderindex.some(a => { return a === index }) }]"
                            @click="cerStep(index)"
                        >{{ item }}</div>
                    </div>
                    <div class="width-100">
                        <BasisInfo v-model:active="active" @order="order" v-show="active === 0"></BasisInfo>
                        <Parameter v-model:active="active" @order="order" v-if="active === 1"></Parameter>
                        <GoodsAttr v-model:active="active" @order="order" v-if="active === 2"></GoodsAttr>
                        <UpImg v-model:active="active" @order="order" v-show="active === 3"></UpImg>
                        <GoodsContent v-model:active="active" @order="order" v-show="active === 4"></GoodsContent>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BasisInfo from '@/components/goods/basisInfo/BasisInfo.vue'
import Parameter from '@/components/goods/parameter/Parameter.vue'
import GoodsAttr from '@/components/goods/goodsAttr/GoodsAttr.vue'
import UpImg from '@/components/goods/upImg/UpImg.vue'
import GoodsContent from '@/components/goods/goodsContent/GoodsContent.vue'

export default defineComponent({
    components: { BasisInfo, Parameter, GoodsAttr, UpImg, GoodsContent },
    setup() {
        let step = ref<string[]>(['基本信息', '商品参数', '商品属性', '商品图片', '商品内容'])
        // 步骤条
        let active = ref<number>(0)
        // 已经操作了的步骤 可点击跳回
        let orderindex = ref<number[]>([0])

        // 下一步事件
        let order = (val: number) => {
            orderindex.value[val] = val
        }
        // 竖向导航点击事件
        let cerStep = (val: number) => {
            let boo = orderindex.value.some(a => {
                return a === val
            })
            if (boo) {
                active.value = val
            } else return
        }

        return {
            active,
            step,
            orderindex,
            order,
            cerStep
        }
    }
})
</script>

<style scoped lang="scss">
.about-step {
    width: 90%;
}
.step-aside {
    margin-top: 10px;
    width: 10%;
    .vertical {
        width: fit-content;
        padding: 10px;
        border-right: #e4e7ed solid 2px;
        color: darkgray;
    }
    .active {
        color: #3390ff !important;
        border-right: #3390ff solid 2px;
    }
    .click {
        &:hover {
            color: #3390ff;
            cursor: pointer;
        }
    }
    .colors {
        color: #000;
    }
    .disable {
        &:hover {
            cursor: not-allowed;
        }
    }
}
</style>