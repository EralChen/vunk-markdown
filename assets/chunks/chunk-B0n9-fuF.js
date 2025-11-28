import{aJ as n,aq as m,d6 as d,ai as l,al as u}from"./chunk-DG8qAmac.js";import{c as g}from"./chunk-CHjp8Uen.js";import"./chunk-DCcMeRAK.js";import"./chunk-CtKJgjZ9.js";import"./chunk-DK42lOkB.js";import"./chunk-vvDI0PX1.js";import"./chunk-Ct4Tm6f7.js";import"./chunk-Dpx_InE4.js";import"./chunk-AzQdjrqX.js";import"./chunk-QXap_35O.js";import"./chunk-CNWaEmyl.js";import"./chunk-CUzevAry.js";import"./chunk-Bn8CWIuV.js";import"./chunk-BFLErLYb.js";import"./chunk-CP9tOqm2.js";import"./chunk-CKwt2uXH.js";import"./chunk-CujHzHWW.js";import"./chunk-Caulfaw_.js";import"./chunk-BVhBhYQg.js";import"./chunk-_4PdpfqO.js";import"./chunk-B4mRqufT.js";import"./chunk-6EcuAM-e.js";import"./chunk-BL0OlQNv.js";import"./chunk-iL5WjyEH.js";let i=class extends g{initialize(){this.addHandles([n((()=>this.view.scale),(()=>this._update()),m)],"constructor")}isUpdating(){const t=this.layer.sublayers.some((s=>s.renderer!=null)),r=this._commandsQueue.updateTracking.updating,o=this._updatingRequiredPromise!=null,e=!this._workerProxy,a=this.dataUpdating,p=t&&(r||o||e||a);return d("esri-2d-log-updating")&&console.log(`Updating FLV2D: ${p}
  -> hasRenderer ${t}
  -> hasPendingCommand ${r}
  -> updatingRequiredFields ${o}
  -> updatingProxy ${e}
  -> updatingPipeline ${a}
`),p}};i=l([u("esri.views.2d.layers.SubtypeGroupLayerView2D")],i);const Q=i;export{Q as default};
