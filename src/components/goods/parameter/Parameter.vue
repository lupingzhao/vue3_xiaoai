<template>
    <!-- 商品参数 -->
    <div>
        <div v-if="cid" class="m-tb-10">
            <div class="attr_vals" v-for="(item,index) in arrtlists" :key="index">
                <div class="font-s-16 m-b-10">{{ item.attr_name }}</div>
                <div class="m-tb-10 flex flex-wrap" v-if="item.attr_vals">
                    <el-tag
                        class="mr-5 mb-10"
                        closable
                        v-for="(item1) in item.attr_vals.split(',')"
                        :key="item1"
                    >{{ item1 }}</el-tag>
                </div>
            </div>
        </div>
        <div v-else class="m-tb-10">暂无参数</div>
        <div class="m-tb-10">
            <el-button type="success" class="btn" @click="sub">下一步</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref, watch } from 'vue'

interface obj {
    attr_id: number
    attr_name: string
    attr_sel: string
    attr_vals: string
    attr_write: string
    cat_id: number
    delete_time: null
}
export default defineComponent({
    emits: ['update:active', 'order'],
    setup(props, ctx) {
        let cid = ref<any>('')
        cid.value = localStorage.getItem('attrid')
        let arrtlists = ref<any[]>()
        let getData = () => {
            api.good.arrtlist(cid.value, 'many').then((res: any) => {
                arrtlists.value = res.data
                // console.log(res);
            })
        }

        // 获取参数列表
        // 下一步
        let sub = () => {
            ctx.emit('update:active', 2)
            ctx.emit('order', 2)
        }

        onMounted(() => {
            getData()

        })
        return {

            sub, arrtlists, cid, getData
        }
    }
})
</script>

<style scoped lang="scss">
.attr_vals {
    margin: 10px;
}
</style>