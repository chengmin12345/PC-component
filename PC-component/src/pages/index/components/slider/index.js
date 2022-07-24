import './slider.css'
import './btn.css'
 

import Slider from './module'
import render from './slider.art'

import { getData,getDelayData} from 'api/getData'
const layoutEl=document.getElementById('slider-layout')

getDelayData('https://www.imooc.com/api/mall-PC/index/ad ').then(data=>{
    // console.log(data);
    layoutEl.innerHTML=render({
        items:data
    })

    const slider=new Slider(document.querySelector('.slider'), {
        initialIndex: 1,
        animation: true,
        // 切换速度，单位 ms
        speed: 1000,
        // 自动切换，单位 ms
        autoplay:1000
      });
    //   获取按钮
    const leftbtn=document.querySelector('#leftbtn')
    const rightbtn=document.querySelector('#rightbtn')
    const bannerEl=document.querySelector('#banner')
    // 设置点击事件
    leftbtn.addEventListener('click',()=>{
        slider.prev()
    })
    rightbtn.addEventListener('click',()=>{
        slider.next()
    })
    
    // 设置鼠标划入划出事件
    bannerEl.addEventListener('mouseenter',()=>[
        slider.pause()
    ])
    bannerEl.addEventListener('mouseleave',()=>[
        slider.autoplay()
    ])
    
})
