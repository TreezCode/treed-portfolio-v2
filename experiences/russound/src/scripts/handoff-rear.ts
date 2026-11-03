import { gsap } from 'gsap';

const disposers: Array<() => void> = [];
document.querySelectorAll<HTMLElement>('[data-rear-panel]').forEach(root => {
 const diagram=root.querySelector<HTMLElement>('[data-rear-diagram]');
 const image=root.querySelector<HTMLImageElement>('[data-rear-image]');
 const cardAnchor=root.querySelector<HTMLElement>('[data-rear-card-anchor]');
 const card=root.querySelector<HTMLElement>('[data-rear-card]');
 const svg=root.querySelector<SVGSVGElement>('[data-rear-leader]');
 const path=root.querySelector<SVGPathElement>('[data-rear-path]');
 const origin=root.querySelector<SVGCircleElement>('[data-rear-origin]');
 const tabs=Array.from(root.querySelectorAll<HTMLButtonElement>('[data-rear-tab]'));
 const points=Array.from(root.querySelectorAll<HTMLButtonElement>('[data-rear-point]'));
 const controls=root.querySelector<HTMLElement>('[data-rear-controls]');
 const pointLayer=root.querySelector<HTMLElement>('[data-rear-points]');
 if(!diagram||!image||!cardAnchor||!card||!svg||!path||!origin||!tabs.length||!controls||!pointLayer)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const small=matchMedia('(max-width:900px)');
 let selected=0,frame=0,disposed=false,timeline:gsap.core.Timeline|undefined;
 const abort=new AbortController();
 const rectIn=(r:DOMRect,base:DOMRect)=>({x:r.left-base.left,y:r.top-base.top,width:r.width,height:r.height});
 const geometry=()=>{
  if(disposed||small.matches)return;
  const base=diagram.getBoundingClientRect();
  const box=rectIn(image.getBoundingClientRect(),base);
  const target=rectIn(cardAnchor.getBoundingClientRect(),base);
  if(!base.width||!base.height||!box.width||!box.height)return;
  // Image has its exact natural aspect ratio, no crop, padding or border.
  const x=box.x+box.width*Number(tabs[selected].dataset.x);
  const y=box.y+box.height*Number(tabs[selected].dataset.y);
  const endX=target.x-8;
  const endY=target.y+Math.min(68,target.height/3);
  // Travel above the product to preserve its printed port labels.
  const trackY=Math.min(box.y-22,target.y-18);
  const bendX=endX-18;
  svg.setAttribute('viewBox',`0 0 ${base.width} ${base.height}`);
  path.setAttribute('d',`M ${x} ${y} L ${x} ${trackY} L ${bendX} ${trackY} L ${bendX} ${endY} L ${endX} ${endY}`);
  origin.setAttribute('cx',String(x));origin.setAttribute('cy',String(y));
 };
 const schedule=()=>{if(disposed)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(geometry);};
 const settle=()=>{timeline?.kill();gsap.set(card,{clearProps:'opacity,transform'});gsap.set(path,{strokeDasharray:1,strokeDashoffset:0});};
 const select=(index:number,animate=true)=>{
  if(index<0||index>=tabs.length||disposed)return;
  timeline?.kill();selected=index;
  const tab=tabs[index];
  tabs.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;});
  points.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.rearPoint===tab.dataset.rearTab)));
  card.setAttribute('aria-labelledby',tab.id);
  root.querySelector<HTMLElement>('[data-rear-number]')!.textContent=`${String(index+1).padStart(2,'0')} / ${String(tabs.length).padStart(2,'0')}`;
  root.querySelector<HTMLElement>('[data-rear-type]')!.textContent=tab.dataset.detail!;
  root.querySelector<HTMLElement>('[data-rear-title]')!.textContent=tab.dataset.title!;
  root.querySelector<HTMLElement>('[data-rear-body]')!.textContent=tab.dataset.body!;
  geometry();
  if(!animate||reduced.matches){settle();return;}
  timeline=gsap.timeline();
  if(!small.matches){
   timeline.fromTo(path,{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,autoRound:false,duration:.44,ease:'power1.inOut'},0)
    .fromTo(card,{opacity:0,y:7},{opacity:1,y:0,duration:.34,ease:'power2.out',clearProps:'opacity,transform'},.17);
  }else timeline.fromTo(card,{opacity:.45,y:3},{opacity:1,y:0,duration:.2,ease:'power1.out',clearProps:'opacity,transform'});
 };
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>select(index),{signal:abort.signal});
  tab.addEventListener('keydown',event=>{
   let next=index;
   if(event.key==='ArrowRight')next=(index+1)%tabs.length;
   else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   else return;
   event.preventDefault();select(next);tabs[next].focus({preventScroll:true});
  },{signal:abort.signal});
 });
 points.forEach(point=>point.addEventListener('click',()=>{
  const index=tabs.findIndex(tab=>tab.dataset.rearTab===point.dataset.rearPoint);
  select(index);
 },{signal:abort.signal}));
 cardAnchor.hidden=false;controls.hidden=false;pointLayer.hidden=false;svg.removeAttribute('hidden');
 root.dataset.enhanced='true';
 const resize=new ResizeObserver(schedule);resize.observe(diagram);resize.observe(image);resize.observe(cardAnchor);
 const onMode=()=>{settle();schedule();};
 reduced.addEventListener('change',onMode,{signal:abort.signal});small.addEventListener('change',onMode,{signal:abort.signal});
 image.addEventListener('load',schedule,{signal:abort.signal});
 void document.fonts.ready.then(schedule);
 select(0,false);schedule();
 disposers.push(()=>{disposed=true;abort.abort();cancelAnimationFrame(frame);resize.disconnect();timeline?.kill();gsap.set(card,{clearProps:'opacity,transform'});gsap.set(path,{clearProps:'strokeDasharray,strokeDashoffset'});delete root.dataset.enhanced;cardAnchor.hidden=true;controls.hidden=true;pointLayer.hidden=true;svg.setAttribute('hidden','');});
});
if(import.meta.hot)import.meta.hot.dispose(()=>disposers.forEach(dispose=>dispose()));
