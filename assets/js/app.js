/* ═══ DATA ═══ */
var TYPES=[
  {id:'url',     e:'&#x1F517;',l:'URL',      f:[{id:'t-url',p:'https://yourwebsite.com'}]},
  {id:'bizcard', e:'&#x1FAAA;',l:'Biz Card', f:[]},
  {id:'wifi',    e:'&#x1F4F6;',l:'WiFi',     f:[{id:'t-ssid',p:'Network Name'},{id:'t-pass',p:'Password'},{id:'t-enc',p:'WPA / WEP / nopass'}]},
  {id:'text',    e:'&#x1F4DD;',l:'Text',     f:[{id:'t-txt',p:'Your text...',m:1}]},
  {id:'email',   e:'&#x2709;', l:'Email',    f:[{id:'t-eto',p:'email@domain.com'},{id:'t-esub',p:'Subject'},{id:'t-ebody',p:'Message...',m:1}]},
  {id:'sms',     e:'&#x1F4AC;',l:'SMS',      f:[{id:'t-snum',p:'+91 98765 43210'},{id:'t-smsg',p:'Message...',m:1}]},
  {id:'wa',      e:'&#x1F49A;',l:'WhatsApp', f:[{id:'t-wnum',p:'+91 98765 43210'},{id:'t-wmsg',p:'Message...',m:1}]},
  {id:'vcard',   e:'&#x1F464;',l:'Contact',  f:[{id:'t-vcn',p:'Full Name'},{id:'t-vcp',p:'Phone'},{id:'t-vce',p:'Email'},{id:'t-vco',p:'Org'},{id:'t-vcu',p:'Website'}]},
  {id:'geo',     e:'&#x1F4CD;',l:'Location', f:[{id:'t-lat',p:'28.6139'},{id:'t-lng',p:'77.2090'}]},
  {id:'tel',     e:'&#x1F4DE;',l:'Phone',    f:[{id:'t-tel',p:'+91 98765 43210'}]},
];
var FRAMES=[
  {id:'none',    n:'Clean',    c:'minimal', i:'&#x2B1C;'},
  {id:'soft',    n:'Soft',     c:'minimal', i:'&#x25AD;'},
  {id:'rounded', n:'Pill',     c:'minimal', i:'&#x2B2D;'},
  {id:'shadow',  n:'Float',    c:'minimal', i:'&#x1F532;'},
  {id:'neon',    n:'Neon',     c:'minimal', i:'&#x2728;'},
  {id:'double',  n:'Double',   c:'minimal', i:'&#x2B1B;'},
  {id:'dashed',  n:'Dashed',   c:'minimal', i:'&#x2B1A;'},
  {id:'thin',    n:'Hairline', c:'minimal', i:'&#x25A2;'},
  {id:'corners', n:'Corners',  c:'premium', i:'&#x2310;'},
  {id:'gradient',n:'Rainbow',  c:'premium', i:'&#x1F308;'},
  {id:'aurora',  n:'Aurora',   c:'premium', i:'&#x1F30C;'},
  {id:'crystal', n:'Crystal',  c:'premium', i:'&#x1F48E;'},
  {id:'mosaic',  n:'Mosaic',   c:'premium', i:'&#x1F536;'},
  {id:'circle',  n:'Circle',   c:'premium', i:'&#x2B55;'},
  {id:'diamond', n:'Diamond',  c:'premium', i:'&#x1F537;'},
  {id:'hexagon', n:'Hexagon',  c:'premium', i:'&#x2B21;'},
  {id:'crown',   n:'Crown',    c:'premium', i:'&#x1F451;'},
  {id:'badge',   n:'Scan Me',  c:'business',i:'&#x1F3F7;'},
  {id:'card',    n:'Top Bar',  c:'business',i:'&#x1FAAA;'},
  {id:'stamp',   n:'Stamp',    c:'business',i:'&#x1F4EE;'},
  {id:'ticket',  n:'Ticket',   c:'business',i:'&#x1F3AB;'},
  {id:'shield',  n:'Shield',   c:'business',i:'&#x1F6E1;'},
  {id:'cyber',   n:'Cyber',    c:'business',i:'&#x26A1;'},
];
var PALS={
  fg:['#000000','#1a1a2e','#2d2b55','#065f46','#7c2d12','#831843','#1e3a5f','#374151'],
  bg:['#ffffff','#f8fafc','#fef3c7','#ecfdf5','#fdf2f8','#eff6ff','#f0fdf4','#fafafa'],
  fc:['#5046E5','#EC4899','#10B981','#F59E0B','#EF4444','#3B82F6','#8B5CF6','#06B6D4'],
  g2:['#7C3AED','#F472B6','#34D399','#FCD34D','#F87171','#60A5FA','#A78BFA','#22D3EE'],
};
var DOTS=[{id:'square',n:'Square',i:'&#x25AA;'},{id:'dots',n:'Dots',i:'&#x25CF;'},{id:'rounded',n:'Rounded',i:'&#x25FC;'},{id:'classy',n:'Classy',i:'&#x25C6;'}];
var EYES=[{id:'square',n:'Square',i:'&#x2B1C;'},{id:'rounded',n:'Rounded',i:'&#x1F532;'},{id:'extra-rounded',n:'Soft',i:'&#x1F7E6;'},{id:'dots',n:'Dots',i:'&#x2B21;'}];
var BCT=['#5046E5','#059669','#DC2626','#D97706','#0891B2','#7C3AED','#111827','#374151'];

