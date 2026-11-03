const header = document.getElementById('direction-header');
// Demonstration only: no form action, request, storage, or subscription is created.
document.querySelectorAll<HTMLElement>('[data-newsletter-preview]').forEach(preview => {
  const email = preview.querySelector<HTMLInputElement>('[data-newsletter-email]');
  const button = preview.querySelector<HTMLButtonElement>('[data-newsletter-button]');
  const status = preview.querySelector<HTMLElement>('[data-newsletter-status]');
  const showPreview = () => {
    if (!email?.reportValidity() || !status) return;
    status.textContent = 'Preview only. You have not been subscribed, and your email has not been saved.';
  };
  button?.addEventListener('click', showPreview);
  email?.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); showPreview(); }
  });
  email?.addEventListener('input', () => { if (status) status.textContent = ''; });
});
if (header) {
  const desktop = [...header.querySelectorAll<HTMLDetailsElement>('[data-rv-family], [data-rv-utility-menu]')];
  const mobile = header.querySelector<HTMLDetailsElement>('[data-rv-mobile]');
  const mobileFamilies = [...header.querySelectorAll<HTMLDetailsElement>('[data-rv-mobile-family]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const menus = [...desktop, ...(mobile ? [mobile] : [])];
  const motion = new Map<HTMLDetailsElement, {
    content: HTMLElement; summary: HTMLElement; expanded: boolean; animation: Animation | null;
  }>();
  menus.forEach(panel => {
    const content = panel.querySelector<HTMLElement>(':scope > .rv-dropdown, :scope > .rv-resource-dropdown, :scope > .rv-mobile-panel');
    const summary = panel.querySelector<HTMLElement>(':scope > summary');
    if (content && summary) motion.set(panel, { content, summary, expanded: panel.open, animation: null });
  });
  // Keep native details/name grouping as the no-script fallback. During an
  // enhanced close only the visual surface remains; its links become inert.
  const setMenu = (panel: HTMLDetailsElement, expanded: boolean, animate = true) => {
    const state = motion.get(panel);
    if (!state) { panel.open = expanded; return; }
    if (state.expanded === expanded && (animate ? state.animation || panel.open === expanded : !state.animation && panel.open === expanded)) return;
    if (expanded) menus.forEach(other => {
      // Settle the previous panel before opening its peer, so overlapping
      // full-width directories cannot obscure the requested category.
      if (other !== panel) setMenu(other, false, false);
    });
    const wasVisible = panel.open;
    const pose = wasVisible ? getComputedStyle(state.content) : null;
    const start = { opacity: pose?.opacity ?? '0', transform: pose?.transform ?? 'translateY(-6px)' };
    state.animation?.cancel();
    state.animation = null;
    state.expanded = expanded;
    state.summary.setAttribute('aria-expanded', String(expanded));
    if (!expanded && state.content.contains(document.activeElement)) state.summary.focus({ preventScroll: true });
    state.content.inert = !expanded;
    state.content.setAttribute('aria-hidden', String(!expanded));
    if (expanded) panel.open = true;
    const settle = () => {
      state.animation?.cancel();
      state.animation = null;
      panel.removeAttribute('data-menu-motion');
      panel.open = expanded;
      if (!expanded && panel === mobile) mobileFamilies.forEach(family => { family.open = false; });
    };
    if (!animate || reduced.matches || typeof state.content.animate !== 'function' || (!expanded && !wasVisible)) {
      settle(); return;
    }
    panel.dataset.menuMotion = expanded ? 'opening' : 'closing';
    const animation = state.content.animate([
      start,
      { opacity: expanded ? '1' : '0', transform: expanded ? 'translateY(0)' : 'translateY(-4px)' },
    ], { duration: expanded ? 240 : 160, easing: expanded ? 'cubic-bezier(.22,1,.36,1)' : 'cubic-bezier(.4,0,1,1)', fill: 'both' });
    state.animation = animation;
    // Reversal starts from the painted pose. A canceled completion cannot
    // finish an older request after the visitor changes direction.
    animation.finished.then(() => { if (state.animation === animation) settle(); }, () => {});
  };
  motion.forEach((state, panel) => {
    state.summary.addEventListener('click', event => {
      if (typeof state.content.animate !== 'function') return;
      event.preventDefault();
      setMenu(panel, !state.expanded);
    });
    panel.addEventListener('toggle', () => {
      if (state.animation && panel.open) return;
      if (state.expanded !== panel.open) setMenu(panel, panel.open, false);
    });
  });
  const closeNavigation = (animate = true) => menus.forEach(panel => setMenu(panel, false, animate));
  mobileFamilies.forEach(panel => panel.addEventListener('toggle', () => {
    if(panel.open) mobileFamilies.forEach(other => { if(other!==panel) other.open=false; });
  }));
  header.addEventListener('click', event => {
    // Follow a selected destination immediately rather than delaying the
    // navigation for a decorative exit, including same-page anchor links.
    if ((event.target as Element).closest('a')) closeNavigation(false);
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target as Node)) closeNavigation();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const focused=document.activeElement;
    const nested=mobileFamilies.find(panel=>panel.open && panel.contains(focused));
    const openPanel=nested || desktop.find(panel=>motion.get(panel)?.expanded) || (mobile && motion.get(mobile)?.expanded ? mobile : null);
    if(openPanel){event.preventDefault();setMenu(openPanel,false);openPanel.querySelector<HTMLElement>(':scope > summary')?.focus({preventScroll:true});}
  });
  header.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!header.contains(document.activeElement)) closeNavigation();
    });
  });
  matchMedia('(max-width: 1239px)').addEventListener('change', () => closeNavigation(false));
  reduced.addEventListener('change', () => {
    if (reduced.matches) motion.forEach(state => state.animation?.finish());
  });
}

