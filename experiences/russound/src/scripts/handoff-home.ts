import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const narrow = matchMedia('(max-width:760px)');
const media = gsap.matchMedia();
const cleanups: (()=>void)[] = [];

// H02 source: 0–6.5 contains lifestyle footage, followed by product inserts.
// A native media fragment ends at 6.25, independently of JavaScript scheduling.
// Two bounded layers dissolve back to the start of the background film.
const hero = document.querySelector<HTMLElement>('.d-hero')!;
const videos = Array.from(hero.querySelectorAll<HTMLVideoElement>('[data-hero-layer]'));
const toggle = hero.querySelector<HTMLButtonElement>('[data-hero-toggle]')!;
let active = 0, wanted = false, visible = true, blending = false, ready = false;
let blendFrame = 0, frameHandle = 0, generation = 0;
let starting = false, disposed = false;
const safeEnd = 6.2;
toggle.hidden = false;
const label = () => {
 const running = wanted && visible && !document.hidden;
 toggle.querySelector('span')!.textContent = running ? 'Pause film' : 'Play film';
 toggle.setAttribute('aria-label', running ? 'Pause background film' : 'Play background film');
 toggle.querySelector('path')!.setAttribute('d',running?'M9 5v14M15 5v14':'m9 5 10 7-10 7Z');
};
const settleBlend = () => {
 cancelAnimationFrame(blendFrame);
 if (blending) {
  const other = 1-active;
  if(Number(videos[other].style.opacity) >= .5) active=other;
 }
 blending=false;
 videos.forEach((v,i)=>{v.pause();v.style.opacity=i===active && ready?'1':'0';});
};
const stop = (poster=false) => {
 generation++;
 cancelAnimationFrame(frameHandle);frameHandle=0;
 settleBlend();
 if(poster) videos.forEach(v=>v.style.opacity='0');
 label();
};
const seekStart = async (index:number) => {
 const v=videos[index];
 if(!v.src) {
  v.src='/oct27/hero.mp4#t=0,6.25';
  v.loop=false;v.muted=true;v.load();
 }
 if(v.readyState<1) await new Promise<void>((resolve,reject)=>{
  v.addEventListener('loadedmetadata',()=>resolve(),{once:true});
  v.addEventListener('error',()=>reject(new Error('Film unavailable')),{once:true});
 });
 if(v.currentTime>.01){
  await new Promise<void>((resolve)=>{v.addEventListener('seeked',()=>resolve(),{once:true});v.currentTime=0;});
 }
};
const monitor = () => {
 frameHandle=0;
 if(!wanted || !visible || document.hidden)return;
 const v=videos[active];
 const t=v.currentTime;
 if(t>=5.35 && !blending) void crossfade();
 if(t>=safeEnd){v.pause();}
 frameHandle=requestAnimationFrame(monitor);
};
const crossfade = async () => {
 if(blending)return;
 blending=true;
 const token=generation, from=active,to=1-active;
 try{
  await seekStart(to);
  if(token!==generation || !wanted || !visible){blending=false;return;}
  videos[to].style.opacity='0';
  await videos[to].play();
  if(token!==generation){videos[to].pause();return;}
  const start=performance.now();
  const tick=(now:number)=>{
   if(token!==generation)return;
   const p=Math.min(1,(now-start)/650);
   // The outgoing layer stays opaque behind the incoming layer to avoid a dip.
   videos[to].style.opacity=String(p);
   videos[to].style.zIndex='1'; videos[from].style.zIndex='0';
   if(p<1){blendFrame=requestAnimationFrame(tick);return;}
   videos[from].pause();videos[from].style.opacity='0';
   active=to;blending=false;
  };
  blendFrame=requestAnimationFrame(tick);
 }catch{wanted=false;stop(true);}
};
const start = async () => {
 if(starting || disposed)return;
 starting=true;
 const token=generation;
 try{
  if(!ready){await seekStart(active);ready=true;}
  if(token!==generation || !wanted || !visible || document.hidden)return;
  if(videos[active].currentTime>=5.35)await seekStart(active);
  await videos[active].play();
  if(token!==generation){videos[active].pause();return;}
  videos[active].style.opacity='1';label();
  cancelAnimationFrame(frameHandle);frameHandle=requestAnimationFrame(monitor);
 }catch{wanted=false;stop(true);}
 finally{
  starting=false;
  if(token!==generation && wanted && visible && !document.hidden && !disposed)void start();
 }
};
toggle.addEventListener('click',()=>{wanted=!wanted;if(wanted)void start();else stop();label();});
const onVisibility=()=>{if(document.hidden)stop();else if(wanted&&visible)void start();};
document.addEventListener('visibilitychange',onVisibility);
const observer=new IntersectionObserver(entries=>{
 visible=entries[0].isIntersecting;
 if(!visible)stop();else if(wanted)void start();
},{threshold:.08});observer.observe(hero);
const onPreference=()=>{if(reduce.matches){wanted=false;stop(true);}};
reduce.addEventListener('change',onPreference);
const onNarrow=()=>{
 stop(true);ready=false;
 videos.forEach(v=>{v.removeAttribute('src');v.load();});
 if(wanted)void start();
};narrow.addEventListener('change',onNarrow);
// An additional media-event guard complements the single animation-frame monitor.
videos.forEach(v=>v.addEventListener('timeupdate',()=>{
 if(v.currentTime>=safeEnd)v.pause();
}));
const saveData=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData;
if(!reduce.matches&&!saveData){wanted=true;void start();}
label();
cleanups.push(()=>{disposed=true;wanted=false;stop();observer.disconnect();document.removeEventListener('visibilitychange',onVisibility);reduce.removeEventListener('change',onPreference);narrow.removeEventListener('change',onNarrow);});

