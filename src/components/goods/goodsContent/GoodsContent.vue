<template>
    <div>
        <div class="container flex">
            <!-- 商品内容 -->
            <div id="editor" class="toolbar"></div>
            <!-- <div id="editor1" class="text"></div>s -->
        </div>
        <div class="m-tb-10">
            <el-button type="success" class="btn" @click="sub">保存商品</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, ref, watch } from 'vue'
import E from 'wangeditor'
export default defineComponent({
    components: {

    },
    emits: ['update:active', 'order'],
    setup(props, ctx) {
        let info = ref<string>('')
        let info1 = ref<string>('')
        let boo = ref<boolean>(false)
        let content = ref<any>('')
        // 下一步
        let sub = () => {
            ctx.emit('update:active', 6)
            ctx.emit('order', 5)
            boo.value = true
        }

        onMounted(() => {
            const editor = new E('#editor')
            // const editor1 = new E('#editor1')
            editor.create()
            // editor1.create()
            // editor.config.height = 500
            // 编辑器的值
            editor.config.onchange = (val: string) => {
                info.value = val
                localStorage.getItem('info')
            }
        })
        watch(() => [info.value, boo.value], val => {
            // console.log(boo.value);
            if (boo.value) {
                // addgoods(goods_name: string, goods_cat: string, goods_price: string, goods_number: string, goods_weight: string, goods_introduce: string, pics: any) {
                // 添加商品
                let bas = JSON.parse(localStorage.getItem('basisinfo')!)
                let pic = JSON.parse(localStorage.getItem('imgdata')!)
                let info = localStorage.getItem('info')
                if (!info) {
                    info = ''
                }
                api.good.addgoods(bas.name, bas.cascader.join(','), bas.price, bas.numbers, bas.weight, info, pic).then((res: any) => {
                    if (res.meta.status === 201) {
                        ElMessage.success(res.meta.msg)
                    } else ElMessage.error(res.meta.msg)
                    router.push('/goods')
                })
            }
        }, { deep: true, immediate: true })
        return {
            sub,
            content, info,
        }

    }
})
</script>

<style scoped>
.toolbar {
    background-color: #f1f1f1;
    z-index: 0;
    margin-right: -10px;
}
.text {
    border: 1px solid #ccc;
    border-right: none;
    z-index: 0;
}
.container {
    margin-bottom: 20px;
}
</style>
