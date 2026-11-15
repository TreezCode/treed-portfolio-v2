// Project a single, stable set of twelve DOM buttons into both layouts.
const tau = Math.PI * 2;
const clamp = (n, low, high) => Math.max(low, Math.min(high, n));
const wrap = (n, period) => ((n % period) + period) % period;
export const mix = (a,b,t) => a + (b-a)*t;
export const ease = t => t*t*(3-2*t);
const angles = Array.from({length:12}, (_, i) => {
  // The twelve vertices of an icosahedron make the photographs read as one globe.
  if (i === 10) return [0, Math.PI/2];
  if (i === 11) return [0, -Math.PI/2];
  return [(i%5)*tau/5+(i>=5?Math.PI/5:0), (i<5?1:-1)*Math.atan(.5)];
});

export function createScene(stage, tiles, reduced) {
  const canvas = stage.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const state = {view:'sphere', yaw:-.39, pitch:-.26, zoom:1, panX:0, panY:0, poses:[]};
  let width=0, height=0, base=0, radius=0, size=0, cols=4, pitchX=0, pitchY=0;
  let motion=0, selection=0, still=false, last=0, glideX=0, glideY=0;
  // The same clock drives both layouts. Grid offsets are stored in tile pitches for resize.
  const rowOffsets=[];
  const orbitSpeed=.000058, driftRamp=1250, idleDelay=1550;
  let driftAt=0, driftTimer=0, orbitDirection=1, driftEnabled=true;
  let pointerDown=false, keyboardAim=false, disposed=false;
  let pendingLayout=null, entrance=null;
  let heldAt=null, interruptedLayout=false, globeStrength=1;
  let readerWidth=0, readerHeight=0;
  let cameraMove=null;
  function measure(){
    width=stage.clientWidth;height=stage.clientHeight;
    if(!width||!height)return;
    const small=width<700;
    radius=Math.min(width*(small?.365:.32),height*.395);
    size=Math.min(width*(small?.242:.145),height*.244,194);
    base=size;
    cols=small?3:4;
    pitchX=small?width*.51:Math.min(width*.31,height*.65);
    // A photograph and its shadow must fully leave the stage before wrapping.
    pitchX=Math.max(pitchX,(width+44)/(cols-.76));
    pitchY=Math.max(Math.min(pitchX*.71,height*.47),(height+44)/(tiles.length/cols-.795));
    const dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx?.setTransform(dpr,0,0,dpr,0,0);
  }
  function rotate(lon,lat) {
    const az=lon+state.yaw, cy=Math.cos(lat), y=Math.sin(lat), z=Math.cos(az)*cy;
    return [Math.sin(az)*cy,y*Math.cos(state.pitch)-z*Math.sin(state.pitch),y*Math.sin(state.pitch)+z*Math.cos(state.pitch)];
  }
  function spherePose(i){
    const [x,y,z]=rotate(...angles[i]);
    const k=1/(1-.19*z), r=radius*state.zoom;
    const w=size*(.60+.44*(z+1)/2)*k*Math.sqrt(state.zoom);
    return {x:width/2+x*r*k,y:height/2-y*r*k,w,z,alpha:.41+.59*(z+1)/2};
  }
  function advanceRows(elapsed){
    const rows=tiles.length/cols;
    const travel=elapsed*Math.min(1/18000,.028/pitchX);
    for(let row=0;row<rows;row++){
      // With an odd row count a vertical wrap changes which rows are neighbors.
      const wraps=Math.floor((row+.5+state.panY/pitchY)/rows);
      const screenRow=row-wraps*rows;
      const direction=screenRow%2===0?-1:1;
      // Twelve pitches is a complete cycle at either breakpoint (three or four columns).
      rowOffsets[row]=((rowOffsets[row]||0)+direction*travel)%tiles.length;
    }
  }
  function gridPose(i){
    const row=Math.floor(i/cols), col=i%cols;
    const x=wrap((col-(cols-1)/2+(row%2?.18:-.18)+(rowOffsets[row]||0))*pitchX+state.panX+cols*pitchX/2,cols*pitchX)-cols*pitchX/2;
    const rows=tiles.length/cols;
    const y=wrap((row-(rows-1)/2)*pitchY+state.panY+rows*pitchY/2,rows*pitchY)-rows*pitchY/2;
    return {x:width/2+x,y:height/2+y,w:Math.min(pitchX*.76,pitchY*1.06),z:0,alpha:1};
  }
  function target(i){return state.view==='sphere'?spherePose(i):gridPose(i);}
  function globe(strength){
    if(!ctx)return;
    ctx.clearRect(0,0,width,height);
    if(strength<.01)return;
    ctx.strokeStyle='rgba(180,200,160,'+(.14*strength)+')';
    ctx.lineWidth=.7;
    function line(points){
      ctx.beginPath();
      for(let j=0;j<=64;j++){
        const [lon,lat]=points(j/64),[x,y,z]=rotate(lon,lat),r=radius*state.zoom/(1-.19*z);
        const a=width/2+x*r,b=height/2-y*r;
        if(j===0)ctx.moveTo(a,b);else ctx.lineTo(a,b);
      }ctx.stroke();
    }
    for(let j=0;j<5;j++)line(t=>[j*Math.PI/5,t*tau]);
    for(const a of [-.6,0,.6])line(t=>[tau*t,Math.asin(a)]);
  }
  function paint(now=performance.now()){
    const dt=last?clamp(now-last,0,64):0;
    last=now;
    if(cameraMove){
      const {x,y,startX,startY,endX,endY,started,duration}=cameraMove;
      const progress=clamp((now-started)/duration,0,1);
      const eased=ease(progress);
      state[x]=mix(startX,endX,eased);
      state[y]=mix(startY,endY,eased);
      if(progress===1)cameraMove=null;
    }
    if(canDrift() && !cameraMove && !pendingLayout && !entrance && now>driftAt){
      const elapsed=dt*ease(clamp((now-driftAt)/driftRamp,0,1));
      if(state.view==='grid'){
        advanceRows(elapsed);
      }else{
        const delta=orbitDirection*orbitSpeed*elapsed;
        // A shallow variation in viewing latitude preserves the visitor's chosen tilt.
        const nod=.042*(Math.sin(state.yaw+delta)-Math.sin(state.yaw))*Math.cos(state.pitch);
        state.pitch=clamp(state.pitch+nod,-Math.PI/2,Math.PI/2);
        state.yaw+=delta;
      }
    }
    if(!still&&(Math.abs(glideX)+Math.abs(glideY)>.22)){
      // Integrate the exponential over the frame so a fling travels the same distance at 60 and 120 Hz.
      const decay=Math.exp(-dt/175);
      const travel=(1-decay)*175/16.67;
      offset(glideX*travel,glideY*travel);
      glideX*=decay;glideY*=decay;
    }
    let t=pendingLayout?clamp((now-pendingLayout.start)/pendingLayout.duration,0,1):1;
    let strength=state.view==='sphere'?1:0;
    if(pendingLayout)strength=mix(pendingLayout.fromStrength,strength,ease(t));
    if(strength>=.01 || globeStrength>=.01)globe(strength);
    globeStrength=strength;
    for(let i=0;i<tiles.length;i++){
      let p=target(i);
      if(pendingLayout){
        const a=pendingLayout.from[i], u=ease(t);
        p={x:mix(a.x,p.x,u),y:mix(a.y,p.y,u)-Math.sin(Math.PI*t)*height*.075*Math.sin(i+1),w:mix(a.w,p.w,u),alpha:mix(a.alpha,p.alpha,u),z:mix(a.z,p.z,u)};
      }else if(entrance){
        const e=clamp((now-entrance-i*12)/870,0,1), u=ease(e), a=gridPose(i);
        p={...p,x:mix(a.x,p.x,u),y:mix(a.y,p.y,u),w:mix(a.w,p.w,u),alpha:mix(.5,p.alpha,u)};
      }
      state.poses[i]=p;
      const tile=tiles[i];tile.style.width=base+'px';tile.style.height=base*.75+'px';
      tile.style.transform='translate3d('+(p.x-p.w/2)+'px,'+(p.y-p.w*.375)+'px,0) scale('+p.w/base+')';
      tile.style.zIndex=String(100+Math.round(p.z*90)+(state.view==='grid'&&i===selection?1:0));
      tile.style.opacity=p.alpha;
    }
    if(t===1)pendingLayout=null;
    if(entrance&&now-entrance>1100)entrance=null;
  }
  function tick(now){
    motion=0;
    if(disposed||still||heldAt!==null||document.hidden)return;
    paint(now);
    wake();
  }
  function canDrift(){
    return driftEnabled && !still && !pointerDown && !keyboardAim && !document.hidden &&
      pitchX>0 && pitchY>0 && !reduced.matches;
  }
  function quietDrift(delay=idleDelay){
    clearTimeout(driftTimer);driftTimer=0;
    driftAt=performance.now()+delay;
  }
  function wake(){
    if(disposed||motion||still||heldAt!==null||document.hidden)return;
    const wait=driftAt-performance.now();
    if(entrance || pendingLayout || cameraMove || Math.abs(glideX)+Math.abs(glideY)>.22 || (canDrift() && wait<=0)){
      motion=requestAnimationFrame(tick);
    } else if(canDrift() && !driftTimer){
      driftTimer=setTimeout(()=>{driftTimer=0;wake()},Math.ceil(wait));
    }
  }
  function stop(){
    cameraMove=null;
    quietDrift();glideX=glideY=0;
  }
  function grab(){
    stop();pointerDown=true;
    heldAt=last||performance.now();
  }
  function unhold(){
    if(heldAt===null)return;
    const paused=Math.max(0,performance.now()-heldAt);
    if(entrance)entrance+=paused;
    if(pendingLayout)pendingLayout.start+=paused;
    heldAt=null;
    last=performance.now();
  }
  function release(dx=0,dy=0,direction=0){
    unhold();pointerDown=false;
    if(state.view==='sphere' && direction)orbitDirection=direction;
    if(!reduced.matches){
      glideX=clamp(dx,-20,20);glideY=clamp(dy,-20,20);
    }
    quietDrift();wake();
  }
  function freeze(on){
    still=on;stop();heldAt=null;pointerDown=false;
    if(on){
      interruptedLayout=Boolean(entrance||pendingLayout);
      readerWidth=width;readerHeight=height;
    }
    entrance=null;pendingLayout=null;
    // Opening measures the last displayed frame, even when a layout is mid-flight.
    if(!on){paint();wake();}
  }
  function keepGridFocus(i){
    if(state.view!=='grid'||pendingLayout||cameraMove)return;
    const p=gridPose(i);
    if(p.x<0||p.x>width||p.y<0||p.y>height)reveal(i,true);
  }
  function prepareReturn(i,changedProject){
    paint();
    const gridResized=state.view==='grid' && (readerWidth!==width || readerHeight!==height);
    if(changedProject||interruptedLayout||gridResized)reveal(i);
    interruptedLayout=false;
  }
  function offset(dx,dy){
    if(state.view==='sphere'){
      const dragRadius=Math.max(120,radius);
      state.yaw+=dx/dragRadius*.7;
      state.pitch=clamp(state.pitch+dy/dragRadius*.72,-Math.PI/2,Math.PI/2);
    }
    else {state.panX+=dx;state.panY+=dy;}
  }
  function reveal(i,force=false){
    let p=target(i);
    if(state.view==='sphere'){
      const overlaps=state.poses.some((other,j)=>j!==i && other.z>p.z && Math.abs(other.x-p.x)<other.w*.55 && Math.abs(other.y-p.y)<other.w*.42);
      if(force || p.z<.18 || overlaps){
        state.yaw=-angles[i][0];state.pitch=angles[i][1];
      }
    }else if(force || p.x-p.w/2<4 || p.x+p.w/2>width-4 || p.y-p.w*.375<4 || p.y+p.w*.375>height-4){
      state.panX+=width/2-p.x;state.panY+=height/2-p.y;
    }
    paint();
  }
  function navigate(i){
    stop();
    const sphere=state.view==='sphere';
    const x=sphere?'yaw':'panX', y=sphere?'pitch':'panY';
    const [longitude,latitude]=angles[i];
    const tile=target(i);
    // A pole can face the visitor at any longitude. Else turn around the nearer side.
    const turnYaw=Math.abs(Math.cos(latitude))<1e-6?0:wrap(-longitude-state.yaw+Math.PI,tau)-Math.PI;
    const dx=sphere?turnYaw:width/2-tile.x;
    const dy=sphere?latitude-state.pitch:height/2-tile.y;
    const startX=state[x], startY=state[y];
    const endX=startX+dx, endY=startY+dy;
    if(reduced.matches){
      state[x]=endX;state[y]=endY;
      paint();
      return;
    }
    const distance=sphere?Math.hypot(dx,dy):Math.hypot(dx/pitchX,dy/pitchY);
    cameraMove={x,y,startX,startY,endX,endY,started:performance.now(),duration:clamp(240+95*distance,240,485)};
    wake();
  }
  const observer=new ResizeObserver(()=>{measure();paint()});observer.observe(stage);
  function visibilityChanged(){
    cancelAnimationFrame(motion);motion=0;
    last=0;quietDrift();
    if(!document.hidden)wake();
  }
  document.addEventListener('visibilitychange',visibilityChanged);
  return {
    state, start(mode){state.view=mode;measure();if(!reduced.matches&&mode==='sphere')entrance=performance.now();quietDrift(1100);paint();wake()},
    grab, beginDrag(){unhold();wake()}, release, freeze, prepareReturn, select(i){selection=i},
    move(dx,dy){stop();offset(dx,dy);paint();wake()},
    zoom(delta){stop();state.zoom=clamp(state.zoom*Math.exp(-delta*.0013),.70,1.48);paint();wake()},
    setDriftEnabled(on){
      driftEnabled=on;
      if(!on)glideX=glideY=0;
      quietDrift(on?0:idleDelay);wake();
    },
    motionPreferenceChanged(){
      if(reduced.matches){
        stop();entrance=null;pendingLayout=null;
      }
      quietDrift();paint();wake();
    },
    setKeyboardAim(on){
      if(on===keyboardAim)return;
      keyboardAim=on;
      if(on)glideX=glideY=0;
      quietDrift();wake();
    },
    reveal,navigate,keepGridFocus,
    setView(mode,keep){if(mode===state.view)return;stop();const from=state.poses.map(p=>({...p})),fromStrength=globeStrength;state.view=mode;
      entrance=null;pendingLayout=null;
      if(keep!=null)reveal(keep);
      if(!reduced.matches){
        pendingLayout={from,fromStrength,start:performance.now(),duration:760};
        if(mode==='grid')quietDrift(pendingLayout.duration);
      }
      paint();wake();
    },
    resize(){measure();paint()},dispose(){disposed=true;cancelAnimationFrame(motion);clearTimeout(driftTimer);observer.disconnect();document.removeEventListener('visibilitychange',visibilityChanged)}
  };
}

