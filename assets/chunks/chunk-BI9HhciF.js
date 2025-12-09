import{b0 as o,b5 as pe,a$ as T,mp as ue,da as X,vf as fe,mm as ge,iJ as _e,ct as Z,Ko as me,Kl as ve,KS as be,I7 as f,Ii as w,Kq as Pe,I$ as z,I8 as r,d6 as U,I9 as Q,Kn as we,Ig as S,v9 as Ve,e6 as m,gG as $,d2 as N,KT as De,lq as Y,I6 as ee,Jp as C,vd as xe,bZ as v,KU as te,lb as ie,bm as ne,d1 as Ee,c_ as ye,g6 as Le,va as Se,cE as Ce,c$ as Me,b1 as se,Ik as ae,Il as re,Ku as Ae,IS as $e,cs as W,cw as O,Km as Re,yA as Te,jM as Ie,Jn as Oe,JV as Ue,Ij as F,KV as qe,Iv as D,Kv as je,Kw as H,KW as ze,mG as Ne,KX as R,KY as We,cy as Fe,cz as He,w2 as Be,cB as Ke,cC as Ge,cD as ke,ak as M,am as Je,KZ as Xe,n2 as B}from"./chunk-DbiObNSB.js";import{t as Ze}from"./chunk-CMcg_YFh.js";import{_ as u}from"./chunk-DsYbGKja.js";import{_ as le}from"./chunk-BBnM6NiO.js";let K=class{constructor(e){this._renderCoordsHelper=e,this._origin=o(),this._dirty=!1,this._count=0}set vertices(e){const n=pe(3*e.length);let i=0;for(const s of e)n[i++]=s[0],n[i++]=s[1],n[i++]=s[2];this.buffers=[n]}set buffers(e){if(this._buffers=e,this._buffers.length>0){const n=this._buffers[0],i=3*Math.floor(n.length/3/2);T(this._origin,n[i],n[i+1],n[i+2])}else T(this._origin,0,0,0);this._dirty=!0}get origin(){return this._origin}draw(e){const n=this._ensureVAO(e);n!=null&&(e.bindVAO(n),e.drawArrays(ue.TRIANGLES,0,this._count))}dispose(){this._vao!=null&&this._vao.dispose()}get _layout(){return this._renderCoordsHelper.viewingMode===1?Ye:et}_ensureVAO(e){return this._buffers==null?null:(this._vao??=this._createVAO(e,this._buffers),this._ensureVertexData(this._vao,this._buffers),this._vao)}_createVAO(e,n){const i=this._createDataBuffer(n);return this._dirty=!1,new fe(e,new ge(e,_e(this._layout),i))}_ensureVertexData(e,n){if(!this._dirty)return;const i=this._createDataBuffer(n);e.buffer()?.setData(i),this._dirty=!1}_createDataBuffer(e){const n=e.reduce((g,c)=>g+G(c),0);this._count=n;const i=this._layout.createBuffer(n),s=this._origin;let a=0,l=0;const d="startUp"in i?this._setUpVectors.bind(this,i):void 0;for(const g of e){for(let c=0;c<g.length;c+=3){const L=T(k,g[c],g[c+1],g[c+2]);c===0?l=this._renderCoordsHelper.getAltitude(L):this._renderCoordsHelper.setAltitude(L,l);const _=a+2*c;d?.(c,_,g,L);const j=Z(k,L,s);if(c<g.length-3){for(let b=0;b<6;b++)i.start.setVec(_+b,j);i.extrude.setValues(_,0,-1),i.extrude.setValues(_+1,1,-1),i.extrude.setValues(_+2,1,1),i.extrude.setValues(_+3,0,-1),i.extrude.setValues(_+4,1,1),i.extrude.setValues(_+5,0,1)}if(c>0)for(let b=-6;b<0;b++)i.end.setVec(_+b,j)}a+=G(g)}return i.buffer}_setUpVectors(e,n,i,s,a){const l=this._renderCoordsHelper.worldUpAtPosition(a,Qe);if(n<s.length-3)for(let d=0;d<6;d++)e.startUp.setVec(i+d,l);if(n>0)for(let d=-6;d<0;d++)e.endUp.setVec(i+d,l)}};function G(t){return 3*(2*(t.length/3-1))}const Qe=o(),k=o(),Ye=X().vec3f("start").vec3f("end").vec2f("extrude").vec3f("startUp").vec3f("endUp"),et=X().vec3f("start").vec3f("end").vec2f("extrude");function oe(t,e){const n=t.fragment;n.include(me),t.include(ve),n.include(be),n.uniforms.add(new f("globalAlpha",i=>i.globalAlpha),new w("glowColor",i=>i.glowColor),new f("glowWidth",(i,s)=>i.glowWidth*s.camera.pixelRatio),new f("glowFalloff",i=>i.glowFalloff),new w("innerColor",i=>i.innerColor),new f("innerWidth",(i,s)=>i.innerWidth*s.camera.pixelRatio),new Pe("depthMap",i=>i.depth?.attachment),new z("normalMap",i=>i.normals)),n.code.add(r`vec4 premultipliedColor(vec3 rgb, float alpha) {
return vec4(rgb * alpha, alpha);
}`),n.code.add(r`vec4 laserlineProfile(float dist) {
if (dist > glowWidth) {
return vec4(0.0);
}
float innerAlpha = (1.0 - smoothstep(0.0, innerWidth, dist));
float glowAlpha = pow(max(0.0, 1.0 - dist / glowWidth), glowFalloff);
return blendColorsPremultiplied(
premultipliedColor(innerColor, innerAlpha),
premultipliedColor(glowColor, glowAlpha)
);
}`),n.code.add(r`bool laserlineReconstructFromDepth(out vec3 pos, out vec3 normal, out float angleCutoffAdjust, out float depthDiscontinuityAlpha) {
float depth = depthFromTexture(depthMap, uv);
if (depth == 1.0) {
return false;
}
float linearDepth = linearizeDepth(depth);
pos = reconstructPosition(gl_FragCoord.xy, linearDepth);
float minStep = 6e-8;
float depthStep = clamp(depth + minStep, 0.0, 1.0);
float linearDepthStep = linearizeDepth(depthStep);
float depthError = abs(linearDepthStep - linearDepth);
vec3 normalReconstructed = normalize(cross(dFdx(pos), dFdy(pos)));
vec3 normalFromTexture = normalize(texture(normalMap, uv).xyz * 2.0 - 1.0);
float blendFactor = smoothstep(0.15, 0.2, depthError);
normal = normalize(mix(normalReconstructed, normalFromTexture, blendFactor));
angleCutoffAdjust = mix(0.0, 0.004, blendFactor);
float ddepth = fwidth(linearDepth);
depthDiscontinuityAlpha = 1.0 - smoothstep(0.0, 0.01, -ddepth / linearDepth);
return true;
}`),e.contrastControlEnabled?n.uniforms.add(new z("frameColor",(i,s)=>i.colors),new f("globalAlphaContrastBoost",i=>i.globalAlphaContrastBoost)).code.add(r`float rgbToLuminance(vec3 color) {
return dot(vec3(0.2126, 0.7152, 0.0722), color);
}
vec4 laserlineOutput(vec4 color) {
float backgroundLuminance = rgbToLuminance(texture(frameColor, uv).rgb);
float alpha = clamp(globalAlpha * max(backgroundLuminance * globalAlphaContrastBoost, 1.0), 0.0, 1.0);
return color * alpha;
}`):n.code.add(r`vec4 laserlineOutput(vec4 color) {
return color * globalAlpha;
}`)}const q=U(6);function ce(t){const e=new Q;e.include(we),e.include(oe,t);const n=e.fragment;if(t.lineVerticalPlaneEnabled||t.heightManifoldEnabled)if(n.uniforms.add(new f("maxPixelDistance",(i,s)=>t.heightManifoldEnabled?2*s.camera.computeScreenPixelSizeAt(i.heightManifoldTarget):2*s.camera.computeScreenPixelSizeAt(i.lineVerticalPlaneSegment.origin))),n.code.add(r`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),t.spherical){const i=(a,l,d)=>m(a,l.heightManifoldTarget,d.camera.viewMatrix),s=(a,l)=>m(a,[0,0,0],l.camera.viewMatrix);n.uniforms.add(new S("heightManifoldOrigin",(a,l)=>(i(p,a,l),s(V,l),Z(V,V,p),$(h,V),h[3]=N(V),h)),new De("globalOrigin",a=>s(p,a)),new f("cosSphericalAngleThreshold",(a,l)=>1-Math.max(2,Y(l.camera.eye,a.heightManifoldTarget)*l.camera.perRenderPixelRatio)/N(a.heightManifoldTarget))),n.code.add(r`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else n.code.add(r`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(t.pointDistanceEnabled&&(n.uniforms.add(new f("maxPixelDistance",(i,s)=>2*s.camera.computeScreenPixelSizeAt(i.pointDistanceTarget))),n.code.add(r`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),t.intersectsLineEnabled&&n.uniforms.add(new ee("perScreenPixelRatio",i=>i.camera.perScreenPixelRatio)).code.add(r`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`),(t.lineVerticalPlaneEnabled||t.intersectsLineEnabled)&&n.code.add(r`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),n.main.add(r`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),t.heightManifoldEnabled){n.uniforms.add(new C("angleCutoff",s=>A(s)),new S("heightPlane",(s,a)=>he(s.heightManifoldTarget,s.renderCoordsHelper.worldUpAtPosition(s.heightManifoldTarget,p),a.camera.viewMatrix)));const i=t.spherical?r`normalize(globalOrigin - pos)`:r`heightPlane.xyz`;n.main.add(r`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${i})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return t.pointDistanceEnabled&&(n.uniforms.add(new C("angleCutoff",i=>A(i)),new S("pointDistanceSphere",(i,s)=>xe(tt(i,s)))),n.main.add(r`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),t.lineVerticalPlaneEnabled&&(n.uniforms.add(new C("angleCutoff",i=>A(i)),new S("lineVerticalPlane",(i,s)=>it(i,s)),new w("lineVerticalStart",(i,s)=>nt(i,s)),new w("lineVerticalEnd",(i,s)=>st(i,s))),n.main.add(r`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),t.intersectsLineEnabled&&(n.uniforms.add(new C("angleCutoff",i=>A(i)),new w("intersectsLineStart",(i,s)=>m(p,i.lineStartWorld,s.camera.viewMatrix)),new w("intersectsLineEnd",(i,s)=>m(p,i.lineEndWorld,s.camera.viewMatrix)),new w("intersectsLineDirection",(i,s)=>(v(h,i.intersectsLineSegment.vector),h[3]=0,$(p,te(h,h,s.camera.viewMatrix)))),new f("intersectsLineRadius",i=>i.intersectsLineRadius)),n.main.add(r`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),n.main.add(r`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);`),e}function A(t){return ie(at,Math.cos(t.angleCutoff),Math.cos(Math.max(0,t.angleCutoff-U(2))))}function tt(t,e){const n=m(ot,t.pointDistanceOrigin,e.camera.viewMatrix),i=Y(t.pointDistanceOrigin,t.pointDistanceTarget);return Le(ct,n,i)}function it(t,e){const n=Ce(t.lineVerticalPlaneSegment,.5,p),i=t.renderCoordsHelper.worldUpAtPosition(n,rt),s=$(V,t.lineVerticalPlaneSegment.vector),a=Me(p,i,s);return $(a,a),he(t.lineVerticalPlaneSegment.origin,a,e.camera.viewMatrix)}function nt(t,e){const n=v(p,t.lineVerticalPlaneSegment.origin);return t.renderCoordsHelper.setAltitude(n,0),m(n,n,e.camera.viewMatrix)}function st(t,e){const n=se(p,t.lineVerticalPlaneSegment.origin,t.lineVerticalPlaneSegment.vector);return t.renderCoordsHelper.setAltitude(n,0),m(n,n,e.camera.viewMatrix)}function he(t,e,n){return m(J,t,n),v(h,e),h[3]=0,te(h,h,n),Ee(J,h,lt)}const at=ne(),p=o(),h=Ve(),rt=o(),V=o(),J=o(),lt=ye(),ot=o(),ct=Se(),ht=Object.freeze(Object.defineProperty({__proto__:null,build:ce,defaultAngleCutoff:q},Symbol.toStringTag,{value:"Module"}));class dt extends $e{constructor(){super(...arguments),this.innerColor=W(1,1,1),this.innerWidth=1,this.glowColor=W(1,.5,0),this.glowWidth=8,this.glowFalloff=8,this.globalAlpha=.75,this.globalAlphaContrastBoost=2,this.angleCutoff=U(6),this.pointDistanceOrigin=o(),this.pointDistanceTarget=o(),this.lineVerticalPlaneSegment=O(),this.intersectsLineSegment=O(),this.intersectsLineRadius=3,this.heightManifoldTarget=o(),this.lineStartWorld=o(),this.lineEndWorld=o()}}class pt extends ae{constructor(e,n){super(e,n,new re(ht,()=>le(()=>Promise.resolve().then(()=>bt),void 0)),Ae)}}function de(t){const e=new Q;e.include(oe,t);const{vertex:n,fragment:i}=e;n.uniforms.add(new Re("modelView",(a,{camera:l})=>Te(ft,l.viewMatrix,a.origin)),new Oe("proj",({camera:a})=>a.projectionMatrix),new f("glowWidth",(a,{camera:l})=>a.glowWidth*l.pixelRatio),new Ue("pixelToNDC",({camera:a})=>ie(ut,2/a.fullViewport[2],2/a.fullViewport[3]))),e.attributes.add("start","vec3"),e.attributes.add("end","vec3"),t.spherical&&(e.attributes.add("startUp","vec3"),e.attributes.add("endUp","vec3")),e.attributes.add("extrude","vec2"),e.varyings.add("uv","vec2"),e.varyings.add("vViewStart","vec3"),e.varyings.add("vViewEnd","vec3"),e.varyings.add("vViewSegmentNormal","vec3"),e.varyings.add("vViewStartNormal","vec3"),e.varyings.add("vViewEndNormal","vec3");const s=!t.spherical;return n.main.add(r`
    vec3 pos = mix(start, end, extrude.x);

    vec4 viewPos = modelView * vec4(pos, 1);
    vec4 projPos = proj * viewPos;
    vec2 ndcPos = projPos.xy / projPos.w;

    // in planar we hardcode the up vectors to be Z-up */
    ${F(s,r`vec3 startUp = vec3(0, 0, 1);`)}
    ${F(s,r`vec3 endUp = vec3(0, 0, 1);`)}

    // up vector corresponding to the location of the vertex, selecting either startUp or endUp */
    vec3 up = extrude.y * mix(startUp, endUp, extrude.x);
    vec3 viewUp = (modelView * vec4(up, 0)).xyz;

    vec4 projPosUp = proj * vec4(viewPos.xyz + viewUp, 1);
    vec2 projUp = normalize(projPosUp.xy / projPosUp.w - ndcPos);

    // extrude ndcPos along projUp to the edge of the screen
    vec2 lxy = abs(sign(projUp) - ndcPos);
    ndcPos += length(lxy) * projUp;

    vViewStart = (modelView * vec4(start, 1)).xyz;
    vViewEnd = (modelView * vec4(end, 1)).xyz;

    vec3 viewStartEndDir = vViewEnd - vViewStart;

    vec3 viewStartUp = (modelView * vec4(startUp, 0)).xyz;

    // the normal of the plane that aligns with the segment and the up vector
    vViewSegmentNormal = normalize(cross(viewStartUp, viewStartEndDir));

    // the normal orthogonal to the segment normal and the start up vector
    vViewStartNormal = -normalize(cross(vViewSegmentNormal, viewStartUp));

    // the normal orthogonal to the segment normal and the end up vector
    vec3 viewEndUp = (modelView * vec4(endUp, 0)).xyz;
    vViewEndNormal = normalize(cross(vViewSegmentNormal, viewEndUp));

    // Add enough padding in the X screen space direction for "glow"
    float xPaddingPixels = sign(dot(vViewSegmentNormal, viewPos.xyz)) * (extrude.x * 2.0 - 1.0) * glowWidth;
    ndcPos.x += xPaddingPixels * pixelToNDC.x;

    // uv is used to read back depth to reconstruct the position at the fragment
    uv = ndcPos * 0.5 + 0.5;

    gl_Position = vec4(ndcPos, 0, 1);
  `),i.uniforms.add(new ee("perScreenPixelRatio",a=>a.camera.perScreenPixelRatio)),i.code.add(r`float planeDistance(vec3 planeNormal, vec3 planeOrigin, vec3 pos) {
return dot(planeNormal, pos - planeOrigin);
}
float segmentDistancePixels(vec3 segmentNormal, vec3 startNormal, vec3 endNormal, vec3 pos, vec3 start, vec3 end) {
float distSegmentPlane = planeDistance(segmentNormal, start, pos);
float distStartPlane = planeDistance(startNormal, start, pos);
float distEndPlane = planeDistance(endNormal, end, pos);
float dist = max(max(distStartPlane, distEndPlane), abs(distSegmentPlane));
float width = fwidth(distSegmentPlane);
float maxPixelDistance = length(pos) * perScreenPixelRatio * 2.0;
float pixelDist = dist / min(width, maxPixelDistance);
return abs(pixelDist);
}`),i.main.add(r`fragColor = vec4(0.0);
vec3 dEndStart = vViewEnd - vViewStart;
if (dot(dEndStart, dEndStart) < 1e-5) {
return;
}
vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
return;
}
float distance = segmentDistancePixels(
vViewSegmentNormal,
vViewStartNormal,
vViewEndNormal,
pos,
vViewStart,
vViewEnd
);
vec4 color = laserlineProfile(distance);
float alpha = (1.0 - smoothstep(0.995 - angleCutoffAdjust, 0.999 - angleCutoffAdjust, abs(dot(normal, vViewSegmentNormal))));
fragColor = laserlineOutput(color * alpha * depthDiscontinuityAlpha);`),e}const ut=ne(),ft=Ie(),gt=Object.freeze(Object.defineProperty({__proto__:null,build:de},Symbol.toStringTag,{value:"Module"}));class _t extends dt{constructor(){super(...arguments),this.origin=o()}}class I extends ae{constructor(e,n){super(e,n,new re(gt,()=>le(()=>Promise.resolve().then(()=>Pt),void 0)),mt)}}const mt=new Map([["start",0],["end",1],["extrude",2],["startUp",3],["endUp",4]]);class y extends qe{constructor(){super(...arguments),this.contrastControlEnabled=!1,this.spherical=!1}}u([D()],y.prototype,"contrastControlEnabled",void 0),u([D()],y.prototype,"spherical",void 0);class E extends y{constructor(){super(...arguments),this.heightManifoldEnabled=!1,this.pointDistanceEnabled=!1,this.lineVerticalPlaneEnabled=!1,this.intersectsLineEnabled=!1}}u([D()],E.prototype,"heightManifoldEnabled",void 0),u([D()],E.prototype,"pointDistanceEnabled",void 0),u([D()],E.prototype,"lineVerticalPlaneEnabled",void 0),u([D()],E.prototype,"intersectsLineEnabled",void 0);let P=class extends je{constructor(t){super(t),this.isDecoration=!0,this.produces=H.LASERLINES,this.consumes={required:[H.LASERLINES,"normals"]},this.requireGeometryDepth=!0,this._configuration=new E,this._pathTechniqueConfiguration=new y,this._heightManifoldEnabled=!1,this._pointDistanceEnabled=!1,this._lineVerticalPlaneEnabled=!1,this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._pathVerticalPlaneEnabled=!1,this._passParameters=new _t;const e=t.view.stage.renderView.techniques,n=new y;n.contrastControlEnabled=t.contrastControlEnabled,e.precompile(I,n)}initialize(){this._passParameters.renderCoordsHelper=this.view.renderCoordsHelper,this._pathTechniqueConfiguration.spherical=this.view.state.viewingMode===1,this._pathTechniqueConfiguration.contrastControlEnabled=this.contrastControlEnabled,this._techniques.precompile(I,this._pathTechniqueConfiguration),this._blit=new ze(this._techniques,2)}destroy(){this._pathVerticalPlaneData=Ne(this._pathVerticalPlaneData),this._blit=null}get _techniques(){return this.view.stage.renderView.techniques}get heightManifoldEnabled(){return this._heightManifoldEnabled}set heightManifoldEnabled(t){this._heightManifoldEnabled!==t&&(this._heightManifoldEnabled=t,this.requestRender(1))}get heightManifoldTarget(){return this._passParameters.heightManifoldTarget}set heightManifoldTarget(t){v(this._passParameters.heightManifoldTarget,t),this.requestRender(1)}get pointDistanceEnabled(){return this._pointDistanceEnabled}set pointDistanceEnabled(t){t!==this._pointDistanceEnabled&&(this._pointDistanceEnabled=t,this.requestRender(1))}get pointDistanceTarget(){return this._passParameters.pointDistanceTarget}set pointDistanceTarget(t){v(this._passParameters.pointDistanceTarget,t),this.requestRender(1)}get pointDistanceOrigin(){return this._passParameters.pointDistanceOrigin}set pointDistanceOrigin(t){v(this._passParameters.pointDistanceOrigin,t),this.requestRender(1)}get lineVerticalPlaneEnabled(){return this._lineVerticalPlaneEnabled}set lineVerticalPlaneEnabled(t){t!==this._lineVerticalPlaneEnabled&&(this._lineVerticalPlaneEnabled=t,this.requestRender(1))}get lineVerticalPlaneSegment(){return this._passParameters.lineVerticalPlaneSegment}set lineVerticalPlaneSegment(t){R(t,this._passParameters.lineVerticalPlaneSegment),this.requestRender(1)}get intersectsLineEnabled(){return this._intersectsLineEnabled}set intersectsLineEnabled(t){t!==this._intersectsLineEnabled&&(this._intersectsLineEnabled=t,this.requestRender(1))}get intersectsLineSegment(){return this._passParameters.intersectsLineSegment}set intersectsLineSegment(t){R(t,this._passParameters.intersectsLineSegment),this.requestRender(1)}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(t){t!==this._intersectsLineInfinite&&(this._intersectsLineInfinite=t,this.requestRender(1))}get pathVerticalPlaneEnabled(){return this._pathVerticalPlaneEnabled}set pathVerticalPlaneEnabled(t){t!==this._pathVerticalPlaneEnabled&&(this._pathVerticalPlaneEnabled=t,this._pathVerticalPlaneData!=null&&this.requestRender(1))}set pathVerticalPlaneVertices(t){this._pathVerticalPlaneData==null&&(this._pathVerticalPlaneData=new K(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.vertices=t,this.pathVerticalPlaneEnabled&&this.requestRender(1)}set pathVerticalPlaneBuffers(t){this._pathVerticalPlaneData==null&&(this._pathVerticalPlaneData=new K(this._passParameters.renderCoordsHelper)),this._pathVerticalPlaneData.buffers=t,this.pathVerticalPlaneEnabled&&this.requestRender(1)}setParameters(t){We(this._passParameters,t)&&this.requestRender(1)}precompile(){this._acquireTechnique()}render(t){const e=t.find(({name:l})=>l===this.produces);if(this.isDecoration&&!this.bindParameters.decorations||this._blit==null)return e;const n=this.renderingContext,i=t.find(({name:l})=>l==="normals");this._passParameters.normals=i?.getTexture();const s=()=>{(this.heightManifoldEnabled||this.pointDistanceEnabled||this.lineVerticalPlaneSegment||this.intersectsLineEnabled)&&this._renderUnified(),this.pathVerticalPlaneEnabled&&this._renderPath()};if(!this.contrastControlEnabled)return n.bindFramebuffer(e.fbo),s(),e;this._passParameters.colors=e.getTexture();const a=this.fboCache.acquire(e.fbo.width,e.fbo.height,"laser lines");return n.bindFramebuffer(a.fbo),n.setClearColor(0,0,0,0),n.clear(16640),s(),n.unbindTexture(e.getTexture()),this._blit.blend(n,a,e,this.bindParameters)||this.requestRender(1),a.release(),e}_acquireTechnique(){return this._configuration.heightManifoldEnabled=this.heightManifoldEnabled,this._configuration.lineVerticalPlaneEnabled=this.lineVerticalPlaneEnabled,this._configuration.pointDistanceEnabled=this.pointDistanceEnabled,this._configuration.intersectsLineEnabled=this.intersectsLineEnabled,this._configuration.contrastControlEnabled=this.contrastControlEnabled,this._configuration.spherical=this.view.state.viewingMode===1,this._techniques.get(pt,this._configuration)}_renderUnified(){if(!this._updatePassParameters())return;const t=this._acquireTechnique();if(t.compiled){const e=this.renderingContext;e.bindTechnique(t,this.bindParameters,this._passParameters),e.screen.draw()}else this.requestRender(1)}_renderPath(){if(this._pathVerticalPlaneData==null)return;const t=this._techniques.get(I,this._pathTechniqueConfiguration);if(t.compiled){const e=this.renderingContext;this._passParameters.origin=this._pathVerticalPlaneData.origin,e.bindTechnique(t,this.bindParameters,this._passParameters),this._pathVerticalPlaneData.draw(e)}else this.requestRender(1)}_updatePassParameters(){if(!this._intersectsLineEnabled)return!0;const t=this.bindParameters.camera,e=this._passParameters;if(this._intersectsLineInfinite){if(Fe(Be(e.intersectsLineSegment.origin,e.intersectsLineSegment.vector),x),x.c0=-Number.MAX_VALUE,!Ke(t.frustum,x))return!1;Ge(x,e.lineStartWorld),ke(x,e.lineEndWorld)}else v(e.lineStartWorld,e.intersectsLineSegment.origin),se(e.lineEndWorld,e.intersectsLineSegment.origin,e.intersectsLineSegment.vector);return!0}get test(){}};u([M({constructOnly:!0})],P.prototype,"contrastControlEnabled",void 0),u([M()],P.prototype,"isDecoration",void 0),u([M()],P.prototype,"produces",void 0),u([M()],P.prototype,"consumes",void 0),P=u([Je("esri.views.3d.webgl-engine.effects.laserlines.LaserLineRenderer")],P);const x=He();class yt extends Ze{constructor(e){super(e),this._angleCutoff=q,this._style={},this._heightManifoldTarget=o(),this._heightManifoldEnabled=!1,this._intersectsLine=O(),this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._lineVerticalPlaneSegment=null,this._pathVerticalPlaneBuffers=null,this._pointDistanceLine=null,this.applyProperties(e)}get testData(){}createResources(){this._ensureRenderer()}destroyResources(){this._disposeRenderer()}updateVisibility(){this._syncRenderer(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance()}get angleCutoff(){return this._angleCutoff}set angleCutoff(e){this._angleCutoff!==e&&(this._angleCutoff=e,this._syncAngleCutoff())}get style(){return this._style}set style(e){this._style=e,this._syncStyle()}get heightManifoldTarget(){return this._heightManifoldEnabled?this._heightManifoldTarget:null}set heightManifoldTarget(e){e!=null?(v(this._heightManifoldTarget,e),this._heightManifoldEnabled=!0):this._heightManifoldEnabled=!1,this._syncRenderer(),this._syncHeightManifold()}set intersectsWorldUpAtLocation(e){if(e==null)return void(this.intersectsLine=null);const n=this.view.renderCoordsHelper.worldUpAtPosition(e,vt);this.intersectsLine=Xe(e,n),this.intersectsLineInfinite=!0}get intersectsLine(){return this._intersectsLineEnabled?this._intersectsLine:null}set intersectsLine(e){e!=null?(R(e,this._intersectsLine),this._intersectsLineEnabled=!0):this._intersectsLineEnabled=!1,this._syncIntersectsLine(),this._syncRenderer()}get intersectsLineInfinite(){return this._intersectsLineInfinite}set intersectsLineInfinite(e){this._intersectsLineInfinite=e,this._syncIntersectsLineInfinite()}get lineVerticalPlaneSegment(){return this._lineVerticalPlaneSegment}set lineVerticalPlaneSegment(e){this._lineVerticalPlaneSegment=e!=null?R(e):null,this._syncLineVerticalPlane(),this._syncRenderer()}get pathVerticalPlane(){return this._pathVerticalPlaneBuffers}set pathVerticalPlane(e){this._pathVerticalPlaneBuffers=e,this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncRenderer()}get pointDistanceLine(){return this._pointDistanceLine}set pointDistanceLine(e){this._pointDistanceLine=e!=null?{origin:B(e.origin),target:e.target?B(e.target):null}:null,this._syncPointDistance(),this._syncRenderer()}get isDecoration(){return this._isDecoration}set isDecoration(e){this._isDecoration=e,this._renderer&&(this._renderer.isDecoration=e)}_syncRenderer(){this.attached&&this.visible&&(this._intersectsLineEnabled||this._heightManifoldEnabled||this._pointDistanceLine!=null||this._pathVerticalPlaneBuffers!=null)?this._ensureRenderer():this._disposeRenderer()}_ensureRenderer(){this._renderer==null&&(this._renderer=new P({view:this.view,contrastControlEnabled:!0,isDecoration:this.isDecoration}),this._syncStyle(),this._syncHeightManifold(),this._syncIntersectsLine(),this._syncIntersectsLineInfinite(),this._syncPathVerticalPlane(),this._syncLineVerticalPlane(),this._syncPointDistance(),this._syncAngleCutoff())}_syncStyle(){this._renderer!=null&&this._renderer.setParameters(this._style)}_syncAngleCutoff(){this._renderer?.setParameters({angleCutoff:this._angleCutoff})}_syncHeightManifold(){this._renderer!=null&&(this._renderer.heightManifoldEnabled=this._heightManifoldEnabled&&this.visible,this._heightManifoldEnabled&&(this._renderer.heightManifoldTarget=this._heightManifoldTarget))}_syncIntersectsLine(){this._renderer!=null&&(this._renderer.intersectsLineEnabled=this._intersectsLineEnabled&&this.visible,this._intersectsLineEnabled&&(this._renderer.intersectsLineSegment=this._intersectsLine))}_syncIntersectsLineInfinite(){this._renderer!=null&&(this._renderer.intersectsLineInfinite=this._intersectsLineInfinite)}_syncPathVerticalPlane(){this._renderer!=null&&(this._renderer.pathVerticalPlaneEnabled=this._pathVerticalPlaneBuffers!=null&&this.visible,this._pathVerticalPlaneBuffers!=null&&(this._renderer.pathVerticalPlaneBuffers=this._pathVerticalPlaneBuffers))}_syncLineVerticalPlane(){this._renderer!=null&&(this._renderer.lineVerticalPlaneEnabled=this._lineVerticalPlaneSegment!=null&&this.visible,this._lineVerticalPlaneSegment!=null&&(this._renderer.lineVerticalPlaneSegment=this._lineVerticalPlaneSegment))}_syncPointDistance(){if(this._renderer==null)return;const e=this._pointDistanceLine,n=e!=null;this._renderer.pointDistanceEnabled=n&&e.target!=null&&this.visible,n&&(this._renderer.pointDistanceOrigin=e.origin,e.target!=null&&(this._renderer.pointDistanceTarget=e.target))}_disposeRenderer(){this._renderer!=null&&this.view.stage&&(this._renderer.destroy(),this._renderer=null)}forEachMaterial(){}}const vt=o(),bt=Object.freeze(Object.defineProperty({__proto__:null,build:ce,defaultAngleCutoff:q},Symbol.toStringTag,{value:"Module"})),Pt=Object.freeze(Object.defineProperty({__proto__:null,build:de},Symbol.toStringTag,{value:"Module"}));export{yt as c};