// One masked slide enters as the outgoing one leaves. Keep the active link
// stable while reading, and do not animate an offscreen announcement strip.
const announcements = document.querySelector<HTMLElement>('[data-announcements]');
if (announcements) {
 const slides = [...announcements.querySelectorAll<HTMLAnchorElement>('[data-announcement]')];
 const toggle = announcements.querySelector<HTMLButtonElement>('[data-announcement-toggle]');
 const previous = announcements.querySelector<HTMLButtonElement>('[data-announcement-previous]');
 const next = announcements.querySelector<HTMLButtonElement>('[data-announcement-next]');
 const status = announcements.querySelector<HTMLElement>('[data-announcement-status]');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 let index = 0, paused = reduced.matches, hovered = false, transitioning = false;
 let animations: Animation[] = [];
 let announceSelection = false;
 const drawControls = () => {
  toggle?.setAttribute('aria-label',paused?'Play announcements':'Pause announcements');
  toggle?.querySelector('path')?.setAttribute('d',paused?'m9 5 10 7-10 7Z':'M9 5v14M15 5v14');
 };
 const settle = () => {
  slides.forEach((slide,i)=>{
   // Keep both grid items in layout to reserve the tallest message at every
   // width/text size. Inactive content remains invisible and unfocusable.
   slide.hidden=false;
   slide.toggleAttribute('data-inactive',i!==index);
   slide.inert=i!==index;
   if(i===index)slide.removeAttribute('aria-hidden');
   else slide.setAttribute('aria-hidden','true');
  });
  animations=[];
  transitioning=false;
  if(announceSelection && status){
   const message=slides[index].querySelector('.ho-announcement-message')?.textContent || '';
   const label=slides[index].querySelector('strong')?.firstChild?.textContent?.trim() || '';
   status.textContent=`Announcement ${index+1} of ${slides.length}: ${message} ${label}.`;
  }
  announceSelection=false;
 };
 const advance = (direction = 1, manual = false) => {
  if(transitioning || slides.length<2)return;
  announceSelection=manual;
  const outgoing=slides[index];
  index=(index+direction+slides.length)%slides.length;
  const incoming=slides[index];
  if(reduced.matches){settle();return;}
  transitioning=true;
  outgoing.inert=true;
  outgoing.setAttribute('aria-hidden','true');
  incoming.hidden=false;
  incoming.removeAttribute('data-inactive');
  // Incoming becomes accessible only when it is in its readable resting pose.
  const timing={duration:760,easing:'cubic-bezier(.22,1,.36,1)'};
  animations=[
   outgoing.animate([{transform:'translate3d(0,0,0)'},{transform:`translate3d(${-direction*100}%,0,0)`}],timing),
   incoming.animate([{transform:`translate3d(${direction*100}%,0,0)`},{transform:'translate3d(0,0,0)'}],timing),
  ];
  Promise.all(animations.map(animation=>animation.finished)).then(settle,settle);
 };
 [toggle,previous,next].forEach(control=>{if(control)control.hidden=slides.length<2;});
 // Focusing the strip stops rotation. Preserve pointer intent so clicking
 // "Pause" does not immediately restart it after that focus event.
 let pausedBeforePointer = paused;
 toggle?.addEventListener('pointerdown',()=>{pausedBeforePointer=paused});
 toggle?.addEventListener('click',event=>{paused=!(event.detail>0?pausedBeforePointer:paused);drawControls()});
 previous?.addEventListener('click',()=>{paused=true;drawControls();advance(-1,true)});
 next?.addEventListener('click',()=>{paused=true;drawControls();advance(1,true)});
 announcements.addEventListener('pointerenter',()=>hovered=true);
 announcements.addEventListener('pointerleave',()=>hovered=false);
 announcements.addEventListener('focusin',()=>{
  paused=true;drawControls();
  // Keyboard access to the strip must never leave a focused control offscreen.
  if(announcements.getBoundingClientRect().top<0)window.scrollTo({top:0,behavior:'instant'});
 });
 reduced.addEventListener('change',event=>{
  if(event.matches){paused=true;animations.forEach(animation=>animation.finish());drawControls();}
 });
 const timer=window.setInterval(()=>{
  if(!paused&&!hovered&&!document.hidden&&announcements.getBoundingClientRect().bottom>0) advance();
 },8000);
 window.addEventListener('pagehide',event=>{if(!event.persisted)clearInterval(timer)});
 settle();drawControls();
}
if (header) {
 const root=document.documentElement;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const desktopLayout=matchMedia('(min-width:1240px)');
 const brandBar=header.querySelector<HTMLElement>('.rv-brand-bar');
 const scrollPosition=()=>Math.max(0,Math.min(window.scrollY,root.scrollHeight-window.innerHeight));
 let stripHeight=0, headerHeight=0, brandHeight=0, frame=0, lastY=scrollPosition();
 let direction=0, travel=0, pointerHeld=false;
 const setCollapsed=(collapsed:boolean)=>{
  header.toggleAttribute('data-scroll-hidden',collapsed);
  root.style.setProperty('--handoff-nav-hidden',`${collapsed && desktopLayout.matches ? brandHeight : 0}px`);
 };
 const resetTravel=()=>{
  lastY=scrollPosition();direction=0;travel=0;
 };
 const revealHeader=()=>{setCollapsed(false);resetTravel();};
 const measureScroll = () => {
  frame=0;
  const y=scrollPosition(), delta=y-lastY;
  lastY=y;
  root.style.setProperty('--handoff-announcement-hidden',`${Math.min(stripHeight,y)}px`);
  // Reduced motion keeps navigation pinned. Opening or focusing a lower-row
  // control freezes its existing position instead of moving it under the user.
  if(reduced.matches || y<=stripHeight+12){
   revealHeader();return;
  }
  if(pointerHeld || header.querySelector('details[open], :focus-visible')){resetTravel();return;}
  if(Math.abs(delta)<.5)return;
  const nextDirection=Math.sign(delta);
  travel=nextDirection===direction?travel+Math.abs(delta):Math.abs(delta);
  direction=nextDirection;
  // Deliberate hysteresis: small trackpad corrections cannot flicker the bar.
  if(direction>0 && y>headerHeight+32 && travel>=24)setCollapsed(true);
  else if(direction<0 && travel>=10)setCollapsed(false);
 };
 const measureHeader = () => {
  headerHeight=header.getBoundingClientRect().height;
  stripHeight=announcements?.getBoundingClientRect().height || 0;
  brandHeight=desktopLayout.matches ? brandBar?.getBoundingClientRect().height || 0 : 0;
  root.style.setProperty('--handoff-header-height',`${headerHeight}px`);
  root.style.setProperty('--handoff-announcement-height',`${stripHeight}px`);
  root.style.setProperty('--handoff-nav-height',`${headerHeight-stripHeight}px`);
  root.style.setProperty('--handoff-brand-height',`${brandHeight}px`);
  header.setAttribute('data-scroll-ready','');
  revealHeader();
  measureScroll();
 };
 const onScroll=()=>{if(!frame)frame=requestAnimationFrame(measureScroll)};
 const needsUpperRow=(target:EventTarget|null)=>!desktopLayout.matches || target instanceof Node && (brandBar?.contains(target) || announcements?.contains(target));
 const onFocusIn=(event:FocusEvent)=>{if(needsUpperRow(event.target))revealHeader();else resetTravel();};
 const onPointerDown=(event:PointerEvent)=>{pointerHeld=true;if(needsUpperRow(event.target))revealHeader();else resetTravel();};
 const onPointerUp=()=>{pointerHeld=false;lastY=scrollPosition();direction=0;travel=0};
 const onMenuToggle=(event:Event)=>{if((event.target as HTMLDetailsElement).open){if(needsUpperRow(event.target))revealHeader();else resetTravel();}};
 // Resolve the destination's final header state before native anchor scrolling
 // reads scroll-padding. Downward links land below the compact product row;
 // upward links leave room for the returning brand/resources row.
 const onSectionLink=(event:MouseEvent)=>{
  if(!desktopLayout.matches || event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
  const link=(event.target as Element).closest<HTMLAnchorElement>('a[href]');
  if(!link || link.hasAttribute('download') || link.target==='_blank')return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin || url.pathname!==location.pathname || url.search!==location.search || !url.hash)return;
  let target:HTMLElement|null=null;
  try{target=document.getElementById(decodeURIComponent(url.hash.slice(1)));}catch{return;}
  if(!target)return;
  setCollapsed(!reduced.matches && target.getBoundingClientRect().top>headerHeight);
  resetTravel();
 };
 const observer = new ResizeObserver(measureHeader);observer.observe(header);measureHeader();
 window.addEventListener('scroll',onScroll,{passive:true});
 header.addEventListener('focusin',onFocusIn);
 header.addEventListener('pointerdown',onPointerDown);
 header.addEventListener('toggle',onMenuToggle,true);
 window.addEventListener('pointerup',onPointerUp);
 window.addEventListener('pointercancel',onPointerUp);
 window.addEventListener('blur',onPointerUp);
 window.addEventListener('pageshow',measureHeader);
 document.addEventListener('click',onSectionLink);
 desktopLayout.addEventListener('change',measureHeader);
 reduced.addEventListener('change',revealHeader);
 window.addEventListener('pagehide',event=>{if(!event.persisted){
  observer.disconnect();cancelAnimationFrame(frame);
  window.removeEventListener('scroll',onScroll);
  header.removeEventListener('focusin',onFocusIn);
  header.removeEventListener('pointerdown',onPointerDown);
  header.removeEventListener('toggle',onMenuToggle,true);
  window.removeEventListener('pointerup',onPointerUp);
  window.removeEventListener('pointercancel',onPointerUp);
  window.removeEventListener('blur',onPointerUp);
  window.removeEventListener('pageshow',measureHeader);
  document.removeEventListener('click',onSectionLink);
  desktopLayout.removeEventListener('change',measureHeader);
  reduced.removeEventListener('change',revealHeader);
 }});
}
