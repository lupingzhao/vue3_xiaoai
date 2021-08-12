<template>
    <div class="card" @click="close">
        <!-- 分配角色 -->
        <div class="box" @click.stop>
            <el-row>
                <el-col>
                    <el-card shadow="always">
                        <div class="flex jcsb">
                            <div class="font-s-16">编辑地址</div>
                            <div class="p-10 del" @click="close">X</div>
                        </div>
                        <!-- 选择 -->
                        <div class="about-add-cascader">
                            <el-cascader
                                class="cascader"
                                :options="data"
                                clearable
                                v-model="cascader"
                                @change="blur"
                            ></el-cascader>
                        </div>

                        <div class="t-a-r">
                            <el-button @click="close" size="mini">取消</el-button>
                            <el-button type="primary" size="mini">确定</el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import province from "@/lib/ssq"

interface obj {
    value: string
    label: string,
    children?: any
}
export default defineComponent({
    emits: ['update:address'],
    setup(props, ctx) {
        // 最后的选择
        let cascader = ref<any>('')
        let data = ref<obj[]>([])

        // data.value = province.province.data
        province.province.data.map((a: any, i1: number) => {
            data.value.push({
                value: '',
                label: '',
                children: []
            })
            data.value[i1].value = a.name
            data.value[i1].label = a.name
            a.city.map((c: any, i2: number) => {
                data.value[i1].children.push({
                    value: '',
                    label: '',
                    children: []
                })
                data.value[i1].children[i2].value = c.name
                data.value[i1].children[i2].label = c.name
                c.city.map((e: string, i3: number) => {
                    data.value[i1].children[i2].children.push({
                        value: '',
                        label: '',
                        children: undefined
                    })
                    data.value[i1].children[i2].children[i3].value = e
                    data.value[i1].children[i2].children[i3].label = e
                })
            })

        })
        // 关闭
        let close = () => {
            ctx.emit('update:address', false)
        }
        let blur = () => {
            console.log(cascader.value);
            console.log(467758);

        }

        return {
            close,
            cascader,
            blur,
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
        width: 40%;
    }
    .del {
        margin: 0 0 20px 0;
        font-size: 12px;
    }
    .about-add-cascader {
        margin: 10px 0;
        margin-bottom: 20px;
    }
}
</style>