<template>
    <div>
        <!--商品属性  -->
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
        <div v-else class="m-tb-10">暂无属性</div>
        <el-button type="success" class="btn" @click="sub">下一步</el-button>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    emits: ['update:active', 'order'],
    setup(props, ctx) {
        let cid = ref<any>('')
        cid.value = localStorage.getItem('attrid')
        let arrtlists = ref<any[]>()
        let getData = () => {
            api.good.arrtlist(cid.value, 'only').then((res: any) => {
                arrtlists.value = res.data
            })

        }

        onMounted(() => {
            getData()
            // console.log(localStorage.getItem('arrtid'));
        })
        // 下一步
        let sub = () => {
            ctx.emit('update:active', 3)
            ctx.emit('order', 3)
        }

        return {
            sub, arrtlists, cid, getData
        }
    }
})
</script>

<style scoped>
</style>