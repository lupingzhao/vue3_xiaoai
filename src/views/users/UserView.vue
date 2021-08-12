<template>
    <div class="flex">
        <div class="flex ipt-box">
            <!-- <input
                type="text"
                v-model="input"
                placeholder="请输入内容"
                class="ipt input-ipt"
                @focus="color = true"
                @blur="color = false"
                clearable
            />-->
            <el-input
                @clear="clear"
                @input="clear(1)"
                placeholder="请输入内容"
                v-model="input"
                clearable
                class="ipt input-ipt"
            ></el-input>
        </div>
        <div class="icon-box" @click="seach">
            <i class="el-icon-search icon"></i>
        </div>
        <div class="m-l-15">
            <el-button type="primary" size="small" @click="show = true">添加用户</el-button>
        </div>
    </div>

    <!-- 内容 -->
    <div class="m-tb-10">
        <Add v-if="show" v-model:show="show" @update="update"></Add>
        <Edit v-if="edits" v-model:edits="edits" @update="update"></Edit>
        <Distribution v-if="alot" v-model:alot="alot" @update="update"></Distribution>
        <UserList ref="UserContent" v-model:edits="edits" v-model:alot="alot"></UserList>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Edit from '@/components/users/edit/Edit.vue'
import Add from '@/components/users/add/Add.vue'
import UserList from '@/components/users/userList/UserList.vue'
import Distribution from '@/components/users/distribution/Distribution.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
    components: {
        Add,
        Edit,
        Distribution,
        UserList
    },

    setup(props, ctx) {
        let color = ref<boolean>(false)
        let show = ref<boolean>(false)
        let edits = ref<boolean>(false)
        let alot = ref<boolean>(false)
        let input = ref<string>('')
        let UserContent = ref<any>(null)
        // let id = ref<any>()
        // 点击搜索
        let seach = () => {
            if (input.value) {
                UserContent.value.seach1(input.value)
            } else {
                ElMessage.warning('没有输入关键字');
            }
        }
        // 清空输入框
        let clear = (val?: number) => {
            if (val) {
                !input.value ? UserContent.value.list = UserContent.value.list1 : ''
            }
            else UserContent.value.list = UserContent.value.list1

        }
        // 跟新用户信息
        let update = () => {
            UserContent.value.getData()
        }


        return {
            input,
            color,
            show,
            edits,
            seach,
            alot,
            update,
            clear,
            UserContent


        }
    }
})
</script>

<style lang="scss" scoped>
.ipt-box {
    // border: 1px solid #94aab8;
    height: 30px;
    // border-top-left-radius: 5px;
    // border-bottom-left-radius: 5px;
    .ipt {
        text-indent: 5px;
        background: none;
    }
}

.icon-box {
    background-color: #94aab8;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
        font-size: 20px;
        color: #f5f5f5;
    }
}
</style>