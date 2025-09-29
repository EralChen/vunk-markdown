import{aJ as n,aq as m,d6 as d,ai as l,al as u}from"./chunk-CZWLvyZS.js";import{c as g}from"./chunk-CFWBNfSK.js";import"./chunk-CPs2Sz-2.js";import"./chunk-D3a8VnAp.js";import"./chunk-BsKQMpsz.js";import"./chunk-BWQMqute.js";import"./chunk-DdAPRkTB.js";import"./chunk-CnjJ1PYC.js";import"./chunk-Xj679XMQ.js";import"./chunk-QXap_35O.js";import"./chunk-BPenwCh_.js";import"./chunk-CUzevAry.js";import"./chunk-BdzMJGah.js";import"./chunk-BFLErLYb.js";import"./chunk-BnOdD9x1.js";import"./chunk-CKwt2uXH.js";import"./chunk-CujHzHWW.js";import"./chunk-Caulfaw_.js";import"./chunk-Co-C0OV3.js";import"./chunk-C5M4jL_9.js";import"./chunk-B4mRqufT.js";import"./chunk-6EcuAM-e.js";import"./chunk-5mxF_dE1.js";import"./chunk-iL5WjyEH.js";let i=class extends g{initialize(){this.addHandles([n((()=>this.view.scale),(()=>this._update()),m)],"constructor")}isUpdating(){const t=this.layer.sublayers.some((s=>s.renderer!=null)),r=this._commandsQueue.updateTracking.updating,o=this._updatingRequiredPromise!=null,e=!this._workerProxy,a=this.dataUpdating,p=t&&(r||o||e||a);return d("esri-2d-log-updating")&&console.log(`Updating FLV2D: ${p}
  -> hasRenderer ${t}
  -> hasPendingCommand ${r}
  -> updatingRequiredFields ${o}
  -> updatingProxy ${e}
  -> updatingPipeline ${a}
`),p}};i=l([u("esri.views.2d.layers.SubtypeGroupLayerView2D")],i);const Q=i;export{Q as default};
