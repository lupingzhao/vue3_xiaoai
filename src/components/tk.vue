<template>
    <div class="card">
        <div class="box">
            <el-card shadow="always">
                <div class="p-10 font-s-18 m-tb-10">编辑商品</div>
                <el-form ref="ruleForm1">
                    <el-form-item label="商品名称">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="t-a-r">
                            <el-button @click="close">取消</el-button>
                            <el-button type="primary" @click="submitForm">确定</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
interface form {
    name: string,
    price: string,
    numbers: string,
    weight: string,

}
export default defineComponent({
    setup() {
        let data = ref<form>()
        let ruleForm1 = ref<any>(null)

        // 验证通过时
        let submitForm = () => {
            ruleForm1.value.validate((valid: boolean) => {
                if (valid) {
                    // // 
                    // api.use.add(ruleForm.value.name, ruleForm.value.password, ruleForm.value.email, ruleForm.value.tel).then((res: any) => {
                    //     if (res.meta.status === 201) {
                    //         ElMessage.success(res.meta.msg);
                    //         close()
                    //         ctx.emit('update')
                    //     } else {
                    //         ElMessage.warning(res.meta.msg);
                    //     }
                    // })
                } else {
                    return false;
                }
            });
        }
        return {
            data,
            ruleForm1,
            submitForm
        }
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