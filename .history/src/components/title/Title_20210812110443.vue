<template>
    <div class="flex-wrap width-100 flex title-box">
        <div
            class="flex pos-rel"
            v-for="(item,index1) in title"
            :key="index1"
            @click="swich(item.path)"
            @contextmenu.prevent="down"
        >
            <div class="title mr-5 shou flex mb-10" :class="{ 'slect': $route.path === item.path }">
                <div class :class="{ 'dot-w': $route.path === item.path }"></div>
                {{ item.name }} &nbsp;
                <span
                    v-if="item.name !== '首页' ? $route.path === item.path : title.length !== 1 ? $route.path === item.path : ''"
                    @click.stop="close(index1)"
                >X</span>
            </div>
            <!-- .meta.index -->
            <div class="menu" ref="box" v-if="$route.path === item.path && show">
                <div class="p-tb-5 shou1" @click="qt(index1)">关闭其他</div>
                <div class="p-tb-5 shou1" @click="left(index1)">关闭左侧</div>
                <div class="p-tb-5 shou1" @click="rigth(index1)">关闭右侧</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import router from '@/router'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { isEqual, uniqWith } from 'lodash'
import { useClickOutside } from '@/hooks/useCliskOutside'
interface titleObj {
    name: string
    path: string
}
export default defineComponent({
    setup() {
        let box = ref<HTMLElement | null>(null)
        let { isClickOutside } = useClickOutside(box)
        let title = ref<titleObj[]>([])
        let selectIndex = ref<string>('')
        let show = ref<boolean>(false)
        let route = useRoute()
        // 切换事件
        let swich = (path: string) => {
            show.value = true
            router.push(path)
            // show.value = false
        }
        // 鼠标右键
        let down = (e: any) => {
            show.value = true
        }
        // 获取标题数据
        let getData = () => {
            title.value = JSON.parse(localStorage.getItem('title')!)
            // 去重 loasdsh
            title.value = uniqWith(title.value, isEqual);
            selectIndex.value = title.value[title.value.length - 1].path

        }
        // 路由改变时重新获取标题的数据
        watch(() => route.path, val => {
            // console.log(val);
            val !== "/Login" ? getData() : ''
        })

        // 关闭标题
        let close = (index: number) => {
            const url = ref<string>('')

            if (title.value.length === 1) {
                // 如果只有一个导航 点击删除 就出现首页
                url.value = '/'
                title.value = [{ name: '首页', path: '/' }]
                localStorage.setItem('title', JSON.stringify(title.value))
            } else {
                // 如果点击的是最后一个导航栏
                if (index === title.value.length - 1) {
                    // 前一个的路径
                    url.value = title.value[index - 1].path

                } else {
                    url.value = title.value[index + 1].path

                }
                title.value.splice(index, 1)
                localStorage.setItem('title', JSON.stringify(title.value))
            }
            router.push(url.value)

        }
        // 关闭其他
        let qt = (index: number) => {
            title.value = title.value.filter((a, b) => {
                return b === index
            })
            localStorage.setItem('title', JSON.stringify(title.value))
        }
        // 关闭左侧
        let left = (index: number) => {
            if (index === 0) {
                ElMessage.error('左侧已经没有了');
            } else {
                title.value = title.value.slice(index)
                localStorage.setItem('title', JSON.stringify(title.value))
            }

        }
        // 关闭右侧侧
        let rigth = (index: number) => {
            if (index === title.value.length - 1) {
                ElMessage.error('右侧已经没有了');
            } else {
                title.value = title.value.slice(0, index + 1)
                localStorage.setItem('title', JSON.stringify(title.value))
            }
        }
        // 点击其他区域关闭右键菜单
        watch(() => show.value, val => {
            isClickOutside.value = val
        })
        watch(() => isClickOutside.value, val => {
            show.value = val
        })

        onMounted(() => {
            getData()
        })
        return {
            title,
            selectIndex,
            swich,
            show,
            down,
            getData,
            close,
            qt,
            left,
            rigth,
            box,
            isClickOutside

        }
    }
})
</script>

<style lang="scss" scoped>
.title-box {
    border-bottom: 1px solid gray;
}
.title {
    padding: 2px 15px;
    font-size: 12px;
    border: 1px solid #5c7182;
}
.dot-w {
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background-color: #fff;
    margin-right: 5px;
}

.slect {
    background-color: #409eff;
    color: #fff;
}
.menu {
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #f5f5f5;
    color: #000;
    right: 0px;
    top: 15px;
    z-index: 1;
}
.shou1 {
    &:hover {
        background-color: #a9c5db;
        cursor: pointer;
    }
}
</style>