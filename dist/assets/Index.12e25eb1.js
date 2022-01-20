import{d as e,x as t,y as l,p as a,f as o,o as n,c as i,b as r,w as s}from"./vendor.9e8f1dbe.js";var c,f;(f=c||(c={})).L="left",f.R="right",f.F="forward",f.B="backward";class h{constructor(e,t,l){this.x=0,this.y=0,this.w=800,this.h=0,this.clr="",this.y=e,this.h=t,this.clr=l}}var d=e({name:"Demo7",setup:()=>{const e=t(null);let a,o,n,i=0,r=0,s=0,c=null,f=!0;const d=t(),u="#8FC04C",v="#73B043",w="#D4F5FE",T="#83CACE",m="#606a7c",g="#fff";let b,y=[new h(196,4,u)],p=!1,P=1,C="slowDown";l((()=>{q(),F(),A()}));const q=()=>{var t;o=null==(t=e.value)?void 0:t.getContext("2d"),a=document.createElement("canvas"),a.width=800,a.height=500,n=a.getContext("2d")},A=()=>{if("speedUp"===C)P=P>=1?1:P+.01;else if("slowDown"===C&&(P=P>=0?P-.01:0,P<=0))return window.cancelAnimationFrame(b),b=null,i<-500&&(i=-495),void(i>460&&(i=455));i<-500&&(C="slowDown",i=-500),i>460&&(C="slowDown",i=460),o.clearRect(0,0,800,500),x(),S(),R(),D(),k(),E(),b=window.requestAnimationFrame(A)},R=()=>{o.beginPath(),o.fillStyle=w,o.fillRect(0,0,800,200),o.fill()},D=()=>{const e=i/6;o.fillStyle=T,o.beginPath(),o.moveTo(-30+e,200),o.lineTo(20+e,160),o.lineTo(70+e,200),o.fill(),o.beginPath(),o.moveTo(120+e,200),o.lineTo(170+e,150),o.lineTo(240+e,200),o.fill(),o.beginPath(),o.moveTo(200+e,200),o.lineTo(300+e,100),o.lineTo(400+e,200),o.fill(),o.beginPath(),o.moveTo(540+e,200),o.lineTo(590+e,160),o.lineTo(640+e,200),o.fill(),o.beginPath(),o.moveTo(600+e,200),o.lineTo(680+e,120),o.lineTo(760+e,200),o.fill(),o.beginPath(),o.moveTo(740+e,200),o.lineTo(860+e,80),o.lineTo(980+e,200),o.fill()},x=()=>{y.forEach(((e,t)=>{o.beginPath(),o.fillStyle=e.clr,o.fillRect(e.x,e.y,e.w,e.h),n.beginPath(),n.fillStyle=e.clr===u?m:g,n.fillRect(e.x,e.y,e.w,e.h),e.y+=P+.5*t,e.h+=.5})),y[0].y>=200&&(y.unshift(new h(196,4,p?u:v)),p=!p),y[y.length-1].y>600&&y.pop()},S=()=>{const e=i,t=e/2,l=e/1.7;o.fillStyle=m,o.beginPath(),o.moveTo(50+t,500),o.quadraticCurveTo(250+l,300,350+e,200),o.lineTo(450+e,200),o.quadraticCurveTo(550+l,300,750+t,500),o.fill(),o.fillStyle=g,o.beginPath(),o.moveTo(50+t,500),o.quadraticCurveTo(250+l,300,350+e,200),o.lineTo(353+e,200),o.quadraticCurveTo(258+l,300,68+t,500),o.fill(),o.beginPath(),o.moveTo(450+e,200),o.quadraticCurveTo(550+l,300,750+t,500),o.lineTo(768+t,500),o.quadraticCurveTo(558+l,300,453+e,200),o.fill(),o.save(),o.beginPath(),o.fillStyle=o.createPattern(a,"repeat"),o.moveTo(400+t,500),o.quadraticCurveTo(400+l,300,400+e,200),o.lineTo(404+e,200),o.quadraticCurveTo(404+20/3+l,300,424+t,500),o.fill(),o.restore()},k=()=>{o.beginPath(),o.save(),"left"===c&&(o.setTransform(1,0,.05,1,385,370),o.translate(-390,-370)),"right"===c&&(o.setTransform(1,0,-.05,1,415,370),o.translate(-410,-370)),o.drawImage(d.value,330,300,140,140),o.restore()},F=()=>{document.onkeydown=e=>{switch(e.code){case"ArrowLeft":c="left";break;case"ArrowRight":c="right";break;case"ArrowUp":C="speedUp",null===b&&A()}},document.onkeyup=e=>{switch(e.code){case"ArrowLeft":case"ArrowRight":c=null;break;case"ArrowUp":C="slowDown",b=null}}},E=()=>{f?(r=Math.random()>.5?-2:2,r=Math.random()>.5?r:0,f=!1,s=400*(Math.random()+1)):(s>=1?(i+=r,"slowDown"!==C&&s--):i>=2?i-=2:i<=-2?i+=2:f=!0,"left"===c&&(i+=4),"right"===c&&(i-=4))};return{canvas:e,carRef:d}}});const u=s();a("data-v-390f29ee");const v={class:"content"},w={ref:"canvas",class:"canvas",width:"800",height:"500"},T={ref:"carRef",src:"./assets/car.5e5a3342.png",alt:""};o();const m=u(((e,t,l,a,o,s)=>(n(),i("div",v,[r("canvas",w,null,512),r("img",T,null,512)]))));d.render=m,d.__scopeId="data-v-390f29ee";export{d as default};
