import './fav-ad.css'

import {getData}from 'api/getData'
import {URL}from './config'
import render from './fav-ad.art'

const layoutEl=document.querySelector('.fav-ad .loading')

getData(URL).then(data=>{
    // console.log(data);
    layoutEl.innerHTML=render({
        items:data
    })
})