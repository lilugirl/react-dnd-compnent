
// 数组元素交换位置
export const swapArr=(arr,index1,index2)=>{
   arr[index1]= arr.splice(index2,1,arr[index1])[0]
   return arr
}

// 数组元素向前移动 ,index 元素当前位置
export const moveUpArr=(arr,index)=>{
   if(index<=0) return arr
   return swapArr(arr,index,index-1)
  
}

// 数组元素向后移动 index 元素当前位置
export const moveDownArr=(arr,index)=>{
    if(index>=arr.length-1) return arr
    return swapArr(arr,index,index+1)
}