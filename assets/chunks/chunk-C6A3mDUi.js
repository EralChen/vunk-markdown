import{aJ as n,aq as m,d6 as d,ai as l,al as u}from"./chunk-DadqOv6U.js";import{c as g}from"./chunk-DObrQO17.js";import"./chunk-CPKck_yD.js";import"./chunk-Dqa-WBmj.js";import"./chunk-nOXB7qP5.js";import"./chunk-BOWUl8oP.js";import"./chunk-CjZpsl1V.js";import"./chunk-DEZj-97Y.js";import"./chunk-vLBhaxoq.js";import"./chunk-QXap_35O.js";import"./chunk-Bli5GAp2.js";import"./chunk-CUzevAry.js";import"./chunk-BcYBtzVA.js";import"./chunk-BFLErLYb.js";import"./chunk-CdMWyiFk.js";import"./chunk-CKwt2uXH.js";import"./chunk-CujHzHWW.js";import"./chunk-Caulfaw_.js";import"./chunk-CTkdpn9y.js";import"./chunk-BuSrL1F6.js";import"./chunk-B4mRqufT.js";import"./chunk-6EcuAM-e.js";import"./chunk-Co3DIHYh.js";import"./chunk-iL5WjyEH.js";let i=class extends g{initialize(){this.addHandles([n((()=>this.view.scale),(()=>this._update()),m)],"constructor")}isUpdating(){const t=this.layer.sublayers.some((s=>s.renderer!=null)),r=this._commandsQueue.updateTracking.updating,o=this._updatingRequiredPromise!=null,e=!this._workerProxy,a=this.dataUpdating,p=t&&(r||o||e||a);return d("esri-2d-log-updating")&&console.log(`Updating FLV2D: ${p}
  -> hasRenderer ${t}
  -> hasPendingCommand ${r}
  -> updatingRequiredFields ${o}
  -> updatingProxy ${e}
  -> updatingPipeline ${a}
`),p}};i=l([u("esri.views.2d.layers.SubtypeGroupLayerView2D")],i);const Q=i;export{Q as default};
