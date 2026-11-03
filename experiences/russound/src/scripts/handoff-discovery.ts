import { searchReviewProducts, type ReviewProduct } from '../data/handoff-catalog';

const modal=document.querySelector<HTMLDialogElement>('#rv-search-dialog');
if(modal){
 const input=modal.querySelector<HTMLInputElement>('#rv-search-input')!;
 const results=modal.querySelector<HTMLElement>('[data-rv-search-results]')!;
 const status=modal.querySelector<HTMLElement>('[data-rv-search-status]')!;
 let opener:HTMLElement|null=null;
 const card=(product:ReviewProduct)=>{
  const item=document.createElement('article');item.className='rv-search-result';
  const art=document.createElement('div');art.className='rv-search-art';
  if(product.image){const img=document.createElement('img');img.src=product.image;img.alt=`Russound ${product.id}`;img.width=180;img.height=130;art.append(img)}
  else{const text=document.createElement('span');text.textContent=product.id;art.append(text)}
  const body=document.createElement('div');
  const title=document.createElement('h3');title.textContent=product.id;
  const kind=document.createElement('p');kind.className='rv-search-kind';kind.textContent=product.name;
  const description=document.createElement('p');description.textContent=product.description;
  const links=document.createElement('div');links.className='rv-result-links';
  const productLink=document.createElement('a');productLink.href=product.href;productLink.textContent=product.legacy?'Original documentation':'Explore product';links.append(productLink);
  if(product.manual){const link=document.createElement('a');link.href=product.manual;link.textContent='Installation manual';links.append(link)}
  else if(!product.legacy){const link=document.createElement('a');link.href=product.source;link.textContent='Official resources';links.append(link)}
  body.append(title,kind,description,links);item.append(art,body);return item;
 };
 const search=()=>{
  const matches=searchReviewProducts(input.value);
  if(matches.length){results.replaceChildren(...matches.map(card));status.textContent=input.value.trim()?`${matches.length} ${matches.length===1?'result':'results'} for “${input.value.trim()}”.`:'A few places to begin.';}
  else{
   const empty=document.createElement('div');empty.className='rv-search-empty';
   const title=document.createElement('h3');title.textContent='Let’s look a little further.';
   const copy=document.createElement('p');copy.textContent='This selection does not have a matching result. Check the model number or use the complete Document Center. For installation and compatibility questions, contact Russound or your installer.';
   const link=document.createElement('a');link.href='https://russound.com/document-center/';link.textContent='Open the Document Center ↗';empty.append(title,copy,link);results.replaceChildren(empty);
   status.textContent=`No matching model or topic for “${input.value.trim()}”.`;
  }
 };
 document.querySelectorAll<HTMLAnchorElement>('[data-rv-search-open]').forEach(link=>link.addEventListener('click',event=>{
  if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();opener=link;
  document.querySelectorAll<HTMLDetailsElement>('#direction-header details').forEach(d=>d.open=false);
  if(!modal.open)modal.showModal();document.body.classList.add('rv-search-active');input.focus();search();
 }));
 modal.querySelector('[data-rv-search-close]')?.addEventListener('click',()=>modal.close());
 modal.addEventListener('click',event=>{
  if(event.target!==modal)return;const r=modal.getBoundingClientRect();
  if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();
 });
 modal.addEventListener('close',()=>{document.body.classList.remove('rv-search-active');opener?.focus({preventScroll:true})});
 modal.querySelector('form')?.addEventListener('submit',event=>{event.preventDefault();search()});
 modal.querySelectorAll<HTMLButtonElement>('[data-rv-query]').forEach(button=>button.addEventListener('click',()=>{input.value=button.dataset.rvQuery||'';search();input.focus()}));
}

const filterRoot=document.querySelector<HTMLElement>('[data-review-catalog]');
if(filterRoot){
 const family=filterRoot.querySelector<HTMLSelectElement>('[data-filter-family]')!;
 const group=filterRoot.querySelector<HTMLSelectElement>('[data-filter-group]')!;
 const use=filterRoot.querySelector<HTMLSelectElement>('[data-filter-use]')!;
 const input=filterRoot.querySelector<HTMLInputElement>('[data-filter-query]')!;
 const cards=[...filterRoot.querySelectorAll<HTMLElement>('[data-catalog-product]')];
 const count=filterRoot.querySelector<HTMLElement>('[data-filter-count]')!;
 const empty=filterRoot.querySelector<HTMLElement>('[data-filter-empty]')!;
 const setOption=(select:HTMLSelectElement,value:string|null)=>{if([...select.options].some(o=>o.value===value))select.value=value!};
 const readURL=()=>{const params=new URLSearchParams(location.search);setOption(family,params.get('family'));setOption(group,params.get('group'));setOption(use,params.get('use')==='outdoor'?'outdoors':params.get('use'));input.value=params.get('q')?.slice(0,100)||''};
 const apply=(update=true)=>{
  const q=input.value.trim().toLowerCase();let total=0;
  cards.forEach(card=>{
   const shown=(!family.value||card.dataset.family?.split(' ').includes(family.value))&&(!group.value||card.dataset.group===group.value)&&(!use.value||card.dataset.uses?.split(' ').includes(use.value))&&(!q||card.dataset.search?.includes(q)||card.dataset.search?.replace(/[^a-z0-9]/g,'').includes(q.replace(/[^a-z0-9]/g,'')));
   card.hidden=!shown;if(shown)total++;
  });
  count.textContent=`${total} ${total===1?'product':'products'}`;empty.hidden=total>0;
  if(update){const url=new URL(location.href);[['family',family.value],['group',group.value],['use',use.value],['q',input.value.trim()]].forEach(([key,value])=>value?url.searchParams.set(key,value):url.searchParams.delete(key));history.replaceState(null,'',url)}
 };
 [family,group,use].forEach(select=>select.addEventListener('change',()=>apply()));
 input.addEventListener('input',()=>apply());
 filterRoot.querySelector('[data-filter-reset]')?.addEventListener('click',()=>{family.value='';group.value='';use.value='';input.value='';apply();family.focus()});
 window.addEventListener('popstate',()=>{family.value='';group.value='';use.value='';readURL();apply(false)});
 readURL();apply(false);
}
