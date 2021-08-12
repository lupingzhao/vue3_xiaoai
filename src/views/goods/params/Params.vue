<template>
    <el-row>
        <el-col>
            <!-- showtag[scope.$index] -->
            <el-card shadow="always">
                <div class="mb-10">
                    <el-alert
                        title="注意:只允许为第三级分类设置相关参数!"
                        type="warning"
                        :closable="false"
                        show-icon
                    ></el-alert>
                </div>
                <div class="flex m-b-10">
                    <div class="font-s-16 mr-5">选择商品分类:</div>
                    <div>
                        <el-cascader
                            v-model="value"
                            :options="getCatelists"
                            :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name' }"
                            style="width: 260px"
                        ></el-cascader>
                    </div>
                </div>

                <div class="m-tb-10">
                    <el-tabs v-model="activeName" @tab-click="tab(activeName)">
                        <el-tab-pane
                            v-for="(item,index) in tabs"
                            :key="index"
                            :label="item.tab"
                            :name="item.name"
                        >
                            <el-button
                                type="primary"
                                :disabled="!value"
                                size="small"
                                @click="addpare"
                            >{{ item.btn }}</el-button>
                            <div>
                                <el-table :data="arrtlists" style="width: 100%">
                                    <el-table-column type="index" label="#" align="center"></el-table-column>
                                    <el-table-column type="expand" align="center">
                                        <template #default="props">
                                            <div class="flex flex-wrap">
                                                <template v-if="props.row.attr_vals">
                                                    <el-tag
                                                        class="mr-5 tags"
                                                        closable
                                                        v-for="(item) in props.row.attr_vals.split(',')"
                                                        :key="item"
                                                        @close="close(item, props.$index, props.row.cat_id, props.row.attr_id, props.row.attr_name, props.row.attr_sel)"
                                                    >{{ item }}</el-tag>
                                                </template>

                                                <el-input
                                                    class="about-ipt"
                                                    style="margin-bottom: 10px;"
                                                    :autofocus="true"
                                                    v-if="showtag[props.$index]"
                                                    v-model="isaddtag[props.$index]"
                                                    @change="change(props.row.cat_id, props.row.attr_id, props.row.attr_name, props.row.attr_sel, props.row.attr_vals, props.$index)"
                                                />
                                                <el-button
                                                    class="button-new-tag"
                                                    style="margin-bottom: 10px;"
                                                    size="small"
                                                    @click="addtag(props.$index)"
                                                    v-else
                                                >+ New Tag</el-button>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="参数名称" align="center" prop="attr_name"></el-table-column>
                                    <el-table-column label="操作" align="center">
                                        <template #default="props">
                                            <el-button
                                                type="primary"
                                                icon="el-icon-edit"
                                                size="mini"
                                                @click="btn1(props.row.cat_id, props.row.attr_id, props.row.attr_name)"
                                            >编辑</el-button>
                                            <el-button
                                                type="danger"
                                                icon="el-icon-delete"
                                                size="mini"
                                                @click="btn(props.row.cat_id)"
                                            >删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
        </el-col>
    </el-row>

    <!-- 编辑弹框 -->
    <div>
        <el-dialog :title="title" v-model="dialog" width="35%">
            <el-form
                ref="from"
                :model="Form"
                :rules="rules"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item :label="label" prop="name">
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
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';