const poseButtons=Array.from(document.querySelectorAll<HTMLButtonElement>('[data-speaker-pose]'));
const caption=document.querySelector<HTMLElement>('.d-speaker-state')!;
const controls=document.querySelector<HTMLElement>('.d-speaker-controls')!;
controls.hidden=false;
let speakerTimeline:gsap.core.Timeline|undefined;
let speakerTrigger:ScrollTrigger|undefined;
let directPose=0;
const semantics=(finish:boolean)=>{
 poseButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===(finish?1:0))));
 const text=finish?'IC-620 with ICG-6R · Finished grille':'IC-620 · Speaker detail';
 if(caption.textContent!==text)caption.textContent=text;
};
const settleSpeaker=(pose:number)=>{
 directPose=pose;semantics(pose===1);
 gsap.set('.d-speaker-body',{opacity:pose?0:1,scale:1,rotation:0});
 gsap.set('.d-speaker-grille',{opacity:pose?1:0,scale:1,y:0});
};
poseButtons.forEach(button=>button.addEventListener('click',()=>{
 const pose=Number(button.dataset.speakerPose);
 directPose=pose;
 if(speakerTrigger){
  const progress=pose ? .94 : .36;
  const y=speakerTrigger.start+(speakerTrigger.end-speakerTrigger.start)*progress;
  window.scrollTo({top:y,behavior:'instant' as ScrollBehavior});
  ScrollTrigger.update();
  speakerTrigger.getTween()?.progress(1);
 }else settleSpeaker(pose);
}));
media.add({desktop:'(min-width:1000px) and (min-height:680px)',reduce:'(prefers-reduced-motion:reduce)'},ctx=>{
 const {desktop,reduce:reduced}=ctx.conditions!;
 speakerTimeline=undefined;speakerTrigger=undefined;
 if(reduced){settleSpeaker(directPose);return;}
 gsap.fromTo('[data-product-arrival]',{y:55,scale:.94},{y:0,scale:1,ease:'none',scrollTrigger:{trigger:'.d-product-story',start:'top 90%',end:'35% 55%',scrub:.35}});
 if(!desktop){settleSpeaker(directPose);return;}
 speakerTimeline=gsap.timeline({onUpdate:()=>{
  if(speakerTimeline)semantics(speakerTimeline.progress()>.72);
 },scrollTrigger:{trigger:'.d-speaker-stage',start:'top 88px',end:'+=850',pin:true,scrub:.35,invalidateOnRefresh:true}});
 speakerTimeline.fromTo('.d-speaker-body',{rotation:-75,scale:.82,opacity:1},{rotation:0,scale:1,duration:1.6,ease:'power2.out'},0)
 .fromTo('.d-speaker-grille',{scale:1.28,y:-38,opacity:0},{scale:1,y:0,opacity:1,duration:1.55,ease:'power2.inOut'},1.8)
 .to('.d-speaker-body',{opacity:0,duration:.6},2.9)
 .to({}, {duration:.8},3.5);
 speakerTrigger=speakerTimeline.scrollTrigger;
 return()=>{speakerTimeline=undefined;speakerTrigger=undefined;};
});
// Color comparison recreates only these three color tweens, preserving the film,
// speaker pin and scroll position. Revert restores inherited colors before reading them.
const readingMedia=gsap.matchMedia();
const mountReading=()=>readingMedia.add('(min-width:761px) and (hover:hover) and (prefers-reduced-motion:no-preference)',()=>{
 document.querySelectorAll<HTMLElement>('[data-reading-emphasis]').forEach((element,index)=>{
  const words=Array.from(element.querySelectorAll<HTMLElement>('[data-reading-word]'));
  if(!words.length)return;
  const style=getComputedStyle(element);
  const settledColor=style.color;
  gsap.set(words,{color:style.getPropertyValue('--reading-muted').trim()});
  gsap.to(words,{
   color:settledColor,duration:.4,stagger:.12,ease:'none',
   scrollTrigger:{id:`team-reading-${index}`,trigger:element,start:'top 83%',end:'bottom 58%',scrub:.25,invalidateOnRefresh:true}
  });
 });
});
mountReading();
const refreshReading=()=>{readingMedia.revert();mountReading();ScrollTrigger.update();};
window.addEventListener('team:theme-changed',refreshReading);
const refresh=()=>{if(!disposed)ScrollTrigger.refresh();};
void document.fonts.ready.then(refresh);
window.addEventListener('load',refresh,{once:true});
const dispose=()=>{disposed=true;wanted=false;cleanups.forEach(fn=>fn());readingMedia.revert();media.revert();window.removeEventListener('load',refresh);window.removeEventListener('team:theme-changed',refreshReading);};
if(import.meta.hot)import.meta.hot.dispose(dispose);
