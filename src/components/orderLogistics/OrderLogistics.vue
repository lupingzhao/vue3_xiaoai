<template>
    <div class="card" @click="close">
        <!-- 物流 -->
        <div class="box" @click.stop>
            <el-row>
                <el-col>
                    <el-card shadow="always">
                        <div class="flex jcsb">
                            <div></div>
                            <div class="font-s-16">物流信息</div>
                            <div class="p-10 del shou" @click="close">X</div>
                        </div>
                        <!-- 选择 -->

                        <div class="logis context" style="height: 500px;">
                            <!-- <template v-for="(item,index) in data" :key="index"> -->
                            <el-steps direction="vertical" :active="0" class="about-oder">
                                <el-step v-for="(item,index) in data" :key="index">
                                    <template #description>
                                        <div class="p-10 context">{{ item.context }}</div>
                                        <div class="context">{{ item.ftime }}</div>
                                    </template>
                                </el-step>
                            </el-steps>
                            <!-- </template> -->
                        </div>

                        <div class="t-a-r">
                            <el-button @click="close" size="mini">取消</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted, ref } from 'vue'

interface obj {
    context: string
    ftime: string
    location: null
    time: string
}
export default defineComponent({
    emits: ['update:logistics'],
    setup(props, ctx) {

        let data = ref<obj[]>([])
        let getOrders = () => {
            let token = localStorage.getItem('token')
            axios.get('https://www.liulongbin.top:8888/api/private/v1/kuaidi/1106975712662', {
                headers: {
                    Authorization: token
                }
            }).then((res: any) => {
                if (res.data.meta.status === 200) {
                    data.value = res.data.data
                    console.log(data.value);
                }

            }).catch(err => {
                console.log(err);
            })

        }

        // 关闭
        let close = () => {
            ctx.emit('update:logistics', false)
        }

        onMounted(() => {
            getOrders()

        })
        return {
            close,
            getOrders,
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
    .logis {
        overflow-y: scroll;
        margin: 10px;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .context {
        color: black;
    }
}
</style>