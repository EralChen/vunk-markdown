import{IJ as ie,Ko as A,Kp as ae,Kq as se,IN as ne,JY as oe,IP as ce,be as r,Kr as le,Ks as pe,II as n,IR as de,z$ as q,JT as he,IG as ve,JB as _,Kt as ue,IL as me,IM as fe,IO as Te,IQ as Se,JC as ge,Ku as F,Kv as Pe,Kw as _e,JZ as Ae,IT as Ee,IU as Oe,IW as C,Jg as B,Jh as we,Ji as K,IY as L,Jj as Ie,I_ as ye,Jk as Re,J0 as $e,IZ as xe,J1 as N,Kx as ze,Ky as J,Kz as V,KA as Ce,KB as De,KC as Le,qX as f,d8 as be,KD as Ne,JF as b,Jm as Ue,KE as G,un as Z,b4 as D,tj as Q,s3 as ke,da as Me,Jr as We,KF as je,J7 as Fe,b8 as H,b9 as X,zk as Be,ef as Y,KG as Ke}from"./chunk-CET6Djna.js";import{_ as Je}from"./chunk-BoJEKryr.js";function ee(o){const e=new ie,{space:t,anchor:c,hasTip:T}=o,h=t===A.World;e.include(ae,o),e.include(se,o),e.include(ne,o);const{vertex:i,fragment:p,varyings:S}=e;p.include(oe),ce(i,o),e.attributes.add(r.POSITION,"vec3"),e.attributes.add(r.PREVIOUSDELTA,"vec4"),e.attributes.add(r.UV0,"vec2"),S.add("vColor","vec4"),S.add("vpos","vec3",{invariant:!0}),S.add("vUV","vec2"),S.add("vSize","float"),T&&S.add("vLineWidth","float"),i.uniforms.add(new le("nearFar",(({camera:d})=>d.nearFar)),new pe("viewport",(({camera:d})=>d.fullViewport))).code.add(n`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),i.code.add(n`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),h?(e.attributes.add(r.NORMAL,"vec3"),de(i),i.constants.add("tiltThreshold","float",.7),i.code.add(n`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):i.code.add(n`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);const l=h?"vec3":"vec2";return i.code.add(n`
      ${l} normalizedSegment(${l} pos, ${l} prev) {
        ${l} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${h?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      ${l} displace(${l} pos, ${l} prev, float displacementLen) {
        ${l} segment = normalizedSegment(pos, prev);

        ${l} displacementDirU = perpendicular(segment);
        ${l} displacementDirV = segment;

        ${c===q.Tip?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),t===A.Screen&&(i.uniforms.add(new he("inverseProjectionMatrix",(({camera:d})=>d.inverseProjectionMatrix))),i.code.add(n`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),i.code.add(n`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),i.uniforms.add(new ve("perScreenPixelRatio",(({camera:d})=>d.perScreenPixelRatio))),i.code.add(n`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${_(o.hasCap,`if(prev.z > posLeft.z) {
                vec2 diff = posLeft.xy - posRight.xy;
                planeOrigin.xy += perpendicular(diff) / 2.0;
             }`)};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `)),ue(i),i.main.add(n`
    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      float lineWidth = getLineWidth();
      float screenMarkerSize = getScreenMarkerSize();

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(position + previousDelta.xyz * previousDelta.w, 1.0);
      clip(pos, prev);

      ${h?n`${_(o.hideOnShortSegments,n`
                if (areWorldMarkersHidden(pos, prev)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos));
            vec4 displacedPosScreen = projectAndScale(pos);`:n`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${_(t===A.Screen,n`
                vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));

                // We need three points of the ribbon line in camera space to calculate the plane it lies in
                // Note that we approximate the third point, since we have no information about the join around prev
                vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
                vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);

                pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
                displacedPosScreen = projectAndScale(pos);`)}`}
      forwardViewPosDepth(pos.xyz);
      // Convert back into NDC
      displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

      // Convert texture coordinate into [0,1]
      vUV = (uv0 + 1.0) / 2.0;
      ${_(!h,"vUV *= displacedPosScreen.w;")}
      ${_(T,"vLineWidth = lineWidth;")}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),p.include(me,o),e.include(fe,o),p.include(Te),p.uniforms.add(new Se("intrinsicColor",(({color:d})=>d)),new ge("tex",(({markerTexture:d})=>d))).constants.add("texelSize","float",1/F).code.add(n`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = rgbaTofloat(texture(tex, samplePos)) - 0.5;
float distance = sdf * vSize;
distance -= 0.5;
return clamp(0.5 - distance, 0.0, 1.0);
}`),T&&p.constants.add("relativeMarkerSize","float",Pe/F).constants.add("relativeTipLineWidth","float",_e).code.add(n`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * vLineWidth);

      ${_(h,"halfTipLineWidth *= fwidth(samplePos.y);")}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `),e.include(Ae,o),p.main.add(n`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = vUV ${_(!h,"* gl_FragCoord.w")};
    finalColor.a *= ${T?"max(markerAlpha(samplePos), tipAlpha(samplePos))":"markerAlpha(samplePos)"};
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),e}const Ve=Object.freeze(Object.defineProperty({__proto__:null,build:ee},Symbol.toStringTag,{value:"Module"}));class Ge extends Ee{constructor(e,t){super(e,t,new Oe(Ve,(()=>Je(()=>Promise.resolve().then(()=>Xe),void 0))),te)}_makePipelineState(e,t){const{output:c,oitPass:T,space:h,hasOccludees:i}=e;return C({blending:N(c)?$e(T):null,depthTest:h===A.Draped?null:{func:Re(T)},depthWrite:ye(e),drawBuffers:Ie(c,xe(T,c)),colorWrite:L,stencilWrite:i?K:null,stencilTest:i?t?B:we:null,polygonOffset:{factor:0,units:-10}})}initializePipeline(e){return e.occluder?(this._occluderPipelineTransparent=C({blending:V,depthTest:J,depthWrite:null,colorWrite:L,stencilWrite:null,stencilTest:ze}),this._occluderPipelineOpaque=C({blending:V,depthTest:J,depthWrite:null,colorWrite:L,stencilWrite:De,stencilTest:Ce}),this._occluderPipelineMaskWrite=C({blending:null,depthTest:Le,depthWrite:null,colorWrite:null,stencilWrite:K,stencilTest:B})):this._occluderPipelineTransparent=this._occluderPipelineOpaque=this._occluderPipelineMaskWrite=null,this._occludeePipelineState=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){return e?this._occludeePipelineState:t===f.TRANSPARENT_OCCLUDER_MATERIAL?this._occluderPipelineTransparent??super.getPipeline():t===f.OCCLUDER_MATERIAL?this._occluderPipelineOpaque??super.getPipeline():this._occluderPipelineMaskWrite??super.getPipeline()}}const te=new Map([[r.POSITION,0],[r.PREVIOUSDELTA,1],[r.UV0,2],[r.COLOR,3],[r.COLORFEATUREATTRIBUTE,3],[r.OPACITYFEATUREATTRIBUTE,4],[r.SIZE,5],[r.SIZEFEATUREATTRIBUTE,5],[r.NORMAL,6]]);class rt extends be{constructor(e){super(e,He),this._configuration=new Ne,this.vertexAttributeLocations=te,this.produces=new Map([[f.OPAQUE_MATERIAL,t=>t===Z.Highlight||b(t)&&this.parameters.renderOccluded===D.OccludeAndTransparentStencil],[f.OPAQUE_MATERIAL_WITHOUT_NORMALS,t=>Ue(t)],[f.OCCLUDER_MATERIAL,t=>G(t)&&this.parameters.renderOccluded===D.OccludeAndTransparentStencil],[f.TRANSPARENT_OCCLUDER_MATERIAL,t=>G(t)&&this.parameters.renderOccluded===D.OccludeAndTransparentStencil],[f.TRANSPARENT_MATERIAL,t=>b(t)&&this.parameters.writeDepth],[f.TRANSPARENT_MATERIAL_WITHOUT_DEPTH,t=>b(t)&&!this.parameters.writeDepth],[f.DRAPED_MATERIAL,t=>N(t)||t===Z.Highlight]]),this.intersectDraped=void 0,this._layout=this.createLayout()}getConfiguration(e,t){return super.getConfiguration(e,t,this._configuration),this._configuration.space=t.slot===f.DRAPED_MATERIAL?A.Draped:this.parameters.worldSpace?A.World:A.Screen,this._configuration.hideOnShortSegments=this.parameters.hideOnShortSegments,this._configuration.hasCap=this.parameters.cap!==Q.BUTT,this._configuration.anchor=this.parameters.anchor,this._configuration.hasTip=this.parameters.hasTip,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasOccludees=t.hasOccludees,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.vvOpacity=!!this.parameters.vvOpacity,this._configuration.occluder=this.parameters.renderOccluded===D.OccludeAndTransparentStencil,this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest&&N(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}get visible(){return this.parameters.color[3]>=ke}intersect(){}createLayout(){const e=Me().vec3f(r.POSITION).vec4f16(r.PREVIOUSDELTA).vec2f16(r.UV0);return this.parameters.vvColor?e.f32(r.COLORFEATUREATTRIBUTE):e.vec4u8(r.COLOR,{glNormalized:!0}),this.parameters.vvOpacity&&e.f32(r.OPACITYFEATUREATTRIBUTE),this.parameters.vvSize?e.f32(r.SIZEFEATUREATTRIBUTE):e.f16(r.SIZE),this.parameters.worldSpace&&e.vec3f16(r.NORMAL),e}createBufferWriter(){return new Ye(this._layout,this.parameters)}createGLMaterial(e){return new Ze(e)}}class Ze extends Fe{dispose(){super.dispose(),this._markerTextures.release(this._markerPrimitive),this._markerPrimitive=null}beginSlot(e){const t=this._material.parameters.markerPrimitive;return t!==this._markerPrimitive&&(this._material.setParameters({markerTexture:this._markerTextures.swap(t,this._markerPrimitive)}),this._markerPrimitive=t),this.getTechnique(Ge,e)}}class He extends We{constructor(){super(...arguments),this.width=0,this.color=[1,1,1,1],this.markerPrimitive="arrow",this.placement="end",this.cap=Q.BUTT,this.anchor=q.Center,this.hasTip=!1,this.worldSpace=!1,this.hideOnShortSegments=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.markerTexture=null}}class Ye{constructor(e,t){this.vertexBufferLayout=e,this._parameters=t}elementCount(){return this._parameters.placement==="begin-end"?12:6}write(e,t,c,T,h,i){const p=c.get(r.POSITION).data,S=p.length/3;let l=[1,0,0];const d=c.get(r.NORMAL);this._parameters.worldSpace&&d!=null&&(l=d.data);let U=1,k=0;this._parameters.vvSize?k=c.get(r.SIZEFEATUREATTRIBUTE).data[0]:c.has(r.SIZE)&&(U=c.get(r.SIZE).data[0]);let E=[1,1,1,1],M=0;this._parameters.vvColor?M=c.get(r.COLORFEATUREATTRIBUTE).data[0]:c.has(r.COLOR)&&(E=c.get(r.COLOR).data);let W=0;this._parameters.vvOpacity&&(W=c.get(r.OPACITYFEATUREATTRIBUTE).data[0]);const P=new Float32Array(h.buffer),g=je(h.buffer),I=new Uint8Array(h.buffer);let v=i*(this.vertexBufferLayout.stride/4);const O=P.BYTES_PER_ELEMENT/g.BYTES_PER_ELEMENT,re=4/O,w=(a,$,u,m)=>{P[v++]=a[0],P[v++]=a[1],P[v++]=a[2],Ke($,a,g,v*O),v+=re;let s=v*O;if(g[s++]=u[0],g[s++]=u[1],v=Math.ceil(s/O),this._parameters.vvColor)P[v++]=M;else{const x=Math.min(4*m,E.length-4),z=4*v++;I[z]=255*E[x],I[z+1]=255*E[x+1],I[z+2]=255*E[x+2],I[z+3]=255*E[x+3]}this._parameters.vvOpacity&&(P[v++]=W),s=v*O,this._parameters.vvSize?(P[v++]=k,s+=2):g[s++]=U,this._parameters.worldSpace&&(g[s++]=l[0],g[s++]=l[1],g[s++]=l[2]),v=Math.ceil(s/O)};let y;(function(a){a[a.ASCENDING=1]="ASCENDING",a[a.DESCENDING=-1]="DESCENDING"})(y||(y={}));const j=(a,$)=>{const u=H(qe,p[3*a],p[3*a+1],p[3*a+2]),m=Qe;let s=a+$;do H(m,p[3*s],p[3*s+1],p[3*s+2]),s+=$;while(Be(u,m)&&s>=0&&s<S);e&&(Y(u,u,e),Y(m,m,e)),w(u,m,[-1,-1],a),w(u,m,[1,-1],a),w(u,m,[1,1],a),w(u,m,[-1,-1],a),w(u,m,[1,1],a),w(u,m,[-1,1],a)},R=this._parameters.placement;return R!=="begin"&&R!=="begin-end"||j(0,y.ASCENDING),R!=="end"&&R!=="begin-end"||j(S-1,y.DESCENDING),null}}const qe=X(),Qe=X(),Xe=Object.freeze(Object.defineProperty({__proto__:null,build:ee},Symbol.toStringTag,{value:"Module"}));export{rt as I};
