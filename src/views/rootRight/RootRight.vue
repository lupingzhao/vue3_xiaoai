<template>
    <div style="width: 100%">
        <div>
            <!-- 权限列表 -->
            <el-table :data="tableData" style="width: 100%" align="center" border class="p-10">
                <el-table-column type="index" label="#" align="center"></el-table-column>
                <el-table-column prop="authName" label="权限名称" align="center"></el-table-column>
                <el-table-column prop="level" label="等级" align="center">
                    <template #default="scope">
                        <el-tag
                            :type="tab[scope.row.level]"
                        >{{ scope.row.level == 0 ? '一级' : scope.row.level == 1 ? '二级' : '三级' }}</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref } from 'vue'


interface obj {
    id: number,
    authName: string,
    level: number,
    pid: number,
    path: string
}
export default defineComponent({
    setup() {
        let tableData = ref<obj[]>()
        let tab = ref<string[]>(['', 'success', 'warning'])
        // 请求数据
        let getData = () => {
            api.root.list('list').then((res: any) => {
                if (res.meta.status === 200) {
                    tableData.value = res.data
                }

                // console.log(res);
            })
        }
        onMounted(() => {
            getData()
        })
        return {
            tableData,
            getData,
            tab
        }
    }
})
</script>

<style scoped>
</style>