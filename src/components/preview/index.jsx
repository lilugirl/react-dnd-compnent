import { useEffect,useState } from "react"
import { Comp } from "../comp"

const Preview=()=>{
    const [data,setData]=useState([])
    useEffect(()=>{
      const rawData=window.localStorage.getItem('comps') || {}
      try{
        setData(JSON.parse(rawData))
      }catch(e){
        console.warn('数据解析失败')
      }
    },[])
    return <div>
       {data.map((item, index) => {
          return (
            <Comp data={item} key={index} />
          );
        })}
    </div>
}

export default Preview