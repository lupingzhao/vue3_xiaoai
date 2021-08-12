<template>
    <div>
        <el-upload
            class="upload-demo"
            drag
            action="/api/upload"
            multiple
            :headers="headers"
            :on-success="onSuccess"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
        </el-upload>
        <div class="m-tb-10">
            <el-button type="success" class="btn" @click="sub">下一步</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    emits: ['update:active', 'order'],
    setup(props, ctx) {
        // 设置token
        let headers = {
            Authorization: localStorage.getItem('token')
        }
        // 上传图片 请求成功返回的数据
        let onSuccess = (res: any) => {
            if (res.meta.status === 200) {
                localStorage.setItem('imgdata', JSON.stringify(res.data))
            }
        }
        // 下一步
        let sub = () => {
            ctx.emit('update:active', 4)
            ctx.emit('order', 4)
        }

        return {
            sub,
            onSuccess,
            headers
        }
    }
})
</script>

<style scoped>
</style>