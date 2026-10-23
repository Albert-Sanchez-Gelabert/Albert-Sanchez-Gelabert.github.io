(()=>{
  'use strict';
  const root=document.querySelector('#eil3-root');if(!root)return;
  const VALUES={high:[{continuing:91,transfer:4.9,dropout:4.1},{continuing:88.7,transfer:8.3,dropout:3}],low:[{continuing:30.8,transfer:25.2,dropout:44},{continuing:34.2,transfer:35.4,dropout:30.4}]};
  const STEPS=["La decisión", "Los datos", "Qué significa", "El descubrimiento"];
  const screens=Array.from(root.querySelectorAll('[data-screen]'));
  const progress=root.querySelector('[data-progress-title]');
  const counter=root.querySelector('[data-progress-number]');
  const bars=Array.from(root.querySelectorAll('.eil3-progress-bars i'));
  const switcher=root.querySelector('[data-switch]');
  const next=root.querySelector('[data-next-after]');
  const replay=root.querySelector('[data-compare-again]');
  const message=root.querySelector('[data-evidence-message]');
  const meter=root.querySelector('[data-credit-meter]');
  const credit=root.querySelector('[data-credit-number]');
  const heading=root.querySelector('#eil3-figure-title');
  const deck=root.querySelector('#eil3-figure-deck');
  let step=0, mode='high';
  const fmt=n=>Number(n).toFixed(1)+'%';
  function renderEvidence(which){
    mode=which;const low=mode==='low';root.dataset.mode=mode;
    root.querySelectorAll('[data-group]').forEach((group,index)=>{
      const d=VALUES[mode][index],total=d.continuing+d.transfer+d.dropout;
      for(const key of ['continuing','transfer','dropout']){
        group.querySelector('[data-outcome="'+key+'"]').style.width=(100*d[key]/total)+'%';
        group.querySelector('[data-value="'+key+'"]').textContent=fmt(d[key]);
      }
      group.querySelector('.eil3-bar').setAttribute('aria-label',group.querySelector('.eil3-group-head strong').textContent+': '+fmt(d.continuing)+' continúan, '+fmt(d.transfer)+' cambian, '+fmt(d.dropout)+' abandonan la universidad.');
    });
    credit.innerHTML=(low?'20':'80')+'<span>%</span>';
    meter.style.width=low?'20%':'80%';
    heading.innerHTML=low?"Cuando las cosas van mal, <em>los caminos divergen.</em>":"Cuando las cosas van bien, <em>la brecha es pequeña.</em>";
    deck.innerHTML=low?"Ahora comparemos estudiantes de los <strong>mismos dos orígenes familiares que solo han superado el 20% de los créditos.</strong> Con resultados igualmente bajos, las alternativas divergen.":"Comparemos estudiantes de distintos orígenes familiares que han superado <strong>el 80% de los créditos del primer curso.</strong> La mayoría continúa en la misma titulación y el abandono es bajo en ambos grupos.";
    message.innerHTML=low?"<strong>La probabilidad de continuar en la misma titulación es bastante parecida: 30,8% y 34,2%.</strong><p>Pero el abandono es más frecuente entre estudiantes de familias con menos estudios (44,0% frente al 30,4%), mientras que cambiar de titulación es más habitual entre los de familias universitarias (35,4% frente al 25,2%).</p>":"<strong>Con buenos resultados, la probabilidad de abandonar es baja en ambos grupos.</strong><p>Con el 80% de créditos superados, el abandono predicho es del 4,1% y del 3,0%. Ahora observa qué cambia cuando los resultados del primer curso son bajos.</p>";
    switcher.hidden=low;
    next.hidden=!low;
    replay.hidden=!low;
  }
  function showStep(i,{scroll=true}={}){
    step=Math.max(0,Math.min(i,screens.length-1));
    screens.forEach((s,j)=>s.hidden=j!==step);
    progress.textContent=STEPS[step];
    counter.textContent=String(step+1).padStart(2,'0')+' / 04';
    bars.forEach((b,j)=>b.classList.toggle('is-complete',j<=step));
    if(scroll){const top=root.querySelector('.eil3-progress');top.scrollIntoView({behavior:'auto',block:'start'});}
  }
  root.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showStep(Number(b.dataset.go))));
  switcher.addEventListener('click',()=>renderEvidence('low'));
  replay.addEventListener('click',()=>renderEvidence('high'));
  root.querySelector('[data-restart]').addEventListener('click',()=>{renderEvidence('high');showStep(0)});
  renderEvidence('high');showStep(0,{scroll:false});
})();