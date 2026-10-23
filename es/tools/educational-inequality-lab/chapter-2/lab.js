/* Beyond Merit / Chapter 02. Source figures are approximations; Appendix contrasts exact. */
const EILLN_DATA = [[18,0.797,0.775,0.747,-2.8],[19,0.78,0.759,0.726,-3.3],[20,0.761,0.743,0.705,-3.8],[21,0.743,0.726,0.683,-4.3],[22,0.724,0.709,0.662,-4.7],[23,0.704,0.692,0.64,-5.2],[24,0.686,0.677,0.621,-5.6],[25,0.668,0.661,0.601,-6.0],[26,0.649,0.646,0.582,-6.4],[27,0.631,0.631,0.564,-6.7],[28,0.614,0.617,0.547,-7.0],[29,0.599,0.603,0.531,-7.2],[30,0.583,0.59,0.516,-7.4],[31,0.569,0.578,0.503,-7.5],[32,0.554,0.567,0.491,-7.6],[33,0.543,0.556,0.48,-7.6],[34,0.53,0.546,0.47,-7.6],[35,0.52,0.537,0.461,-7.6],[36,0.51,0.528,0.453,-7.5],[37,0.502,0.52,0.446,-7.4],[38,0.493,0.514,0.441,-7.3],[39,0.488,0.508,0.437,-7.1],[40,0.481,0.503,0.434,-6.9],[41,0.478,0.498,0.431,-6.7],[42,0.474,0.495,0.43,-6.5]];
(() => {
  'use strict';
  const root = document.getElementById('eilln-root');
  if (!root) return;
  const scenes = [...root.querySelectorAll('[data-scene]')];
  const progressLabels = ["EL CONTEXTO", "SIGUE A LOS ESTUDIANTES", "DENTRO DEL PROMEDIO", "LOS PERFILES", "EL CURSO DE VIDA", "EL DESCUBRIMIENTO"];
  let scene = 0;
  let flowRevealed = false;
  let employment = false;
  let focusAge = 18;

  function selector(query){return root.querySelector(query);}
  function all(query){return [...root.querySelectorAll(query)];}
  function toggle(el,visible){el.hidden=!visible;}
  function updateScene(target){
    scene=Math.max(0,Math.min(scenes.length-1,target));
    scenes.forEach((s,i)=>s.hidden = i!==scene);
    selector('[data-progress-label]').textContent=progressLabels[scene];
    selector('[data-progress-count]').textContent=String(scene+1).padStart(2,'0')+' / 06';
    all('.eilln-progress-bar > span').forEach((dot,i)=>{dot.classList.toggle('done',i<scene);dot.classList.toggle('current',i===scene);});
    if(scene===1) drawFlow();
    if(scene===4) drawAge();
    selector('.eilln-progress').scrollIntoView({block:'start',behavior:'instant'});
  }
  function setNextEnabled(index,enabled){
    const button=scenes[index].querySelector('[data-next]');
    if(button)button.disabled=!enabled;
  }
  const FLOW_GROUPS=[
    {key:'t',name:"Tradicionales",total:1182,stayed:1107,left:75,color:'#318c79'},
    {key:'n',name:"No tradicionales",total:326,stayed:279,left:47,color:'#bd835f'}
  ];
  function ribbon(x1,x2,a0,a1,b0,b1){
    const mid=(x1+x2)/2;
    return `M${x1},${a0} C${mid},${a0} ${mid},${b0} ${x2},${b0} L${x2},${b1} C${mid},${b1} ${mid},${a1} ${x1},${a1} Z`;
  }
  function flowCoordinates(){
    const groups=FLOW_GROUPS.map(g=>{
      return {...g,total:g.total,stay:g.stayed,leave:g.left};
    });
    const denominator=groups.reduce((a,g)=>a+g.total,0);
    const scale=298/denominator, top=75, gap=38;
    let sy=top;
    const source=groups.map((g,i)=>{
      const y=sy; sy+=g.total*scale+gap;
      return {...g,y,h:g.total*scale,stayH:g.stay*scale,leftH:g.leave*scale};
    });
    const stayH=source.reduce((s,g)=>s+g.stayH,0);
    const leftH=source.reduce((s,g)=>s+g.leftH,0);
    let sp=top,lp=top+stayH+gap;
    const ribbons=[];
    source.forEach((g,i)=>{
      ribbons.push({key:g.key+'-stay',color:g.color,leave:false, a0:g.y,a1:g.y+g.stayH, b0:sp,b1:sp+g.stayH}); sp+=g.stayH;
      ribbons.push({key:g.key+'-left',color:g.color,leave:true, a0:g.y+g.stayH,a1:g.y+g.h, b0:lp,b1:lp+g.leftH}); lp+=g.leftH;
    });
    return {source,stayY:top,stayH,leaveY:top+stayH+gap,leaveH:leftH,ribbons};
  }
  function drawFlow(){
    const host=selector('[data-flow-svg]');
    if(!host)return;
    const l=flowCoordinates();
    const sv=(tag,attr={},value)=>{
      const el=document.createElementNS('http://www.w3.org/2000/svg',tag);
      Object.entries(attr).forEach(([k,v])=>el.setAttribute(k,String(v)));
      if(value!==undefined)el.textContent=String(value);
      return el;
    };
    host.replaceChildren();
    host.appendChild(sv('text',{x:230,y:33,'text-anchor':'end',class:'eilln-flow-axis'},"ESTUDIANTES DE LA COHORTE"));
    if(flowRevealed){
      host.appendChild(sv('text',{x:787,y:33,class:'eilln-flow-axis'},"QUÉ OCURRIÓ DESPUÉS"));
      l.ribbons.forEach(r=>host.appendChild(sv('path',{d:ribbon(260,750,r.a0,r.a1,r.b0,r.b1),fill:r.color,'fill-opacity':r.leave?.80:.34,class:'eilln-flow-ribbon'+(r.leave?' is-leaving':'')})));
    }
    l.source.forEach((g,i)=>{
      host.appendChild(sv('rect',{x:231,y:g.y,width:28,height:Math.max(1,g.h),rx:3,fill:g.color}));
      const mid=g.y+g.h/2;
      const name=sv('text',{x:219,y:mid-6,'text-anchor':'end',class:'eilln-flow-name'},g.name);
      const nval=g.total.toLocaleString('es-ES')+" estudiantes";
      const count=sv('text',{x:219,y:mid+14,'text-anchor':'end',class:'eilln-flow-count'},nval);
      host.append(name,count);
    });
    if(flowRevealed){
      host.appendChild(sv('rect',{x:751,y:l.stayY,width:28,height:l.stayH,rx:3,fill:'#8eafa0'}));
      host.appendChild(sv('rect',{x:751,y:l.leaveY,width:28,height:l.leaveH,rx:3,fill:'#b86b54'}));
      host.appendChild(sv('text',{x:794,y:l.stayY+l.stayH/2-7,class:'eilln-flow-name'},"Siguieron matriculados"));
      host.appendChild(sv('text',{x:794,y:l.stayY+l.stayH/2+13,class:'eilln-flow-count'},"1.386 estudiantes"));
      host.appendChild(sv('text',{x:794,y:l.leaveY+l.leaveH/2-5,class:'eilln-flow-name'},"Abandonaron la universidad"));
      host.appendChild(sv('text',{x:794,y:l.leaveY+l.leaveH/2+15,class:'eilln-flow-count'},"122 estudiantes"));
    }
    host.classList.toggle('is-revealed',flowRevealed);
    [['trad',FLOW_GROUPS[0]],['non',FLOW_GROUPS[1]]].forEach(([key,g])=>{
      const groupWidth=g.total/1508*100;
      const fill=selector(`[data-mobile-${key}-fill]`);
      fill.style.width=groupWidth+'%';
      const stay=selector(`[data-mobile-${key}-stay]`),left=selector(`[data-mobile-${key}-left]`);
      stay.style.width=flowRevealed?(g.stayed/g.total*100)+'%':'100%';
      left.style.width=flowRevealed?(g.left/g.total*100)+'%':'0%';
      selector(`[data-mobile-${key}-caption]`).textContent=g.total.toLocaleString('es-ES')+' / 1,508';
      selector(`[data-mobile-${key}-detail]`).textContent=flowRevealed ? `${(g.stayed/g.total*100).toFixed(1)}% continúan · ${(g.left/g.total*100).toFixed(1)}% abandonan` : `${(g.total/1508*100).toFixed(1)}% de la muestra`;
    });
    selector('[data-flow-mobile-heading]').textContent=flowRevealed?"Tamaño real de los grupos, según permanencia o abandono":"¿Qué tamaño tiene cada grupo entre los estudiantes con rendimiento alto?";
  }
  function revealFlow(){
    if(flowRevealed)return;
    flowRevealed=true;
    toggle(selector('[data-flow-prompt]'),false);
    toggle(selector('[data-flow-revealed]'),true);
    toggle(selector('[data-flow-meaning]'),true);
    setNextEnabled(1,true);
    drawFlow();
  }
  function svgElem(tag,attrs={},value){
    const node=document.createElementNS('http://www.w3.org/2000/svg',tag);
    Object.entries(attrs).forEach(([name,val])=>node.setAttribute(name,String(val)));
    if(value!==undefined)node.textContent=String(value);
    return node;
  }
  function pointPath(col,fx,fy){return EILLN_DATA.map((v,i)=>`${i?'L':'M'}${fx(v[0]).toFixed(2)},${fy(v[col]).toFixed(2)}`).join(' ');}
  function drawAge(){
    const svg=selector('[data-age-plot]');
    const W=900,H=440,L=66,R=754,T=43,B=372;
    const x=age=>L+(age-18)/24*(R-L);
    const y=p=>B-(p-0.35)/(.85-.35)*(B-T);
    svg.replaceChildren();
    for(const p of [.4,.5,.6,.7,.8]){
      svg.appendChild(svgElem('line',{x1:L,x2:R,y1:y(p),y2:y(p),class:'eilln-gridline'}));
      svg.appendChild(svgElem('text',{x:L-14,y:y(p)+5,'text-anchor':'end',class:'eilln-axis'},Math.round(p*100)+'%'));
    }
    for(const age of [18,22,26,30,34,38,42]){
      svg.appendChild(svgElem('text',{x:x(age),y:B+26,'text-anchor':'middle',class:'eilln-axis'},age));
    }
    svg.appendChild(svgElem('text',{x:L,y:21,class:'eilln-axis-name'},"Probabilidad predicha de graduación"));
    svg.appendChild(svgElem('text',{x:(L+R)/2,y:H-7,'text-anchor':'middle',class:'eilln-axis-name'},"Edad de entrada en la universidad"));
    const paths=[['overall',1],['notworking',2],['working',3]];
    paths.forEach(([klass,index])=>svg.appendChild(svgElem('path',{d:pointPath(index,x,y),class:'eilln-age-line '+klass})));
    if(employment){
      const v=EILLN_DATA[focusAge-18];
      svg.appendChild(svgElem('line',{x1:x(focusAge),x2:x(focusAge),y1:T,y2:B,stroke:'#8caa99','stroke-dasharray':'5 5','stroke-width':1.5}));
      [2,3].forEach((col,i)=>svg.appendChild(svgElem('circle',{cx:x(focusAge),cy:y(v[col]),r:7,fill:'#fff',stroke:i===0?'#be6c56':'#5c9bb9','stroke-width':3.4})));
      const last=EILLN_DATA.at(-1);
      svg.appendChild(svgElem('text',{x:R+13,y:y(last[2])+4,class:'eilln-axis-name',fill:'#be6c56'},"No trabajan"));
      svg.appendChild(svgElem('text',{x:R+13,y:y(last[3])+4,class:'eilln-axis-name',fill:'#5c9bb9'},"Trabajan"));
    } else {
      const end=EILLN_DATA.at(-1);
      svg.appendChild(svgElem('text',{x:R+12,y:y(end[1])+4,class:'eilln-axis-name'},"Todos los estudiantes"));
    }
    svg.classList.toggle('revealed',employment);
  }
  function updateFocus(age){
    focusAge=age;
    all('[data-focus-age]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.focusAge===age)));
    selector('[data-gap-number]').textContent=age===18?'≈3':'≈8';
    selector('[data-gap-context]').textContent=age===18?
      "A los 18 años, la diferencia modelizada entre trabajar y no trabajar es de −2,8 puntos porcentuales.":
      "A los 35 años, la diferencia modelizada entre trabajar y no trabajar es de −7,6 puntos porcentuales.";
    drawAge();
  }
  function revealWork(){
    if(employment)return;
    employment=true;
    toggle(selector('[data-reveal-work-panel]'),false);
    toggle(selector('[data-work-reading]'),true);
    toggle(selector('[data-learning-age]'),true);
    selector('[data-age-step]').textContent="AÑADE AHORA LA SITUACIÓN LABORAL";
    selector('[data-age-headline]').textContent="El patrón por edad se mantiene, pero ahora hay dos trayectorias.";
    selector('[data-age-description]').textContent="En el rango de edad principal, los estudiantes que trabajan tienen probabilidades modelizadas de graduación más bajas que los que no trabajan.";
    selector('[data-legend]').innerHTML='<span class="eilln-legend-label"><i class="eilln-key red"></i> No trabajan</span><span class="eilln-legend-label"><i class="eilln-key blue"></i> Trabajan</span>';
    setNextEnabled(4,true);
    updateFocus(18);
  }
  all('[data-next]').forEach(button=>button.addEventListener('click',()=>updateScene(scene+1)));
  all('[data-back]').forEach(button=>button.addEventListener('click',()=>updateScene(scene-1)));
  selector('[data-flow-reveal]').addEventListener('click',revealFlow);
  selector('[data-add-work]').addEventListener('click',revealWork);
  all('[data-focus-age]').forEach(b=>b.addEventListener('click',()=>updateFocus(+b.dataset.focusAge)));
  selector('[data-restart]').addEventListener('click',()=>{
    // On restart, return the narrative reveals to their initial state.
    employment=false;focusAge=18;flowRevealed=false;
    toggle(selector('[data-flow-prompt]'),true);
    toggle(selector('[data-flow-revealed]'),false);
    toggle(selector('[data-flow-meaning]'),false);
    setNextEnabled(1,false);
    drawFlow();
    toggle(selector('[data-reveal-work-panel]'),true);toggle(selector('[data-work-reading]'),false);
    toggle(selector('[data-learning-age]'),false);setNextEnabled(4,false);
    selector('[data-age-step]').textContent="PRIMERO, OBSERVA LA EDAD";
    selector('[data-age-headline]').textContent="A medida que aumenta la edad de entrada, la probabilidad predicha de graduación suele bajar.";
    selector('[data-age-description]').textContent="En el rango de edad principal representado, la probabilidad estimada de graduación disminuye con la edad de entrada.";
    selector('[data-legend]').innerHTML='<span class="eilln-legend-label"><i class="eilln-key teal"></i> Patrón según la edad</span>';
    updateScene(0);
  });
  drawFlow();updateScene(0);
})();
