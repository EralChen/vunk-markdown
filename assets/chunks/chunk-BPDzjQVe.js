import{pB as b,pH as x,HX as y,HY as F,Fx as g,sc as j,gV as v,mo as H,F7 as O}from"./chunk-B0S82j6z.js";import"./chunk-DsYbGKja.js";import"./chunk-BuZVacDv.js";/* empty css              */function c(r){const{options:e,value:n}=r;return typeof e[n]=="number"}function u(r){let e="";for(const n in r){const o=r[n];if(typeof o=="boolean")o&&(e+=`#define ${n}
`);else if(typeof o=="number")e+=`#define ${n} ${o.toFixed()}
`;else if(typeof o=="object")if(c(o)){const{value:t,options:f,namespace:i}=o,s=i?`${i}_`:"";for(const a in f)e+=`#define ${s}${a} ${f[a].toFixed()}
`;e+=`#define ${n} ${s}${t}
`}else{const t=o.options;let f=0;for(const i in t)e+=`#define ${t[i]} ${(f++).toFixed()}
`;e+=`#define ${n} ${t[o.value]}
`}}return e}export{b as BufferObject,x as FramebufferObject,y as Program,F as ProgramCache,g as Renderbuffer,j as ShaderCompiler,v as Texture,H as VertexArrayObject,O as createProgram,u as glslifyDefineMap};
