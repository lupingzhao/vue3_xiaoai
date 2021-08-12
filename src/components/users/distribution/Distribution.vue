<template>
    <div class="card">
        <!-- 分配角色 -->
        <div class="box">
            <el-row>
                <el-col>
                    <el-card shadow="always">
                        <div class="font-s-18 mb-10">分配角色</div>
                        <div class="m-tb-10">当前用户：{{ data.username }}</div>
                        <div class="mb-10">当前角色：{{ data.role_name }}</div>
                        <div>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.roleName"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="t-a-r">
                            <el-button @click="close">取消</el-button>
                            <el-button type="primary" @click="submitForm">确定</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

interface obj {
    children: any
    id: number
    roleDesc: string
    roleName: string
}
export default defineComponent({
    emits: ['update:alot'],
    setup(props, ctx) {
        let data = JSON.parse(localStorage.getItem('edit')!)
        let value = ref<string>('')
        let options = ref<obj[]>([])
        // 获取角色列表
        let getData = () => {
            api.root.roles().then((res: any) => {
                if (res.meta.status === 200) {
                    options.value = res.data
                }
            })
        }

        // 关闭窗口

        let close = () => {
            ctx.emit('update:alot', false)
        }
        // 确定
        let submitForm = () => {
            api.use.allot(data.id, Number(value.value)).then((res: any) => {
                if (res.meta.status === 200) {
                    ElMessage.success(res.meta.msg)

                } else ElMessage.error(res.meta.msg)
                close()


            })

        }


        onMounted(() => {
            getData()
        })
        return {
            close,
            value,
            options,
            submitForm,
            data
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