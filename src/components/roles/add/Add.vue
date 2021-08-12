<template>
    <div class="card">
        <div class="box">
            <el-row>
                <el-col>
                    <el-card shadow="always">
                        <div class="font-s-18 mb-10">添加角色</div>
                        <div class>
                            <el-form
                                :model="data"
                                status-icon
                                :rules="rules"
                                ref="ruleForm1"
                                label-width="80px"
                                class="demo-ruleForm"
                            >
                                <el-form-item label="角色名" prop="roleName">
                                    <el-input type="name" v-model="data.roleName"></el-input>
                                </el-form-item>
                                <el-form-item label="角色描述" prop="roleDesc">
                                    <el-input type="name" v-model="data.roleDesc"></el-input>
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
}
export default defineComponent({
    emits: ['update:addshow', 'getData'],
    setup(props, ctx) {
        let ruleForm1 = ref<any>(null)
        let data = ref<boj>({
            roleName: '',
            roleDesc: '',
        })
        // 验证规则
        let rules = ref<any>({
            roleName: [
                { required: true, message: '角色名不能为空', trigger: ['blur'] },
                { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: ['blur'] }
            ]

        })
        // 关闭窗口
        let close = () => {
            ctx.emit('update:addshow', false)
        }
        // 提交
        let submitForm = () => {
            ruleForm1.value.validate((valid: boolean) => {
                if (valid) {
                    api.root.add(data.value.roleName, data.value.roleDesc).then((res: any) => {
                        ElMessage(res.meta.msg)
                    })
                    ctx.emit('getData')
                    close()
                }
            })
        }
        return {
            ruleForm1,
            close,
            rules,
            data,
            submitForm

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