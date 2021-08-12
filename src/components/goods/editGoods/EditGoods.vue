<template>
    <div class="card" @click="close">
        <div class="box" @click.stop>
            <el-card shadow="always">
                <div class="p-tb-10 font-s-18 m-tb-10">编辑商品</div>
                <el-form
                    status-icon
                    :model="data"
                    ref="ruleForm1"
                    label-width="120px"
                    :rules="rules"
                >
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="data.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格(元)" prop="price">
                        <el-input type="number" v-model="data.price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" type="number" prop="numbers">
                        <el-input type="number" v-model.number="data.numbers"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="weight">
                        <el-input type="number" v-model.number="data.weight"></el-input>
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
    emits: ['update:edit'],
    setup(props, ctx) {
        let data = ref<form>({
            name: '',
            price: '',
            numbers: '',
            weight: '',
        })
        data.value = JSON.parse(localStorage.getItem('editG')!)
        let ruleForm1 = ref<any>(null)

        let rules = ref<any>({
            name: [
                { required: true, message: '商品名称不能为空', trigger: 'blur' },
            ],
            price: [
                { required: true, message: '价格不能为空', trigger: ['blur'] },
            ],
            numbers: [
                { required: true, message: '商品数量不能为空', trigger: ['blur'] },
            ],
            weight: [
                { required: true, message: '商品重量不能为空', trigger: ['blur'] },
            ],
        })

        // 关闭
        let close = () => {
            ctx.emit('update:edit', false)
        }
        // 验证通过时
        let submitForm = () => {
            ruleForm1.value.validate((valid: boolean) => {
                if (valid) {
                    ElMessage.success('编辑成功');
                } else {
                    return false;
                }
                close()
            });
        }


        return {
            ruleForm1,
            submitForm,
            rules,
            close,
            data
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