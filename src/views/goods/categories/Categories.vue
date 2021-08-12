<template>
    <el-row>
        <el-col>
            <el-card shadow="always">
                <div class="mb-10">
                    <el-button type="primary" @click="add">添加分类</el-button>
                </div>
                <div class="m-tb-10">
                    <!-- 列表 -->
                    <cate-list></cate-list>
                </div>
            </el-card>

            <!-- 弹框 -->
            <div>
                <el-dialog title="添加分类" v-model="showAdd" width="35%">
                    <el-form :model="form" :rules="rules" ref="fromdata">
                        <el-form-item label="分类名字" label-width="100px" prop="name">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="父级分类" label-width="100px">
                            <el-cascader
                                v-model="form.value"
                                :options="getCatelists"
                                :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name', checkStrictly: true }"
                                :disabled="!form.name"
                                style="width: 100%;"
                            ></el-cascader>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="close">取 消</el-button>
                            <el-button type="primary" @click="submit">确 定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">

import CateList from '@/components/goods/cateList/CateList.vue'
import api from '@/http/api'
import { ElMessage } from 'element-plus'
import { defineComponent, ref } from 'vue'

interface obj {
    name: string,
    value: string
}

interface obj1 {
    cat_deleted: boolean
    cat_id: number
    cat_level: number
    cat_name: string
    cat_pid: number
    children?: obj1[]
}
export default defineComponent({
    components: { CateList },
    setup() {
        let showAdd = ref<boolean>(false)
        let list = ref<any>()
        let fromdata = ref<any>(null)
        let form = ref<obj>({
            name: '',
            value: ''
        })
        // 添加分类的分类数据
        let getCatelists = ref<obj1[]>([])
        // 规则
        let rules = ref<any>({
            name: [
                { required: true, message: '分类名字不能为空', trigger: 'blur' },
                { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            ]
        })


        // 添加分类
        let add = () => {
            showAdd.value = true
            getCatelist(2)
        }
        // 关闭添加
        let close = () => {
            showAdd.value = false
            form.value = {
                name: '',
                value: ''
            }
        }
        // 确定添加
        let submit = () => {
            fromdata.value.validate((vaild: boolean) => {
                if (vaild) {
                    let pid = ref<number>(0)
                    let level = ref<number>(0)
                    // 创非一级
                    if (form.value.value) {
                        pid.value = form.value.value[form.value.value.length - 1] as any
                        level.value = form.value.value.length
                    }
                    api.good.addCate(pid.value, form.value.name, level.value).then((res: any) => {
                        if (res.meta.status === 201) {
                            ElMessage.success(res.meta.msg)
                            close()
                        } else ElMessage.error(res.meta.msg)
                        // console.log(res);
                    })
                }
            })
            // console.log(form.value);
        }
        // 获取分类数据
        let getCatelist = (type?: number, page?: number, pagesize?: number) => {
            api.good.Catelist(type, page, pagesize).then((res: any) => {
                getCatelists.value = res.data
                console.log(res);
            })
        }



        return {
            list,
            showAdd,
            add,
            close,
            form,
            rules,
            getCatelist,
            fromdata,
            getCatelists,
            submit

        }
    }
})
</script>

<style scoped>
</style>