/* ═══ STATE ═══ */
var _qr=null,CT='url',FRAME='none',EC=1;
var FG='#000000',BG='#ffffff',FC='#5046E5',G2='#7C3AED';
var GRAD=false,DS='square',ES='square';
var QSZ=240,LI=null,LSZ=22,LBG=true,BCC='#5046E5';
var DK=false;
var HIST=[];
try{HIST=JSON.parse(localStorage.getItem('qrf5')||'[]');}catch(e){}

/* ═══ HELPERS ═══ */
function $(id){return document.getElementById(id);}
function gv(id){var e=$(id);return e?e.value.trim():'';}
function mk(tag,cls,html){var d=document.createElement(tag);if(cls)d.className=cls;if(html!==undefined)d.innerHTML=html;return d;}

/* ═══ INIT ═══ */

/* MOBILE TABS */
function mobTab(tab){
  var isEdit=tab==='edit';
  var ep=$('ws-prev'), ee=$('ws-edit');
  var bt=$('mtab-prev'), be=$('mtab-edit');
  if(ep) ep.classList.toggle('mob-active',!isEdit);
  if(ee) ee.classList.toggle('mob-active',isEdit);
  if(bt) bt.classList.toggle('on',!isEdit);
  if(be) be.classList.toggle('on',isEdit);
}

function init(){bTypes();bDyn();bFrames();bPals();bDots();bEyes();bEC();bBCT();bHist();}

/* TYPE CHIPS */
function bTypes(){
  var r=$('tscroll');r.innerHTML='';
  TYPES.forEach(function(t){
    var b=mk('button','tc'+(t.id===CT?' on':''),t.e+' '+t.l);
    b.onclick=function(){CT=t.id;document.querySelectorAll('.tc').forEach(function(x){x.classList.remove('on');});b.classList.add('on');bDyn();};
    r.appendChild(b);
  });
}

/* DYNAMIC FIELDS */
function bDyn(){
  var df=$('dfields');df.innerHTML='';
  if(CT==='bizcard'){
    df.innerHTML=
      '<div class="row g-2 mb-2"><div class="col-6"><input class="qinp" id="bc-n" placeholder="Full Name"></div><div class="col-6"><input class="qinp" id="bc-p" placeholder="Phone"></div></div>'+
      '<div class="row g-2 mb-2"><div class="col-6"><input class="qinp" id="bc-o" placeholder="Organization"></div><div class="col-6"><input class="qinp" id="bc-w" placeholder="Website"></div></div>'+
      '<div class="row g-2 mb-2"><div class="col-6"><input class="qinp" id="bc-i" placeholder="@instagram"></div><div class="col-6"><input class="qinp" id="bc-a" placeholder="City, Country"></div></div>'+
      '<input class="qinp" id="bc-m" placeholder="Google Maps URL">';
    return;
  }
  var t=TYPES.find(function(x){return x.id===CT;});
  if(!t)return;
  t.f.forEach(function(f){
    var w=mk('div','mb-2');
    w.innerHTML=f.m?'<textarea class="qinp" id="'+f.id+'" placeholder="'+f.p+'" rows="2"></textarea>':'<input class="qinp" id="'+f.id+'" placeholder="'+f.p+'">';
    df.appendChild(w);
  });
}

/* FRAMES */
function bFrames(){
  var g=$('fgrid');g.innerHTML='';
  FRAMES.forEach(function(f){
    var d=mk('div','fc'+(f.id===FRAME?' on':''),'<span class="fc-i">'+f.i+'</span><span class="fc-n">'+f.n+'</span><span class="fc-c '+f.c+'">'+f.c+'</span>');
    d.onclick=function(){FRAME=f.id;document.querySelectorAll('.fc').forEach(function(x){x.classList.remove('on');});d.classList.add('on');render();};
    g.appendChild(d);
  });
}

