import {createScene, mix, ease} from './scene.js';

const $ = s => document.querySelector(s);
const body=document.body, gallery=$('#gallery'), mast=$('.mast'), stage=$('#stage'), detail=$('#detail'), art=$('#detail-image'), flight=$('#flight');
const tiles=[...document.querySelectorAll('.project-tile')], thumbs=[...document.querySelectorAll('[data-thumb]')];
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const reduced={matches:motionPreference.matches};
const scene=createScene(stage,tiles,reduced);
const motionToggle=$('#orbit-toggle');
let autoDrift=true, keyboardInput=false;
try {autoDrift=sessionStorage.getItem('still-atlas-auto-orbit')!=='off'} catch {}
function syncDriftChoice(){
  motionToggle.setAttribute('aria-pressed',String(autoDrift));
  scene.setDriftEnabled(autoDrift);
}
motionToggle.addEventListener('click',()=>{
  autoDrift=!autoDrift;
  try {sessionStorage.setItem('still-atlas-auto-orbit',autoDrift?'on':'off')} catch {}
  syncDriftChoice();
});
syncDriftChoice();
const records=tiles.map(tile=>({...tile.dataset,image:tile.querySelector('img')}));
const total=tiles.length;
let active=0, opened=0, returned=null, version=0, escorts=[], dragging=null, suppressClickUntil=0, browseGesture=false, awaitingBack=false;
let transitFrame=0, stripAnimation=null, settleFlight=null;
const modulo=n=>(n%total+total)%total;
const phase=()=>body.dataset.state;
const rect=el=>el.getBoundingClientRect();
function caption(i){
  const r=records[i];$('#caption-title').textContent=r.title;$('#caption-type').textContent=r.category;
  $('#counter').textContent=r.id+' / '+String(total);
}
function select(i){
  active=modulo(i);body.dataset.selected=records[active].id;scene.select(active);caption(active);
  tiles.forEach((el,j)=>{el.classList.toggle('returned',j===returned);el.tabIndex=j===active?0:-1;});
}
function mode(view){
  if(phase()!=='browse')return;
  scene.setView(view,returned??active);body.dataset.view=view;
  for(const el of document.querySelectorAll('[data-view-choice]'))el.setAttribute('aria-pressed',String(el.dataset.viewChoice===view));
  $('#motion-label').textContent=view==='sphere'?'Auto-rotate':'Auto-scroll';
  motionToggle.setAttribute('aria-label',view==='sphere'?'Auto-rotate sphere':'Auto-scroll grid');
  $('#hint').textContent=view==='sphere'?'Drag to rotate · Select to open':'Drag to explore · Select to open';
}
function detailData(i){
  const r=records[i];art.src=r.image.getAttribute('src');art.alt=r.image.alt;
  $('#detail-title').textContent=r.title;$('#detail-text').textContent=r.description;
  $('#detail-count').textContent='Project '+r.id+' / '+total;$('#detail-cat').textContent=r.category;
  thumbs.forEach((el,j)=>el.setAttribute('aria-current',String(j===i)));
  const strip=$('#thumbs'), thumb=thumbs[i];
  strip.scrollLeft+=rect(thumb).left+rect(thumb).width/2-(rect(strip).left+strip.clientWidth/2);
}
function syncHash(push){
  const route='#project/'+records[active].slug;
  if(push) history.pushState({atlasDetail:true},'',route);
  else history.replaceState({atlasDetail:!!history.state?.atlasDetail},'',route);
}
function resetFlights(){
  cancelAnimationFrame(transitFrame);settleFlight=null;flight.hidden=true;
  for(const item of escorts)item.node.remove();escorts=[];
  for(const tile of tiles)tile.style.visibility='';
  for(const t of thumbs)t.style.visibility='';
  art.style.visibility='';detail.style.removeProperty('opacity');
  for(const el of detail.querySelectorAll('.detail-copy,.detail-head,.dock'))el.style.removeProperty('opacity');
  for(const el of [mast,$('.intro'),$('.foot')])el.style.removeProperty('opacity');
  if(stripAnimation){stripAnimation.cancel();stripAnimation=null;}
}
function place(node,a,b,t,lift=0){
  const w=mix(a.width,b.width,t), h=mix(a.height,b.height,t);
  const x=mix(a.left,b.left,t), y=mix(a.top,b.top,t)-Math.sin(Math.PI*t)*lift;
  node.style.width=a.width+'px';node.style.height=a.height+'px';
  node.style.transform='translate3d('+x+'px,'+y+'px,0) scale('+w/a.width+','+h/a.height+')';
}
function fly(direction,source,startOverride){
  const token=++version,closing=direction==='out';
  resetFlights();
  const heldArt=rect(art),chosen=tiles[active];
  const from=startOverride??(closing?heldArt:source),end=closing?rect(chosen.querySelector('img')):heldArt;
  const time=reduced.matches?0:(closing?700:695);
  const rail=rect($('#thumbs'));
  flight.src=records[active].image.getAttribute('src');flight.hidden=false;art.style.visibility='hidden';chosen.style.visibility='hidden';
  for(let i=0;i<total;i++){
    if(i===active)continue;
    const slot=rect(thumbs[i].querySelector('img')), tile=rect(records[i].image);
    if(slot.width<1||tile.width<1)continue;
    const point={left:Math.min(Math.max(slot.left,rail.left),rail.right-slot.width),top:slot.top,width:slot.width,height:slot.height};
    const clipped=slot.right<rail.left || slot.left>rail.right;
    const outOfStage=tile.right<0 || tile.left>innerWidth || tile.bottom<rect(stage).top || tile.top>rect(stage).bottom;
    if(outOfStage && clipped) continue;
    const node=new Image();node.src=records[i].image.getAttribute('src');node.alt='';node.setAttribute('aria-hidden','true');node.className='escort';
    node.style.zIndex=''+(7+Math.round((scene.state.poses[i].z+1)*10));flight.style.zIndex='30';body.append(node);
    escorts.push({node,a:closing?point:tile,b:closing?tile:point,index:i,clipped,depth:scene.state.poses[i].alpha});
    tiles[i].style.visibility='hidden';thumbs[i].style.visibility='hidden';
  }
  thumbs[active].style.visibility='hidden';
  const text=[...detail.querySelectorAll('.detail-copy,.detail-head,.dock')];
  function frame(progress){
    const t=closing?ease(Math.max(0,(progress-.085)/.915)):ease(progress);
    place(flight,from,end,t,closing?Math.min(42,Math.abs(from.top-end.top)*.12):12);
    for(const e of escorts){
      const delay=(e.index%4)*.016;
      const u=ease(Math.min(1,Math.max(0,(progress-delay)/(.93-delay))));
      place(e.node,e.a,e.b,u,Math.min(95,innerHeight*.09)*(1+Math.sin(e.index)*.26));
      const detailOpacity=e.clipped?0:.78;
      e.node.style.opacity=closing?mix(detailOpacity,e.depth,u):mix(e.depth,detailOpacity,u);
    }
    const v=closing?1-ease(Math.min(1,progress/.76)):ease(Math.min(1,progress/.87));
    detail.style.opacity=v;
    const chromeProgress=closing?progress:1-progress;
    const browseOpacity=ease(Math.max(0,Math.min(1,(chromeProgress-.46)/.5)));
    for(const el of [mast,$('.intro'),$('.foot')])el.style.opacity=browseOpacity;
    for(const el of text)el.style.opacity=closing?1-ease(Math.min(1,progress/.26)):ease(Math.max(0,(progress-.60)/.4));
  }
  function finish(){
    if(token!==version)return;
    resetFlights();
    if(closing){
      detail.hidden=true;gallery.inert=false;mast.inert=false;scene.freeze(false);
      returned=active;select(active);
      tiles[active].focus({preventScroll:true});
      body.dataset.state='browse';$('#notice').textContent='Returned to '+records[active].title;
    }else{
      body.dataset.state='detail';$('#notice').textContent=records[active].title;
    }
  }
  if(!time){finish();return}
  frame(0);let start;
  function tick(now){
    if(token!==version)return;
    start??=now;const t=Math.min(1,(now-start)/time);frame(t);
    if(t<1)transitFrame=requestAnimationFrame(tick);else finish();
  }
  settleFlight=finish;transitFrame=requestAnimationFrame(tick);
}
function open(i,historyChange=true){
  if(phase()!=='browse'||i<0)return;
  const source=rect(records[i].image);
  scene.freeze(true);select(i);opened=i;
  body.dataset.state='opening';detail.hidden=false;detailData(i);gallery.inert=true;mast.inert=true;
  $('[data-action=close]').focus({preventScroll:true});
  if(historyChange)syncHash(true);
  fly('in',source);
}
function change(i,historyChange=true){
  if(phase()!=='detail'&&phase()!=='opening')return;
  if(phase()==='opening'&&settleFlight)settleFlight();
  select(i);detailData(active);if(historyChange)syncHash(false);
  if(!reduced.matches){stripAnimation?.cancel();stripAnimation=art.animate([{opacity:.35,transform:'translateY(4px)'},{opacity:1,transform:'none'}],{duration:215,easing:'ease-out'});}
  $('#notice').textContent=records[active].title;
}
function close(updateHistory=true){
  if(phase()!=='detail'&&phase()!=='opening')return;
  const override=phase()==='opening'&&!flight.hidden?rect(flight):undefined;
  scene.prepareReturn(active,active!==opened);
  body.dataset.state='closing';
  if(updateHistory){
    if(history.state?.atlasDetail){awaitingBack=true;history.back();}
    else history.replaceState(null,'',location.pathname+location.search);
  }
  fly('out',null,override);
}
function readURL(){
  const index=records.findIndex(r=>location.hash==='#project/'+r.slug);
  if(index<0){if(awaitingBack){awaitingBack=false;return;}close(false);return;}
  awaitingBack=false;
  if(phase()==='closing')settleFlight?.();
  if(phase()==='browse'){scene.reveal(index,true);open(index,false);}
  else if(index!==active)change(index,false);
}
function browse(i){
  if(phase()!=='browse')return;
  returned=modulo(i);select(returned);scene.navigate(active);tiles[active].focus({preventScroll:true});
}
function refreshMotion(event){
  reduced.matches=event.matches;
  if(settleFlight)settleFlight();
  scene.motionPreferenceChanged();
  if(reduced.matches && phase()==='browse')mode('grid');
}
for(const el of document.querySelectorAll('[data-view-choice]'))el.addEventListener('click',()=>mode(el.dataset.viewChoice));
for(const el of document.querySelectorAll('[data-browse]'))el.addEventListener('click',()=>browse(active+Number(el.dataset.browse)));
for(const [i,tile] of tiles.entries()){
  tile.addEventListener('click',()=>{if(performance.now()>suppressClickUntil)open(i)});
  tile.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&phase()==='browse'&&!dragging)caption(i)});
  tile.addEventListener('pointerleave',()=>{if(phase()==='browse')caption(active)});
  tile.addEventListener('focus',()=>{
    if(phase()!=='browse')return;
    if(keyboardInput)scene.keepGridFocus(i);
    caption(i);
  });
}
for(const [i,thumb] of thumbs.entries())thumb.addEventListener('click',()=>change(i));
$('[data-action=close]').addEventListener('click',()=>close());
$('[data-action=prev]').addEventListener('click',()=>change(active-1));
$('[data-action=next]').addEventListener('click',()=>change(active+1));
let detailTouch=null;
art.addEventListener('touchstart',e=>{detailTouch=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;},{passive:true});
art.addEventListener('touchend',e=>{if(!detailTouch)return;const dx=e.changedTouches[0].clientX-detailTouch.x,dy=e.changedTouches[0].clientY-detailTouch.y;if(Math.abs(dx)>42&&Math.abs(dx)>Math.abs(dy)*1.35)change(active+(dx<0?1:-1));detailTouch=null;},{passive:true});
function aimAt(element){
  scene.setKeyboardAim(keyboardInput && !!element?.closest('.project-tile'));
}
function usePointer(){
  if(!keyboardInput)return;
  keyboardInput=false;scene.setKeyboardAim(false);
}
document.addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey||event.key==='Shift')return;
  keyboardInput=true;aimAt(document.activeElement);
},true);
document.addEventListener('focusin',event=>aimAt(event.target));
document.addEventListener('focusout',event=>aimAt(event.relatedTarget));
document.addEventListener('pointerdown',usePointer,true);
stage.addEventListener('pointerdown',e=>{
  if(phase()!=='browse'||!e.isPrimary||e.button!==0)return;
  scene.grab();dragging={id:e.pointerId,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,time:performance.now(),vx:0,vy:0};browseGesture=false;
});
stage.addEventListener('pointermove',e=>{
  if(e.pointerType==='mouse' && (e.movementX||e.movementY))usePointer();
  if(!dragging||e.pointerId!==dragging.id)return;
  const dx=e.clientX-dragging.x,dy=e.clientY-dragging.y;
  if(!browseGesture&&Math.hypot(e.clientX-dragging.startX,e.clientY-dragging.startY)<5)return;
  if(!browseGesture){browseGesture=true;scene.beginDrag();stage.setPointerCapture(e.pointerId);stage.classList.add('dragging')}
  const now=performance.now(),dt=Math.max(4,now-dragging.time);
  // A short velocity sample filters individual noisy move events while following a real reversal.
  const blend=1-Math.exp(-dt/36);
  dragging.vx=mix(dragging.vx,dx*16.67/dt,blend);
  dragging.vy=mix(dragging.vy,dy*16.67/dt,blend);
  dragging.time=now;dragging.x=e.clientX;dragging.y=e.clientY;
  scene.move(dx,dy);
});
function endDrag(e){
  if(!dragging || (e.pointerId!==undefined && e.pointerId!==dragging.id))return;
  const flick=browseGesture && e.type==='pointerup' && performance.now()-dragging.time<85;
  let direction=0;
  if(browseGesture && e.type==='pointerup'){
    suppressClickUntil=performance.now()+110;
    const dx=dragging.x-dragging.startX,dy=dragging.y-dragging.startY;
    if(flick && Math.abs(dragging.vx)>2 && Math.abs(dragging.vx)>.7*Math.abs(dragging.vy))direction=Math.sign(dragging.vx);
    else if(Math.abs(dx)>10 && Math.abs(dx)>.7*Math.abs(dy))direction=Math.sign(dx);
  }
  scene.release(flick?dragging.vx:0,flick?dragging.vy:0,direction);
  dragging=null;browseGesture=false;stage.classList.remove('dragging');
}
window.addEventListener('pointerup',endDrag);window.addEventListener('pointercancel',endDrag);
stage.addEventListener('lostpointercapture',event=>{
  // Touch starts with implicit capture on the tile. Transferring it to the stage is a normal drag.
  if(event.target===stage)endDrag(event);
});
document.addEventListener('visibilitychange',event=>{if(document.hidden)endDrag(event)});
window.addEventListener('blur',endDrag);
stage.addEventListener('wheel',e=>{if(phase()!=='browse'||e.ctrlKey)return;e.preventDefault();usePointer();if(scene.state.view==='sphere')scene.zoom(e.deltaY);else scene.move(-e.deltaX,-e.deltaY);},{passive:false});
document.addEventListener('keydown',e=>{
  if(e.altKey||e.ctrlKey||e.metaKey)return;
  if(phase()==='browse'){
    if(['ArrowLeft','ArrowRight','ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();browse(active+(['ArrowLeft','ArrowUp'].includes(e.key)?-1:1))}
  }else{
    if(e.key==='Escape'){e.preventDefault();close();}
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();change(active+(e.key==='ArrowRight'?1:-1));}
    if(e.key==='Tab'){
      const controls=[...detail.querySelectorAll('button')],first=controls[0],last=controls.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  }
});
window.addEventListener('popstate',readURL);
window.addEventListener('hashchange',()=>{if(!awaitingBack&&phase()!=='closing')readURL()});
motionPreference.addEventListener('change',refreshMotion);
window.addEventListener('resize',()=>{if(settleFlight)settleFlight();scene.resize();if(phase()==='detail')detailData(active)});
body.classList.add('ready');body.dataset.state='browse';
const initialMode=reduced.matches?'grid':'sphere';scene.start(initialMode);select(0);mode(initialMode);
readURL();

