import './index.css'

export const Comp2=({props})=>{
    return  <div className='comp2-wrapper'>
        <button>{props[0].value || '开始抽奖'}</button>
    </div>
}