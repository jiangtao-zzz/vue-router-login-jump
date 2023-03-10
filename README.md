# vue-router-login-jump
2个需求： 1.点击进入user页，但是如果用户没有登录的话，中间有登录验证，会拦截，如果用户已登录则进入user页。
          2处理拦截至登录页，然后点去注册页，完善信息页，再回登录页，再登录进去，依然进去目标user页
对于2的是实现  要从localhost:8080->user页->跳转login页面->register页面->login页面登录->回到user页，对应路由路径为
                localhost:8080---> /login?redirect=/user --> /register?redirect=/user -->login/redirect=/user
<template>
  <el-form :model="form" label-width="120px" ref="formRef">
    <el-form-item label="Activity name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Activity age">
      <el-input v-model="form.age" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Create</el-button>
      <el-button @click="reset">Reset</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="data" style="width: 100%" @sort-change="onSortChage" v-loading="loading">
    <el-table-column prop="date" label="Date" width="180" sortable="custom" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <el-pagination v-model:current-page="current" v-model:page-size="pageSize" :page-sizes="[100, 200, 300, 400]"
    layout="total, sizes, prev, pager, next, jumper" :total="total" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import useTable from './useTable.js'
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const getList = (p: any) => {
  console.log(111, p)
  return new Promise((r, j) => {
    setTimeout(() => {
      r({
        data:tableData,
        total:100
      })
    }, 1000);
  })
}

const formRef = ref<FormInstance>()

const form = reactive({
  name: 'sfs',
  age: ''
})

const { tableProps, pagination, search } = useTable(getList, form)
const {
  loading,
  onSortChage,
  data
} = tableProps
const {current,pageSize,total}=pagination
const {submit,reset}=search
</script>





import { onActivated, onMounted, ref, toRaw ,watch} from "vue"

export default function(service,formData={},customParams={}){
    let initalFormData=toRaw(formData)
    let loading=ref(false)
    let data=ref()
    let current=ref(1)
    let pageSize=ref(20)
    let total=ref()
    let sorter={}

    const submit=()=>{
        getList()
    }

    const reset=()=>{
       formData.value=initalFormData
       getList()
    }

    const onSortChage=(column, prop, order )=>{
       sorter={column,prop,order}
       getList()
    }

    const getList=async()=>{
        loading.value=true
        const  res= await service({current,pageSize,formData,sorter,...customParams})
        loading.value=false
        total.value=res.total;
        data.value=res.data
    }
    onMounted(()=>{
       getList()
    })

    onActivated(()=>{
        getList()
    })

   watch([current,pageSize],([current,pageSize],[,prevPageSize])=>{
        if(pageSize!==prevPageSize){
            current.value=1
        }
        getList()
   })
    return {
        tableProps:{
            loading,
            onSortChage,
            data
        },
        pagination:{
            current,
            pageSize,
            total
        },
        search:{
            submit,
            reset
        }
    }
}
