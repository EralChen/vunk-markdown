import{ac as i,ad as a,an as t,ao as n,ae as T}from"./chunk-Bj5pIyxE.js";import{f as l,m as f}from"./chunk-DTGwQZ-w.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=i(class extends a{constructor(e){if(super(e),e.type!==t.PROPERTY&&e.type!==t.ATTRIBUTE&&e.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!l(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[r]){if(r===n||r===T)return r;const o=e.element,s=e.name;if(e.type===t.PROPERTY){if(r===o[s])return n}else if(e.type===t.BOOLEAN_ATTRIBUTE){if(!!r===o.hasAttribute(s))return n}else if(e.type===t.ATTRIBUTE&&o.getAttribute(s)===r+"")return n;return f(e),r}});export{E as l};
