!function(n){function e(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var t={};e.m=n,e.c=t,e.d=function(n,t,o){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:o})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="/code/",e(e.s=17)}({17:function(n,e){var t=function(n){var e=n.canvas,t=e.width,o=e.height;return s(100,function(){return{color:"#0091EA",vel:new Int16Array([(1+1*Math.random())*(Math.random()<.5?1:-1),(1+1*Math.random())*(Math.random()<.5?1:-1)]),pos:new Int16Array([Math.random()*t,Math.random()*o])}})},o=function(n,e){var t=n.canvas,o=t.width,r=t.height;return e.map(function(n){return(n.pos[0]<10||n.pos[0]>o-10)&&(n.vel[0]=-1*n.vel[0]),n.pos[0]=n.pos[0]+1*n.vel[0],(n.pos[1]<10||n.pos[1]>r-10)&&(n.vel[1]=-1*n.vel[1]),n.pos[1]=n.pos[1]+1*n.vel[1],n})},r=function(n,e){n.globalAlpha=.5,e.forEach(function(t){n.fillStyle=t.color;for(var o=[{index:null},{index:null}],r=0,a=e.length;r<a;++r){var i=e[r],s=Math.sqrt(Math.pow(t.pos[0]-i.pos[0],2)+Math.pow(t.pos[1]-i.pos[1],2));s<150&&(o[0].index?o[1].index?o[0].dist<s?o[0]={index:r,dist:s}:o[1].dist<s&&(o[1]={index:r,dist:s}):o[1]={index:r,dist:s}:o[0]={index:r,dist:s})}o[0].index&&o[1].index&&(n.beginPath(),n.moveTo(t.pos[0],t.pos[1]),n.lineTo(e[o[0].index].pos[0],e[o[0].index].pos[1]),n.lineTo(e[o[1].index].pos[0],e[o[1].index].pos[1]),n.closePath(),n.fill())})},a=function n(e,t,o){var a=e.canvas,i=a.width,s=a.height;e.clearRect(0,0,i,s);var l=o(e,t);r(e,l),requestAnimationFrame(n.bind(null,e,l,o))},i=function(){var n=document.querySelector(".canvas"),e=n.getContext("2d"),r=t(e);a(e,r,o)};window.addEventListener("load",i);var s=function(n,e){var t=[];if(e)for(var o=0;o<n;++o)t.push(e(o));else for(var r=0;r<n;++r)t.push(null);return t}}});