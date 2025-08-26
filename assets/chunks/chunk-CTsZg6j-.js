import{a0 as o,a1 as a,ab as t,ac as n,a2 as T}from"./chunk-CuaFhuP3.js";import{f as l,m as f}from"./chunk-BEU6TigS.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=o(class extends a{constructor(e){if(super(e),e.type!==t.PROPERTY&&e.type!==t.ATTRIBUTE&&e.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!l(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[r]){if(r===n||r===T)return r;const s=e.element,i=e.name;if(e.type===t.PROPERTY){if(r===s[i])return n}else if(e.type===t.BOOLEAN_ATTRIBUTE){if(!!r===s.hasAttribute(i))return n}else if(e.type===t.ATTRIBUTE&&s.getAttribute(i)===r+"")return n;return f(e),r}});export{E as l};
