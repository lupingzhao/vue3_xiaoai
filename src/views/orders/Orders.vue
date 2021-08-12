<template>
    <el-row class="order">
        <el-col>
            <el-card shadow="always">
                <div class="flex ipt-box">
                    <el-input
                        @clear="clear"
                        @input="clear(1)"
                        placeholder="请输入内容"
                        v-model="input"
                        clearable
                        class="ipt input-ipt"
                    ></el-input>
                    <div class="icon-box" @click="seach">
                        <i class="el-icon-search icon"></i>
                    </div>
                </div>
                <div class="list">
                    <!-- 列表 -->
                    <OrderList ref="list"></OrderList>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import OrderList from '@/components/orderList/OrderList.vue'
export default defineComponent({
    components: { OrderList },
    setup() {
        let input = ref<string>('')
        let list = ref<any>(null)
        // 点击搜索
        let seach = () => {
            if (input.value) {
                list.value.getData(input.value)
            } else {
                ElMessage.warning('没有输入关键字');
            }
        }
        // 清空输入框
        let clear = (val?: number) => {
            if (val) {
                // 手动清空
                // !input.value ? goods.value.getData : ''
            }
            // 清空按钮
            // else goods.value.getData

        }

        return {
            input, list, seach, clear


        }
    }
})
</script>

<style scoped lang="scss">
.order {
    .ipt-box {
        height: 30px;
        width: 250px;
        .ipt {
            text-indent: 5px;
            background: none;
        }
    }
    .icon-box {
        background-color: #f5f7fa;
        height: 42px;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
            font-size: 15px;
            color: #000;
        }
    }
    .list {
        margin-top: 20px;
    }
}
</style>