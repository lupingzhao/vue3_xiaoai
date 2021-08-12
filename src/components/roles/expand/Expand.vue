<template>
    <!-- 权限展开 -->
    <div v-if="datas.length === 0">暂无权限</div>
    <div
        v-for="(a, index) in datas"
        :key="index"
        :class="{ 'border-b': index !== a.children.length - 1 }"
    >
        <div class="flex m-tb-10">
            <!-- 第一层 -->
            <el-tag closable @close="close1(a.id)">{{ a.authName }}1</el-tag>
            <i class="el-icon-caret-right mr-10"></i>
            <div>
                <div
                    class="flex m-10"
                    v-for="(d,e) in a.children"
                    :key="e"
                    :class="{ 'border-b': e !== a.children.length - 1 }"
                >
                    <!-- 第二层 -->
                    <el-tag closable type="success" @close="close1(d.id)">{{ d.authName }}</el-tag>
                    <i class="el-icon-caret-right mr-10"></i>
                    <div class="flex flex-wrap">
                        <!-- 第三层 -->
                        <div v-for="(f,g) in d.children" :key="g" class="m-10">
                            <el-tag closable type="warning" @close="close1(f.id)">{{ f.authName }}</el-tag>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'

interface chid {
    authName: string,
    children: chid[]
    id: number
    path: string
}
export default defineComponent({
    props: {
        data: {
            type: Array,
            required: true
        },
        ids: {
            type: Number,
            required: true
        }
    },
    emits: ['getData'],
    setup(props, ctx) {
        let datas = ref<chid[]>([{
            authName: '',
            children: [],
            id: 0,
            path: ''
        }])
        datas.value = props.data as any
        // datas = props.data
        // 关闭标签 权限id,
        let close1 = (val1: number) => {
            api.root.delRootid(props.ids, val1).then((res: any) => {
                if (res.meta.status === 200) {
                    datas.value = res.data
                    ctx.emit('getData')
                    ElMessage.success(res.meta.msg)
                } else ElMessage.error(res.meta.msg)
            })


        }
        return {
            datas,
            close1,

        }
    }
})
</script>

<style scoped>
</style>