interface obj {
    name: string
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
    components: {},
    setup() {
        let value = ref<number[] | ''>('')
        let getCatelists = ref<obj1[]>([])
        let activeName = ref<string>('many')
        let isaddtag = ref<string[]>([])
        let arrtlists = ref<any>()
        let addboo = ref<boolean>(true)
        let showtag = ref<boolean[]>([])
        let tabs = [{
            tab: '动态参数',
            btn: '添加参数',
            name: 'many'
        }, {
            tab: '静态属性',
            btn: '添加属性',
            name: 'only'
        }]
        let title = ref<string>('添加参数')
        let label = ref<string>('添加参数')
        let from = ref<any>(null)
        let editId = ref<number>(0)
        // 获取分类数据
        let getCatelist = (type?: number, page?: number, pagesize?: number) => {
            api.good.Catelist(type, page, pagesize).then((res: any) => {
                getCatelists.value = res.data
                // console.log(res);
            })
        }
        // 获取参数列表
        let arrtList = (id: number, val: string) => {
            // console.log(id);
            api.good.arrtlist(id, val).then((res: any) => {
                arrtlists.value = res.data
                // console.log(res);
                res.data.map((a: any) => {
                    showtag.value.push(false)
                    isaddtag.value.push('')
                })
            })
        }

        // 标签事件
        let tab = (e: any) => {
            let id = ref<number>(0)
            if (value.value) {
                id.value = value.value[2] as number
                arrtList(id.value, e)
            }
            console.log(23);

        }

        let Form = ref<obj>({
            name: ''
        })
        let rules = ref<any>({
            name: [
                { required: true, message: '属性名不能为空', trigger: 'blur' },
                { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            ],
        })

        let dialog = ref<boolean>(false)
        // 编辑
        let btn1 = (val: number, val1: number, name: string) => {
            Form.value.name = name
            editId.value = val1
            addboo.value = false
            if (activeName.value === 'many') {
                title.value = '编辑动态参数'
                label.value = '动态参数'
            } else {
                title.value = '编辑静态属性'
                label.value = '静态属性'
            }
            dialog.value = true
        }
        // 添加参数
        let addpare = () => {
            Form.value.name = ''
            if (activeName.value === 'many') {
                title.value = '添加动态参数'
                label.value = '动态参数'
            } else {
                title.value = '添加静态属性'
                label.value = '静态属性'
            }
            dialog.value = true
        }


        // 删除
        const btn = (row: number) => {
            ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    // api.good.delCate(row).then((res: any) => {
                    //     if (res.meta.status === 200) {
                    //         ElMessage.success(res.meta.msg)
                    //     } else ElMessage.error(res.meta.msg)

                    // })
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
            from.value.validate((valid: boolean) => {
                if (valid) {
                    // 添加
                    console.log(addboo.value);
                    if (addboo.value) {
                        if (value.value[2]) {
                            api.good.addjt(value.value[2] as number, Form.value.name, activeName.value, '').then((res: any) => {
                                if (res.meta.status === 201) {
                                    ElMessage.success('添加成功')
                                    arrtList(value.value[2] as number, activeName.value)
                                    dialog1()
                                } else ElMessage.error(res.meta.msg)
                            })
                        } else ElMessage.error('当前分类不是第三级')

                    } else {
                        // /编辑
                        if (value.value[2]) {
                            api.good.eidts(value.value[2] as number, editId.value, Form.value.name, activeName.value, '').then((res: any) => {
                                if (res.meta.status === 20) {
                                    ElMessage.success('编辑成功')
                                    arrtList(value.value[2] as number, activeName.value)
                                    dialog1()
                                } else ElMessage.error(res.meta.msg)
                            })
                        } else {
                            ElMessage.error('当前分类不是第三级')
                        }
                    }
                } else {
                    return false;
                }
            })
        }

        // 添加标签
        let addtag = (index: number) => {
            showtag.value[index] = true
        }
        // 输入框 添加标签
        let change = (id: number, attrId: number, attr_name: string, attr_sel: string, attr_vals: string, index: number) => {
            // isaddtag.value
            let vals = ref<string>('')
            if (attr_vals) {
                vals.value = attr_vals + ',' + isaddtag.value[index]
            } else { vals.value = isaddtag.value[index] }
            api.good.updateAttributesById(id, attrId, attr_name, attr_sel, vals.value).then((res: any) => {
                // console.log(res);
                ElMessage.success(res.meta.msg)
                isaddtag.value[index] = ''
                showtag.value[index] = false
                arrtlists.value[index].attr_vals = vals.value
            })

        }
        // 删除标签
        let close = (a: string, b: number, id: number, attrId: number, attr_name: string, attr_sel: string,) => {
            arrtlists.value[b].attr_vals = arrtlists.value[b].attr_vals.split(',').filter((d: any) => {
                return d !== a
            }).join(',')
            api.good.updateAttributesById(id, attrId, attr_name, attr_sel, arrtlists.value[b].attr_vals).then((res: any) => {
                ElMessage.success(res.meta.msg)
            })
        }


        // 监听级联选择器的值
        watch(() => value.value, val => {
            // console.log(val);
            if (val) {
                value.value[2] ? arrtList(value.value[2] as number, activeName.value) : ElMessage.error('当前分类不是第三级')
            }
        })


        onMounted(() => {
            getCatelist(3)
        })
        return {
            title, value, getCatelist, getCatelists, activeName, tab, arrtList, arrtlists, btn, btn1, dialog, Form, rules, dialog1, sumbit, editId, addtag, showtag, isaddtag, change, close,
            addpare, tabs, label, from, addboo
        }
    }
})
</script>

<style scoped lang="scss">
.about-ipt {
    width: 100px;
}
.tags {
    margin-bottom: 10px;
}
</style>