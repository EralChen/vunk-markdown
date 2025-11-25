import{ma as m,q4 as d,Iv as b,Iw as x,Fv as y,sc as F,gR as g,mc as v,F1 as j}from"./chunk-cvHeDBxF.js";import"./chunk-CqlT16uv.js";function c(r){const{options:e,value:o}=r;return typeof e[o]=="number"}function p(r){let e="";for(const o in r){const n=r[o];if(typeof n=="boolean")n&&(e+=`#define ${o}
`);else if(typeof n=="number")e+=`#define ${o} ${n.toFixed()}
`;else if(typeof n=="object")if(c(n)){const{value:t,options:f,namespace:s}=n,a=s?`${s}_`:"";for(const i in f)e+=`#define ${a}${i} ${f[i].toFixed()}
`;e+=`#define ${o} ${a}${t}
`}else{const t=n.options;let f=0;for(const s in t)e+=`#define ${t[s]} ${(f++).toFixed()}
`;e+=`#define ${o} ${t[n.value]}
`}}return e}export{m as BufferObject,d as FramebufferObject,b as Program,x as ProgramCache,y as Renderbuffer,F as ShaderCompiler,g as Texture,v as VertexArrayObject,j as createProgram,p as glslifyDefineMap};
