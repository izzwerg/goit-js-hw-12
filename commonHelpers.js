import{a as m,S as y,i as u}from"./assets/vendor-5401a4b0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const v=document.querySelector(".form");v.addEventListener("submit",L);const c=document.querySelector(".gallery"),a=document.querySelector(".loader"),n=document.querySelector(".is-hidden"),b="11329962-6436ba51ddb58bb96deed169a";let g,d;m.defaults.baseURL="https://pixabay.com/api";async function L(e){g=1,e.preventDefault(),c.innerHTML="",a.classList.add("is-visible");const s=e.currentTarget;d=s.elements.searchTerm.value;try{let r=await f(d);r.total===0?q():p(r)}catch(r){h(r.message)}finally{s.reset()}}async function w(){a.classList.add("is-visible");try{let e=await f(d);p(e);let r=c.querySelector("li").getBoundingClientRect();scrollBy({top:r.height*2+48,behavior:"smooth"})}catch(e){h(e.message)}}function p(e){n.classList.remove("is-visible");let s="";for(const i of e.hits)s+=M(i);a.classList.remove("is-visible"),c.insertAdjacentHTML("beforeend",s),new y(".gallery a").refresh(),S(e.totalHits)}function S(e){c.querySelectorAll("li").length<e?(n.addEventListener("click",w),n.classList.add("is-visible")):x()}async function f(e){const s=new URLSearchParams({key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:40,page:g}),r=await m.get(`/?${s}`);return g++,r.data}function M({webformatURL:e,largeImageURL:s,tags:r,likes:i,views:t,comments:o,downloads:l}){return`<li class="gallery-item">
        <a class="gallery-link" href="${s}">
            <img class="gallery-image" src="${e}" alt="${r}" />
        </a>
        <div class="gallery-details">
            <div class="detail"><img class="gallery-logo" src="like.png" /> <p class="gallery-text">${i}</p></div>
            <div class="detail"><img class="gallery-logo" src="viev.png" /> <p class="gallery-text">${t}</p></div>
            <div class="detail"><img class="gallery-logo" src="comment.png" /> <p class="gallery-text">${o}</p></div>
            <div class="detail"><img class="gallery-logo" src="download.png" /> <p class="gallery-text">${l}</p></div>
        </div>
    </li>`}function q(){u.show({position:"topRight",messageColor:"white",iconUrl:"error.svg",iconColor:"white",color:"#EF4040",message:"Sorry, there are no images matching your search query. Please try again!"}),a.classList.remove("is-visible")}function h(e){u.show({position:"topRight",messageColor:"white",iconUrl:"attention.png",iconColor:"white",color:"#EF4040",message:e}),a.classList.remove("is-visible")}function x(){u.show({position:"topRight",messageColor:"white",iconUrl:"fin.png",iconColor:"white",color:"#4E75FF",message:"We're sorry, but you've reached the end of search results."})}
//# sourceMappingURL=commonHelpers.js.map
