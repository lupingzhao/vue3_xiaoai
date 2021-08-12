<template>
    <div>
        <!-- <tableList></tableList> -->
        <TableList></TableList>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import tableList from '@/components/roles/tableList.vue'
import TableList from '@/components/roles/tableList/TableList.vue'
export default defineComponent({
    components: {
        // tableList
        TableList
    },
    setup() {


        return {}
    }
})
</script>

<style scoped>
</style>