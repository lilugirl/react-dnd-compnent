import './index.css'
export const Comp1=({label,props})=>{
    return <div className='comp1-wrapper'>
        <div>
            {props[0].value || label} 

            <img src={props[1].value || 'https://img.zcool.cn/community/01d8fe5b41b540a80121b99445d770.png'} />
        </div>
    </div>
}

