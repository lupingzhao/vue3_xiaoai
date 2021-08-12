<template>
    <div>
        <el-table :data="list" style="width: 100%" border stripe>
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column label="订单编号" prop="order_number" align="center" fit></el-table-column>
            <el-table-column label="订单价格" prop="order_price" align="center"></el-table-column>
            <el-table-column label="是否付款" prop="pay_status" align="center" width="100">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.pay_status === '0'">已付款</el-tag>
                    <el-tag type="danger" v-else>未付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否发货" prop="is_send" align="center" width="100"></el-table-column>
            <el-table-column label="下单时间" prop="create_time" align="center" width="180"></el-table-column>

            <el-table-column label="操作" align="center" width="150">
                <template #default="scope">
                    <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click="btn(1, scope.row)"
                    ></el-button>
                    <el-button
                        type="success"
                        icon="el-icon-location-outline"
                        size="mini"
                        @click="btn(2, scope.row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="m-t-10">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>

        <!-- 弹框 -->
        <OrderAddress v-if="address" v-model:address="address"></OrderAddress>
        <OrderLogistics v-if="logistics" v-model:logistics="logistics"></OrderLogistics>
    </div>
</template>

<script lang="ts">
import api from '@/http/api'
import { defineComponent, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import OrderAddress from '../orderAddress/OrderAddress.vue';
import OrderLogistics from '../orderLogistics/OrderLogistics.vue';


interface obj {
    create_time: string
    is_send: string
    order_fapiao_title: string
    order_id: number
    order_number: string
    order_pay: string
    order_price: number
    pay_status: string
    update_time: number
    user_id: number
    consignee_addr: string
    order_fapiao_company: string
    order_fapiao_content: string
    trade_no: string

}
export default defineComponent({
    components: { OrderAddress, OrderLogistics },
    setup() {
        let list = ref<obj[]>([{
            create_time: '',
            is_send: '',
            order_fapiao_title: '',
            order_id: 0,
            order_number: '',
            order_pay: '',
            order_price: 0,
            pay_status: '',
            update_time: 0,
            user_id: 0,
            consignee_addr: '',
            order_fapiao_company: '',
            order_fapiao_content: '',
            trade_no: ''
        }])
        let pagesize = ref<number>(20)
        let pagenum = ref<number>(1)
        let total = ref<number>(0)
        let address = ref<boolean>(false)
        let logistics = ref<boolean>(false)
        // 获取数据
        let getData = (num: number, size: number, quer?: string) => {
            api.order.list(num, size, quer).then((res: any) => {
                if (res.meta.status === 200) {
                    total.value = res.data.total
                    res.data.goods.map((a: any) => {
                        a.create_time = dayjs(a.create_time).format('YYYY-MM-DD-HH')
                    })
                    list.value = res.data.goods
                }
            })
        }

        // 按钮事件
        let btn = (val: number, row: string) => {
            // 
            if (val === 2) {
                logistics.value = true
                // 物流
                console.log(33);
                // api.order.logistics().then(res => {
                //     console.log(res);
                // })
            } else {
                address.value = true
            }
        }

        let currentPage = ref<number>(1)

        // 每页显示条数
        let handleSizeChange = (val: any) => {
            pagesize.value = val
            getData(pagenum.value, pagesize.value)
        }
        // 当前页数
        let handleCurrentChange = (val: any) => {
            currentPage.value = val
            pagenum.value = val
            getData(pagenum.value, pagesize.value)
        }


        onMounted(() => {
            getData(pagenum.value, pagesize.value)
        })
        return {
            btn, handleSizeChange, handleCurrentChange, currentPage,
            getData,
            list,
            total,
            pagesize,
            address,
            logistics
        }
    }
})
</script>

<style scoped>
</style>