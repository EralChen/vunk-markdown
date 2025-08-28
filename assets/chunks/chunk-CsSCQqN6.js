import{aJ as n,aq as m,d6 as d,ai as l,al as u}from"./chunk-CET6Djna.js";import{c as g}from"./chunk-DzULvO1f.js";import"./chunk-BoJEKryr.js";import"./chunk-C8OU9dtJ.js";import"./chunk-DELXsNEy.js";import"./chunk-CEplUXYF.js";import"./chunk-jduAaT_8.js";import"./chunk-DjXKmJgq.js";import"./chunk-DvpRAiWy.js";import"./chunk-QXap_35O.js";import"./chunk-LAsmWdb2.js";import"./chunk-CUzevAry.js";import"./chunk-D0O1cXCS.js";import"./chunk-BFLErLYb.js";import"./chunk-CjHvAPdT.js";import"./chunk-CKwt2uXH.js";import"./chunk-CujHzHWW.js";import"./chunk-Caulfaw_.js";import"./chunk-B53CrlK2.js";import"./chunk-BkzMyFvQ.js";import"./chunk-B4mRqufT.js";import"./chunk-6EcuAM-e.js";import"./chunk-CnYD1JEb.js";import"./chunk-iL5WjyEH.js";let i=class extends g{initialize(){this.addHandles([n((()=>this.view.scale),(()=>this._update()),m)],"constructor")}isUpdating(){const t=this.layer.sublayers.some((s=>s.renderer!=null)),r=this._commandsQueue.updateTracking.updating,o=this._updatingRequiredPromise!=null,e=!this._workerProxy,a=this.dataUpdating,p=t&&(r||o||e||a);return d("esri-2d-log-updating")&&console.log(`Updating FLV2D: ${p}
  -> hasRenderer ${t}
  -> hasPendingCommand ${r}
  -> updatingRequiredFields ${o}
  -> updatingProxy ${e}
  -> updatingPipeline ${a}
`),p}};i=l([u("esri.views.2d.layers.SubtypeGroupLayerView2D")],i);const Q=i;export{Q as default};
