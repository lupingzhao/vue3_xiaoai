<template>
    <div class="card">
        <div class="box">
            <el-row>
                <el-col>
                    <el-card shadow="always">
                        <div class="font-s-18 mb-10">编辑角色</div>
                        <div class>
                            <el-form
                                :model="editdata"
                                status-icon
                                :rules="rules"
                                ref="ruleForm1"
                                label-width="80px"
                                class="demo-ruleForm"
                            >
                                <el-form-item label="用户名" prop="roleName">
                                    <el-input v-model="editdata.roleName"></el-input>
                                </el-form-item>
                                <el-form-item label="描述" prop="roleDesc">
                                    <el-input v-model="editdata.roleDesc"></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <div class="t-a-r">
                                        <el-button @click="close">取消</el-button>
                                        <el-button type="primary" @click="submitForm">确定</el-button>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus';
interface boj {
    roleName: string,
    roleDesc: string,
    id: number
}
export default defineComponent({
    emits: ['getData', 'update:show'],
    setup(props, ctx) {
        let ruleForm1 = ref<any>(null)
        let editdata = ref<boj>({
            roleName: '',
            roleDesc: '',
            id: 0
        })
        editdata.value = JSON.parse(localStorage.getItem('editR')!)
        // 验证规则
        let rules = ref<any>({
            roleName: [
                { required: true, message: '角色名不能为空', trigger: ['blur'] },
                { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: ['blur'] }
            ]

        })

        // 关闭窗口
        let close = () => {
            ctx.emit('update:show', false)
        }
        // 提交
        let submitForm = () => {
            ruleForm1.value.validate((valid: boolean) => {
                api.root.edit(editdata.value.id, editdata.value.roleName, editdata.value.roleDesc).then((res: any) => {
                    if (res.meta.status === 200) {
                        // 调父组件的方法
                        ctx.emit('getData')
                        ElMessage.success('编辑成功')
                        close()
                    }
                })
            })
        }

        return {
            close,
            rules,
            ruleForm1,
            submitForm,
            editdata
        }
    }
})
</script>

<style scoped lang="scss">
.card {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
        width: 30%;
    }
}
</style>