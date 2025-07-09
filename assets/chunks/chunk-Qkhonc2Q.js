import{p as S}from"./chunk-Bl2s_-2q.js";import{_ as l,a4 as R,a5 as k,an as I,am as E,a6 as F,a7 as D,aR as z,as as G,az as y,aA as C,aB as P,l as B,b8 as V}from"./chunk-CV85VB2U.js";import{p as W}from"./chunk-Bw5cWb3v.js";/* empty css              *//* empty css              */import"./chunk-Biui6BxF.js";import"./chunk-C26dHzD_.js";/* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              */import"./chunk-JOSNoPqv.js";import"./chunk-B950-bov.js";import"./chunk-ei8CFR7m.js";var h={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},w={axes:[],curves:[],options:h},g=structuredClone(w),H=P.radar,j=l(()=>y({...H,...C().radar}),"getConfig"),b=l(()=>g.axes,"getAxes"),N=l(()=>g.curves,"getCurves"),U=l(()=>g.options,"getOptions"),X=l(e=>{g.axes=e.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),Y=l(e=>{g.curves=e.map(t=>({name:t.name,label:t.label??t.name,entries:Z(t.entries)}))},"setCurves"),Z=l(e=>{if(e[0].axis==null)return e.map(r=>r.value);const t=b();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(r=>{const a=e.find(o=>{var n;return((n=o.axis)==null?void 0:n.$refText)===r.name});if(a===void 0)throw new Error("Missing entry for axis "+r.label);return a.value})},"computeCurveEntries"),q=l(e=>{var t,r,a,o,n;const s=e.reduce((i,p)=>(i[p.name]=p,i),{});g.options={showLegend:((t=s.showLegend)==null?void 0:t.value)??h.showLegend,ticks:((r=s.ticks)==null?void 0:r.value)??h.ticks,max:((a=s.max)==null?void 0:a.value)??h.max,min:((o=s.min)==null?void 0:o.value)??h.min,graticule:((n=s.graticule)==null?void 0:n.value)??h.graticule}},"setOptions"),J=l(()=>{G(),g=structuredClone(w)},"clear"),$={getAxes:b,getCurves:N,getOptions:U,setAxes:X,setCurves:Y,setOptions:q,getConfig:j,clear:J,setAccTitle:D,getAccTitle:F,setDiagramTitle:E,getDiagramTitle:I,getAccDescription:k,setAccDescription:R},K=l(e=>{S(e,$);const{axes:t,curves:r,options:a}=e;$.setAxes(t),$.setCurves(r),$.setOptions(a)},"populate"),Q={parse:l(async e=>{const t=await W("radar",e);B.debug(t),K(t)},"parse")},tt=l((e,t,r,a)=>{const o=a.db,n=o.getAxes(),s=o.getCurves(),i=o.getOptions(),p=o.getConfig(),m=o.getDiagramTitle(),d=z(t),c=rt(d,p),u=i.max??Math.max(...s.map(f=>Math.max(...f.entries))),x=i.min,v=Math.min(p.width,p.height)/2;et(c,n,v,i.ticks,i.graticule),at(c,n,v,p),M(c,n,s,x,u,i.graticule,p),T(c,s,i.showLegend,p),c.append("text").attr("class","radarTitle").text(m).attr("x",0).attr("y",-p.height/2-p.marginTop)},"draw"),rt=l((e,t)=>{const r=t.width+t.marginLeft+t.marginRight,a=t.height+t.marginTop+t.marginBottom,o={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return e.attr("viewbox",`0 0 ${r} ${a}`).attr("width",r).attr("height",a),e.append("g").attr("transform",`translate(${o.x}, ${o.y})`)},"drawFrame"),et=l((e,t,r,a,o)=>{if(o==="circle")for(let n=0;n<a;n++){const s=r*(n+1)/a;e.append("circle").attr("r",s).attr("class","radarGraticule")}else if(o==="polygon"){const n=t.length;for(let s=0;s<a;s++){const i=r*(s+1)/a,p=t.map((m,d)=>{const c=2*d*Math.PI/n-Math.PI/2,u=i*Math.cos(c),x=i*Math.sin(c);return`${u},${x}`}).join(" ");e.append("polygon").attr("points",p).attr("class","radarGraticule")}}},"drawGraticule"),at=l((e,t,r,a)=>{const o=t.length;for(let n=0;n<o;n++){const s=t[n].label,i=2*n*Math.PI/o-Math.PI/2;e.append("line").attr("x1",0).attr("y1",0).attr("x2",r*a.axisScaleFactor*Math.cos(i)).attr("y2",r*a.axisScaleFactor*Math.sin(i)).attr("class","radarAxisLine"),e.append("text").text(s).attr("x",r*a.axisLabelFactor*Math.cos(i)).attr("y",r*a.axisLabelFactor*Math.sin(i)).attr("class","radarAxisLabel")}},"drawAxes");function M(e,t,r,a,o,n,s){const i=t.length,p=Math.min(s.width,s.height)/2;r.forEach((m,d)=>{if(m.entries.length!==i)return;const c=m.entries.map((u,x)=>{const v=2*Math.PI*x/i-Math.PI/2,f=A(u,a,o,p),_=f*Math.cos(v),O=f*Math.sin(v);return{x:_,y:O}});n==="circle"?e.append("path").attr("d",L(c,s.curveTension)).attr("class",`radarCurve-${d}`):n==="polygon"&&e.append("polygon").attr("points",c.map(u=>`${u.x},${u.y}`).join(" ")).attr("class",`radarCurve-${d}`)})}l(M,"drawCurves");function A(e,t,r,a){const o=Math.min(Math.max(e,t),r);return a*(o-t)/(r-t)}l(A,"relativeRadius");function L(e,t){const r=e.length;let a=`M${e[0].x},${e[0].y}`;for(let o=0;o<r;o++){const n=e[(o-1+r)%r],s=e[o],i=e[(o+1)%r],p=e[(o+2)%r],m={x:s.x+(i.x-n.x)*t,y:s.y+(i.y-n.y)*t},d={x:i.x-(p.x-s.x)*t,y:i.y-(p.y-s.y)*t};a+=` C${m.x},${m.y} ${d.x},${d.y} ${i.x},${i.y}`}return`${a} Z`}l(L,"closedRoundCurve");function T(e,t,r,a){if(!r)return;const o=(a.width/2+a.marginRight)*3/4,n=-(a.height/2+a.marginTop)*3/4,s=20;t.forEach((i,p)=>{const m=e.append("g").attr("transform",`translate(${o}, ${n+p*s})`);m.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${p}`),m.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(i.label)})}l(T,"drawLegend");var ot={draw:tt},it=l((e,t)=>{let r="";for(let a=0;a<e.THEME_COLOR_LIMIT;a++){const o=e[`cScale${a}`];r+=`
		.radarCurve-${a} {
			color: ${o};
			fill: ${o};
			fill-opacity: ${t.curveOpacity};
			stroke: ${o};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${a} {
			fill: ${o};
			fill-opacity: ${t.curveOpacity};
			stroke: ${o};
		}
		`}return r},"genIndexStyles"),nt=l(e=>{const t=V(),r=C(),a=y(t,r.themeVariables),o=y(a.radar,e);return{themeVariables:a,radarOptions:o}},"buildRadarStyleOptions"),st=l(({radar:e}={})=>{const{themeVariables:t,radarOptions:r}=nt(e);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${r.axisColor};
		stroke-width: ${r.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${r.axisLabelFontSize}px;
		color: ${r.axisColor};
	}
	.radarGraticule {
		fill: ${r.graticuleColor};
		fill-opacity: ${r.graticuleOpacity};
		stroke: ${r.graticuleColor};
		stroke-width: ${r.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${r.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${it(t,r)}
	`},"styles"),yr={parser:Q,db:$,renderer:ot,styles:st};export{yr as diagram};
