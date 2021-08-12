<template>
    <el-row>
        <el-col>
            <el-card shadow="always" v-loading="loading">
                <div>
                    <el-table :data="list" border style="width: 100%" align="center" :fit="true">
                        <el-table-column label="#" type="index" align="center"></el-table-column>
                        <el-table-column label="姓名" prop="username" align="center"></el-table-column>
                        <el-table-column label="角色" align="center" prop="role_name"></el-table-column>
                        <el-table-column label="电话" align="center" prop="mobile"></el-table-column>
                        <el-table-column label="邮箱" align="center" prop="email"></el-table-column>
                        <el-table-column label="状态" align="center" prop="mg_state">
                            <template #default="scope">
                                <el-switch
                                    v-model="scope.row.mg_state"
                                    @change="state(scope.row.id, scope.row.mg_state)"
                                />
                            </template>
                        </el-table-column>

                        <el-table-column label="操作" align="center" width="170">
                            <template #default="scope">
                                <el-tooltip
                                    v-for="(item,index1) in btn"
                                    :key="index1"
                                    class="item"
                                    effect="dark"
                                    :content="item.content"
                                    placement="top-start"
                                >
                                    <el-button
                                        :type="item.type"
                                        class="shou"
                                        :icon="item.icon"
                                        circle
                                        @click="btnFn(index1, scope.row)"
                                    />
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="m-t-10">
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
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import api from '@/http/api'
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
interface obj {
    create_time: number
    email: string
    id: number
    mg_state: boolean
    mobile: string
    role_name: string
    username: string

}
interface btn {
    content: string,
    type: string,
    icon: string
}
export default defineComponent({

    emits: ['update:edits', 'update:alot'],
    setup(props, ctx) {
        let list = ref<obj[]>([])
        let list1 = ref<obj[]>([])
        let total = ref<number>(0)
        let loading = ref<boolean>(true)
        let seachval = ref<string>('')
        let pagenum = ref<number>(1)
        let pagesize = ref<number>(10)
        let btn = ref<btn[]>([
            {
                content: '编辑角色',
                type: 'primary',
                icon: 'el-icon-edit'
            },
            {
                content: '删除角色',
                type: 'danger',
                icon: 'el-icon-delete'
            },
            {
                content: '分配角色',
                type: 'warning',
                icon: 'el-icon-setting'
            }
        ])

        // 请求数据
        let getData = (num: number, size: number, val?: string) => {
            api.use.userslist(num, size, val).then((res: any) => {
                // console.log(res);
                loading.value = false
                if (res.meta.status === 200) {
                    list.value = res.data.users
                    list1.value = res.data.users
                    total.value = res.data.total
                }
            })
        }

        // 按钮事件
        let btnFn = (val: number, row: any) => {
            localStorage.setItem('edit', JSON.stringify(row))
            // 编辑事件
            if (val === 0) {
                // 本地储存编辑信息
                ctx.emit('update:edits', true)
            } else if (val === 1) {
                // 删除
                // console.log(row.id);
                open(row.id)
            } else {
                // 分配角色
                ctx.emit('update:alot', true)
                // console.log(3434);
            }
        }
        // 删除操作
        let open = (id: number) => {
            ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    api.use.del(id).then((res: any) => {
                        if (res.meta.status === 200) {
                            getData(pagenum.value, pagesize.value)
                            ElMessage({
                                type: 'success',
                                message: '删除成功!',
                            });
                        } else return

                    })

                })
                .catch(() => {
                    return
                });
        };
        // seach
        let seach1 = (val: string) => {
            seachval.value = val
            getData(pagenum.value, pagesize.value, val)
        }
        // 修改状态
        let state = (id: number, state: boolean) => {
            api.use.state(id, state).then((res: any) => {
                ElMessage(res.meta.msg)
            })
        }
        let currentPage = ref<number>(1)

        // 每页显示条数
        let handleSizeChange = (val: any) => {
            pagesize.value = val
            getData(pagenum.value, pagesize.value, seachval.value)

        }
        // 当前页数
        let handleCurrentChange = (val: any) => {
            currentPage.value = val
            pagenum.value = val
            getData(pagenum.value, pagesize.value, seachval.value)
        }


        // 页面加载
        onMounted(() => {
            getData(pagenum.value, pagesize.value)
        })
        return {
            getData,
            list,
            list1,
            total,
            seach1,
            btn,
            btnFn,
            open,
            state,
            pagesize, seachval, handleSizeChange, handleCurrentChange, currentPage, loading

        }
    }
})
</script>

<style scoped>
</style>