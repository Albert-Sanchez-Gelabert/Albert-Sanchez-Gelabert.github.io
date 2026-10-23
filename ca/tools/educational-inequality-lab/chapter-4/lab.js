(()=>{
  'use strict';
  const root=document.getElementById('eil4-root');if(!root)return;
  const names=["La trajectòria esperada", "Més d’una via d’èxit", "Una segona sorpresa", "El significat sociològic", "La descoberta"];
  const screens=Array.from(root.querySelectorAll('[data-screen]'));
  const title=root.querySelector('[data-progress-title]');
  const number=root.querySelector('[data-progress-number]');
  const bars=Array.from(root.querySelectorAll('.eil4-progress-bars i'));
  const figures={
    stable:{color:'#13776a',label:"ALT I CONSTANT",values:[96,97,98,98,98,97,95]},
    recover:{color:'#b37b48',label:"EN MILLORA",values:[73,76,80,85,90,93,95]},
    decline:{color:'#b66559',label:"DESCENS TARDÀ",values:[85,86,86,83,52,8,0]}
  };
  const isRevealed={recovery:false,late:false};
  let step=0;
  const NS='http://www.w3.org/2000/svg';
  function el(tag,attrs={},parent=null,text=null){
    const n=document.createElementNS(NS,tag);
    for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));
    if(text!=null)n.textContent=text;
    if(parent)parent.appendChild(n);
    return n;
  }
  function plot(which){
    const svg=root.querySelector('[data-chart="'+which+'"]');
    if(!svg)return;svg.replaceChildren();
    el('title',{},svg,which==='recovery'?"Dues trajectòries modelitzades, una alta i constant i una altra en millora al llarg de set anys":"Trajectòria de descens tardà que comença amb rendiment alt i després perd progrés");
    el('desc',{},svg,'Curves are simplified approximations of typical patterns in Figure 1, not a plot of exact annual model predictions.');
    const x=i=>72+(i*95),y=v=>261-(v*2.10);
    [0,50,100].forEach(v=>{
      el('line',{x1:72,x2:664,y1:y(v),y2:y(v),stroke:'#dbe8e1','stroke-width':1},svg);
      el('text',{x:57,y:y(v)+4,'text-anchor':'end',fill:'#80948a','font-size':'13','font-family':'Arial'},svg,String(v));
    });
    el('text',{x:22,y:162,fill:'#759083','font-size':'12',transform:'rotate(-90 22 162)','font-family':'Arial'},svg,"Crèdits superats (%)");
    for(let i=0;i<7;i++){
      el('text',{x:x(i),y:287,'text-anchor':'middle',fill:'#769085','font-size':'13','font-family':'Arial'},svg,String(i+1));
    }
    el('text',{x:370,y:309,'text-anchor':'middle',fill:'#769085','font-size':'13','font-family':'Arial'},svg,"Curs acadèmic");
    function curve(data,maxIndex=6){
      const points=data.values.slice(0,maxIndex+1).map((v,i)=>`${i===0?'M':'L'} ${x(i)} ${y(v)}`).join(' ');
      el('path',{d:points,fill:'none',stroke:data.color,'stroke-width':'5','stroke-linejoin':'round','stroke-linecap':'round'},svg);
      data.values.slice(0,maxIndex+1).forEach((v,i)=>el('circle',{cx:x(i),cy:y(v),r:4.7,fill:data.color,stroke:'white','stroke-width':1.6},svg));
    }
    if(which==='recovery'){
      curve(figures.stable);
      if(isRevealed.recovery)curve(figures.recover);
    }else{
      if(isRevealed.late){curve(figures.decline);}else{
        curve(figures.decline,3);
        el('line',{x1:x(3)+13,x2:x(6),y1:y(83),y2:y(83),stroke:'#b66559','stroke-width':2,'stroke-dasharray':'6 10',opacity:.32},svg);
        el('text',{x:572,y:y(83)-12,'text-anchor':'middle',fill:'#b66559','font-size':13,'font-family':'Arial'},svg,"Què passa després?");
      }
    }
  }
  function show(i){
    step=Math.max(0,Math.min(screens.length-1,i));
    screens.forEach((s,j)=>s.hidden=j!==step);
    title.textContent=names[step];number.textContent=String(step+1).padStart(2,'0')+' / 05';
    bars.forEach((b,j)=>b.classList.toggle('is-complete',j<=step));
    if(step===1)plot('recovery');
    if(step===2)plot('late');
    root.querySelector('.eil4-progress').scrollIntoView({block:'start',behavior:'instant'});
  }
  function reveal(which){
    isRevealed[which]=true;
    root.querySelector('[data-before="'+which+'"]').hidden=true;
    root.querySelector('[data-after="'+which+'"]').hidden=false;
    root.querySelector('[data-next="'+which+'"]').hidden=false;
    if(which==='recovery')root.querySelector('[data-legend="recovery"]').hidden=false;
    plot(which);
  }
  root.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>show(Number(b.getAttribute('data-go')))));
  root.querySelectorAll('[data-reveal]').forEach(b=>b.addEventListener('click',()=>reveal(b.getAttribute('data-reveal'))));
  const reset=()=>{
    isRevealed.recovery=false;isRevealed.late=false;
    root.querySelectorAll('[data-before]').forEach(n=>n.hidden=false);
    root.querySelectorAll('[data-after],[data-next],[data-legend="recovery"]').forEach(n=>n.hidden=true);
    show(0);
  };
  root.querySelector('[data-restart]').addEventListener('click',reset);
  title.textContent=names[0];number.textContent='01 / 05';bars[0].classList.add('is-complete');
  screens.forEach((s,j)=>s.hidden=j!==0);
})();
