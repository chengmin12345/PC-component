import {getJSON} from './ajax'
import{SUCC_CODE,TIMEOUT}from './config'

// 封装一个函数。获取数据
const getData =(url,options)=>{
    //  要返回一个promise对象
    return getJSON(url,{
        timeoutTime:TIMEOUT,
        ...options
    }).then(response=>{
    //     {code:200,
    //     data:[]
    // }
        if(response.code!==SUCC_CODE) throw new Error(`出错了：${response.code}`)

        return response.data
    }).catch(err=>{
        console.log(err)
    } )
}


// 模拟延时
const delay=ms=>{
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
// 获取延迟的数据
const getDelayData=(url,options)=>{
    return delay(1000).then(()=>{
        return getData(url,options)
    })
}

export {getData,getDelayData}