/* PALETTES */
function bPals(){
  ['fg','bg','fc','g2'].forEach(function(tp){
    var el=$(tp+'-p');if(!el)return;el.innerHTML='';
    var cur=tp==='fg'?FG:tp==='bg'?BG:tp==='fc'?FC:G2;
    PALS[tp].forEach(function(col){
      var d=mk('div','pd'+(col===cur?' on':''));
      d.style.background=col;d.title=col;
      d.onclick=function(){setCol(tp,col);};
      el.appendChild(d);
    });
  });
}
function setCol(tp,v){
  if(tp==='fg'){FG=v;$('fg-c').value=v;$('fg-b').style.background=v;$('fg-h').value=v;}
  else if(tp==='bg'){BG=v;$('bg-c').value=v;$('bg-b').style.background=v;$('bg-h').value=v;}
  else if(tp==='fc'){FC=v;$('fc-c').value=v;$('fc-b').style.background=v;$('fc-h').value=v;}
  else if(tp==='g2'){G2=v;$('g2-c').value=v;$('g2-b').style.background=v;$('g2-h').value=v;}
  document.querySelectorAll('#'+tp+'-p .pd').forEach(function(d){d.classList.toggle('on',d.title===v);});
  render();
}
function setHex(tp,v){if(/^#[0-9A-Fa-f]{6}$/.test(v))setCol(tp,v);}

/* DOTS / EYES */
function bDots(){
  var g=$('dgrid');g.innerHTML='';
  DOTS.forEach(function(s){
    var b=mk('button','sbtn'+(s.id===DS?' on':''),'<span>'+s.i+'</span>'+s.n);
    b.onclick=function(){DS=s.id;document.querySelectorAll('#dgrid .sbtn').forEach(function(x){x.classList.remove('on');});b.classList.add('on');render();};
    g.appendChild(b);
  });
}
function bEyes(){
  var g=$('egrid');g.innerHTML='';
  EYES.forEach(function(s){
    var b=mk('button','sbtn'+(s.id===ES?' on':''),'<span>'+s.i+'</span>'+s.n);
    b.onclick=function(){ES=s.id;document.querySelectorAll('#egrid .sbtn').forEach(function(x){x.classList.remove('on');});b.classList.add('on');render();};
    g.appendChild(b);
  });
}

/* EC */
function bEC(){
  var g=$('ecgrid');g.innerHTML='';
  [{l:'L',v:1,t:'7%'},{l:'M',v:0,t:'15%'},{l:'Q',v:3,t:'25%'},{l:'H',v:2,t:'30%'}].forEach(function(lv){
    var b=mk('button','ecbtn'+(lv.v===EC?' on':''),'<b>'+lv.l+'</b><small>'+lv.t+'</small>');
    b.onclick=function(){EC=lv.v;document.querySelectorAll('.ecbtn').forEach(function(x){x.classList.remove('on');});b.classList.add('on');doGen();render();};
    g.appendChild(b);
  });
}

/* BIZ */
function bBCT(){
  var r=$('bct');r.innerHTML='';
  BCT.forEach(function(col){
    var d=mk('div');
    d.style.cssText='width:26px;height:26px;border-radius:8px;background:'+col+';cursor:pointer;border:2.5px solid '+(col===BCC?'#fff':'transparent')+';box-shadow:'+(col===BCC?'0 0 0 2px '+col:'none')+';flex-shrink:0;transition:.12s';
    d.onclick=function(){BCC=col;$('bprev').style.background=col;bBCT();render();};
    r.appendChild(d);
  });
}
function ubp(){
  $('bn').textContent=gv('bb')||'Your Brand';
  $('bns').textContent=gv('bs')||'yoursite.com';
  $('bprev').style.background=BCC;
}

/* TOGGLES */
function togGrad(b){GRAD=!GRAD;b.classList.toggle('on',GRAD);$('g2w').style.display=GRAD?'block':'none';render();}
function togLBg(b){LBG=!LBG;b.classList.toggle('on',LBG);render();}

/* SLIDERS */
function setQSz(sl){QSZ=parseInt(sl.value);var p=Math.round((QSZ-160)/280*100);sl.style.setProperty('--v',p+'%');$('szv').textContent=QSZ+'px';render();}
function setLSz(sl){LSZ=parseInt(sl.value);var p=Math.round((LSZ-10)/25*100);sl.style.setProperty('--v',p+'%');$('lszv').textContent=LSZ+'%';render();}

/* LOGO */
function handleLogo(e){
  var f=e.target.files[0];if(!f)return;
  if(f.size>2097152){toast('Max 2MB','#EF4444');return;}
  var r=new FileReader();
  r.onload=function(ev){
    LI=new Image();LI.onload=function(){render();};LI.src=ev.target.result;
    $('lthumb').src=ev.target.result;
    $('ldrop').style.display='none';$('lup').style.display='block';
    /* Auto-set EC to H for logo scannability */
    if(EC!==2){
      EC=2;
      document.querySelectorAll('.ecbtn').forEach(function(x){x.classList.remove('on');});
      var hBtn=document.querySelector('.ecbtn:last-child');
      if(hBtn)hBtn.classList.add('on');
      toast('EC set to H for logo scannability','#10B981');
    }
    doGen();render();
  };
  r.readAsDataURL(f);
}
function removeLogo(){LI=null;$('linp').value='';$('ldrop').style.display='block';$('lup').style.display='none';render();}

/* TAB SWITCH */
function sw(id,b){
  document.querySelectorAll('.ctab').forEach(function(x){x.classList.remove('on');});
  document.querySelectorAll('.tb').forEach(function(x){x.classList.remove('on');});
  b.classList.add('on');$('tb-'+id).classList.add('on');
}

/* ═══ BUILD CONTENT ═══ */
function bContent(){
  switch(CT){
    case 'url':{var v=gv('t-url');return v?(v.indexOf('://')>-1?v:'https://'+v):'';}
    case 'bizcard':{
      var n=gv('bc-n'),p=gv('bc-p');if(!n&&!p)return'';
      var vc='BEGIN:VCARD\nVERSION:3.0\nFN:'+n+'\n';
      var o=gv('bc-o');if(o)vc+='ORG:'+o+'\n';
      if(p)vc+='TEL:'+p+'\n';
      var a=gv('bc-a');if(a)vc+='ADR:;;'+a+';;;;\n';
      var w=gv('bc-w');if(w)vc+='URL:'+(w.indexOf('://')>-1?w:'https://'+w)+'\n';
      var ig=gv('bc-i');if(ig)vc+='X-SOCIALPROFILE;type=instagram:https://instagram.com/'+ig.replace('@','')+'\n';
      var m=gv('bc-m');if(m)vc+='NOTE:'+m+'\n';
      return vc+'END:VCARD';
    }
    case 'wifi':{var s=gv('t-ssid'),pw=gv('t-pass'),en=gv('t-enc')||'WPA';return s?'WIFI:T:'+en+';S:'+s+';P:'+pw+';;':'';}
    case 'text':return gv('t-txt');
    case 'email':{var t=gv('t-eto');return t?'mailto:'+t+'?subject='+encodeURIComponent(gv('t-esub'))+'&body='+encodeURIComponent(gv('t-ebody')):'';}
    case 'sms':{var n2=gv('t-snum');return n2?'SMSTO:'+n2+':'+gv('t-smsg'):'';}
    case 'wa':{var n3=gv('t-wnum').replace(/[^0-9]/g,'');return n3?'https://wa.me/'+n3+'?text='+encodeURIComponent(gv('t-wmsg')):'';}
    case 'vcard':return'BEGIN:VCARD\nVERSION:3.0\nFN:'+gv('t-vcn')+'\nTEL:'+gv('t-vcp')+'\nEMAIL:'+gv('t-vce')+'\nORG:'+gv('t-vco')+'\nURL:'+gv('t-vcu')+'\nEND:VCARD';
    case 'geo':{var la=gv('t-lat'),ln=gv('t-lng');return la&&ln?'geo:'+la+','+ln:'';}
    case 'tel':return gv('t-tel')?'tel:'+gv('t-tel'):'';
    default:return'';
  }
}

/* ═══ GENERATE ═══ */
function go(){
  var c=bContent();if(!c){toast('Enter content first!','#EF4444');return;}
  doGen();render();
  var cv=$('qr-out'),th=cv.toDataURL('image/png',.3);
  HIST.unshift({type:CT,content:c,thumb:th});
  if(HIST.length>12)HIST.pop();
  try{localStorage.setItem('qrf5',JSON.stringify(HIST));}catch(e){}
  bHist();
  /* no auto-switch - QR shown inline */
}
function doGen(){
  var c=bContent();if(!c)return;
  try{_qr=QRCode.make(c,EC);}catch(e){toast('Too long!','#EF4444');}
}

/* ═══ RENDER ═══ */
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function render(){
  if(!_qr){doGen();if(!_qr)return;}
  var PAD=20,FL=gv('flbl'),BR=gv('bb'),SB=gv('bs'),FT=gv('bf')||'SCAN TO VISIT',HB=BR||SB;
  var eT=0,eB=0;
  if(FRAME==='badge'||FRAME==='ticket'||FRAME==='cyber')eB=48;
  else if(FL&&FRAME!=='none')eB=38;
  if(HB){eT=54;eB=Math.max(eB,42);}
  var W=QSZ+PAD*2,H=QSZ+PAD*2+eT+eB,qX=PAD,qY=PAD+eT;
  var cv=$('qr-out');cv.width=W;cv.height=H;
  var ctx=cv.getContext('2d');ctx.clearRect(0,0,W,H);
  var cx=W/2,cy=H/2;
  ctx.fillStyle=BG;ctx.fillRect(0,0,W,H);
  ctx.save();
  switch(FRAME){
    case 'soft':ctx.strokeStyle=FC;ctx.lineWidth=3;rr(ctx,3,3,W-6,H-6,14);ctx.stroke();break;
    case 'rounded':ctx.strokeStyle=FC;ctx.lineWidth=4;rr(ctx,3,3,W-6,H-6,24);ctx.stroke();break;
    case 'shadow':ctx.save();ctx.shadowColor='rgba(0,0,0,.18)';ctx.shadowBlur=18;ctx.shadowOffsetX=3;ctx.shadowOffsetY=4;ctx.fillStyle=BG;rr(ctx,5,5,W-10,H-10,14);ctx.fill();ctx.restore();ctx.strokeStyle='#ccc';ctx.lineWidth=1;rr(ctx,5,5,W-10,H-10,14);ctx.stroke();break;
    case 'neon':ctx.save();ctx.shadowColor=FC;ctx.shadowBlur=18;ctx.strokeStyle=FC;ctx.lineWidth=3;rr(ctx,3,3,W-6,H-6,12);ctx.stroke();ctx.restore();break;
    case 'double':ctx.strokeStyle=FC;ctx.lineWidth=2;ctx.strokeRect(2,2,W-4,H-4);ctx.strokeRect(6,6,W-12,H-12);break;
    case 'dashed':ctx.strokeStyle=FC;ctx.lineWidth=3;ctx.setLineDash([10,6]);rr(ctx,3,3,W-6,H-6,8);ctx.stroke();ctx.setLineDash([]);break;
    case 'thin':ctx.strokeStyle=FC;ctx.lineWidth=1;ctx.strokeRect(1,1,W-2,H-2);break;
    case 'corners':{var L=28;ctx.strokeStyle=FC;ctx.lineWidth=4;ctx.lineCap='round';[[0,0,L+4,4,4,L+4],[W-L-4,4,W-4,4,W-4,L+4],[4,H-L-4,4,H-4,L+4,H-4],[W-L-4,H-4,W-4,H-4,W-4,H-L-4]].forEach(function(p){ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(p[2],p[3]);ctx.lineTo(p[4],p[5]);ctx.stroke();});break;}
    case 'gradient':{var g=ctx.createLinearGradient(0,0,W,H);['#EC4899','#6366F1','#10B981','#F59E0B'].forEach(function(c,i){g.addColorStop(i/3,c);});ctx.strokeStyle=g;ctx.lineWidth=5;rr(ctx,3,3,W-6,H-6,10);ctx.stroke();break;}
    case 'aurora':{ctx.save();ctx.filter='blur(4px)';var g=ctx.createLinearGradient(0,0,W,H);[['#22d3ee',0],['#8B5CF6',.5],['#EC4899',1]].forEach(function(s){g.addColorStop(s[1],s[0]);});ctx.strokeStyle=g;ctx.lineWidth=10;rr(ctx,3,3,W-6,H-6,14);ctx.stroke();ctx.restore();ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=2;rr(ctx,5,5,W-10,H-10,12);ctx.stroke();break;}
    case 'crystal':{for(var i=0;i<3;i++){ctx.strokeStyle='rgba(80,70,229,'+(0.3-i*0.08)+')';ctx.lineWidth=3-i;rr(ctx,3+i*4,3+i*4,W-6-i*8,H-6-i*8,14);ctx.stroke();}break;}
    case 'mosaic':{var ms=16;[[0,0],[W-ms,0],[0,H-ms],[W-ms,H-ms]].forEach(function(p){var g=ctx.createLinearGradient(p[0],p[1],p[0]+ms,p[1]+ms);g.addColorStop(0,FC);g.addColorStop(1,G2);ctx.fillStyle=g;ctx.fillRect(p[0],p[1],ms,ms);});ctx.strokeStyle=FC;ctx.lineWidth=1.5;ctx.strokeRect(2,2,W-4,H-4);break;}
    case 'circle':{var R=Math.min(W,H)/2-4;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.strokeStyle=FC;ctx.lineWidth=3;ctx.stroke();ctx.beginPath();ctx.arc(cx,cy,R-6,0,Math.PI*2);ctx.setLineDash([5,7]);ctx.lineWidth=1.5;ctx.stroke();ctx.setLineDash([]);break;}
    case 'diamond':{var R=Math.min(W,H)/2-4;ctx.beginPath();ctx.moveTo(cx,cy-R);ctx.lineTo(cx+R,cy);ctx.lineTo(cx,cy+R);ctx.lineTo(cx-R,cy);ctx.closePath();ctx.strokeStyle=FC;ctx.lineWidth=3;ctx.stroke();break;}
    case 'hexagon':{var R=Math.min(W,H)/2-4;ctx.beginPath();for(var i=0;i<6;i++){var a=Math.PI/180*(60*i-30);i===0?ctx.moveTo(cx+R*Math.cos(a),cy+R*Math.sin(a)):ctx.lineTo(cx+R*Math.cos(a),cy+R*Math.sin(a));}ctx.closePath();ctx.strokeStyle=FC;ctx.lineWidth=3;ctx.stroke();break;}
    case 'crown':{ctx.fillStyle='#D4A847';var pts=[[0,26],[W*.2,26],[W*.2,3],[W*.5,22],[W*.8,3],[W*.8,26],[W,26],[W,0],[0,0]];ctx.beginPath();pts.forEach(function(p,i){i===0?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1]);});ctx.fill();ctx.strokeStyle='#D4A847';ctx.lineWidth=2;ctx.strokeRect(2,26,W-4,H-28);break;}
    case 'badge':ctx.strokeStyle=FC;ctx.lineWidth=2.5;ctx.strokeRect(2,2,W-4,H-4);break;
    case 'card':ctx.strokeStyle=FC;ctx.lineWidth=2.5;rr(ctx,2,2,W-4,H-4,10);ctx.stroke();break;
    case 'stamp':{var R=Math.min(W,H)/2-3;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.setLineDash([8,5]);ctx.lineWidth=4;ctx.strokeStyle=FC;ctx.stroke();ctx.setLineDash([]);ctx.beginPath();ctx.arc(cx,cy,R-7,0,Math.PI*2);ctx.lineWidth=1.5;ctx.stroke();break;}
    case 'ticket':ctx.strokeStyle=FC;ctx.lineWidth=2.5;rr(ctx,2,12,W-4,H-24,6);ctx.stroke();break;
    case 'shield':{ctx.beginPath();ctx.moveTo(cx,4);ctx.lineTo(W-4,4+H*.15);ctx.lineTo(W-4,4+H*.55);ctx.quadraticCurveTo(W-4,H-4,cx,H-4);ctx.quadraticCurveTo(4,H-4,4,4+H*.55);ctx.lineTo(4,4+H*.15);ctx.closePath();ctx.strokeStyle=FC;ctx.lineWidth=3;ctx.stroke();break;}
    case 'cyber':{ctx.strokeStyle='#00ff99';ctx.lineWidth=2;var cut=10;ctx.beginPath();ctx.moveTo(cut,0);ctx.lineTo(W-cut,0);ctx.lineTo(W,cut);ctx.lineTo(W,H-cut);ctx.lineTo(W-cut,H);ctx.lineTo(cut,H);ctx.lineTo(0,H-cut);ctx.lineTo(0,cut);ctx.closePath();ctx.stroke();break;}
  }
  ctx.restore();
  var mc=_qr.getModuleCount(),cell=QSZ/mc;
  ctx.fillStyle=BG;ctx.fillRect(qX,qY,QSZ,QSZ);
  var EP=[{r:0,c:0},{r:0,c:mc-7},{r:mc-7,c:0}];
  function isEP(row,col){return EP.some(function(e){return row>=e.r&&row<e.r+7&&col>=e.c&&col<e.c+7;});}

  /* Draw finder pattern eyes properly as solid blocks (scannable) */
  function drawEye(er,ec){
    var ex=qX+ec*cell, ey=qY+er*cell, ew=7*cell;
    var rad = ES==='rounded'?cell*1.2 : ES==='extra-rounded'?cell*1.8 : ES==='dots'?cell*1.2 : 0;
    ctx.fillStyle=FG;
    /* Outer 7x7 square */
    if(rad>0){rr(ctx,ex,ey,ew,ew,rad);ctx.fill();}
    else ctx.fillRect(ex,ey,ew,ew);
    /* Clear inner 5x5 */
    ctx.fillStyle=BG;
    if(rad>0){rr(ctx,ex+cell,ey+cell,5*cell,5*cell,rad*.6);ctx.fill();}
    else ctx.fillRect(ex+cell,ey+cell,5*cell,5*cell);
    /* Inner 3x3 fill */
    ctx.fillStyle=FG;
    if(rad>0){rr(ctx,ex+2*cell,ey+2*cell,3*cell,3*cell,rad*.4);ctx.fill();}
    else ctx.fillRect(ex+2*cell,ey+2*cell,3*cell,3*cell);
  }
  drawEye(0,0); drawEye(0,mc-7); drawEye(mc-7,0);

  for(var row=0;row<mc;row++){for(var col=0;col<mc;col++){
    if(!_qr.isDark(row,col))continue;
    if(isEP(row,col))continue; /* skip - already drawn as solid eye */
    var x=qX+col*cell,y=qY+row*cell,s=Math.ceil(cell);
    if(GRAD){var grd=ctx.createLinearGradient(qX,qY,qX+QSZ,qY+QSZ);grd.addColorStop(0,FG);grd.addColorStop(1,G2);ctx.fillStyle=grd;}
    else ctx.fillStyle=FG;
    if(DS==='dots'){ctx.beginPath();ctx.arc(x+cell/2,y+cell/2,cell/2*.85,0,Math.PI*2);ctx.fill();}
    else if(DS==='rounded'){rr(ctx,x,y,s,s,s*.3);ctx.fill();}
    else if(DS==='classy'){rr(ctx,x+1,y+1,s-2,s-2,s*.35);ctx.fill();}
    else ctx.fillRect(x,y,s,s);
  }}
  if(LI){
    /* Logo overlay - use max 25% of QR area for scannability */
    var maxLogoRatio=25;
    var safeLogoSz=Math.min(LSZ,maxLogoRatio);
    var lw=QSZ*(safeLogoSz/100),lx=qX+(QSZ-lw)/2,ly=qY+(QSZ-lw)/2,lr=lw*.18;
    ctx.save();
    if(LBG){
      ctx.shadowColor='rgba(0,0,0,.12)';ctx.shadowBlur=8;
      ctx.fillStyle='#fff';
      rr(ctx,lx-6,ly-6,lw+12,lw+12,lr+5);
      ctx.fill();ctx.shadowBlur=0;
      /* Extra white padding for better scan zone */
      ctx.fillStyle='#fff';
      rr(ctx,lx-3,ly-3,lw+6,lw+6,lr+3);
      ctx.fill();
    }
    rr(ctx,lx,ly,lw,lw,lr);ctx.clip();
    ctx.drawImage(LI,lx,ly,lw,lw);
    ctx.restore();
  }
  if(HB){ctx.save();ctx.fillStyle=BCC;ctx.fillRect(0,0,W,eT);ctx.font='bold 13px Outfit,sans-serif';ctx.fillStyle='#fff';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(BR,14,eT/2-(SB?7:0));if(SB){ctx.font='10px Outfit,sans-serif';ctx.fillStyle='rgba(255,255,255,.65)';ctx.fillText(SB,14,eT/2+10);}ctx.fillStyle='rgba(0,0,0,.05)';ctx.fillRect(0,H-eB,W,eB);ctx.font='11px monospace';ctx.fillStyle='rgba(0,0,0,.45)';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(FT,W/2,H-eB/2);ctx.restore();}
  if(FRAME==='badge'||FRAME==='ticket'){ctx.save();ctx.fillStyle=FC;ctx.fillRect(2,H-46,W-4,44);ctx.font='bold 12px Outfit,sans-serif';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(FL||'SCAN ME',W/2,H-24);ctx.restore();}
  else if(FRAME==='stamp'){ctx.save();ctx.font='bold 10px Outfit,sans-serif';ctx.fillStyle=FC;ctx.textAlign='center';ctx.textBaseline='top';ctx.fillText(FL||'OFFICIAL',W/2,5);ctx.restore();}
  else if(FRAME==='cyber'){ctx.save();ctx.font='bold 9px monospace';ctx.fillStyle='#00ff99';ctx.textAlign='center';ctx.textBaseline='bottom';ctx.fillText(FL||'SCAN',W/2,H-3);ctx.restore();}
  else if(FL&&FRAME!=='none'&&FRAME!=='card'){ctx.save();ctx.font='bold 11px Outfit,sans-serif';ctx.fillStyle=FC;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(FL,W/2,H-16);ctx.restore();}
  if(FRAME==='card'&&!HB){ctx.save();ctx.fillStyle=FC;rr(ctx,2,2,W-4,34,10);ctx.fill();ctx.fillRect(2,28,W-4,8);ctx.font='bold 12px Outfit,sans-serif';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(BR||'YOUR BRAND',W/2,18);ctx.restore();}
  $('qr-ph').style.display='none';$('qr-out').style.display='block';
  $('qr-ring').classList.add('lit');$('arow').classList.add('on');$('arow2').classList.add('on');
  $('qstats').classList.add('on');
  $('ss').textContent=QSZ+'x'+QSZ;$('st').textContent=CT.toUpperCase();
  $('se').textContent='EC:'+['L','M','Q','H'][[1,0,3,2].indexOf(EC)];
  var cnt=bContent();
  if(cnt){$('uchip').classList.add('on');$('utxt').textContent=cnt.substring(0,52)+(cnt.length>52?'...':'');}
}

