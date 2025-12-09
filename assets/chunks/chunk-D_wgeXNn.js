import{_ as l,s as k,g as R,t as F,q as I,a as _,b as E,K as D,z as G,F as y,G as C,H as z,l as P,M as H}from"./chunk-CAj60Dev.js";import{p as V}from"./chunk-CjvHp3TS.js";import{p as W}from"./chunk-ZHBpBuAM.js";import"./chunk-BwYhd1Kc.js";import"./chunk-yDgrv90l.js";import"./chunk-BBnM6NiO.js";/* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              */import"./chunk-_gMROmfM.js";import"./chunk-DU1-uaYd.js";import"./chunk-BuDPUeRL.js";import"./chunk-CSVzDSO0.js";import"./chunk-D5iaQeiq.js";/* empty css              */import"./chunk-D3BmuU4M.js";import"./chunk-zyWjWayM.js";import"./chunk-BXBkkVUB.js";var h={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},w={axes:[],curves:[],options:h},g=structuredClone(w),B=z.radar,j=l(()=>y({...B,...C().radar}),"getConfig"),b=l(()=>g.axes,"getAxes"),q=l(()=>g.curves,"getCurves"),K=l(()=>g.options,"getOptions"),N=l(r=>{g.axes=r.map(t=>({name:t.name,label:t.label??t.name}))},"setAxes"),U=l(r=>{g.curves=r.map(t=>({name:t.name,label:t.label??t.name,entries:X(t.entries)}))},"setCurves"),X=l(r=>{if(r[0].axis==null)return r.map(e=>e.value);const t=b();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const a=r.find(o=>o.axis?.$refText===e.name);if(a===void 0)throw new Error("Missing entry for axis "+e.label);return a.value})},"computeCurveEntries"),Y=l(r=>{const t=r.reduce((e,a)=>(e[a.name]=a,e),{});g.options={showLegend:t.showLegend?.value??h.showLegend,ticks:t.ticks?.value??h.ticks,max:t.max?.value??h.max,min:t.min?.value??h.min,graticule:t.graticule?.value??h.graticule}},"setOptions"),Z=l(()=>{G(),g=structuredClone(w)},"clear"),$={getAxes:b,getCurves:q,getOptions:K,setAxes:N,setCurves:U,setOptions:Y,getConfig:j,clear:Z,setAccTitle:E,getAccTitle:_,setDiagramTitle:I,getDiagramTitle:F,getAccDescription:R,setAccDescription:k},J=l(r=>{V(r,$);const{axes:t,curves:e,options:a}=r;$.setAxes(t),$.setCurves(e),$.setOptions(a)},"populate"),Q={parse:l(async r=>{const t=await W("radar",r);P.debug(t),J(t)},"parse")},tt=l((r,t,e,a)=>{const o=a.db,s=o.getAxes(),n=o.getCurves(),i=o.getOptions(),c=o.getConfig(),p=o.getDiagramTitle(),d=D(t),m=et(d,c),u=i.max??Math.max(...n.map(f=>Math.max(...f.entries))),x=i.min,v=Math.min(c.width,c.height)/2;rt(m,s,v,i.ticks,i.graticule),at(m,s,v,c),M(m,s,n,x,u,i.graticule,c),T(m,n,i.showLegend,c),m.append("text").attr("class","radarTitle").text(p).attr("x",0).attr("y",-c.height/2-c.marginTop)},"draw"),et=l((r,t)=>{const e=t.width+t.marginLeft+t.marginRight,a=t.height+t.marginTop+t.marginBottom,o={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return r.attr("viewbox",`0 0 ${e} ${a}`).attr("width",e).attr("height",a),r.append("g").attr("transform",`translate(${o.x}, ${o.y})`)},"drawFrame"),rt=l((r,t,e,a,o)=>{if(o==="circle")for(let s=0;s<a;s++){const n=e*(s+1)/a;r.append("circle").attr("r",n).attr("class","radarGraticule")}else if(o==="polygon"){const s=t.length;for(let n=0;n<a;n++){const i=e*(n+1)/a,c=t.map((p,d)=>{const m=2*d*Math.PI/s-Math.PI/2,u=i*Math.cos(m),x=i*Math.sin(m);return`${u},${x}`}).join(" ");r.append("polygon").attr("points",c).attr("class","radarGraticule")}}},"drawGraticule"),at=l((r,t,e,a)=>{const o=t.length;for(let s=0;s<o;s++){const n=t[s].label,i=2*s*Math.PI/o-Math.PI/2;r.append("line").attr("x1",0).attr("y1",0).attr("x2",e*a.axisScaleFactor*Math.cos(i)).attr("y2",e*a.axisScaleFactor*Math.sin(i)).attr("class","radarAxisLine"),r.append("text").text(n).attr("x",e*a.axisLabelFactor*Math.cos(i)).attr("y",e*a.axisLabelFactor*Math.sin(i)).attr("class","radarAxisLabel")}},"drawAxes");function M(r,t,e,a,o,s,n){const i=t.length,c=Math.min(n.width,n.height)/2;e.forEach((p,d)=>{if(p.entries.length!==i)return;const m=p.entries.map((u,x)=>{const v=2*Math.PI*x/i-Math.PI/2,f=A(u,a,o,c),O=f*Math.cos(v),S=f*Math.sin(v);return{x:O,y:S}});s==="circle"?r.append("path").attr("d",L(m,n.curveTension)).attr("class",`radarCurve-${d}`):s==="polygon"&&r.append("polygon").attr("points",m.map(u=>`${u.x},${u.y}`).join(" ")).attr("class",`radarCurve-${d}`)})}l(M,"drawCurves");function A(r,t,e,a){const o=Math.min(Math.max(r,t),e);return a*(o-t)/(e-t)}l(A,"relativeRadius");function L(r,t){const e=r.length;let a=`M${r[0].x},${r[0].y}`;for(let o=0;o<e;o++){const s=r[(o-1+e)%e],n=r[o],i=r[(o+1)%e],c=r[(o+2)%e],p={x:n.x+(i.x-s.x)*t,y:n.y+(i.y-s.y)*t},d={x:i.x-(c.x-n.x)*t,y:i.y-(c.y-n.y)*t};a+=` C${p.x},${p.y} ${d.x},${d.y} ${i.x},${i.y}`}return`${a} Z`}l(L,"closedRoundCurve");function T(r,t,e,a){if(!e)return;const o=(a.width/2+a.marginRight)*3/4,s=-(a.height/2+a.marginTop)*3/4,n=20;t.forEach((i,c)=>{const p=r.append("g").attr("transform",`translate(${o}, ${s+c*n})`);p.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${c}`),p.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(i.label)})}l(T,"drawLegend");var ot={draw:tt},it=l((r,t)=>{let e="";for(let a=0;a<r.THEME_COLOR_LIMIT;a++){const o=r[`cScale${a}`];e+=`
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
		`}return e},"genIndexStyles"),st=l(r=>{const t=H(),e=C(),a=y(t,e.themeVariables),o=y(a.radar,r);return{themeVariables:a,radarOptions:o}},"buildRadarStyleOptions"),nt=l(({radar:r}={})=>{const{themeVariables:t,radarOptions:e}=st(r);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${it(t,e)}
	`},"styles"),ie={parser:Q,db:$,renderer:ot,styles:nt};export{ie as diagram};
