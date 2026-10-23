(()=>{
  'use strict';
  const root=document.getElementById('eil5-root');if(!root)return;
  const screens=Array.from(root.querySelectorAll('[data-screen]'));
  const names=["La promesa", "Comparación de tres vías", "El descubrimiento"];
  const bars=Array.from(root.querySelectorAll('.eil5-progress-bars i'));
  const title=root.querySelector('[data-progress-title]');
  const count=root.querySelector('[data-progress-number]');
  const comparison=root.querySelector('[data-benchmark]');
  const comparisonTitle=root.querySelector('[data-outcomes-title]');
  const online=root.querySelector('[data-online-route]');
  const panel=root.querySelector('[data-online-panel]');
  const trigger=root.querySelector('[data-online-trigger]');
  const next=root.querySelector('[data-next="online"]');
  const segments=Array.from(online.querySelectorAll('.eil5-stacked > span'));
  let active=0,revealed=false;
  function show(index){
    active=Math.min(screens.length-1,Math.max(0,index));
    screens.forEach((el,i)=>{el.hidden=i!==active});
    title.textContent=names[active];
    count.textContent=String(active+1).padStart(2,'0')+' / 03';
    bars.forEach((el,i)=>el.classList.toggle('is-complete',i<=active));
    const progress=root.querySelector('.eil5-progress');
    if(progress)progress.scrollIntoView({block:'start',behavior:'instant'});
  }
  function revealOnline(){
    if(revealed)return;
    revealed=true;
    trigger.hidden=true;
    online.hidden=false;
    panel.hidden=false;
    next.hidden=false;
    comparisonTitle.textContent="Comparación de tres vías";
    const draw=()=>segments.forEach(el=>el.style.width=el.dataset.width);
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){draw();}
    else{requestAnimationFrame(()=>requestAnimationFrame(draw));}
    comparison.scrollIntoView({block:'start',behavior:'smooth'});
  }
  function restart(){
    revealed=false;
    trigger.hidden=false;
    online.hidden=true;
    panel.hidden=true;
    next.hidden=true;
    comparisonTitle.textContent="Dos vías para comparar";
    segments.forEach(el=>el.style.width='0%');
    show(0);
  }
  root.querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>show(Number(btn.dataset.go))));
  root.querySelector('[data-reveal="online"]').addEventListener('click',revealOnline);
  root.querySelector('[data-restart]').addEventListener('click',restart);
  show(0);
})();
