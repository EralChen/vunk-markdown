import{GI as J,I6 as P,I7 as K,I8 as X,H4 as ee,HG as te,GJ as re,bR as r,I9 as ae,Ia as ie,GK as c,Ib as se,yB as V,HB as ne,Ic as oe,H8 as T,Id as ce,H5 as le,H7 as pe,GL as de,Ha as he,H9 as ve,Ie as U,If as ue,Ig as me,HH as fe,GO as Se,GP as ge,GQ as E,Hd as M,He as Te,Hf as W,GR as w,HI as Pe,Hg as _e,Hh as Oe,Hi as Ie,I4 as Ae,p4 as $,GU as z,Ih as ye,Ii as H,Ij as j,Ik as Ee,Il as Re,Im as we,p5 as S,In as xe,Io as $e,Hp as x,HK as ze,Ip as B,j5 as R,Iq as Z,qg as Ce,c0 as be,Ir as Le,Hs as De,bv as F,bh as q,xH as Ne,d1 as G}from"./chunk-BLrLWCUc.js";import{_ as ke}from"./chunk-CWUYlh1e.js";function Q(l){const e=new J,{space:t,anchor:p,hasTip:g}=l,m=t===P.World;e.include(K,l),e.include(X,l),e.include(ee,l);const{vertex:a,fragment:d}=e;d.include(te),re(a,l),e.attributes.add(r.POSITION,"vec3"),e.attributes.add(r.PREVPOSITION,"vec3"),e.attributes.add(r.UV0,"vec2"),e.varyings.add("vColor","vec4"),e.varyings.add("vpos","vec3"),e.varyings.add("vUV","vec2"),e.varyings.add("vSize","float"),g&&e.varyings.add("vLineWidth","float"),a.uniforms.add(new ae("nearFar",({camera:o})=>o.nearFar),new ie("viewport",({camera:o})=>o.fullViewport)),a.code.add(c`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),a.code.add(c`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),m?(e.attributes.add(r.NORMAL,"vec3"),se(a),a.constants.add("tiltThreshold","float",.7),a.code.add(c`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):a.code.add(c`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);const h=m?"vec3":"vec2";return a.code.add(c`
      ${h} normalizedSegment(${h} pos, ${h} prev) {
        ${h} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${m?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      ${h} displace(${h} pos, ${h} prev, float displacementLen) {
        ${h} segment = normalizedSegment(pos, prev);

        ${h} displacementDirU = perpendicular(segment);
        ${h} displacementDirV = segment;

        ${p===V.Tip?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),t===P.Screen&&(a.uniforms.add(new ne("inverseProjectionMatrix",({camera:o})=>o.inverseProjectionMatrix)),a.code.add(c`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),a.code.add(c`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),a.uniforms.add(new oe("perScreenPixelRatio",({camera:o})=>o.perScreenPixelRatio)),a.code.add(c`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${T(l.hasCap,`if(prev.z > posLeft.z) {
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
  `)),ce(a),a.main.add(c`
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
      vec4 prev = view * vec4(prevPosition, 1.0);
      clip(pos, prev);

      ${m?c`${T(l.hideOnShortSegments,c`
                if (areWorldMarkersHidden(pos, prev)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos));
            vec4 displacedPosScreen = projectAndScale(pos);`:c`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${T(t===P.Screen,c`
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
      ${T(!m,"vUV *= displacedPosScreen.w;")}
      ${T(g,"vLineWidth = lineWidth;")}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),e.fragment.include(le,l),e.include(pe,l),d.uniforms.add(new de("intrinsicColor",o=>o.color),new he("tex",o=>o.markerTexture)),d.include(ve),d.constants.add("texelSize","float",1/U),d.code.add(c`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = rgbaTofloat(texture(tex, samplePos)) - 0.5;
float distance = sdf * vSize;
distance -= 0.5;
return clamp(0.5 - distance, 0.0, 1.0);
}`),g&&d.constants.add("relativeMarkerSize","float",ue/U).constants.add("relativeTipLineWidth","float",me).code.add(c`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * vLineWidth);

      ${T(m,"halfTipLineWidth *= fwidth(samplePos.y);")}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `),e.include(fe,l),d.main.add(c`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = vUV ${T(!m,"* gl_FragCoord.w")};
    finalColor.a *= ${g?"max(markerAlpha(samplePos), tipAlpha(samplePos))":"markerAlpha(samplePos)"};
    outputColorHighlightOID(finalColor, vpos);`),e}const Ue=Object.freeze(Object.defineProperty({__proto__:null,build:Q},Symbol.toStringTag,{value:"Module"}));class Me extends Se{constructor(e,t){super(e,t,new ge(Ue,()=>ke(()=>Promise.resolve().then(()=>Ge),void 0)),Y)}_makePipelineState(e,t){const{output:p,oitPass:g,space:m,hasOccludees:a}=e;return E({blending:z(p)?Ae(g):null,depthTest:m===P.Draped?null:{func:Ie(g)},depthWrite:Oe(e),drawBuffers:p===$.Depth?{buffers:[Pe.NONE]}:_e(g,p),colorWrite:w,stencilWrite:a?W:null,stencilTest:a?t?M:Te:null,polygonOffset:{factor:0,units:-10}})}initializePipeline(e){return e.occluder?(this._occluderPipelineTransparent=E({blending:j,depthTest:H,depthWrite:null,colorWrite:w,stencilWrite:null,stencilTest:ye}),this._occluderPipelineOpaque=E({blending:j,depthTest:H,depthWrite:null,colorWrite:w,stencilWrite:Re,stencilTest:Ee}),this._occluderPipelineMaskWrite=E({blending:null,depthTest:we,depthWrite:null,colorWrite:null,stencilWrite:W,stencilTest:M})):this._occluderPipelineTransparent=this._occluderPipelineOpaque=this._occluderPipelineMaskWrite=null,this._occludeePipelineState=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){return e?this._occludeePipelineState:t===S.TRANSPARENT_OCCLUDER_MATERIAL?this._occluderPipelineTransparent??super.getPipeline():t===S.OCCLUDER_MATERIAL?this._occluderPipelineOpaque??super.getPipeline():this._occluderPipelineMaskWrite??super.getPipeline()}}const Y=new Map([[r.POSITION,0],[r.PREVPOSITION,1],[r.UV0,2],[r.NORMAL,3],[r.COLOR,4],[r.COLORFEATUREATTRIBUTE,4],[r.SIZE,5],[r.SIZEFEATUREATTRIBUTE,5],[r.OPACITYFEATUREATTRIBUTE,6]]);class qe extends xe{constructor(e){super(e,He),this._configuration=new $e,this.vertexAttributeLocations=Y,this.produces=new Map([[S.OPAQUE_MATERIAL,t=>t===$.Highlight||x(t)&&this.parameters.renderOccluded===R.OccludeAndTransparentStencil],[S.OPAQUE_MATERIAL_WITHOUT_NORMALS,t=>ze(t)],[S.OCCLUDER_MATERIAL,t=>B(t)&&this.parameters.renderOccluded===R.OccludeAndTransparentStencil],[S.TRANSPARENT_OCCLUDER_MATERIAL,t=>B(t)&&this.parameters.renderOccluded===R.OccludeAndTransparentStencil],[S.TRANSPARENT_MATERIAL,t=>x(t)&&this.parameters.writeDepth],[S.TRANSPARENT_MATERIAL_WITHOUT_DEPTH,t=>x(t)&&!this.parameters.writeDepth],[S.DRAPED_MATERIAL,t=>z(t)||t===$.Highlight]]),this._layout=this.createLayout()}getConfiguration(e,t){return this._configuration.output=e,this._configuration.space=t.slot===S.DRAPED_MATERIAL?P.Draped:this.parameters.worldSpace?P.World:P.Screen,this._configuration.hideOnShortSegments=this.parameters.hideOnShortSegments,this._configuration.hasCap=this.parameters.cap!==Z.BUTT,this._configuration.anchor=this.parameters.anchor,this._configuration.hasTip=this.parameters.hasTip,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasOccludees=t.hasOccludees,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.vvOpacity=!!this.parameters.vvOpacity,this._configuration.occluder=this.parameters.renderOccluded===R.OccludeAndTransparentStencil,this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest&&z(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}get visible(){return this.parameters.color[3]>=Ce}intersect(){}createLayout(){const e=be().vec3f(r.POSITION).vec3f(r.PREVPOSITION).vec2f(r.UV0);return this.parameters.worldSpace&&e.vec3f(r.NORMAL),this.parameters.vvSize?e.f32(r.SIZEFEATUREATTRIBUTE):e.f32(r.SIZE),this.parameters.vvColor?e.f32(r.COLORFEATUREATTRIBUTE):e.vec4f(r.COLOR),this.parameters.vvOpacity&&e.f32(r.OPACITYFEATUREATTRIBUTE),e}createBufferWriter(){return new je(this._layout,this.parameters)}createGLMaterial(e){return new We(e)}}class We extends De{constructor(){super(...arguments),this._markerPrimitive=null}dispose(){super.dispose(),this._markerTextures.release(this._markerPrimitive),this._markerPrimitive=null}beginSlot(e){const t=this._material.parameters.markerPrimitive;return t!==this._markerPrimitive&&(this._material.setParameters({markerTexture:this._markerTextures.swap(t,this._markerPrimitive)}),this._markerPrimitive=t),this._material.setParameters(this.textureBindParameters),this.getTechnique(Me,e)}}class He extends Le{constructor(){super(...arguments),this.width=0,this.color=[1,1,1,1],this.markerPrimitive="arrow",this.placement="end",this.cap=Z.BUTT,this.anchor=V.Center,this.hasTip=!1,this.worldSpace=!1,this.hideOnShortSegments=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.markerTexture=null}}class je{constructor(e,t){this.vertexBufferLayout=e,this._parameters=t}elementCount(){return this._parameters.placement==="begin-end"?12:6}write(e,t,p,g,m,a){const d=p.get(r.POSITION).data,h=d.length/3;let o=[1,0,0];const C=p.get(r.NORMAL);this._parameters.worldSpace&&C!=null&&(o=C.data);let b=1,L=0;this._parameters.vvSize?L=p.get(r.SIZEFEATUREATTRIBUTE).data[0]:p.has(r.SIZE)&&(b=p.get(r.SIZE).data[0]);let _=[1,1,1,1],D=0;this._parameters.vvColor?D=p.get(r.COLORFEATUREATTRIBUTE).data[0]:p.has(r.COLOR)&&(_=p.get(r.COLOR).data);let N=0;this._parameters.vvOpacity&&(N=p.get(r.OPACITYFEATUREATTRIBUTE).data[0]);const i=new Float32Array(m.buffer);let s=a*(this.vertexBufferLayout.stride/4);const O=(n,I,v,u)=>{if(i[s++]=n[0],i[s++]=n[1],i[s++]=n[2],i[s++]=I[0],i[s++]=I[1],i[s++]=I[2],i[s++]=v[0],i[s++]=v[1],this._parameters.worldSpace&&(i[s++]=o[0],i[s++]=o[1],i[s++]=o[2]),this._parameters.vvSize?i[s++]=L:i[s++]=b,this._parameters.vvColor)i[s++]=D;else{const f=Math.min(4*u,_.length-4);i[s++]=_[f],i[s++]=_[f+1],i[s++]=_[f+2],i[s++]=_[f+3]}this._parameters.vvOpacity&&(i[s++]=N)};let A;(function(n){n[n.ASCENDING=1]="ASCENDING",n[n.DESCENDING=-1]="DESCENDING"})(A||(A={}));const k=(n,I)=>{const v=F(Be,d[3*n],d[3*n+1],d[3*n+2]),u=Fe;let f=n+I;do F(u,d[3*f],d[3*f+1],d[3*f+2]),f+=I;while(Ne(v,u)&&f>=0&&f<h);e&&(G(v,v,e),G(u,u,e)),O(v,u,[-1,-1],n),O(v,u,[1,-1],n),O(v,u,[1,1],n),O(v,u,[-1,-1],n),O(v,u,[1,1],n),O(v,u,[-1,1],n)},y=this._parameters.placement;y!=="begin"&&y!=="begin-end"||k(0,A.ASCENDING),y!=="end"&&y!=="begin-end"||k(h-1,A.DESCENDING)}}const Be=q(),Fe=q(),Ge=Object.freeze(Object.defineProperty({__proto__:null,build:Q},Symbol.toStringTag,{value:"Module"}));export{qe as S};
