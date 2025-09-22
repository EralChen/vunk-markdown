import{aJ as n,aq as m,d6 as d,ai as l,al as u}from"./chunk-Dx0VeHfy.js";import{c as g}from"./chunk-85_xiCvI.js";import"./chunk-DHAEDrTs.js";import"./chunk-T1gcu7De.js";import"./chunk-Dn-oRunx.js";import"./chunk-eIL3O1GI.js";import"./chunk-BaXc6uIe.js";import"./chunk-BELTRu_k.js";import"./chunk-Bb99Mywd.js";import"./chunk-QXap_35O.js";import"./chunk-JV9XATMi.js";import"./chunk-CUzevAry.js";import"./chunk-BfAy0xZC.js";import"./chunk-BFLErLYb.js";import"./chunk-C8owJ5SX.js";import"./chunk-CKwt2uXH.js";import"./chunk-CujHzHWW.js";import"./chunk-Caulfaw_.js";import"./chunk-CUMsaXj7.js";import"./chunk-CmqATuZf.js";import"./chunk-B4mRqufT.js";import"./chunk-6EcuAM-e.js";import"./chunk-cwGZTz3O.js";import"./chunk-iL5WjyEH.js";let i=class extends g{initialize(){this.addHandles([n((()=>this.view.scale),(()=>this._update()),m)],"constructor")}isUpdating(){const t=this.layer.sublayers.some((s=>s.renderer!=null)),r=this._commandsQueue.updateTracking.updating,o=this._updatingRequiredPromise!=null,e=!this._workerProxy,a=this.dataUpdating,p=t&&(r||o||e||a);return d("esri-2d-log-updating")&&console.log(`Updating FLV2D: ${p}
  -> hasRenderer ${t}
  -> hasPendingCommand ${r}
  -> updatingRequiredFields ${o}
  -> updatingProxy ${e}
  -> updatingPipeline ${a}
`),p}};i=l([u("esri.views.2d.layers.SubtypeGroupLayerView2D")],i);const Q=i;export{Q as default};
