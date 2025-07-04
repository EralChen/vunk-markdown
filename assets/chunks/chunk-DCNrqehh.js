import{a as ft,g as at,f as gt,d as mt}from"./chunk-C0DuMXTM.js";import{_ as s,g as xt,s as kt,a as _t,b as vt,t as bt,q as wt,c as A,d as W,e as Tt,z as St}from"./chunk-CKiB9bkw.js";import{d as tt}from"./chunk-DihOFjUg.js";import"./chunk-DenKlwNO.js";import"./chunk-D3Fu2eSY.js";import"./chunk-Crt2IEHJ.js";/* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              */import"./chunk-D5iaQeiq.js";/* empty css              */var H=function(){var t=s(function(g,r,a,o){for(a=a||{},o=g.length;o--;a[g[o]]=r);return a},"o"),e=[6,8,10,11,12,14,16,17,18],n=[1,9],c=[1,10],i=[1,11],u=[1,12],h=[1,13],d=[1,14],p={trace:s(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:s(function(r,a,o,y,f,l,S){var _=l.length-1;switch(f){case 1:return l[_-1];case 2:this.$=[];break;case 3:l[_-1].push(l[_]),this.$=l[_-1];break;case 4:case 5:this.$=l[_];break;case 6:case 7:this.$=[];break;case 8:y.setDiagramTitle(l[_].substr(6)),this.$=l[_].substr(6);break;case 9:this.$=l[_].trim(),y.setAccTitle(this.$);break;case 10:case 11:this.$=l[_].trim(),y.setAccDescription(this.$);break;case 12:y.addSection(l[_].substr(8)),this.$=l[_].substr(8);break;case 13:y.addTask(l[_-1],l[_]),this.$="task";break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:n,12:c,14:i,16:u,17:h,18:d},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:n,12:c,14:i,16:u,17:h,18:d},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:s(function(r,a){if(a.recoverable)this.trace(r);else{var o=new Error(r);throw o.hash=a,o}},"parseError"),parse:s(function(r){var a=this,o=[0],y=[],f=[null],l=[],S=this.table,_="",B=0,J=0,ut=2,K=1,yt=l.slice.call(arguments,1),k=Object.create(this.lexer),E={yy:{}};for(var O in this.yy)Object.prototype.hasOwnProperty.call(this.yy,O)&&(E.yy[O]=this.yy[O]);k.setInput(r,E.yy),E.yy.lexer=k,E.yy.parser=this,typeof k.yylloc>"u"&&(k.yylloc={});var Y=k.yylloc;l.push(Y);var pt=k.options&&k.options.ranges;typeof E.yy.parseError=="function"?this.parseError=E.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function dt(b){o.length=o.length-2*b,f.length=f.length-b,l.length=l.length-b}s(dt,"popStack");function Q(){var b;return b=y.pop()||k.lex()||K,typeof b!="number"&&(b instanceof Array&&(y=b,b=y.pop()),b=a.symbols_[b]||b),b}s(Q,"lex");for(var v,P,w,q,C={},N,$,D,j;;){if(P=o[o.length-1],this.defaultActions[P]?w=this.defaultActions[P]:((v===null||typeof v>"u")&&(v=Q()),w=S[P]&&S[P][v]),typeof w>"u"||!w.length||!w[0]){var G="";j=[];for(N in S[P])this.terminals_[N]&&N>ut&&j.push("'"+this.terminals_[N]+"'");k.showPosition?G="Parse error on line "+(B+1)+`:
`+k.showPosition()+`
Expecting `+j.join(", ")+", got '"+(this.terminals_[v]||v)+"'":G="Parse error on line "+(B+1)+": Unexpected "+(v==K?"end of input":"'"+(this.terminals_[v]||v)+"'"),this.parseError(G,{text:k.match,token:this.terminals_[v]||v,line:k.yylineno,loc:Y,expected:j})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+P+", token: "+v);switch(w[0]){case 1:o.push(v),f.push(k.yytext),l.push(k.yylloc),o.push(w[1]),v=null,J=k.yyleng,_=k.yytext,B=k.yylineno,Y=k.yylloc;break;case 2:if($=this.productions_[w[1]][1],C.$=f[f.length-$],C._$={first_line:l[l.length-($||1)].first_line,last_line:l[l.length-1].last_line,first_column:l[l.length-($||1)].first_column,last_column:l[l.length-1].last_column},pt&&(C._$.range=[l[l.length-($||1)].range[0],l[l.length-1].range[1]]),q=this.performAction.apply(C,[_,J,B,E.yy,w[1],f,l].concat(yt)),typeof q<"u")return q;$&&(o=o.slice(0,-1*$*2),f=f.slice(0,-1*$),l=l.slice(0,-1*$)),o.push(this.productions_[w[1]][0]),f.push(C.$),l.push(C._$),D=S[o[o.length-2]][o[o.length-1]],o.push(D);break;case 3:return!0}}return!0},"parse")},x=function(){var g={EOF:1,parseError:s(function(a,o){if(this.yy.parser)this.yy.parser.parseError(a,o);else throw new Error(a)},"parseError"),setInput:s(function(r,a){return this.yy=a||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:s(function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var a=r.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},"input"),unput:s(function(r){var a=r.length,o=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var y=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),o.length-1&&(this.yylineno-=o.length-1);var f=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:o?(o.length===y.length?this.yylloc.first_column:0)+y[y.length-o.length].length-o[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[f[0],f[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},"unput"),more:s(function(){return this._more=!0,this},"more"),reject:s(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:s(function(r){this.unput(this.match.slice(r))},"less"),pastInput:s(function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:s(function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:s(function(){var r=this.pastInput(),a=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+a+"^"},"showPosition"),test_match:s(function(r,a){var o,y,f;if(this.options.backtrack_lexer&&(f={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(f.yylloc.range=this.yylloc.range.slice(0))),y=r[0].match(/(?:\r\n?|\n).*/g),y&&(this.yylineno+=y.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:y?y[y.length-1].length-y[y.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],o=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),o)return o;if(this._backtrack){for(var l in f)this[l]=f[l];return!1}return!1},"test_match"),next:s(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,a,o,y;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),l=0;l<f.length;l++)if(o=this._input.match(this.rules[f[l]]),o&&(!a||o[0].length>a[0].length)){if(a=o,y=l,this.options.backtrack_lexer){if(r=this.test_match(o,f[l]),r!==!1)return r;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(r=this.test_match(a,f[y]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:s(function(){var a=this.next();return a||this.lex()},"lex"),begin:s(function(a){this.conditionStack.push(a)},"begin"),popState:s(function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:s(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:s(function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},"topState"),pushState:s(function(a){this.begin(a)},"pushState"),stateStackSize:s(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:s(function(a,o,y,f){switch(y){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;case 8:return this.popState(),"acc_title_value";case 9:return this.begin("acc_descr"),14;case 10:return this.popState(),"acc_descr_value";case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return g}();p.lexer=x;function m(){this.yy={}}return s(m,"Parser"),m.prototype=p,p.Parser=m,new m}();H.parser=H;var $t=H,V="",U=[],F=[],R=[],Mt=s(function(){U.length=0,F.length=0,V="",R.length=0,St()},"clear"),Et=s(function(t){V=t,U.push(t)},"addSection"),Pt=s(function(){return U},"getSections"),It=s(function(){let t=et();const e=100;let n=0;for(;!t&&n<e;)t=et(),n++;return F.push(...R),F},"getTasks"),At=s(function(){const t=[];return F.forEach(n=>{n.people&&t.push(...n.people)}),[...new Set(t)].sort()},"updateActors"),Ct=s(function(t,e){const n=e.substr(1).split(":");let c=0,i=[];n.length===1?(c=Number(n[0]),i=[]):(c=Number(n[0]),i=n[1].split(","));const u=i.map(d=>d.trim()),h={section:V,type:V,people:u,task:t,score:c};R.push(h)},"addTask"),Vt=s(function(t){const e={section:V,type:V,description:t,task:t,classes:[]};F.push(e)},"addTaskOrg"),et=s(function(){const t=s(function(n){return R[n].processed},"compileTask");let e=!0;for(const[n,c]of R.entries())t(n),e=e&&c.processed;return e},"compileTasks"),Ft=s(function(){return At()},"getActors"),rt={getConfig:s(()=>A().journey,"getConfig"),clear:Mt,setDiagramTitle:wt,getDiagramTitle:bt,setAccTitle:vt,getAccTitle:_t,setAccDescription:kt,getAccDescription:xt,addSection:Et,getSections:Pt,getTasks:It,addTask:Ct,addTaskOrg:Vt,getActors:Ft},Rt=s(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
    font-family: ${t.fontFamily};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,"getStyles"),Lt=Rt,Z=s(function(t,e){return mt(t,e)},"drawRect"),Bt=s(function(t,e){const c=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),i=t.append("g");i.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),i.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function u(p){const x=tt().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);p.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}s(u,"smile");function h(p){const x=tt().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);p.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}s(h,"sad");function d(p){p.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return s(d,"ambivalent"),e.score>3?u(i):e.score<3?h(i):d(i),c},"drawFace"),ot=s(function(t,e){const n=t.append("circle");return n.attr("cx",e.cx),n.attr("cy",e.cy),n.attr("class","actor-"+e.pos),n.attr("fill",e.fill),n.attr("stroke",e.stroke),n.attr("r",e.r),n.class!==void 0&&n.attr("class",n.class),e.title!==void 0&&n.append("title").text(e.title),n},"drawCircle"),lt=s(function(t,e){return gt(t,e)},"drawText"),Nt=s(function(t,e){function n(i,u,h,d,p){return i+","+u+" "+(i+h)+","+u+" "+(i+h)+","+(u+d-p)+" "+(i+h-p*1.2)+","+(u+d)+" "+i+","+(u+d)}s(n,"genPoints");const c=t.append("polygon");c.attr("points",n(e.x,e.y,50,20,7)),c.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,lt(t,e)},"drawLabel"),jt=s(function(t,e,n){const c=t.append("g"),i=at();i.x=e.x,i.y=e.y,i.fill=e.fill,i.width=n.width*e.taskCount+n.diagramMarginX*(e.taskCount-1),i.height=n.height,i.class="journey-section section-type-"+e.num,i.rx=3,i.ry=3,Z(c,i),ct(n)(e.text,c,i.x,i.y,i.width,i.height,{class:"journey-section section-type-"+e.num},n,e.colour)},"drawSection"),it=-1,zt=s(function(t,e,n){const c=e.x+n.width/2,i=t.append("g");it++;const u=300+5*30;i.append("line").attr("id","task"+it).attr("x1",c).attr("y1",e.y).attr("x2",c).attr("y2",u).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Bt(i,{cx:c,cy:300+(5-e.score)*30,score:e.score});const h=at();h.x=e.x,h.y=e.y,h.fill=e.fill,h.width=n.width,h.height=n.height,h.class="task task-type-"+e.num,h.rx=3,h.ry=3,Z(i,h);let d=e.x+14;e.people.forEach(p=>{const x=e.actors[p].color,m={cx:d,cy:e.y,r:7,fill:x,stroke:"#000",title:p,pos:e.actors[p].position};ot(i,m),d+=10}),ct(n)(e.task,i,h.x,h.y,h.width,h.height,{class:"task"},n,e.colour)},"drawTask"),Ot=s(function(t,e){ft(t,e)},"drawBackgroundRect"),ct=function(){function t(i,u,h,d,p,x,m,g){const r=u.append("text").attr("x",h+p/2).attr("y",d+x/2+5).style("font-color",g).style("text-anchor","middle").text(i);c(r,m)}s(t,"byText");function e(i,u,h,d,p,x,m,g,r){const{taskFontSize:a,taskFontFamily:o}=g,y=i.split(/<br\s*\/?>/gi);for(let f=0;f<y.length;f++){const l=f*a-a*(y.length-1)/2,S=u.append("text").attr("x",h+p/2).attr("y",d).attr("fill",r).style("text-anchor","middle").style("font-size",a).style("font-family",o);S.append("tspan").attr("x",h+p/2).attr("dy",l).text(y[f]),S.attr("y",d+x/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),c(S,m)}}s(e,"byTspan");function n(i,u,h,d,p,x,m,g){const r=u.append("switch"),o=r.append("foreignObject").attr("x",h).attr("y",d).attr("width",p).attr("height",x).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");o.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(i),e(i,r,h,d,p,x,m,g),c(o,m)}s(n,"byFo");function c(i,u){for(const h in u)h in u&&i.attr(h,u[h])}return s(c,"_setTextAttrs"),function(i){return i.textPlacement==="fo"?n:i.textPlacement==="old"?t:e}}(),Yt=s(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),L={drawRect:Z,drawCircle:ot,drawSection:jt,drawText:lt,drawLabel:Nt,drawTask:zt,drawBackgroundRect:Ot,initGraphics:Yt},qt=s(function(t){Object.keys(t).forEach(function(n){z[n]=t[n]})},"setConf"),M={};function ht(t){const e=A().journey;let n=60;Object.keys(M).forEach(c=>{const i=M[c].color,u={cx:20,cy:n,r:7,fill:i,stroke:"#000",pos:M[c].position};L.drawCircle(t,u);const h={x:40,y:n+7,fill:"#666",text:c,textMargin:e.boxTextMargin|5};L.drawText(t,h),n+=20})}s(ht,"drawActorLegend");var z=A().journey,I=z.leftMargin,Gt=s(function(t,e,n,c){const i=A().journey,u=A().securityLevel;let h;u==="sandbox"&&(h=W("#i"+e));const d=u==="sandbox"?W(h.nodes()[0].contentDocument.body):W("body");T.init();const p=d.select("#"+e);L.initGraphics(p);const x=c.db.getTasks(),m=c.db.getDiagramTitle(),g=c.db.getActors();for(const l in M)delete M[l];let r=0;g.forEach(l=>{M[l]={color:i.actorColours[r%i.actorColours.length],position:r},r++}),ht(p),T.insert(0,0,I,Object.keys(M).length*50),Wt(p,x,0);const a=T.getBounds();m&&p.append("text").text(m).attr("x",I).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);const o=a.stopy-a.starty+2*i.diagramMarginY,y=I+a.stopx+2*i.diagramMarginX;Tt(p,o,y,i.useMaxWidth),p.append("line").attr("x1",I).attr("y1",i.height*4).attr("x2",y-I-4).attr("y2",i.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const f=m?70:0;p.attr("viewBox",`${a.startx} -25 ${y} ${o+f}`),p.attr("preserveAspectRatio","xMinYMin meet"),p.attr("height",o+f+25)},"draw"),T={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:s(function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},"init"),updateVal:s(function(t,e,n,c){t[e]===void 0?t[e]=n:t[e]=c(n,t[e])},"updateVal"),updateBounds:s(function(t,e,n,c){const i=A().journey,u=this;let h=0;function d(p){return s(function(m){h++;const g=u.sequenceItems.length-h+1;u.updateVal(m,"starty",e-g*i.boxMargin,Math.min),u.updateVal(m,"stopy",c+g*i.boxMargin,Math.max),u.updateVal(T.data,"startx",t-g*i.boxMargin,Math.min),u.updateVal(T.data,"stopx",n+g*i.boxMargin,Math.max),p!=="activation"&&(u.updateVal(m,"startx",t-g*i.boxMargin,Math.min),u.updateVal(m,"stopx",n+g*i.boxMargin,Math.max),u.updateVal(T.data,"starty",e-g*i.boxMargin,Math.min),u.updateVal(T.data,"stopy",c+g*i.boxMargin,Math.max))},"updateItemBounds")}s(d,"updateFn"),this.sequenceItems.forEach(d())},"updateBounds"),insert:s(function(t,e,n,c){const i=Math.min(t,n),u=Math.max(t,n),h=Math.min(e,c),d=Math.max(e,c);this.updateVal(T.data,"startx",i,Math.min),this.updateVal(T.data,"starty",h,Math.min),this.updateVal(T.data,"stopx",u,Math.max),this.updateVal(T.data,"stopy",d,Math.max),this.updateBounds(i,h,u,d)},"insert"),bumpVerticalPos:s(function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},"bumpVerticalPos"),getVerticalPos:s(function(){return this.verticalPos},"getVerticalPos"),getBounds:s(function(){return this.data},"getBounds")},X=z.sectionFills,st=z.sectionColours,Wt=s(function(t,e,n){const c=A().journey;let i="";const u=c.height*2+c.diagramMarginY,h=n+u;let d=0,p="#CCC",x="black",m=0;for(const[g,r]of e.entries()){if(i!==r.section){p=X[d%X.length],m=d%X.length,x=st[d%st.length];let o=0;const y=r.section;for(let l=g;l<e.length&&e[l].section==y;l++)o=o+1;const f={x:g*c.taskMargin+g*c.width+I,y:50,text:r.section,fill:p,num:m,colour:x,taskCount:o};L.drawSection(t,f,c),i=r.section,d++}const a=r.people.reduce((o,y)=>(M[y]&&(o[y]=M[y]),o),{});r.x=g*c.taskMargin+g*c.width+I,r.y=h,r.width=c.diagramMarginX,r.height=c.diagramMarginY,r.colour=x,r.fill=p,r.num=m,r.actors=a,L.drawTask(t,r,c),T.insert(r.x,r.y,r.x+r.width+c.taskMargin,300+5*30)}},"drawTasks"),nt={setConf:qt,draw:Gt},Le={parser:$t,db:rt,renderer:nt,styles:Lt,init:s(t=>{nt.setConf(t.journey),rt.clear()},"init")};export{Le as diagram};
