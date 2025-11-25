import{aJ as n,aq as m,d6 as d,ai as l,al as u}from"./chunk-cvHeDBxF.js";import{c as g}from"./chunk-B6mz7G6T.js";import"./chunk-CqlT16uv.js";import"./chunk-BH9h2qOI.js";import"./chunk-B9f1rXvh.js";import"./chunk-BVXDeoWn.js";import"./chunk-C0hZ6jc_.js";import"./chunk-CMTUnFl5.js";import"./chunk-D1hFcVob.js";import"./chunk-QXap_35O.js";import"./chunk-C3mgSMSj.js";import"./chunk-CUzevAry.js";import"./chunk-DvMjzZQe.js";import"./chunk-BFLErLYb.js";import"./chunk-D9ytbqrz.js";import"./chunk-CKwt2uXH.js";import"./chunk-CujHzHWW.js";import"./chunk-Caulfaw_.js";import"./chunk-Dz9fTUsZ.js";import"./chunk-BcCyRWAD.js";import"./chunk-B4mRqufT.js";import"./chunk-6EcuAM-e.js";import"./chunk-Bzt55to4.js";import"./chunk-iL5WjyEH.js";let i=class extends g{initialize(){this.addHandles([n((()=>this.view.scale),(()=>this._update()),m)],"constructor")}isUpdating(){const t=this.layer.sublayers.some((s=>s.renderer!=null)),r=this._commandsQueue.updateTracking.updating,o=this._updatingRequiredPromise!=null,e=!this._workerProxy,a=this.dataUpdating,p=t&&(r||o||e||a);return d("esri-2d-log-updating")&&console.log(`Updating FLV2D: ${p}
  -> hasRenderer ${t}
  -> hasPendingCommand ${r}
  -> updatingRequiredFields ${o}
  -> updatingProxy ${e}
  -> updatingPipeline ${a}
`),p}};i=l([u("esri.views.2d.layers.SubtypeGroupLayerView2D")],i);const Q=i;export{Q as default};
