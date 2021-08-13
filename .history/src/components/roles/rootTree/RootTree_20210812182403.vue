<template>
    <div class="tree" @click="close">
        <div class="content" @click.stop>
            <div class="m-tb-10 hesd">分配权限</div>
            <div>
                <el-tree
                    :data="data"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :props="defaultProps"
                    :default-checked-keys="idarr"
                    ref="tree"
                ></el-tree>
                <div class="btn">
                    <el-button @click="close">取消</el-button>
                    <el-button type="primary" @click="getCheckedKeys">确定</el-button>
                </div>

                <div class="empt"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, ref } from 'vue'
interface obj {
    children: obj[]
    id: number
    path: string
    pid: number
    authName: string
}
export default defineComponent({
    props: {
        id: {
            type: Number,
            require: true
        },
        // 默认中
        idarr: {
            type: Array,
            reqiured: true
        }
    },
    emit: ['update:tree', 'update'],
    setup(props, ctx) {
        let show = ref<boolean>(true)
        let data = ref<obj[]>()

        // 展示的标签
        let defaultProps = {
            children: 'children',
            label: 'authName'
        }
        // 获取数据、
        let getData = () => {
            api.root.list('tree').then((res: any) => {
                if (res.meta.status === 200) {
                    data.value = res.data
                }
            })
        }

        // 获取元素
        let tree = ref<any>(null)


        let close = () => {
            ctx.emit('update:tree', false)
        }
        // 点击确认时 返回被选中的节点数组
        let getCheckedKeys = () => {
            // let arr = tree.value.getCheckedNodes(true, false)
            let arr1 = tree.value.getHalfCheckedKeys()
            let arr2 = tree.value.getCheckedKeys()
            let arr3 = arr2.concat(arr1).join(',')
            api.root.deitRoot(props.id as number, arr3).then((res: any) => {
                if (res.meta.status === 200) {
                    ElMessage.success(res.meta.msg)
                    ctx.emit('update')
                } else ElMessage.error(res.meta.msg)
            })
            close()
        }


        onMounted(() => {
            getData()
        })

        return {
            show,
            data,
            defaultProps,
            tree,
            getCheckedKeys,
            getData,
            close,


        }
    }
})
</script>

<style scoped lang="scss">
.tree {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 44;
    height: 100vh;
    display: flex;
    justify-content: center;
    overflow: scroll;

    .hesd {
        font-size: 22px;
        padding: 10px;
    }
    .content {
        background-color: #fff;
        margin-top: 5%;
        width: 50%;

        .empt {
            height: 50px;
        }
        .btn {
            text-align: right;
            padding: 20px 15px 15px;
            background-color: #fff;
        }
    }
}
</style>