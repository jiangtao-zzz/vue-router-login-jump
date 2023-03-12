
import { onActivated, onMounted, ref, toRaw ,watch} from "vue"
export type Data = { total: number; list: any[] };

export type Params = [
    {
      current: number;
      pageSize: number;
      sorter?: any;
      filter?: any;
      [key: string]: any;
    },
    ...any[],
];
let x:Params=[
    {current:1,pageSize:1}
]
export type Service<TData extends Data, TParams extends Params> = (
    ...args: TParams
  ) => Promise<TData>;
const useTable=<TData extends Data, TParams extends Params>(service:Service<TData, TParams>,formData={},customParams={})=>{
    let initalFormData=toRaw(formData)
    let loading=ref(false)
    let data=ref<TData['list']>([])
    let current=ref(1)
    let pageSize=ref(20)
    let total=ref()
    let sorter={}

    const submit=()=>{
        getList()
    }
 

    // const reset=()=>{
    //    formData.value=initalFormData
    //    getList()
    // }

    // const onSortChage=(column, prop, order )=>{
    //    sorter={column,prop,order}
    //    getList()
    // }

    const getList=async()=>{
        loading.value=true

        const  res= await service({
            pageSize:1,
            current:1
        })
        loading.value=false
        total.value=res.total;
        data.value=res.list
    }
    onMounted(()=>{
       getList()
    })

    onActivated(()=>{
        getList()
    })

   watch([current,pageSize],([current,pageSize],[,prevPageSize])=>{
        if(pageSize!==prevPageSize){
            current=1
        }
        getList()
   })
    return {
        tableProps:{
            loading,
            // onSortChage,
            data
        },
        pagination:{
            current,
            pageSize,
            total
        },
        search:{
            submit,
            // reset
        }
    }
}

export default useTable;
