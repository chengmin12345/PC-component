import './jjzyx.css';

import render from './items.art';
import { URL } from './config';
import { getData } from 'api/getData';

const layoutEl = document.querySelector('.jjzyx .bd');

// 获取接口
getData(URL).then(data=>{
//   console.log(data);
//   {one: {…}, items: Array(5), more: {…}}
// items: Array(5)
// 0: {url: 'http://alimc.img.imooc.com/class/muyun/mall-PC/world/zlx_02.png', title: '北京/上海/南京/杭州直飞巴厘岛5-7天往返含税机票（赠送旅游意外险）'}
// 1: {url: 'http://alimc.img.imooc.com/class/muyun/mall-PC/world/zlx_03.png', title: '北京/天津直飞日本东京/大阪/东阪/福冈/名古屋冲绳/北海道4-7天往返非常好'}
// 2: {url: 'http://alimc.img.imooc.com/class/muyun/mall-PC/world/zlx_04.png', title: '[樱花季] 北京/天津直飞东京/大阪/名古屋/福冈/广岛/北海道/冲绳往返9日游'}
// 3: {url: 'http://alimc.img.imooc.com/class/muyun/mall-PC/world/zlx_05.png', title: '杭州/上海/宁波/义乌直飞越南芽庄/岘港4-6天往返含税机票（20KG行李免费）'}
// 4: {url: 'http://alimc.img.imooc.com/class/muyun/mall-PC/world/zlx_06.png', title: '[樱花季]天津直飞东京/大阪/名古屋/冲绳/札幌2-30天往返'}
// length: 5
// [[Prototype]]: Array(0)
// more:
// items: (4) ['日游', '周末', '亲子', '长线']
// title: "深度旅行产品"
// [[Prototype]]: Object
// one:
// extra-info: "含机票酒店"
// extra-tag: "CITY WALK"
// tag: "城市"
// title: "[樱花季]天津直飞东京/大阪/名古屋/冲绳/札幌2-30天往返"
// url: "http://alimc.img.imooc.com/class/muyun/mall-PC/world/zlx_01.png"

layoutEl.innerHTML=render(data)
}).catch(err=>{
    console.log(err);
})