/* ═══ ACTIONS ═══ */
function dlQR(){var a=document.createElement('a');a.download='SmartQRTool.png';a.href=$('qr-out').toDataURL('image/png');a.click();cfetti();toast('Downloaded!','#10B981');}
function shareQR(){$('qr-out').toBlob(function(b){var f=new File([b],'qr.png',{type:'image/png'});if(navigator.share&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:'QR Code'}).catch(function(){dlQR();});}else dlQR();});}
function cpyQR(){$('qr-out').toBlob(function(b){try{navigator.clipboard.write([new ClipboardItem({'image/png':b})]);toast('Copied!','#10B981');}catch(e){dlQR();}});}
function cpyContent(){var c=bContent();if(!c){toast('Generate first!','#EF4444');return;}navigator.clipboard.writeText(c).then(function(){toast('Copied!','#10B981');}).catch(function(){toast('Failed','#EF4444');});}
function testScan(){var c=bContent();if(!c)return;window.open(c.indexOf('://')>-1?c:'https://www.google.com/search?q='+encodeURIComponent(c),'_blank');}

/* ═══ HISTORY ═══ */
function bHist(){
  ['hd','hm'].forEach(function(id){
    var e=$(id);if(!e)return;e.innerHTML='';
    if(!HIST.length){e.innerHTML='<div class="hempty">No history yet</div>';return;}
    HIST.slice(0,8).forEach(function(h){
      var it=mk('div','hi','<img class="hi-img" src="'+h.thumb+'" alt=""><div style="flex:1;min-width:0"><div class="hi-type">'+h.type+'</div><div class="hi-url">'+h.content.substring(0,38)+'</div></div>');
      it.onclick=function(){CT=h.type;bTypes();bDyn();setTimeout(function(){var t=TYPES.find(function(x){return x.id===h.type;});if(t&&t.f[0]){var fi=$(t.f[0].id);if(fi)fi.value=h.content;}go();},60);};
      e.appendChild(it);
    });
  });
}
function clearHist(){HIST=[];try{localStorage.removeItem('qrf5');}catch(e){}bHist();toast('Cleared','#F59E0B');}

