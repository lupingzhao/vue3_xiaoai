<template>
    <div class="div-center login">
        <el-card class="box-card">
            <template #header>
                <div class="font-s-18 font-w-7 t-a-c">欢迎来到小爱后台管理系统</div>
            </template>
            <div>
                <el-form
                    :model="formLabelAlign"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="110px"
                    label-position="left"
                >
                    <el-form-item label="请输入用户名" prop="username">
                        <el-input v-model="formLabelAlign.username"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入密码 " prop="userpassword">
                        <el-input
                            type="password"
                            autocomplete="off"
                            v-model="formLabelAlign.userpassword"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="font-s-14 m-tb-10">特别提醒：如果您是管理员,请使用管理员账号登录，如果不知道账号,请联系公司人事。</div>
            <div class="flex jcc">
                <el-button type="primary" :round="true" @click="submitForm">立即登陆</el-button>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/http/api'
import { ElMessage } from 'element-plus'
import router from '@/router'
// 复杂数据类型接口 定义数据类型
interface formLabelAlign {
    username: string,
    userpassword: string

}
interface titleObj {
    name: string
    path: string
}
export default defineComponent({
    components: {

    },
    setup() {
        // 定义变量
        let formLabelAlign = ref<formLabelAlign>({
            username: '',
            userpassword: ''

        })
        let titleObj = ref<titleObj[]>([])


        // 定义ruleForm
        let ruleForm = ref<any>(null)

        // 验证规则

        let rules = ref<any>({
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
            ],
            userpassword: [
                { required: true, message: '请输入密码', trigger: ['change', 'blur'] }
            ],

        })

        // 定义函数
        let submitForm = () => {
            ruleForm.value!.validate((valid: boolean) => {
                titleObj.value = [{ name: "首页", path: '/' }]
                if (valid) {
                    api.login({
                        username: formLabelAlign.value.username,
                        password: formLabelAlign.value.userpassword
                    })
                        .then((res: any) => {
                            if (res.meta.status === 200) {
                                ElMessage.success(res.meta.msg);
                                localStorage.setItem('user', JSON.stringify(res.data))
                                localStorage.setItem('token', res.data.token)
                                titleObj.value = [{ name: "首页", path: '/' }]
                                localStorage.setItem('title', JSON.stringify(titleObj.value))
                                router.push("/")

                            } else ElMessage.error(res.meta.msg);

                        }).catch((err: any) => {
                            console.log(err);
                        })
                    // console.log(valid);
                } else {
                    // console.log('error submit!!');
                    // return false;
                }
            })
        }



        onMounted(() => {
            // num.value = route.query.num as string
        })

        // 导出变量
        return {
            formLabelAlign,
            rules,
            // submitForm,
            ruleForm,
            submitForm,
            titleObj
        }
    }
})
</script>

<style lang="scss" scoped>
.login {
    .login-box {
        width: 1000px;
    }
    .box-card {
        width: 600px;
    }
}
</style>