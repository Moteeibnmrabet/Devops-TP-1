(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('network-canvas');
  if(canvas){
    const ctx=canvas.getContext('2d'); let w=0,h=0,dpr=1,mouse={x:-9999,y:-9999};
    const labels=[['MOTEE IBN M\'RABET',.5,.48],['NLP',.25,.31],['LLM',.73,.27],['COMPUTER VISION',.23,.68],['DOCUMENT AI',.72,.67],['DATA',.5,.79]];
    let particles=[];
    function resize(){dpr=Math.min(devicePixelRatio||1,2);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:reduce?0:35},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.3+.3}))}
    function draw(){ctx.clearRect(0,0,w,h);const pts=labels.map((l,i)=>({x:l[1]*w,y:l[2]*h,label:l[0],center:i===0}));
      for(let i=1;i<pts.length;i++){const a=pts[0],b=pts[i];const dx=mouse.x-a.x,dy=mouse.y-a.y;const dist=Math.hypot(dx,dy);const boost=dist<220?(1-dist/220)*.35:0;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(76,190,255,${.12+boost})`;ctx.lineWidth=1;ctx.stroke();if(!reduce){const t=(Date.now()/2600+i*.17)%1;const x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t;ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fillStyle='rgba(99,230,255,.75)';ctx.fill()}}
      if(!reduce)particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(120,190,240,.35)';ctx.fill()});
      pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.center?7:3,0,Math.PI*2);ctx.fillStyle=p.center?'#63e6ff':'#3b8fc5';ctx.shadowBlur=p.center?18:8;ctx.shadowColor='#63e6ff';ctx.fill();ctx.shadowBlur=0;if(w>650||p.center){ctx.font=p.center?'700 11px Courier New':'700 9px Courier New';ctx.fillStyle=p.center?'rgba(220,245,255,.9)':'rgba(120,155,184,.65)';ctx.textAlign='center';ctx.fillText(p.label,p.x,p.y+(p.center?24:18))}});
      if(!reduce)requestAnimationFrame(draw);
    }
    resize();draw();window.addEventListener('resize',resize);window.addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
  }
  document.querySelectorAll('[data-placeholder]').forEach(box=>{const path=box.dataset.placeholder;const img=document.createElement('img');img.src=path;img.alt='';img.style.cssText='max-width:100%;max-height:260px;display:none';img.onload=()=>{box.hidden=true};img.onerror=()=>{box.hidden=false};box.appendChild(img);});
  document.querySelectorAll('[data-video]').forEach(box=>{const path=box.dataset.video;const v=document.createElement('video');v.src=path;v.controls=true;v.preload='metadata';v.style.cssText='width:100%;display:none';v.onloadedmetadata=()=>{box.hidden=true};v.onerror=()=>{box.hidden=false};box.appendChild(v);});
  document.querySelectorAll('.pipeline-step').forEach(step=>step.addEventListener('click',()=>{document.querySelectorAll('.pipeline-step').forEach(s=>s.classList.remove('active'));step.classList.add('active');const detail=document.querySelector(step.dataset.target);if(detail)detail.textContent=step.dataset.explanation}));
})();
