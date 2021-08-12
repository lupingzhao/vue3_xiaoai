<template>
    <div class="card">
        <div class="box">
            <el-row>
                <el-col>
                    <el-card shadow="always">
                        <div class="font-s-18 mb-10">添加用户</div>
                        <div>
                            <el-form
                                :model="ruleForm"
                                status-icon
                                :rules="rules"
                                ref="ruleForm1"
                                label-width="100px"
                                class="demo-ruleForm"
                            >
                                <el-form-item label="用户名" prop="name">
                                    <el-input type="name" v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="password">
                                    <el-input
                                        type="password"
                                        v-model="ruleForm.password"
                                        autocomplete="off"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                    <el-input type="email" v-model="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item label="电话" prop="tel" type="number">
                                    <el-input v-model.number="ruleForm.tel"></el-input>
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
import api from '@/http/api';
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus'

interface obj {
    name: string,
    password: string,
    email: string,
    tel: string,

}
export default defineComponent({
    emits: ['update', 'update:show'],
    setup(props, ctx) {
        // 获取元素
        let ruleForm1 = ref<any>(null)
        // 获取父组件实例


        let ruleForm = ref<obj>({
            name: '',
            password: '',
            email: '',
            tel: '',
        })
        //    自定义校验规则
        let validatetel = (rule: any, value: any, callback: any) => {
            let r: any = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
            if (r.test(value)) {
                callback();
            } else {
                callback('请输入正确电话号码');
            }
        };
        // 验证规则
        let rules = ref<any>({
            name: [
                { required: true, message: '请输入用户名', trigger: ['blur'] },
                { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: ['change', 'blur'] }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: ['change', 'blur'] }
            ],
            email: [
                { required: true, message: '请输入邮箱地址', trigger: ['blur'] },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
            ],
            tel: [
                { required: true, message: '请输入电话号码', trigger: ['change', 'blur'] },
                { validator: validatetel, trigger: ['blur'] },

            ]
        })

        // 关闭窗口
        let close = () => {
            ctx.emit('update:show', false)
        }
        // 验证通过时
        let submitForm = () => {
            ruleForm1.value.validate((valid: boolean) => {
                if (valid) {
                    // 
                    api.use.add(ruleForm.value.name, ruleForm.value.password, ruleForm.value.email, ruleForm.value.tel).then((res: any) => {
                        if (res.meta.status === 201) {
                            ElMessage.success(res.meta.msg);
                            close()
                            ctx.emit('update')
                        } else {
                            ElMessage.warning(res.meta.msg);
                        }
                    })
                } else {
                    return false;
                }
            });
        }

        return {
            open,
            ruleForm,
            rules,
            ruleForm1,
            validatetel,
            submitForm,
            close
        };


    }
})
</script>

<style scoped lang="scss">
.card {
    position: fixed;
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
        width: 50%;
    }
}
</style>