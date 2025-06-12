import{x as S}from"./chunk-DB7j5ecc.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u=Symbol.for(""),d=t=>{if(t?.r===u)return t?._$litStatic$},m=t=>({_$litStatic$:t,r:u}),v=(t,...e)=>({_$litStatic$:e.reduce((o,a,l)=>o+(r=>{if(r._$litStatic$!==void 0)return r._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${r}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(a)+t[l+1],t[0]),r:u}),p=new Map,h=t=>(e,...o)=>{const a=o.length;let l,r;const s=[],$=[];let n,i=0,c=!1;for(;i<a;){for(n=e[i];i<a&&(r=o[i],(l=d(r))!==void 0);)n+=l+e[++i],c=!0;i!==a&&$.push(r),s.push(n),i++}if(i===a&&s.push(e[a]),c){const f=s.join("$$lit$$");(e=p.get(f))===void 0&&(s.raw=s,p.set(f,e=s)),o=$}return t(e,...o)},b=h(S);export{v as i,m as s,b as u};
