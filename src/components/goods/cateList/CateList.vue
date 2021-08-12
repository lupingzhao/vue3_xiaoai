<template>
    <div class="about-ctate">
        <el-table :data="list" style="width: 100%;margin-bottom: 20px;" border>
            <el-table-column type="expand" width="30" align="center">
                <template #default="scope">
                    <el-table
                        :data="scope.row.children"
                        style="width: 100%;"
                        border
                        :show-header="false"
                    >
                        <el-table-column width="30" align="center"></el-table-column>
                        <el-table-column type="expand" width="80" align="center">
                            <template #default="scope">
                                <el-table
                                    :data="scope.row.children"
                                    style="width: 100%;"
                                    border
                                    :show-header="false"
                                >
                                    <el-table-column width="30" align="center"></el-table-column>
                                    <el-table-column width="80" align="center"></el-table-column>
                                    <el-table-column prop="cat_name" width="180" align="center "></el-table-column>
                                    <el-table-column prop="cat_deleted" align="center">
                                        <template #default="scope">
                                            <i
                                                class="el-icon-success"
                                                v-if="!scope.row.cat_deleted"
                                                style="color: #409EFF;"
                                            ></i>
                                            <i class="el-icon-success" v-else style="color: red;"></i>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="cat_pid" align="center">
                                        <template #default="scope">
                                            <el-tag
                                                :type="tab[scope.row.cat_level]"
                                            >{{ scope.row.cat_level === 0 ? '一级' : scope.row.cat_level === 1 ? '二级' : '三级' }}</el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center">
                                        <template #default="scope">
                                            <el-button
                                                type="primary"
                                                icon="el-icon-edit"
                                                size="mini"
                                                @click="btn1(scope.row.cat_name, scope.row.cat_id)"
                                            >编辑</el-button>
                                            <el-button
                                                type="danger"
                                                icon="el-icon-delete"
                                                size="mini"
                                                @click="btn(scope.row.cat_id)"
                                            >删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>

                        <el-table-column prop="cat_name" width="180" align="center "></el-table-column>
                        <el-table-column prop="cat_deleted" align="center">
                            <template #default="scope">
                                <i
                                    class="el-icon-success"
                                    v-if="!scope.row.cat_deleted"
                                    style="color: #409EFF;"
                                ></i>
                                <i class="el-icon-success" v-else style="color: red;"></i>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cat_pid" align="center">
                            <template #default="scope">
                                <el-tag
                                    :type="tab[scope.row.cat_level]"
                                >{{ scope.row.cat_level === 0 ? '一级' : scope.row.cat_level === 1 ? '二级' : '三级' }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column align="center">
                            <template #default="scope">
                                <el-button
                                    type="primary"
                                    icon="el-icon-edit"
                                    size="mini"
                                    @click="btn1(scope.row.cat_name, scope.row.cat_id)"
                                >编辑</el-button>
                                <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    size="mini"
                                    @click="btn(scope.row.cat_id)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="80" align="center"></el-table-column>
            <el-table-column prop="cat_name" label="分类名称" width="180" align="center "></el-table-column>
            <el-table-column prop="cat_deleted" label="是否有效" align="center">
                <template #default="scope">
                    <i
                        class="el-icon-success"
                        v-if="!scope.row.cat_deleted"
                        style="color: #409EFF;"
                    ></i>
                    <i class="el-icon-success" v-else style="color: red;"></i>
                </template>
            </el-table-column>
            <el-table-column prop="cat_pid" label="排序" align="center">
                <template #default="scope">
                    <el-tag
                        :type="tab[scope.row.cat_level]"
                    >{{ scope.row.cat_level === 0 ? '一级' : scope.row.cat_level === 1 ? '二级' : '三级' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click="btn1(scope.row.cat_name, scope.row.cat_id)"
                    >编辑</el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="mini"
                        @click="btn(scope.row.cat_id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>

        <!-- 编辑弹框 -->
        <div>
            <el-dialog title="编辑分类" v-model="dialog" width="35%">
                <el-form :model="Form" :rules="rules" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model="Form.name" autocomplete="off" required></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialog1">取 消</el-button>
                        <el-button type="primary" @click="sumbit">确 定</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
interface obj {
    cat_deleted: boolean
    cat_id: number
    cat_level: number
    cat_name: string
    cat_pid: number
    children: obj[]
}
interface obj1 {
    name: string
}
export default defineComponent({
    components: {},
    setup() {
        let pagenum = ref<number>(1)
        let pagesize = ref<number>(10)
        let total = ref<number>(0)
        let dialog = ref<boolean>(false)
        let cid = ref<number>(0)
        let Form = ref<obj1>({
            name: ''
        })
        let rules = ref<any>({
            name: [
                { required: true, message: '分类名字不能为空', trigger: 'blur' },
                { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            ],
        })
        // 分类列表数据
        let tab = ref<string[]>(['', 'success', 'warning'])
        let list = ref<obj[]>([])

        // 
        // 获取数据
        let getData = (num: number, size: number) => {
            api.good.Catelist(3, num, size).then((res: any) => {
                // console.log(res);
                if (res.meta.status === 200) {
                    list.value = res.data.result
                    total.value = res.data.total
                }
            })
        }
        // 编辑
        let btn1 = (val: string, val1: number) => {
            dialog.value = true
            Form.value.name = val
            cid.value = val1
        }
        // 删除
        const btn = (row: number) => {
            ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    api.good.delCate(row).then((res: any) => {
                        if (res.meta.status === 200) {
                            ElMessage.success(res.meta.msg)
                            getData(pagenum.value, pagesize.value,)
                        } else ElMessage.error(res.meta.msg)

                    })
                })
                .catch(() => {
                    ElMessage.info('已取消删除');
                });
        };
        // 关闭编辑
        let dialog1 = () => {
            dialog.value = false
        }
        // 提交编辑
        let sumbit = () => {
            if (Form.value.name) {
                api.good.editCate(cid.value, Form.value.name).then((res: any) => {
                    if (res.meta.status === 200) {
                        ElMessage.success(res.meta.msg)
                        dialog1()
                        getData(pagenum.value, pagesize.value)
                    } else ElMessage.error(res.meta.msg)
                })
            }

        }
        let currentPage = ref<number>(1)

        // 每页显示条数
        let handleSizeChange = (val: any) => {
            pagesize.value = val
            getData(pagenum.value, pagesize.value)
        }
        // 当前页数
        let handleCurrentChange = (val: any) => {
            currentPage.value = val
            pagenum.value = val
            getData(pagenum.value, pagesize.value,)
        }
        onMounted(() => {
            getData(pagenum.value, pagesize.value)
        })


        return {
            btn, btn1, total, getData, list, tab, dialog, Form, rules, dialog1, sumbit, pagesize, handleSizeChange,
            handleCurrentChange,
            currentPage

        }
    }
})
</script>

<style scoped>
</style>