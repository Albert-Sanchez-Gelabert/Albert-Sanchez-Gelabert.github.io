(()=>{
  'use strict';
  const root=document.querySelector('#eil3-root');if(!root)return;
  const VALUES={high:[{continuing:91,transfer:4.9,dropout:4.1},{continuing:88.7,transfer:8.3,dropout:3}],low:[{continuing:30.8,transfer:25.2,dropout:44},{continuing:34.2,transfer:35.4,dropout:30.4}]};
  const STEPS=['The decision','The evidence','What it means','The discovery'];
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
      group.querySelector('.eil3-bar').setAttribute('aria-label',group.querySelector('.eil3-group-head strong').textContent+': '+fmt(d.continuing)+' continue, '+fmt(d.transfer)+' transfer, '+fmt(d.dropout)+' leave university.');
    });
    credit.innerHTML=(low?'20':'80')+'<span>%</span>';
    meter.style.width=low?'20%':'80%';
    heading.innerHTML=low?'When things go wrong, <em>the pathways diverge.</em>':'When things go well, <em>the gap is small.</em>';
    deck.innerHTML=low?'Now compare students from the <strong>same two family backgrounds after passing only 20% of their credits.</strong> With similar poor results, their alternatives differ.':'Let’s compare students with different family backgrounds who passed <strong>80% of their first-year credits.</strong> Most remain in the same degree, and dropout is low in both groups.';
    message.innerHTML=low?'<strong>The chance of remaining in the same degree is relatively close: 30.8% and 34.2%.</strong><p>But leaving university is more common among students from less-educated families (44.0% vs 30.4%), while transferring to another degree is more common among those from university-educated families (35.4% vs 25.2%).</p>':'<strong>With strong results, the likelihood of dropping out is low in both groups.</strong><p>At 80% of credits passed, predicted dropout is 4.1% and 3.0%. Now see what changes when first-year results are poor.</p>';
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