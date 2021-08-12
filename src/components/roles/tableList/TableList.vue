<template>
    <el-row>
        <el-col>
            <el-card shadow="always">
                <div class="mb-10">
                    <el-button type="primary" size="small" @click="adduser">添加角色</el-button>
                </div>
                <el-table :data="list" style="width: 100%" border stripe>
                    <el-table-column type="expand">
                        <template #default="props">
                            <Expand
                                v-if="props.row.children"
                                :data="props.row.children"
                                :ids="props.row.id"
                                @getData="getData"
                            ></Expand>
                        </template>
                    </el-table-column>
                    <el-table-column label="#" type="index" align="center"></el-table-column>
                    <el-table-column label="职位" prop="roleName" align="center"></el-table-column>
                    <el-table-column label="描述" prop="roleDesc" align="center"></el-table-column>

                    <el-table-column label="操作" align="center" width="250">
                        <template #default="scope">
                            <el-button
                                v-for="(item,index1) in btn"
                                :key="index1"
                                :type="item.type"
                                class="shou"
                                size="mini"
                                @click="btnFn(index1, scope.row)"
                            >{{ item.content }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>

    <div v-if="show">
        <Eidt v-model:show="show" :editdata="editdata" @getData="getData"></Eidt>
    </div>
    <!-- 添加 -->
    <Add v-if="addshow" v-model:addshow="addshow" @getData="getData"></Add>
    <!-- 分配权限 -->
    <RootTree v-if="tree" v-model:tree="tree" :id="id" :idarr="idarr" @update="update"></RootTree>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Eidt from '@/components/roles/edits/Edits.vue'
import Add from '@/components/roles/add/Add.vue'
import Expand from '@/components/roles/expand/Expand.vue'
import RootTree from '@/components/roles/rootTree/RootTree.vue'
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import api from '@/http/api'

interface btn {
    content: string,
    type: string,
    icon: string
}
interface obj {
    children: chid[] | '',
    roleDesc: string,
    roleName: string,
    id: number
}
interface edits {
    roleDesc: string,
    roleName: string,
    id: number
}
interface chid {
    authName: string,
    children: chid[],
    id: number
    path: string
}
export default defineComponent({
    components: {
        Eidt,
        Add,
        Expand,
        RootTree
    },
    setup(props, ctx) {
        let list = ref<obj[]>(
            [{
                children: [],
                roleDesc: '',
                roleName: '',
                id: 0
            }]
        )
        let show = ref<boolean>(false)
        let addshow = ref<boolean>(false)
        let tree = ref<boolean>(false)
        let id = ref<number>()
        let idarr = ref<number[]>([])
        let btn = ref<btn[]>([
            {
                content: '编辑',
                type: 'primary',
                icon: 'el-icon-edit'
            },
            {
                content: '删除',
                type: 'danger',
                icon: 'el-icon-delete'
            },
            {
                content: '分配权限',
                type: 'warning',
                icon: 'el-icon-setting'
            }
        ])
        let rowdata = ref<any>()

        let editdata = ref<edits>({
            roleDesc: '',
            roleName: '',
            id: 0
        })

        // 获取数据
        let getData = () => {
            api.root.roles().then((res: any) => {
                if (res.meta.status === 200) {
                    list.value = res.data
                }
                // console.log(res);
            })
        }
        // 按钮事件
        let btnFn = (val: number, row: any) => {
            // 编辑事件
            if (val === 0) {
                show.value = true
                ctx.emit('update:edits', true)
                const betw = {
                    roleDesc: row.roleDesc,
                    id: row.id,
                    roleName: row.roleName
                }
                localStorage.setItem('editR', JSON.stringify(betw))
            } else if (val === 1) {
                // 删除
                open(Number(row.id))
            } else {
                // 分配权限
                tree.value = true
                id.value = row.id
                idarr.value = []
                // console.log(row);
                // 默认选中的id
                row.children.map((a: any) => {
                    a.children.map((c: any) => {
                        c.children.map((d: any) => {
                            idarr.value.push(d.id)
                        })
                    })
                })
                // console.log(idarr.value);
                // console.log(idarr.value);
            }

        }

        // 分配权限后跟新数据、
        let update = () => {
            getData()
        }


        // 删除
        let open = (id: number) => {
            ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    api.root.delete(id).then((res: any) => {
                        if (res.meta.status === 200) {
                            ElMessage({
                                type: 'success',
                                message: '删除成功!',
                            });
                            getData()
                        } else return

                    })

                })
                .catch(() => {
                    return
                });
        };
        // 添加用户角色
        let adduser = () => {
            addshow.value = true
        }

        // 操作之后跟新数据
        let updatedata = () => {
            getData()
        }
        onMounted(() => {
            getData()
        })
        return {
            btnFn, update,
            list,
            btn,
            show,
            rowdata,
            getData,
            editdata,
            open,
            adduser,
            addshow,
            tree,
            updatedata,
            id,
            idarr

        }
    }
})
</script>

<style scoped>
</style>