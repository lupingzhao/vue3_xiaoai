<template>
    <div class="layout">
        <el-container>
            <el-header>
                <div class="flex jcsb p-10 header">
                    <div>欢迎来到小爱后台系统</div>
                    <div class="flex">
                        <div class="mr-5">{{ now }}</div>
                        <div class="m-r-15">亲爱的，{{ user }}</div>
                        <div @click="goOut" class="gouout">退出</div>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="201px" class="Aside">
                    <LeftAside></LeftAside>
                </el-aside>
                <el-main class="main">
                    <div class="mb-10 flex">
                        <Title ref="title"></Title>
                    </div>
                    <div class="conter poe-ref">
                        <router-view />
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
  <script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import router from '@/router';
import { ElMessage } from 'element-plus'
import Title from "@/components/title/Title.vue"
import LeftAside from '@/components/leftAside/LeftAside.vue'

export default defineComponent({
    components: {
        Title,
        LeftAside
    },
    setup() {
        // 定义变量
        let user = ref<string>('')
        let now = ref<any>(null);
        let title = ref<any>(null)
        let a = ref<any>(null)
        // 定义函数 时间格式
        let time = () => {
            now.value = new Date().toLocaleString() + " ".charAt(new Date().getDay());
        }
        // 退出
        let goOut = () => {
            router.push("/Login")
            localStorage.clear()
            ElMessage.success('欢迎下次光临');

        }

        // 页面加载
        onMounted(() => {
            user.value = JSON.parse(localStorage.getItem('user')!).username
            time()
            a.value = setInterval(time, 1000)

        })
        // 销毁组件  页面离开时
        onUnmounted(() => {
            clearInterval(time as any)
            clearInterval(a.value as any)
        })


        return {
            user,
            now,
            time,
            goOut,
            title

        }


    }

})
</script>
  
  <style lang="scss" scoped>
.layout {
    height: 100%;
    .el-header {
        padding: 0;
        height: 40px;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 2;
    }
    .header {
        background-color: #5c7182;
        color: azure;
    }
    .Aside {
        height: 100%;
        position: fixed;
        top: 0px;
        bottom: 0;
        right: 0;
        left: 0;
        margin-top: 40px;
    }
    .main {
        padding: 10px;
        // background-color: blueviolet;
        font-size: 14px;
        margin-left: 200px;
        margin-top: 40px;
        padding-bottom: 20px;
    }
    .gouout {
        &:hover {
            cursor: pointer;
            color: cyan;
        }
    }
}
</style>