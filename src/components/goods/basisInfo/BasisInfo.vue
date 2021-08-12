<template>
    <div class="info">
        <el-form :model="form" label-width="80px" :rules="rules">
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input type="number" v-model="form.price" :disabled="dis[0]"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="weight">
                <el-input type="number" v-model="form.weight" :disabled="dis[1]"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="numbers">
                <el-input type="number" v-model="form.numbers" :disabled="dis[2]"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-cascader
                    v-model="form.cascader"
                    :options="getCatelists1"
                    :disabled="dis[3]"
                    clearable
                    :props="{ expandTrigger: 'hover', value: 'cat_id', label: 'cat_name' }"
                    style="width: 260px"
                ></el-cascader>
            </el-form-item>
        </el-form>
        <div>
            <!-- v-if="form.name && form.price && form.weight && form.numbers && form.cascader" -->
            <el-button type="success" class="btn" v-if="sumbit" @click="sub">下一步</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref, watch } from 'vue'
interface form {
    name: string,
    price: string,
    numbers: string,
    weight: string,
    cascader: string,
    catid: number
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
    emits: ['update:active', 'order'],
    setup(props, ctx) {
        let getCatelists = ref<obj1[]>([])
        let getCatelists1 = ref<obj1[]>([])
        let form = ref<form>({
            // 以为','分割的分类列表
            name: '',
            price: '',
            weight: '',
            numbers: '',
            cascader: '',
            catid: 0
        })
        let sumbit = ref<boolean>(false)
        let dis = ref<boolean[]>([true, true, true, true])
        // 获取分类数据
        let getCatelist = (type?: number) => {
            api.good.Catelist(type).then((res: any) => {
                getCatelists1.value = res.data
                // console.log(res);

            })
        }

        // 验证规则
        let rules = ref<any>({
            name: [
                { required: true, message: '商品名字不能为空', trigger: 'blur' },
            ],
            price: [
                { required: true, message: '商品价格不能为空', trigger: 'blur' },
            ],
            numbers: [
                { required: true, message: '商品数量不能为空', trigger: 'blur' },
            ],
            weight: [
                { required: true, message: '商品重量不能为空', trigger: 'blur' },
            ],
        })

        // 下一步
        let sub = () => {
            ctx.emit('update:active', 1)
            // 可以用数量++来判断 不一定是数组  ++简单点
            ctx.emit('order', 1)
            // 获取参数的id 只有第三级才有参数
            localStorage.setItem('attrid', form.value.cascader[2])
            // 本地储存
            localStorage.setItem('basisinfo', JSON.stringify(form.value))
        }


        // 监听表单的每一项 可以同时监听多个数据  写出数组形式
        watch(() => form.value, val => {
            if (val.name) {
                dis.value[0] = false
                if (val.price) {
                    dis.value[1] = false
                    if (val.weight) {
                        dis.value[2] = false
                        if (val.numbers) {
                            dis.value[3] = false
                        } else dis.value[3] = true
                    } else dis.value = [false, false, true, true]
                } else dis.value = [false, true, true, true]
            } else dis.value = [true, true, true, true]
            // 表单的每一项都有值的时候才出现按钮
            sumbit.value = Object.values(form.value).every((a: any) => {
                return a !== '' && a !== null
            })
        }, { deep: true, immediate: true })

        onMounted(() => {
            getCatelist(3)
        })
        return {
            form, getCatelist, getCatelists, getCatelists1,
            rules,
            dis,
            sub,
            sumbit
        }

    }
})
</script>

<style scoped lang="scss">
.info {
    margin-top: 10px;
    margin-left: 20px;
    .btn {
        margin-left: 10%;
    }
}
</style>