/* ═══ DARK ═══ */
function toggleDk(){
  DK=!DK;document.body.classList.toggle('dk',DK);
  $('dbtn').innerHTML=DK?'<span class="svg-ico"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707z"/></svg></span>':'<span class="svg-ico"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg></span>';
}

/* ═══ RESET ═══ */
function resetAll(){
  _qr=null;FG='#000000';BG='#ffffff';FC='#5046E5';G2='#7C3AED';GRAD=false;DS='square';ES='square';FRAME='none';LI=null;LSZ=22;LBG=true;QSZ=240;BCC='#5046E5';
  $('qr-out').style.display='none';$('qr-ph').style.display='flex';
  $('qr-ring').classList.remove('lit');
  $('arow').classList.remove('on');$('arow2').classList.remove('on');
  $('qstats').classList.remove('on');$('uchip').classList.remove('on');
  $('ldrop').style.display='block';$('lup').style.display='none';
  init();toast('Reset!','#5046E5');
}

/* ═══ TOAST ═══ */
function toast(msg,col){var t=$('toast');t.textContent=msg;t.style.background=col||'#10B981';t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('on');},2500);}

/* ═══ CONFETTI ═══ */
function cfetti(){
  var cv=$('cfcv');cv.style.display='block';cv.width=innerWidth;cv.height=innerHeight;
  var ctx=cv.getContext('2d'),pp=[],cols=['#5046E5','#7C3AED','#EC4899','#10B981','#F59E0B','#3B82F6'];
  for(var i=0;i<80;i++)pp.push({x:Math.random()*cv.width,y:-10,vx:(Math.random()-.5)*4,vy:Math.random()*3+2,r:Math.random()*5+2,col:cols[Math.floor(Math.random()*6)],rot:Math.random()*360,vr:(Math.random()-.5)*5});
  var fr=0;function draw(){ctx.clearRect(0,0,cv.width,cv.height);pp.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=.05;p.rot+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.col;ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);ctx.restore();});fr++;if(fr<90)requestAnimationFrame(draw);else cv.style.display='none';}draw();
}

init();