// 引入常量
import {ELEMENT_NODE_TYPE,SLIDER_ANIMATION_CLASS_NAME} from './constants.js'
// 引入默认值
import DEFAULTS from './defaults'

class BaseSlider{
    // el是幻灯片的父容器slider
    constructor(el,options){
        // 判断一下el是否为dom元素
        if(el.nodeType!==ELEMENT_NODE_TYPE){
            throw new Error('实例化的时候，请传入dom元素')
        }
        // 实际参数
        this.options={...DEFAULTS,...options}

        // 获取DOM元素
        const sliderEl=el
        const silderContentEl=sliderEl.querySelector('.slider-content')
        const sliderItemEls=silderContentEl.querySelectorAll('.slider-item')

        // 添加到this上，为了之后的方法使用
        this.sliderEl=sliderEl
        this.silderContentEl=silderContentEl
        this.sliderItemEls=sliderItemEls

        // 设置最小索引
        this.minIndex=0
        // 设置最大索引
        this.maxIndex=sliderItemEls.length-1
        // 当前索引
        this.currIndex=this.getCorrectdeIndex(this.options.initialIndex)
        // 获取每个slider-item的宽度（每次移动的距离）
        this.itemWidth = sliderItemEls[0].offsetWidth

        this.init()

    }
        //初始化
        init(){
            // 为每个slider-item设置宽度
            this.setItemsWidth()
            // 为slider-content设置宽度
            this.setContentWidth()
            // 切换到初始的索引initialIndex
            this.move(this.getDistance())
            // 开启动画
            if(this.options.animation){
                this.openAnimation()
            }
            //自动切换
            if(this.options.autoplay){
                this.autoplay()
            }   
        }
        // 切换到Index索引对应的幻灯片
        to(index){
            index=this.getCorrectdeIndex(index)
            if(this.currIndex===index)return
            this.currIndex=index
            const distance=this.getDistance()
            // 判断一下是否有动画：
            // 带动画移动
            if(this.options.animation){
                this.moveWithAnimation(distance)
            }
            // 不带动画移动
            else{
                this.move(distance)
            }

        }
         //切换上一张
         prev(){
            this.to(this.currIndex-1)
        }

        // 切换下一张
        next(){
            this.to(this.currIndex+1)           
         }
        // 自动切换
        autoplay(){
            const {autoplay}=this.options
            if(autoplay<=0) return
            this.pause()
            this.autoplayTimer=setInterval(()=>{
                this.next()
            },autoplay)
        }
        // 暂停自动切换
        pause(){
            clearInterval(this.autoplayTimer)
        }

        // 开启动画
        openAnimation(){
            this.silderContentEl.classList.add(SLIDER_ANIMATION_CLASS_NAME)
        }
        // 关闭动画
        closeAnimation(){
            this.setAnimationSpeed(0)
        }
        // 设置切换动画的速度
        setAnimationSpeed(speed=this.options.speed){
            this.silderContentEl.style.transitionDuration=`${speed}ms`

        }

        // 不带动画的移动
        move(distance){
            this.silderContentEl.style.transform=`translate3d(${distance}px,0px,0px)`
        }
        // 带动画移动
        moveWithAnimation(distance){
            this.setAnimationSpeed()
            this.move(distance)
            this.silderContentEl.addEventListener('transitionend',()=>{
                this.closeAnimation()
            })

        }
        // 获取要移动的距离
        getDistance(index=this.currIndex){
            return -this.itemWidth*index
        }


        // 为每个slider-item设置宽度
        setItemsWidth(){
            for(const item of this.sliderItemEls){
                item.style.width=`${this.itemWidth}px`
            }
        }
         // 为slider-content设置宽度
         setContentWidth(){
           this.silderContentEl.style.width=`${this.itemWidth*this.sliderItemEls.length}px`  
         }


    
        // 获取修正后的索引值
        getCorrectdeIndex(index){
            // 幻灯片循环切换
            // 如果索引小于最小索引，直接跳到最大索引那张幻灯片
            if(index<this.minIndex)return this.maxIndex
            if(index>this.maxIndex)return this.minIndex
            return index
        }

}
export default BaseSlider