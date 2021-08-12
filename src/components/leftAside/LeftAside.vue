<template>
    <el-col class="height-100">
        <el-menu
            :uniqueOpened="true"
            :router="true"
            :default-active="$route.meta.index"
            class="el-menu-vertical-demo v-h"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="/" @click="home">
                <i class="el-icon-house"></i>
                <template #title>首页</template>
            </el-menu-item>
            <el-submenu v-for="(item,index) in side" :key="item.id" :index="`/${item.path}`">
                <template #title>
                    <i :class="icon1[index].icon"></i>
                    <span>{{ item.authName }}</span>
                </template>
                <el-menu-item-group style="width:100%">
                    <el-menu-item
                        :index="`/${a.path}`"
                        v-for="(a,c) in item.children"
                        :key="c"
                        @click="lev2(a.path, a.authName)"
                    >
                        <i :class="icon1[index].icon1[c]"></i>
                        <span>{{ a.authName }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref } from 'vue'
import router from '@/router'
import { isEqual, uniqWith } from 'lodash'
interface obj {
    authName: string
    children: obj[]
    id: number
    order: number
    path: string
}
interface titleObj {
    name: string
    path: string
}
interface icon {
    icon: string,
    icon1: string[]
}
export default defineComponent({
    setup(props, ctx) {
        let side = ref<obj[]>([])
        let icon = ref<string[]>(['el-icon-user', "el-icon-folder", "el-icon-shopping-bag-2", "el-icon-document", "el-icon-message"])
        let icon1 = ref<icon[]>([
            {
                icon: 'el-icon-user',
                icon1: ['el-icon-folder-opened']
            },
            {
                icon: "el-icon-folder",
                icon1: ['el-icon-setting', 'el-icon-c-scale-to-original']
            }
            ,
            {
                icon: "el-icon-shopping-bag-2",
                icon1: ['el-icon-bangzhu', 'el-icon-bell', 'el-icon-date']
            }
            ,
            {
                icon: "el-icon-document",
                icon1: ['el-icon-folder-add']
            }
            ,
            {
                icon: "el-icon-message",
                icon1: ['el-icon-position']
            }

        ])
        let list = ref<titleObj[]>([])
        let a = ref<titleObj>()
        // 定义函数
        let getData = () => {
            api.permissions.Asidemenus().then((res: any) => {
                if (res.meta.status === 200) {
                    list.value = JSON.parse(localStorage.getItem('title')!)
                    side.value = res.data
                    // console.log(res);
                }
            })
        }
        // 二级分类
        let lev2 = (val: string, name: string) => {
            // document.title = name
            a.value = { name: name, path: `/${val}` }
            list.value = JSON.parse(localStorage.getItem('title')!)
            list.value.push(a.value)
            localStorage.setItem("title", JSON.stringify(list.value))
            // 路由跳转
            router.push(`/${val}`)


        }
        // 点击首页
        let home = () => {
            list.value = JSON.parse(localStorage.getItem('title')!)
            list.value.push({ name: "首页", path: '/' })
            list.value = uniqWith(list.value, isEqual);
            localStorage.setItem("title", JSON.stringify(list.value))
        }


        // 页面加载
        onMounted(() => {
            getData()
        })

        return {
            getData,
            side,
            icon,
            lev2,
            list,
            home,
            icon1

        }
    }
})
</script>

<style scoped lang="scss">
.v-h {
    height: 100vh;
    width: 200px;
}
::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
}
</style>