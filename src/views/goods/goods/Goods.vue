<template>
    <div class="add" v-if="add">
        <!-- 头部 -->
        <div class="flex mb-10">
            <div class="flex ipt-box">
                <el-input
                    @clear="clear"
                    @input="clear(1)"
                    placeholder="请输入内容"
                    v-model="input"
                    clearable
                    class="ipt input-ipt"
                ></el-input>
            </div>
            <div class="icon-box" @click="seach">
                <i class="el-icon-search icon"></i>
            </div>
            <div class="m-l-15">
                <el-button type="primary" @click="goto">添加商品</el-button>
            </div>
        </div>
        <List ref="goods"></List>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import List from '@/components/goods/list/List.vue'

import router from '@/router'

export default defineComponent({
    components: {
        List,

    },
    name: 'goods',
    setup() {
        let input = ref<string>('')
        let goods = ref<any>(null)
        let add = ref<boolean>(true)
        // 点击搜索
        let seach = () => {
            if (input.value) {
                goods.value.search(input.value)
            } else {
                ElMessage.warning('没有输入关键字');
            }
        }
        // 清空输入框
        let clear = (val?: number) => {
            if (val) {
                // 手动清空
                !input.value ? goods.value.getData : ''
            }
            // 清空按钮
            else goods.value.getData

        }
        // 添加商品
        let goto = () => {
            // add.value = false
            router.push('/addgoods')
            localStorage.setItem('add1', '22')
            let arr = JSON.parse(localStorage.getItem('title')!)
            arr.push({ name: "添加商品", path: '/addgoods' })
            localStorage.setItem('title', JSON.stringify(arr))
        }

        return {
            seach,
            clear,
            input,
            goto,
            goods,
            add
        }
    }
})
</script>

<style scoped lang="scss">
.ipt-box {
    // border: 1px solid #94aab8;
    height: 30px;
    // border-top-left-radius: 5px;
    // border-bottom-left-radius: 5px;
    .ipt {
        text-indent: 5px;
        background: none;
    }
}

.icon-box {
    background-color: #94aab8;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
        font-size: 20px;
        color: #f5f5f5;
    }
}
</style>