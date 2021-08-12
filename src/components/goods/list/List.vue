<template>
    <el-row class="width-100">
        <el-col>
            <el-card shadow="always">
                <el-table :data="tableData" style="width: 100%" border stripe>
                    <el-table-column label="#" type="index" align="center"></el-table-column>
                    <el-table-column label="商品名称" prop="goods_name" align="center"></el-table-column>
                    <el-table-column label="商品价格(元)" prop="goods_price" align="center" width="100"></el-table-column>
                    <el-table-column label="商品重量" prop="goods_weight" align="center" width="100"></el-table-column>
                    <el-table-column label="创建时间" prop="add_time" align="center" width="100"></el-table-column>
                    <el-table-column label="操作" align="center" width="150">
                        <template #default="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="btnFn(1, scope.row)"
                            ></el-button>
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="btnFn(2, scope.row)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="m-tb-10">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </el-card>
        </el-col>
    </el-row>

    <!-- 操作 -->
    <div>
        <EditGoods v-if="edit" v-model:edit="edit"></EditGoods>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import EditGoods from '../editGoods/EditGoods.vue'
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
interface btn {
    content: string,
    type: string,
    icon: string
}
interface obj {
    add_time: number
    goods_id: number
    goods_name: string
    goods_number: number
    goods_price: number
    goods_state: number
    goods_weight: number
    hot_mumber: number
    is_promote: boolean
    upd_time: number
}
interface form {
    name: string,
    price: string,
    numbers: string,
    weight: string,

}
export default defineComponent({
    components: { EditGoods },
    setup(prpos, ctx) {
        let tableData = ref<obj[] | any>([])
        let total = ref<number>(0)
        let pagenum = ref<number>(1)
        let pagesize = ref<number>(20)
        let data1 = ref<form>()
        let edit = ref<boolean>(false)
        let seachvalue = ref<string>('')
        // 商品数据、
        let getData = (num: number, size: number, val?: string) => {
            // goods
            api.good.list(num, size, val).then((res: any) => {
                if (res.meta.status === 200) {
                    tableData.value = res.data.goods
                    tableData.value.map((a: any) => {
                        a.add_time = dayjs(a.add_time).format('YYYY-MM-DD')
                    })
                    total.value = res.data.total
                }
            })
        }
        // 按钮事件
        // 按钮事件
        let btnFn = (val: number, row: any) => {
            localStorage.setItem('edit', JSON.stringify(row))
            // 编辑事件
            if (val === 1) {
                edit.value = true
                data1.value = {
                    name: row.goods_name,
                    price: row.goods_price,
                    numbers: row.goods_number,
                    weight: row.goods_weight
                }
                // 本地粗存
                localStorage.setItem('editG', JSON.stringify(data1.value))
            } else if (val === 2) {
                open(row.goods_id)
            }
        }
        // 搜索事件
        let search = (val: string) => {
            // 名字或者价格包含
            console.log(val)
            seachvalue.value = val
            getData(pagenum.value, pagesize.value, val)
        }
        // 删除
        const open = (id: number) => {
            ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    api.good.delete(id).then((res: any) => {
                        if (res.meta.status === 200) {
                            ElMessage.success(res.meta.msg);
                            getData(pagenum.value, pagesize.value, seachvalue.value)
                        } else ElMessage.info(res.meta.msg);
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        };

        let currentPage = ref<number>(1)

        // 每页显示条数
        let handleSizeChange = (val: any) => {
            pagesize.value = val
            getData(pagenum.value, pagesize.value, seachvalue.value)
        }
        // 当前页数
        let handleCurrentChange = (val: any) => {
            currentPage.value = val
            pagenum.value = val
            getData(pagenum.value, pagesize.value, seachvalue.value)
        }


        onMounted(() => {
            getData(pagenum.value, pagesize.value)
        })
        return {
            tableData, handleSizeChange, handleCurrentChange, currentPage, pagenum, pagesize, seachvalue,
            btnFn,
            getData,
            total,
            search,
            edit,
            data1,
            open
        }
    }
})
</script>

<style scoped>
</style>