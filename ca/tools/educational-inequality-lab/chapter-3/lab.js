(()=>{
  'use strict';
  const root=document.querySelector('#eil3-root');if(!root)return;
  const VALUES={high:[{continuing:91,transfer:4.9,dropout:4.1},{continuing:88.7,transfer:8.3,dropout:3}],low:[{continuing:30.8,transfer:25.2,dropout:44},{continuing:34.2,transfer:35.4,dropout:30.4}]};
  const STEPS=["La decisió", "Les dades", "Què significa", "La descoberta"];
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
      group.querySelector('.eil3-bar').setAttribute('aria-label',group.querySelector('.eil3-group-head strong').textContent+': '+fmt(d.continuing)+' continuen, '+fmt(d.transfer)+' canvien, '+fmt(d.dropout)+' abandonen la universitat.');
    });
    credit.innerHTML=(low?'20':'80')+'<span>%</span>';
    meter.style.width=low?'20%':'80%';
    heading.innerHTML=low?"Quan les coses van malament, <em>les vies es bifurquen.</em>":"Quan les coses van bé, <em>la bretxa és petita.</em>";
    deck.innerHTML=low?"Ara comparem estudiants dels <strong>mateixos dos orígens familiars que només han superat el 20% dels crèdits.</strong> Amb resultats igualment baixos, les alternatives divergeixen.":"Comparem estudiants de diferents orígens familiars que han superat <strong>el 80% dels crèdits del primer curs.</strong> La majoria continua a la mateixa titulació i l’abandonament és baix en tots dos grups.";
    message.innerHTML=low?"<strong>La probabilitat de continuar a la mateixa titulació és força semblant: 30,8% i 34,2%.</strong><p>Però l’abandonament és més freqüent entre estudiants de famílies amb menys estudis (44,0% davant del 30,4%), mentre que canviar de titulació és més habitual entre els de famílies universitàries (35,4% davant del 25,2%).</p>":"<strong>Amb bons resultats, la probabilitat d’abandonar és baixa en tots dos grups.</strong><p>Amb el 80% de crèdits superats, l’abandonament predit és del 4,1% i del 3,0%. Ara observa què canvia quan els resultats del primer curs són baixos.</p>";
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