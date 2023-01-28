import { Comp1 } from "../comp1"
import { Comp2 } from "../comp2"

export const Comp=({data})=>{

    switch(data.id){
        case 'comp1':
            return <Comp1 {...data} />
        case 'comp2':
            return <Comp2 {...data} />

        default:
            return null
    }
    return <div>组件</div>
}