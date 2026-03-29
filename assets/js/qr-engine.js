var QRCode=(function(){
  var EXP=new Array(512),LOG=new Array(256);
  (function(){for(var i=0;i<8;i++)EXP[i]=1<<i;for(var i=8;i<256;i++)EXP[i]=EXP[i-4]^EXP[i-5]^EXP[i-6]^EXP[i-8];for(var i=0;i<255;i++)LOG[EXP[i]]=i;for(var i=255;i<512;i++)EXP[i]=EXP[i-255];})();
  function gexp(n){while(n<0)n+=255;return EXP[n%255];}
  function safeGlog(n){return n<1?0:LOG[n];}
  var PPAT=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,132],[6,34,60,86,112,136],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]];
  var G15=1335,G15M=21522;
  function bchDig(d){var n=0;while(d){n++;d>>>=1;}return n;}
  function bchTI(d){var r=d<<10;while(bchDig(r)-bchDig(G15)>=0)r^=G15<<(bchDig(r)-bchDig(G15));return((d<<10)|r)^G15M;}
  var ECL={L:1,M:0,Q:3,H:2},ECL_OFF={1:0,0:1,3:2,2:3},ECL_FI={1:1,0:0,3:3,2:2};
  var RST=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];
  function getRSBlocks(tn,ecl){var t=RST[(tn-1)*4+ECL_OFF[ecl]];if(!t)throw new Error();var list=[];for(var i=0;i<t.length/3;i++)for(var j=0;j<t[i*3];j++)list.push({tc:t[i*3+1],dc:t[i*3+2]});return list;}
  function polyMul(a,b){var r=new Array(a.length+b.length-1).fill(0);for(var i=0;i<a.length;i++){if(!a[i])continue;for(var j=0;j<b.length;j++){if(b[j])r[i+j]^=gexp(safeGlog(a[i])+safeGlog(b[j]));}}return r;}
  function polyMod(a,b){if(a.length<b.length)return a.slice();var ratio=safeGlog(a[0])-safeGlog(b[0]),r=a.slice();for(var i=0;i<b.length;i++)r[i]^=gexp(safeGlog(b[i])+ratio);return polyMod(r.slice(1),b);}
  function getErrPoly(n){var p=[1];for(var i=0;i<n;i++)p=polyMul(p,[1,gexp(i)]);return p;}
  function enc8(s){var r=[];for(var i=0;i<s.length;i++){var c=s.charCodeAt(i);if(c>65536)r.push(0xF0|(c>>18),0x80|((c>>12)&63),0x80|((c>>6)&63),0x80|(c&63));else if(c>2048)r.push(0xE0|(c>>12),0x80|((c>>6)&63),0x80|(c&63));else if(c>128)r.push(0xC0|(c>>6),0x80|(c&63));else r.push(c);}return r;}
  function getLB(tn){return tn<10?8:16;}
  function createData(tn,ecl,text){
    var bs=getRSBlocks(tn,ecl),total=0;for(var i=0;i<bs.length;i++)total+=bs[i].dc;
    var bytes=enc8(text),buf=[],len=0;
    function put(v,n){for(var i=n-1;i>=0;i--){var bi=Math.floor(len/8);if(buf.length<=bi)buf.push(0);if((v>>i)&1)buf[bi]|=(0x80>>(len%8));len++;}}
    put(4,4);put(bytes.length,getLB(tn));for(var i=0;i<bytes.length;i++)put(bytes[i],8);
    if(len+4<=total*8)put(0,4);while(len%8)put(0,1);while(len<total*8){put(0xEC,8);if(len<total*8)put(0x11,8);}
    var off=0,dcs=[],ecs=[],maxDC=0,maxEC=0;
    for(var r=0;r<bs.length;r++){var dc=bs[r].dc,ec2=bs[r].tc-dc;maxDC=Math.max(maxDC,dc);maxEC=Math.max(maxEC,ec2);dcs.push(buf.slice(off,off+dc));off+=dc;var rp=getErrPoly(ec2),raw=dcs[r].concat(new Array(rp.length-1).fill(0)),mp=polyMod(raw,rp);ecs.push(new Array(rp.length-1).fill(0).map(function(_,i){return mp[i+(mp.length-(rp.length-1))]||0;}));}
    var out=[];for(var i=0;i<maxDC;i++)for(var r=0;r<bs.length;r++)if(i<dcs[r].length)out.push(dcs[r][i]);for(var i=0;i<maxEC;i++)for(var r=0;r<bs.length;r++)if(i<ecs[r].length)out.push(ecs[r][i]);
    return out;
  }
  function getMask(p,r,c){switch(p){case 0:return(r+c)%2===0;case 1:return r%2===0;case 2:return c%3===0;case 3:return(r+c)%3===0;case 4:return(Math.floor(r/2)+Math.floor(c/3))%2===0;case 5:return r*c%2+r*c%3===0;case 6:return(r*c%2+r*c%3)%2===0;case 7:return(r*c%3+(r+c)%2)%2===0;}}
  function getLostPoint(M){var n=M.length,lp=0;for(var r=0;r<n;r++)for(var c=0;c<n;c++){var s=0;for(var dr=-1;dr<=1;dr++)for(var dc=-1;dc<=1;dc++){if(r+dr<0||r+dr>=n||c+dc<0||c+dc>=n||dr===0&&dc===0)continue;if(!!M[r][c]===!!M[r+dr][c+dc])s++;}if(s>5)lp+=3+s-5;}return lp;}
  function buildMatrix(tn,ecl,data,mask){
    var n=tn*4+17,M=[];for(var i=0;i<n;i++){M.push([]);for(var j=0;j<n;j++)M[i].push(null);}
    function probe(r,c){for(var dr=-1;dr<=7;dr++)for(var dc=-1;dc<=7;dc++){if(r+dr<0||r+dr>=n||c+dc<0||c+dc>=n)continue;M[r+dr][c+dc]=(dr>=0&&dr<=6&&(dc===0||dc===6))||(dc>=0&&dc<=6&&(dr===0||dr===6))||(dr>=2&&dr<=4&&dc>=2&&dc<=4);}}
    probe(0,0);probe(n-7,0);probe(0,n-7);
    for(var i=8;i<n-8;i++){if(M[i][6]===null)M[i][6]=i%2===0;if(M[6][i]===null)M[6][i]=i%2===0;}
    M[n-8][8]=true;
    var pp=PPAT[tn-1];
    for(var a=0;a<pp.length;a++)for(var b=0;b<pp.length;b++){var pr=pp[a],pc=pp[b];if(M[pr][pc]!==null)continue;for(var dr=-2;dr<=2;dr++)for(var dc=-2;dc<=2;dc++)M[pr+dr][pc+dc]=(dr===-2||dr===2||dc===-2||dc===2||dr===0&&dc===0);}
    var fi=bchTI((ECL_FI[ecl]<<3)|mask);
    function setFI(bits){for(var i=0;i<6;i++)M[i][8]=(bits>>i)&1;M[7][8]=(bits>>6)&1;M[8][8]=(bits>>7)&1;M[8][7]=(bits>>8)&1;for(var i=9;i<15;i++)M[8][14-i]=(bits>>i)&1;for(var i=0;i<8;i++)M[8][n-1-i]=(bits>>i)&1;for(var i=8;i<15;i++)M[n-15+i][8]=(bits>>i)&1;}
    setFI(fi);
    var bi=0,inc=-1,row=n-1;
    for(var col=n-1;col>0;col-=2){if(col===6)col--;while(true){for(var c=0;c<2;c++){var r2=row,c2=col-c;if(M[r2][c2]===null){var bit=bi<data.length*8?(data[Math.floor(bi/8)]>>(7-bi%8))&1:0;M[r2][c2]=getMask(mask,r2,c2)?!bit:!!bit;bi++;}}row+=inc;if(row<0||row>=n){row-=inc;inc=-inc;break;}}}
    return M;
  }
  function findTN(text,ecl){for(var tn=1;tn<=40;tn++){try{var bs=getRSBlocks(tn,ecl),dc=0;for(var i=0;i<bs.length;i++)dc+=bs[i].dc;if(dc*8>=4+getLB(tn)+enc8(text).length*8)return tn;}catch(e){}}throw new Error();}
  function QRObj(text,ecl){
    var tn=findTN(text,ecl),data=createData(tn,ecl,text);
    var best=0,bestM=null,bestLP=Infinity;
    for(var m=0;m<8;m++){var M2=buildMatrix(tn,ecl,data,m),lp=getLostPoint(M2);if(lp<bestLP){bestLP=lp;best=m;bestM=M2;}}
    this._m=bestM;this._n=bestM.length;
  }
  QRObj.prototype.getModuleCount=function(){return this._n;};
  QRObj.prototype.isDark=function(r,c){return !!this._m[r][c];};
  return {make:function(t,e){return new QRObj(t,e!=null?e:ECL.L);},CorrectLevel:ECL};
})();