import{_ as v}from"./chunk-DsYbGKja.js";import{kU as _e,jM as D,Ky as be,c7 as C,Kz as ye,b0 as k,I8 as c,xZ as Ae,JV as ce,Jn as ue,KA as fe,Km as Le,I7 as Te,KB as Oe,KC as Ve,KD as W,KE as ke,KF as K,KG as je,Jq as q,Ii as H,Ij as L,mW as me,KH as M,I9 as Se,Ib as $e,Id as De,lb as Ce,bm as Me,JW as Re,I6 as Ne,KI as Fe,Ik as Ee,Il as Ie,Im as We,Io as ze,KJ as Be,Iu as Ue,Iv as T,g7 as $,nX as Ke,mp as qe,KK as he,lN as pe,r_ as ge,ps as He,a$ as z,gb as Ge,gU as Xe,gc as Ye,gV as Ze,mG as ve,as as Je,aq as Qe,zh as et,mm as N,KL as tt,aH as rt,F as ot,m$ as st,BO as nt,aE as at,KM as it,l7 as lt,nP as dt,bZ as G,kK as ct,vf as ut,ea as ft,d4 as mt,A_ as ht,n2 as pt,h as gt,cL as X,KN as vt,KO as wt,ak as y,am as xt}from"./chunk-DbiObNSB.js";import{SilhouetteEdgeLocations as Pt,RegularEdgeLocations as _t,VertexLayout as bt,glVertexLayout as yt,EdgeInputBufferLayout as Y,RegularEdgeInstancesGLLayout as At,SilhouetteEdgeInstancesGLLayout as Lt}from"./chunk-sjOyPrEZ.js";import{_ as Tt}from"./chunk-BBnM6NiO.js";import{a as Ot}from"./chunk-BUrrTzaD.js";/* empty css              */import"./chunk-DcQzJhKJ.js";import"./chunk-rEn5pz2r.js";import"./chunk-CfVxKJkZ.js";function Vt(t,e){const r=-t[0],o=-t[1],s=-t[2],n=e[3],l=e[7],a=e[11],i=e[15];e[0]+=n*r,e[1]+=n*o,e[2]+=n*s,e[4]+=l*r,e[5]+=l*o,e[6]+=l*s,e[8]+=a*r,e[9]+=a*o,e[10]+=a*s,e[12]+=i*r,e[13]+=i*o,e[14]+=i*s}function kt(t,e){const r=t[0],o=t[1],s=t[2];e[12]+=r*e[0]+o*e[4]+s*e[8],e[13]+=r*e[1]+o*e[5]+s*e[9],e[14]+=r*e[2]+o*e[6]+s*e[10],e[14]+=r*e[3]+o*e[7]+s*e[11]}let jt=class{constructor(e){this._factory=e,this._originData=new Map}acquire(e){return this.register(this._factory.getOrigin(e))}register(e){const r=this._originData.get(e.id)||new St(e);return r.refCount++,this._originData.has(r.origin.id)||this._originData.set(r.origin.id,r),r}release(e){e&&(e.refCount--,e.refCount===0&&this._originData.delete(e.origin.id))}updateViewMatrices(e){this._originData.forEach(r=>{_e(r.viewMatrix,e),kt(r.origin.vec3,r.viewMatrix)})}},St=class{constructor(e){this.origin=e,this.refCount=0,this.viewMatrix=D()}},$t=class extends be{constructor(e,r){super(),this.distanceFalloffFactor=e,this.transparency=r,this.transformNormalViewFromGlobal=C()}},Dt=class extends ye{constructor(){super(...arguments),this.transformNormalViewFromGlobal=C(),this.slicePlaneLocalOrigin=k(),this.transformNormalGlobalFromModel=C()}};function Ct(t){const e=c`bool isNaN( float val )
{
return ( val < 0.0 || 0.0 < val || val == 0.0 ) ? false : true;
}`;t.code.add(e)}const Mt=Ae(.5,-4e-4);function Rt(t,e){const r=t.vertex;r.include(Ct),r.constants.add("depthBias","vec2",Mt),r.uniforms.add(new ce("inverseViewport",o=>o.inverseViewport)),e.legacy?(r.uniforms.add(new ue("proj",o=>o.camera.projectionMatrix)),r.code.add(c`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = proj * localView * vec4(globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)):(r.uniforms.add(new fe("transformNormalViewFromGlobal",o=>o.transformNormalViewFromGlobal),new Le("transformProjFromView",o=>o.transformProjFromView)),r.code.add(c`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = transformProjFromView * vec4(transformNormalViewFromGlobal * globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)),r.code.add(c`float _calculateProjectedBiasZ(vec4 projPos) {
float offsetZ = depthBias.y;
return sqrt(max(projPos.z,0.0)) * offsetZ;
}
vec4 adjustProjectedPosition(vec4 projPos, vec3 worldNormal, float lineWidth) {
vec2 offsetXY = calculateProjectedBiasXY(projPos, worldNormal);
if (!isNaN(offsetXY.x) && !isNaN(offsetXY.y)) {
projPos.xy += offsetXY;
}
projPos.z += _calculateProjectedBiasZ(projPos);
return projPos;
}`)}function Nt(t,e){const r=t.vertex;e.silhouette?(r.code.add(c`bool isSilhouetteEdge(vec3 viewDir, vec3 normalA, vec3 normalB) {
float faceAVisible = dot(viewDir, normalA);
float faceBVisible = dot(viewDir, normalB);
return faceAVisible * faceBVisible < 0.0;
}`),e.legacy?r.code.add(c`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 viewNormalA = _modelToViewNormal(data.normal);
vec3 viewNormalB = _modelToViewNormal(data.normal2);
vec3 viewDir = -viewPos;
if (isSilhouetteEdge(viewDir, viewNormalA, viewNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`):r.code.add(c`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 worldNormalA = _modelToWorldNormal(data.normal);
vec3 worldNormalB = _modelToWorldNormal(data.normal2);
vec3 viewDir = -worldPos;
if (isSilhouetteEdge(viewDir, worldNormalA, worldNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`)):r.code.add(c`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
return false;
}`)}function Ft(t){const e=t.vertex;e.uniforms.add(new Te("distanceFalloffFactor",r=>r.distanceFalloffFactor)),e.code.add(c`float distanceBasedPerspectiveFactor(float distance) {
return clamp(sqrt(distanceFalloffFactor / distance), 0.0, 1.0);
}`)}function Et(t,e){const{vertex:r}=t;r.include(Oe),t.include(Ve,e);const{silhouette:o,legacy:s,spherical:n}=e;r.uniforms.add(new W("componentDataTex",f=>f.componentDataTexture)),t.attributes.add("componentIndex","float"),r.constants.add("lineWidthFractionFactor","float",8),r.constants.add("extensionLengthOffset","float",128),r.code.add(c`
    vec2 _componentTextureCoords(float componentIndex, float fieldOffset) {
      float fieldIndex = ${c.float(3)}  * componentIndex + fieldOffset;
      float texSize = float(textureSize(componentDataTex, 0).x);
      float colIndex = mod(fieldIndex, texSize);
      float rowIndex = floor(fieldIndex / texSize);

      return vec2(colIndex, rowIndex) + 0.5;
    }

    struct ComponentData {
      vec4 color;
      vec3 normal;
      vec3 normal2;
      float lineWidth;
      float extensionLength;
      float type;
      float verticalOffset;
    };

    ComponentData readComponentData() {
      vec2 colorIndex = _componentTextureCoords(componentIndex, ${c.float(0)});
      vec2 otherIndex = _componentTextureCoords(componentIndex, ${c.float(1)});
      vec2 verticalOffsetIndex = _componentTextureCoords(float(componentIndex), ${c.float(2)} );
      vec3 normal = normalModel();
      vec3 normal2 = ${o?c`decompressNormal(normal2Compressed)`:c`normal`};

      vec4 colorValue = texelFetch(componentDataTex, ivec2(colorIndex), 0);
      vec4 otherValue = texelFetch(componentDataTex, ivec2(otherIndex), 0);
      float verticalOffset = uninterpolatedRGBAToFloat(texelFetch(componentDataTex, ivec2(verticalOffsetIndex), 0)) * ${c.float(ke)};

      return ComponentData(
        vec4(colorValue.rgb, colorValue.a * otherValue.w), // otherValue.w stores separate opacity
        normal, normal2,
        otherValue.x * (255.0 / ${c.float(8)} ),
        otherValue.y * 255.0 - ${c.float(128)},
        -(otherValue.z * 255.0) + 0.5, // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;
        verticalOffset
      );
    }
  `),s?r.code.add(c`vec3 _modelToWorldNormal(vec3 normal) {
return (model * vec4(normal, 0.0)).xyz;
}
vec3 _modelToViewNormal(vec3 normal) {
return (localView * model * vec4(normal, 0.0)).xyz;
}`):(r.uniforms.add(new K("transformNormalGlobalFromModel",f=>f.transformNormalGlobalFromModel)),r.code.add(c`vec3 _modelToWorldNormal(vec3 normal) {
return transformNormalGlobalFromModel * normal;
}`)),o?(t.attributes.add("normal2Compressed","vec2"),r.code.add(c`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(normalize(data.normal + data.normal2));
}`)):r.code.add(c`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(data.normal);
}`),s?r.code.add(c`void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
worldPos = (model * vec4(modelPos, 1.0)).xyz;
viewPos = (localView * vec4(worldPos, 1.0)).xyz;
}`):(r.include(je,e),r.uniforms.add(new fe("transformViewFromCameraRelativeRS",f=>f.transformViewFromCameraRelativeRS),new K("transformWorldFromModelRS",f=>f.transformWorldFromModelRS),new q("transformWorldFromModelTL",f=>f.transformWorldFromModelTL),new q("transformWorldFromModelTH",f=>f.transformWorldFromModelTH),new H("transformWorldFromViewTL",f=>f.transformWorldFromViewTL),new H("transformWorldFromViewTH",f=>f.transformWorldFromViewTH)),r.code.add(c`
      void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
        vec3 rotatedModelPosition = transformWorldFromModelRS * modelPos;

        vec3 transformCameraRelativeFromModel = dpAdd(
          transformWorldFromModelTL,
          transformWorldFromModelTH,
          -transformWorldFromViewTL,
          -transformWorldFromViewTH
        );

        worldPos = transformCameraRelativeFromModel + rotatedModelPosition;

        if (verticalOffset != 0.0) {
          vec3 vUp = ${n?"normalize(transformWorldFromModelTL + rotatedModelPosition);":"vec3(0.0, 0.0, 1.0);"}
          worldPos += verticalOffset * vUp;
        }

        viewPos = transformViewFromCameraRelativeRS * worldPos;
      }
    `)),r.uniforms.add(new ue("transformProjFromView",f=>f.camera.projectionMatrix)).code.add(c`vec4 projFromViewPosition(vec3 position) {
return transformProjFromView * vec4(position, 1.0);
}`),r.code.add(c`float calculateExtensionLength(float extensionLength, float lineLength) {
return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);
}`)}function It(t){return t===1||t===2}function B(t,e){const r=e.type===2,o=e.type===0;t.attributes.add("sideness","vec2"),t.vertex.code.add(c`
    struct UnpackedAttributes {
      vec2 sideness;
      vec2 sidenessNorm;
      float lineWidthPixels;
      float extensionLengthPixels;
      ${L(r,"float type;")}
    };
  `).code.add(c`
    UnpackedAttributes unpackAttributes(ComponentData component) {
      vec2 sidenessNorm = sideness;
      vec2 sideness = sidenessNorm * 2.0 - 1.0;
      float extensionLengthPixels = component.extensionLength;
      float lineWidth = component.lineWidth;
      ${L(r,"if (component.type <= 0.0) {")}
      ${L(!o,"extensionLengthPixels *= variantExtension * 2.0 - 1.0;")}
      ${L(r,"}")}
      return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels ${L(r,", component.type")});
    }
  `)}function Wt(t,e){const r=t.vertex;switch(t.include(B,e),e.type){case 0:r.code.add(c`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return 0.0;
}`);break;case 1:r.uniforms.add(new M("strokesAmplitude",o=>o.strokesTexture.amplitude)).code.add(c`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return strokesAmplitude;
}`);break;case 2:r.uniforms.add(new M("strokesAmplitude",o=>o.strokesTexture.amplitude)).code.add(c`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
float type = unpackedAttributes.type;
if (type <= 0.0) {
return strokesAmplitude;
}
return 0.0;
}`);break;case 3:break;default:me(e.type)}}function zt(t,e){t.include(B,e);const{vertex:r,fragment:o}=t;switch(It(e.type)&&(t.varyings.add("vStrokeUV","vec2"),r.uniforms.add(new W("strokesTexture",s=>s.strokesTexture.texture),new M("strokesLog2Resolution",s=>Math.log2(s.strokesTexture.resolution)),new M("strokeVariants",s=>s.strokesTexture.variants)).code.add(c`void calculateStyleOutputsSketch(float lineLength, UnpackedAttributes unpackedAttributes) {
vec2 sidenessNorm = unpackedAttributes.sidenessNorm;
float lineIndex = clamp(ceil(log2(lineLength)), 0.0, strokesLog2Resolution);
vStrokeUV = vec2(exp2(lineIndex) * sidenessNorm.y, lineIndex * strokeVariants + variantStroke + 0.5) / vec2(textureSize(strokesTexture, 0));
vStrokeUV.x += variantOffset;
}`),o.uniforms.add(new W("strokesTexture",s=>s.strokesTexture.texture)).code.add(c`float calculateLineOffsetSketch() {
return texture(strokesTexture, vStrokeUV).r;
}
float calculateLinePressureSketch() {
return texture(strokesTexture, vStrokeUV + vec2(0.0, 0.5)).r;
}`)),e.type){case 0:r.code.add(c`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes) {}`),o.code.add(c`float calculateLineOffset() {
return 0.0;
}
float calculateLinePressure() {
return 1.0;
}`);break;case 1:r.code.add(c`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}`),o.code.add(c`float calculateLineOffset() {
return calculateLineOffsetSketch();
}
float calculateLinePressure() {
return calculateLinePressureSketch();
}`);break;case 2:t.varyings.add("vType","float"),r.code.add(c`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
vType = unpackedAttributes.type;
if (unpackedAttributes.type <= 0.0) {
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}
}`),o.code.add(c`float calculateLineOffset() {
if (vType <= 0.0) {
return calculateLineOffsetSketch();
}
else {
return 0.0;
}
}
float calculateLinePressure() {
if (vType <= 0.0) {
return calculateLinePressureSketch();
}
else {
return 1.0;
}
}`);break;case 3:break;default:me(e.type)}}function we(t){const e=new Se,{vertex:r,fragment:o,varyings:s,attributes:n}=e;t.legacy&&r.uniforms.add(new Z("model"),new Z("localView")),e.include(Rt,t),e.include(Et,t),e.include(Wt,t),e.include(B,t),e.include(zt,t),o.include($e,t),e.include(Nt,t),e.include(De,t),e.include(Ft,t),s.add("vColor","vec4"),s.add("vRadius","float"),s.add("vPosition","vec3",{invariant:!0}),s.add("vWorldPosition","vec3",{invariant:!0}),s.add("vLineLengthPixels","float"),s.add("vSizeFalloffFactor","float"),r.uniforms.add(new ce("pixelToNDC",({camera:u})=>Ce(Bt,2/u.fullViewport[2],2/u.fullViewport[3])),new Re("viewport",u=>u.camera.fullViewport),new Ne("pixelRatio",u=>u.camera.pixelRatio)),n.add("position0","vec3"),n.add("position1","vec3"),n.add("variantOffset","float"),n.add("variantStroke","float"),n.add("variantExtension","float");const l=t.type===1,a=t.type===2,i=1/255,d=1;return r.code.add(c`
    void calculateGeometricOutputs(vec3 viewPosV0, vec3 viewPosV1, vec3 worldPosV0, vec3 worldPosV1, vec3 worldNormal, UnpackedAttributes unpackedAttributes) {
      vec2 sideness = unpackedAttributes.sideness;
      vec2 sidenessNorm = unpackedAttributes.sidenessNorm;

      vWorldPosition = mix(worldPosV0, worldPosV1, sidenessNorm.y).xyz;

      vec3 viewPos = mix(viewPosV0, viewPosV1, sidenessNorm.y);
      forwardViewPosDepth(viewPos);

      vec4 projPosV0 = projFromViewPosition(viewPosV0);
      vec4 projPosV1 = projFromViewPosition(viewPosV1);
      vec4 projPos = projFromViewPosition(viewPos);

      vec3 screenSpaceLineNDC = (projPosV1.xyz / projPosV1.w - projPosV0.xyz / projPosV0.w);
      vec2 ndcToPixel = viewport.zw * 0.5;
      vec2 screenSpaceLinePixels = screenSpaceLineNDC.xy * ndcToPixel;
      float lineLengthPixels = length(screenSpaceLinePixels);

      float dzPerPixel = screenSpaceLineNDC.z / lineLengthPixels;
      vec2 screenSpaceDirection = screenSpaceLinePixels / lineLengthPixels;
      vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x) * sideness.x;

      float falloffFactor = distanceBasedPerspectiveFactor(-viewPos.z) * pixelRatio;
      float lineWidthPixels = unpackedAttributes.lineWidthPixels * falloffFactor;

      float extensionLengthPixels = calculateExtensionLength(unpackedAttributes.extensionLengthPixels, lineLengthPixels) * falloffFactor;
      float lineAmplitudePixels = calculateLineAmplitude(unpackedAttributes) * pixelRatio;

      vSizeFalloffFactor = falloffFactor;

      float lineWidthAndAmplitudePixels = lineWidthPixels + lineAmplitudePixels + lineAmplitudePixels;
      float extendedLineLengthPixels = lineLengthPixels + extensionLengthPixels + extensionLengthPixels;

      // Line size with padding
      float halfAAPaddedLineWidthAndAmplitudePixels = lineWidthAndAmplitudePixels * 0.5 + ${c.float(d)};
      float aaPaddedRoundedCapSizePixels = lineWidthPixels * 0.5 + ${c.float(d)};

      // Half line width in NDC including padding for anti aliasing
      vec2 halfAAPaddedLineWidthAndAmplitudeNDC = halfAAPaddedLineWidthAndAmplitudePixels * pixelToNDC;
      vec2 aaPaddedRoundedCapSizeNDC = aaPaddedRoundedCapSizePixels * pixelToNDC;
      vec2 extensionLengthNDC = extensionLengthPixels * pixelToNDC;

      // Compute screen space position of vertex, offsetting for line size and end caps
      vec2 ndcOffset = (
          screenSpaceDirection * sideness.y * (aaPaddedRoundedCapSizeNDC + extensionLengthNDC)
        + perpendicularScreenSpaceDirection * halfAAPaddedLineWidthAndAmplitudeNDC
      );

      projPos.xy += ndcOffset * projPos.w;
      projPos.z += (dzPerPixel * (aaPaddedRoundedCapSizePixels + extensionLengthPixels)) * sideness.y * projPos.w;

      projPos = adjustProjectedPosition(projPos, worldNormal, 1.0 + max((lineWidthAndAmplitudePixels - 1.0) * 0.5, 0.0));

      // Line length with end caps
      float aaPaddedLineWithCapsLengthPixels = extendedLineLengthPixels + aaPaddedRoundedCapSizePixels + aaPaddedRoundedCapSizePixels;

      float pixelPositionAlongLine = aaPaddedLineWithCapsLengthPixels * sidenessNorm.y - aaPaddedRoundedCapSizePixels;

      // Position in pixels with origin at first vertex of line segment
      vPosition = vec3(
        halfAAPaddedLineWidthAndAmplitudePixels * sideness.x,
        pixelPositionAlongLine,
        pixelPositionAlongLine / extendedLineLengthPixels
      );

      // The line width radius in pixels
      vRadius = lineWidthPixels * 0.5;
      vLineLengthPixels = extendedLineLengthPixels;

      // discard short edges below a certain length threshold
      ${L(l||a,c`if (lineLengthPixels <= 3.0 ${L(a," && unpackedAttributes.type <= 0.0")}) {
                gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
                return;
             }`)}
      gl_Position = projPos;
    }`),r.main.add(c`
    ComponentData component = readComponentData();
    UnpackedAttributes unpackedAttributes = unpackAttributes(component);

    vec3 worldPosV0, worldPosV1, viewPosV0, viewPosV1;
    worldAndViewFromModelPosition(position0, component.verticalOffset, worldPosV0, viewPosV0);
    worldAndViewFromModelPosition(position1, component.verticalOffset, worldPosV1, viewPosV1);

    // Component color
    vColor = component.color;

    // Discard fully transparent edges
    if (vColor.a < ${c.float(i)}) {
      gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
      return;
    }

    if (discardNonSilhouetteEdges(viewPosV0, worldPosV0, component)) {
      return;
    }

    // General geometric computation for all types of edges
    calculateGeometricOutputs(viewPosV0, viewPosV1, worldPosV0, worldPosV1, worldNormal(component), unpackedAttributes);

    // Specific computation for different edge styles
    calculateStyleOutputs(unpackedAttributes);`),o.code.add(c`float lineWithCapsDistance(float radius, vec2 position, float lineLength) {
float positionX = position.x - calculateLineOffset();
if (radius < 1.0) {
float coverageX = clamp(min(radius, positionX + 0.5) - max(-radius, positionX - 0.5), 0.0, 1.0);
float coverageY = clamp(min(lineLength, position.y + 0.5) - max(0.0, position.y - 0.5), 0.0, 1.0);
return 0.5 - min(coverageX, coverageY);
}
else {
float positionOnCap = position.y - clamp(position.y, 0.0, lineLength);
return length(vec2(positionX, positionOnCap)) - radius;
}
}`),o.main.add(c`discardByTerrainDepth();
float radius = vRadius * calculateLinePressure();
float distance = lineWithCapsDistance(radius, vPosition.xy, vLineLengthPixels);
float coverage = clamp(0.5 - distance, 0.0, 1.0);
discardBySlice(vWorldPosition);
fragColor = vec4(vColor.rgb, vColor.a * coverage);`),e}const Bt=Me();class Z extends Fe{constructor(e){super(e,"mat4")}}const Ut=Object.freeze(Object.defineProperty({__proto__:null,build:we},Symbol.toStringTag,{value:"Module"}));let Kt=class extends Ee{constructor(e,r){super(e,r,new Ie(Ut,()=>Tt(()=>Promise.resolve().then(()=>a9),void 0)),r.silhouette?Pt:_t)}initializePipeline(){return We({blending:Be(1,1,0,1,32774,32776),depthTest:{func:515},colorWrite:ze})}},A=class extends Ue{constructor(){super(...arguments),this.type=0,this.silhouette=!1,this.legacy=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.spherical=!1,this.occlusionPass=!1,this.normalType=1}};v([T({count:3})],A.prototype,"type",void 0),v([T()],A.prototype,"silhouette",void 0),v([T()],A.prototype,"legacy",void 0),v([T()],A.prototype,"terrainDepthTest",void 0),v([T()],A.prototype,"cullAboveTerrain",void 0),v([T()],A.prototype,"spherical",void 0);const qt=8,F=128,Ht={type:0,hasSlicePlane:!1,strokesTexture:null,legacy:!0,spherical:!0};class j{constructor(e,r,o){this.rctx=e,this._techniques=r,this._configuration=new A,this.refCount=0,this._renderables=new Set,this._sortedRenderables={0:{0:new $,1:new $},1:{0:new $,1:new $}},this._renderablesDirty=!1,this._drawParameters=new Dt,this._settings={...Ht,...o},this.key=j.getKey(this._settings.type,this._settings.hasSlicePlane,this._settings.legacy);const s=this._settings.strokesTexture.variants;this.writerSettings={variants:s,reducedPrecision:Ke.TESTS_DISABLE_OPTIMIZATIONS},this._configuration.legacy=this._settings.legacy,this._configuration.type=this._settings.type,this._configuration.silhouette=!1,this._configuration.hasSlicePlane=this._settings.hasSlicePlane,this._configuration.spherical=o.spherical}addRenderable(e){this._renderables.add(e),this._renderablesDirty=!0}removeRenderable(e){this._renderables.delete(e),this._renderablesDirty=!0}setRenderablesDirty(){this._renderablesDirty=!0}forEachRenderable(e,r){this._renderablesDirty&&this._sortRenderables();const o=this._sortedRenderables[r];o[0].forAll(e),o[1].forAll(e)}acquireTechnique(e,r){return this._lastOriginId=null,this._configuration.terrainDepthTest=e.terrainDepthTest,this._configuration.cullAboveTerrain=e.cullAboveTerrain,this._configuration.silhouette=r,this._techniques.get(Kt,this._configuration)}renderRegularEdges(e,r,o,s,n){this._render(e,r,r.regular.vao,o,s,n)}renderSilhouetteEdges(e,r,o,s,n){this._render(e,r,r.silhouette.vao,o,s,n)}_render(e,r,o,s,n,l){l>0&&(this._bindDraw(e,r,s,n),this.rctx.bindVAO(o),this.rctx.drawArraysInstanced(qe.TRIANGLE_FAN,0,4,l))}_bindDraw(e,r,o,s){this._drawParameters.componentDataTexture=r.components.buffer.textureBuffer.texture,this._drawParameters.strokesTexture=this._settings.strokesTexture;const n=r.transform.origin;if(n){const l=n.origin.id;this._lastOriginId!==l&&(e.setUniformMatrix4fv("localView",n.viewMatrix),this._lastOriginId=l),e.setUniformMatrix4fv("model",r.transform.modelMatrix),this._drawParameters.slicePlaneLocalOrigin=n.origin.vec3}else{const l=new he(r.transform.position),a=pe(J,ge(J,r.transform.rotationScale));this._drawParameters.transformWorldFromModelTL=l.low,this._drawParameters.transformWorldFromModelTH=l.high,this._drawParameters.transformWorldFromModelRS=r.transform.rotationScale,this._drawParameters.transformNormalGlobalFromModel=a;const i=s.camera.viewInverseTransposeMatrix;z(this._drawParameters.slicePlaneLocalOrigin,i[3],i[7],i[11])}e.bindDraw(s,o,this._drawParameters)}_sortRenderables(){this._renderablesDirty=!1,this._sortedRenderables[0][0].clear(),this._sortedRenderables[0][1].clear(),this._sortedRenderables[1][0].clear(),this._sortedRenderables[1][1].clear(),this._renderables.forEach(r=>this._sortedRenderables[r.objectTransparency][r.edgeTransparency].push(r));const e=(r,o)=>r.transform.origin?o.transform.origin?r.transform.origin.origin.id<o.transform.origin.origin.id?-1:r.transform.origin.origin.id>o.transform.origin.origin.id?1:0:1:0;this._sortedRenderables[0][0].sort(e),this._sortedRenderables[0][1].sort(e),this._sortedRenderables[1][0].sort(e),this._sortedRenderables[1][1].sort(e)}static getKey(e,r,o){return`edges-t:${e}:${r}:${o}`}}const J=He();function Gt(t){const e=V.resolution,r=e/2,o=new Float32Array(e*e),s=e*r,n=V.amplitude,l=e,a=Math.log2(e)+1,i=V.strokes.length;let d=(a-1)*i*l;for(const{distance:f,pressure:w}of V.strokes){let P=f,g=w,p=d;for(let O=0;O<a;O++){O!==0&&(P=Q(P,0),g=Q(g,1));for(let h=0;h<V.resolution;h++){const x=P[h%P.length],R=g?.[h%g.length]??1;o[p]=x,o[p+s]=R,++p}p-=l*(i+1)}d+=l}const u=new Xe(e);u.dataType=Ge.FLOAT,u.pixelFormat=6403,u.internalFormat=Ye.R16F;const m=new Ze(t,u,o);return new Yt(e,n,i,m)}function Q(t,e){if(!t)return null;const r=t.length/2,o=Xt*r,s=new Array(r);let n=0;const l=e===1;for(let a=0;a<t.length;a+=2){const i=(t[a]+t[a+1])/2;s[n++]=l?Math.min(o,1-(1-i)*ee):Math.min(o,i*ee)}return s}const Xt=.1,ee=.5;class Yt{constructor(e,r,o,s){this.resolution=e,this.amplitude=r,this.variants=o,this.texture=s}dispose(){this.texture=ve(this.texture)}}const V={amplitude:8,resolution:256,strokes:[{distance:[-1.59027,-1.59426,-1.59674,-1.59766,-1.59702,-1.59479,-1.59095,-1.5855,-1.57843,-1.56973,-1.55942,-1.5475,-1.53398,-1.5189,-1.50226,-1.4841,-1.46446,-1.44337,-1.42088,-1.39703,-1.37188,-1.34547,-1.31786,-1.28912,-1.2593,-1.22847,-1.19668,-1.16402,-1.13053,-1.09629,-1.06137,-1.02582,-.98972,-.95313,-.91611,-.87872,-.84102,-.80306,-.76488,-.72654,-.68807,-.64952,-.61092,-.57232,-.53375,-.49527,-.45692,-.41874,-.38078,-.34309,-.3057,-.26867,-.23204,-.19585,-.16015,-.12497,-.09036,-.05634,-.02296,.00977,.04183,.07321,.10389,.13386,.16313,.19169,.21956,.24672,.27321,.299,.32413,.34858,.37237,.3955,.41798,.43981,.461,.48154,.50145,.52073,.53939,.55744,.57488,.5917,.6079,.62347,.63837,.65259,.66609,.67885,.69083,.70201,.71235,.72183,.73042,.73812,.7449,.75076,.7557,.75973,.76284,.76507,.76642,.76692,.76659,.76545,.76352,.76083,.7574,.75324,.74837,.74279,.73652,.72959,.72199,.71377,.70493,.69553,.68558,.67515,.66426,.65298,.64135,.62944,.6173,.60499,.59257,.58008,.56759,.55513,.54275,.5305,.51842,.50654,.4949,.48353,.47246,.4617,.45128,.44121,.43149,.42213,.41313,.40448,.39617,.38818,.3805,.37309,.36594,.35902,.35229,.34572,.33927,.33292,.32663,.32035,.31407,.30774,.30135,.29486,.28824,.28148,.27454,.26739,.26002,.25241,.24454,.23639,.22796,.21922,.21016,.20076,.19098,.18082,.17023,.1592,.14768,.13566,.1231,.10996,.09624,.08188,.06688,.05121,.03485,.01778,0,-.0185,-.03771,-.05763,-.07824,-.09952,-.12144,-.14396,-.16706,-.19069,-.21481,-.23938,-.26436,-.28971,-.31539,-.34136,-.36759,-.39404,-.42067,-.44746,-.47437,-.50136,-.52839,-.55544,-.58248,-.60948,-.63642,-.66329,-.6901,-.71684,-.74352,-.77015,-.79675,-.82332,-.84988,-.87644,-.90301,-.92958,-.95615,-.98272,-1.00926,-1.03575,-1.06217,-1.08847,-1.11463,-1.1406,-1.16633,-1.19178,-1.2169,-1.24164,-1.26595,-1.28979,-1.31312,-1.3359,-1.35809,-1.37963,-1.4005,-1.42064,-1.44,-1.45853,-1.47616,-1.49285,-1.50853,-1.52313,-1.53659,-1.54886,-1.55986,-1.56955,-1.57788,-1.5848],pressure:[-.01365,-.00206,.01025,.02327,.03696,.05129,.06619,.08163,.09755,.11393,.1307,.14784,.16531,.18308,.20111,.21938,.23786,.25651,.2753,.29419,.31315,.33215,.35115,.37015,.38913,.40806,.42694,.44576,.46449,.48313,.50167,.5201,.53839,.55653,.57448,.59222,.60971,.62692,.6438,.66033,.67648,.69221,.70753,.72242,.73688,.75093,.76456,.77779,.79063,.80309,.81517,.82686,.83817,.84911,.85967,.86987,.87972,.88924,.89845,.90734,.91594,.92425,.93229,.94005,.94754,.95475,.96166,.96826,.97451,.9804,.98588,.99092,.99549,.99957,.99685,.99381,.99131,.98936,.98796,.98711,.98681,.98706,.98787,.98923,.99113,.99357,.99654,1,.99607,.99171,.98695,.98181,.97634,.97057,.96452,.95824,.95175,.94506,.93818,.93113,.92389,.91647,.90887,.90109,.89314,.88501,.87672,.86831,.85978,.85119,.84256,.83393,.82533,.8168,.80836,.80002,.79181,.78374,.77582,.7681,.76059,.75331,.74629,.73955,.73311,.72697,.72116,.71568,.71054,.70572,.70121,.697,.69304,.68931,.68576,.68236,.67905,.67582,.67262,.66941,.66619,.66291,.65957,.65613,.65259,.64892,.6451,.6411,.6369,.63248,.62783,.62295,.61783,.61247,.60688,.60104,.59498,.58868,.58216,.57542,.56845,.56125,.5538,.5461,.53813,.52986,.52129,.51239,.50316,.49359,.4837,.47349,.46299,.45223,.44124,.43005,.41869,.40719,.39557,.38386,.37207,.36023,.34836,.33648,.32464,.31287,.30119,.28963,.27822,.26698,.25594,.2451,.23448,.22409,.21391,.20394,.19415,.18452,.17503,.16565,.15636,.14713,.13794,.1288,.11968,.11058,.10151,.09247,.08346,.07447,.06552,.05659,.0477,.03885,.03007,.02137,.01278,.00433,-.00393,-.012,-.01983,-.02738,-.03463,-.04155,-.0481,-.05429,-.0601,-.06553,-.07057,-.07524,-.07954,-.08347,-.08703,-.09022,-.09303,-.09544,-.09744,-.09898,-.10004,-.10059,-.1006,-.10005,-.09892,-.0972,-.09487,-.09192,-.08833,-.08409,-.07918,-.07357,-.06724,-.06019,-.0524,-.04386,-.03455,-.02448]},{distance:[-3.46259,-3.47131,-3.47668,-3.47863,-3.47712,-3.4721,-3.46352,-3.45138,-3.43566,-3.41635,-3.39347,-3.36704,-3.33709,-3.30368,-3.26684,-3.22667,-3.18322,-3.1366,-3.08689,-3.0342,-2.97865,-2.92036,-2.85946,-2.79607,-2.73034,-2.66241,-2.59242,-2.52052,-2.44686,-2.37159,-2.29485,-2.2168,-2.13757,-2.05731,-1.97616,-1.89426,-1.81174,-1.72875,-1.64543,-1.56191,-1.47833,-1.39483,-1.3115,-1.22847,-1.14581,-1.06361,-.98193,-.90083,-.82036,-.74054,-.66141,-.583,-.50532,-.4284,-.35228,-.277,-.20261,-.12916,-.05672,.01463,.08485,.15384,.22153,.28784,.35269,.41602,.47776,.53787,.59629,.653,.70799,.76123,.81274,.86253,.9106,.95698,1.0017,1.04477,1.0862,1.126,1.16415,1.20065,1.23546,1.26857,1.29994,1.32953,1.35731,1.38321,1.40719,1.42921,1.44922,1.46719,1.48309,1.49691,1.50862,1.51825,1.52581,1.53133,1.53486,1.53644,1.53616,1.53409,1.53031,1.52493,1.51803,1.50972,1.50009,1.48924,1.47725,1.46421,1.45019,1.43527,1.4195,1.40295,1.38568,1.36778,1.34929,1.3303,1.31087,1.29108,1.27099,1.25066,1.23018,1.2096,1.18898,1.16838,1.14785,1.12745,1.10721,1.08719,1.06741,1.04791,1.02871,1.00986,.99136,.97324,.95551,.93819,.92127,.90476,.88866,.87296,.85767,.84277,.82823,.81406,.80022,.7867,.77346,.76049,.74774,.73519,.72278,.71049,.69827,.68606,.67381,.66145,.64893,.63618,.62313,.60973,.5959,.5816,.56675,.5513,.53516,.51826,.50053,.4819,.46231,.44169,.42002,.39725,.37336,.34834,.32219,.2949,.2665,.23698,.20638,.17469,.14193,.10809,.07316,.03714,0,-.03827,-.07772,-.11836,-.16022,-.20332,-.24768,-.29332,-.34024,-.38844,-.43788,-.48854,-.54036,-.59329,-.64724,-.70211,-.75782,-.81425,-.87128,-.92881,-.98674,-1.04498,-1.10346,-1.1621,-1.22086,-1.27969,-1.33854,-1.3974,-1.45625,-1.51511,-1.57396,-1.63283,-1.69173,-1.75067,-1.80968,-1.86875,-1.9279,-1.98712,-2.04639,-2.10568,-2.16495,-2.22416,-2.28322,-2.34208,-2.40063,-2.4588,-2.51647,-2.57354,-2.62989,-2.68543,-2.74002,-2.79357,-2.84597,-2.89711,-2.94689,-2.99521,-3.04195,-3.087,-3.13023,-3.17152,-3.21075,-3.24779,-3.28252,-3.3148,-3.34451,-3.37154,-3.39577,-3.41709,-3.43539,-3.45059],pressure:[.87183,.87151,.87129,.87118,.87117,.87128,.87149,.87182,.87225,.8728,.87347,.87424,.87513,.87613,.87723,.87845,.87978,.88122,.88276,.88441,.88616,.88801,.88996,.892,.89414,.89637,.89868,.90108,.90356,.90611,.90874,.91144,.91421,.91704,.91993,.92287,.92587,.92892,.93201,.93514,.93831,.94151,.94474,.94799,.95126,.95456,.95786,.96118,.9645,.96783,.97116,.97448,.9778,.98111,.98441,.9877,.99096,.99421,.99742,.99938,.99622,.9931,.99001,.98697,.98397,.98101,.97811,.97526,.97246,.96972,.96703,.96441,.96185,.95935,.95691,.95455,.95225,.95002,.94786,.94577,.94376,.94182,.93995,.93817,.93646,.93483,.93328,.93181,.93042,.92911,.92788,.92673,.92566,.92467,.92376,.92293,.92217,.92149,.92088,.92034,.91987,.91947,.91913,.91886,.91864,.91849,.91838,.91833,.91834,.91839,.91849,.91863,.91883,.91907,.91935,.91968,.92005,.92046,.92092,.92142,.92195,.92253,.92314,.9238,.92449,.92521,.92598,.92677,.9276,.92847,.92936,.93029,.93125,.93224,.93325,.9343,.93537,.93646,.93758,.93872,.93988,.94106,.94225,.94346,.94469,.94593,.94718,.94844,.94971,.95098,.95226,.95354,.95482,.9561,.95738,.95867,.95995,.96122,.9625,.96377,.96504,.9663,.96757,.96883,.97009,.97135,.97261,.97387,.97513,.9764,.97767,.97895,.98023,.98153,.98284,.98416,.98549,.98684,.98821,.9896,.99101,.99244,.99389,.99537,.99688,.99842,1,.99839,.99675,.99508,.99336,.99161,.98982,.98799,.98613,.98422,.98228,.98029,.97827,.97622,.97414,.97202,.96987,.9677,.96551,.9633,.96107,.95882,.95656,.9543,.95202,.94975,.94747,.94519,.94292,.94065,.93838,.93613,.93388,.93164,.92941,.9272,.92499,.9228,.92062,.91846,.91631,.91418,.91207,.90998,.90792,.90588,.90387,.90189,.89995,.89804,.89617,.89434,.89256,.89083,.88914,.88752,.88595,.88443,.88299,.88161,.8803,.87907,.87791,.87683,.87584,.87494,.87412,.8734,.87278,.87225]},{distance:[.39335,.43437,.47737,.52234,.56923,.61801,.66864,.72109,.7753,.83123,.88882,.94801,1.00875,1.07097,1.13461,1.1996,1.26586,1.33333,1.40193,1.47158,1.54221,1.61373,1.68607,1.75913,1.83284,1.90711,1.98186,2.05699,2.13243,2.20809,2.28387,2.35971,2.4355,2.51117,2.58663,2.66179,2.73658,2.81092,2.88473,2.95792,3.03043,3.10217,3.17308,3.24309,3.31211,3.3801,3.44697,3.51267,3.57712,3.64028,3.70208,3.76247,3.8214,3.87881,3.93467,3.98892,4.04152,4.09244,4.14164,4.18908,4.23474,4.27859,4.32061,4.36077,4.39905,4.43544,4.46992,4.50249,4.53314,4.56185,4.58864,4.61349,4.63642,4.65745,4.67657,4.69381,4.7092,4.72274,4.73447,4.74441,4.75259,4.75903,4.76376,4.76682,4.76822,4.768,4.76618,4.76279,4.75786,4.75142,4.74348,4.73409,4.72326,4.71102,4.69739,4.68241,4.6661,4.64849,4.6296,4.60948,4.58816,4.56567,4.54204,4.51732,4.49154,4.46473,4.43694,4.4082,4.37854,4.348,4.31662,4.28443,4.25145,4.21773,4.1833,4.14819,4.11243,4.07606,4.03912,4.00162,3.96361,3.92512,3.88618,3.84683,3.80708,3.76697,3.72653,3.68579,3.64478,3.60351,3.56202,3.52033,3.47845,3.43642,3.39425,3.35196,3.30957,3.2671,3.22455,3.18196,3.13933,3.09668,3.05402,3.01136,2.96873,2.92613,2.88357,2.84108,2.79865,2.75631,2.71407,2.67195,2.62994,2.58807,2.54634,2.50477,2.46338,2.42216,2.38114,2.34032,2.29971,2.25933,2.21916,2.17923,2.13954,2.10008,2.06087,2.02189,1.98316,1.94468,1.90644,1.86845,1.83069,1.79316,1.75586,1.71877,1.68189,1.6452,1.60868,1.57232,1.53611,1.50004,1.46407,1.4282,1.39241,1.35668,1.321,1.28535,1.24972,1.2141,1.17849,1.14286,1.10723,1.07158,1.03593,1.00028,.96464,.92902,.89344,.85793,.8225,.78719,.75203,.71705,.68231,.64784,.61369,.57991,.54656,.51368,.48134,.44959,.41849,.3881,.35848,.32967,.30174,.27474,.24872,.22373,.19982,.17702,.15539,.13497,.11579,.09791,.08137,.06621,.05248,.04022,.02948,.02029,.01271,.00677,.00252,0,-76e-5,27e-5,.00314,.00788,.01451,.02307,.03357,.04604,.0605,.07697,.09546,.11599,.13858,.16322,.18992,.21869,.24952,.28241,.31735,.35434],pressure:[.95248,.95236,.95228,.95223,.95222,.95224,.95231,.95241,.95256,.95274,.95296,.95322,.95352,.95385,.95423,.95465,.9551,.9556,.95613,.9567,.95731,.95796,.95864,.95936,.96012,.96091,.96173,.96259,.96348,.9644,.96535,.96633,.96734,.96838,.96944,.97053,.97164,.97277,.97393,.9751,.97629,.9775,.97873,.97997,.98122,.98249,.98376,.98505,.98634,.98763,.98893,.99023,.99154,.99284,.99414,.99544,.99673,.99802,.9993,.99942,.99816,.99691,.99568,.99445,.99324,.99205,.99087,.98972,.98858,.98746,.98636,.98528,.98423,.9832,.98219,.98121,.98025,.97931,.9784,.97752,.97666,.97582,.97501,.97423,.97347,.97274,.97203,.97135,.9707,.97007,.96948,.9689,.96836,.96784,.96735,.96689,.96646,.96605,.96567,.96533,.965,.96471,.96445,.96421,.964,.96382,.96367,.96355,.96346,.96339,.96335,.96334,.96336,.9634,.96348,.96358,.9637,.96385,.96403,.96423,.96446,.96471,.96499,.96529,.96561,.96595,.96631,.96669,.96709,.96751,.96795,.9684,.96887,.96935,.96984,.97035,.97087,.9714,.97194,.97249,.97304,.97361,.97418,.97476,.97534,.97592,.97651,.97711,.9777,.9783,.9789,.9795,.9801,.9807,.9813,.9819,.9825,.98309,.98369,.98428,.98486,.98545,.98603,.98661,.98718,.98775,.98832,.98888,.98944,.99,.99056,.99112,.99167,.99223,.99279,.99335,.99392,.99449,.99507,.99565,.99624,.99684,.99745,.99807,.9987,.99934,1,.99933,.99866,.99797,.99727,.99656,.99583,.9951,.99435,.99359,.99283,.99205,.99126,.99046,.98966,.98885,.98803,.9872,.98637,.98554,.9847,.98387,.98303,.98219,.98134,.9805,.97967,.97883,.978,.97717,.97634,.97552,.97471,.97389,.97309,.97229,.9715,.97071,.96993,.96915,.96838,.96762,.96687,.96612,.96539,.96466,.96395,.96324,.96255,.96187,.9612,.96055,.95991,.95929,.95869,.95811,.95754,.957,.95648,.95599,.95552,.95508,.95467,.95428,.95393,.9536,.95331,.95305,.95283,.95264]},{distance:[2.85606,2.86149,2.86432,2.8645,2.862,2.85686,2.84912,2.83886,2.82618,2.81117,2.79393,2.77456,2.75314,2.72975,2.70447,2.67734,2.64844,2.61784,2.58564,2.55196,2.5169,2.48057,2.44305,2.40438,2.36462,2.32383,2.28208,2.23943,2.19591,2.15153,2.10628,2.06016,2.01321,1.96548,1.91702,1.86793,1.8183,1.76829,1.71803,1.66767,1.61737,1.56726,1.51746,1.46803,1.41902,1.37044,1.32228,1.27452,1.22716,1.18023,1.13376,1.08781,1.04244,.99769,.95357,.91003,.86701,.82447,.78238,.74069,.69938,.65836,.61758,.57699,.53656,.49627,.45611,.41611,.37632,.33683,.29776,.25924,.22141,.18441,.14839,.11346,.07972,.04727,.01619,-.01348,-.0417,-.0684,-.09351,-.11698,-.13875,-.1588,-.17713,-.19381,-.20889,-.22242,-.23444,-.24501,-.25421,-.26216,-.26897,-.27473,-.27951,-.28336,-.28631,-.28836,-.28948,-.28963,-.28873,-.28673,-.28355,-.27916,-.27354,-.26673,-.25878,-.2498,-.23992,-.22929,-.21802,-.20623,-.19398,-.18134,-.16836,-.1551,-.14163,-.12809,-.11461,-.1013,-.08826,-.07557,-.06335,-.0517,-.04077,-.03065,-.02143,-.01321,-.00606,0,.00496,.00888,.01181,.01385,.01511,.0157,.01574,.01533,.01458,.01358,.0124,.01112,.00979,.00851,.00738,.0065,.006,.00596,.00646,.00754,.00924,.01161,.01471,.01858,.02323,.02865,.03481,.04169,.0493,.05765,.06677,.07671,.08754,.09934,.11222,.12628,.14159,.15823,.17624,.19561,.21632,.23828,.26142,.28563,.31083,.33696,.36397,.39185,.42057,.4501,.48036,.51125,.54264,.5744,.60646,.63871,.67105,.70337,.73556,.76751,.79918,.83048,.86139,.8919,.92202,.95184,.98144,1.01094,1.04045,1.0701,1.10002,1.13029,1.16103,1.1923,1.22416,1.25664,1.28979,1.32364,1.35824,1.39363,1.42985,1.4669,1.50475,1.54332,1.58252,1.62227,1.6625,1.70312,1.744,1.78501,1.82598,1.8668,1.90734,1.94754,1.98732,2.02666,2.06555,2.10402,2.1421,2.17985,2.2173,2.25448,2.29139,2.328,2.36424,2.4,2.43515,2.46955,2.50309,2.53565,2.56717,2.59761,2.62692,2.65505,2.68191,2.7074,2.73138,2.75375,2.7744,2.79324,2.81017,2.82504,2.83772,2.8481],pressure:[.22758,.23641,.24578,.25568,.26609,.27699,.28835,.30016,.31237,.32495,.33789,.35113,.36466,.37843,.39241,.40658,.4209,.43535,.44989,.4645,.47916,.49385,.50853,.5232,.53784,.55243,.56696,.58141,.59578,.61004,.62419,.63821,.65209,.6658,.67934,.69268,.70582,.71873,.73139,.7438,.75594,.76779,.77935,.79061,.80156,.81221,.82254,.83258,.84231,.85176,.86091,.86978,.87837,.88669,.89473,.9025,.91,.91725,.92425,.931,.93752,.9438,.94985,.95566,.96124,.96658,.97168,.97652,.98109,.98539,.98939,.99309,.99646,.99949,.99783,.99552,.99361,.99209,.99098,.99029,.99003,.99019,.99079,.99181,.99324,.9951,.99735,1,.99698,.99361,.98992,.98592,.98163,.97709,.97231,.96731,.96212,.95676,.95122,.94554,.93973,.93378,.92773,.92157,.91532,.90899,.90258,.89612,.88961,.88308,.87653,.87,.8635,.85705,.85068,.8444,.83823,.83219,.82628,.82052,.81493,.80952,.8043,.79929,.7945,.78994,.78561,.78151,.77765,.77402,.77062,.76742,.76443,.76161,.75896,.75645,.75406,.75175,.74951,.7473,.74511,.74289,.74064,.73833,.73592,.73341,.73078,.728,.72507,.72197,.71869,.71522,.71156,.70769,.70363,.69936,.69489,.69021,.68533,.68023,.67492,.66939,.66363,.65765,.65145,.64501,.63833,.63143,.62428,.61691,.60931,.60148,.59344,.58521,.57679,.5682,.55948,.55063,.54167,.53264,.52354,.51439,.50522,.49603,.48686,.47773,.46865,.45964,.45072,.44192,.43324,.42469,.41629,.40804,.39994,.392,.3842,.37655,.36903,.36164,.35437,.3472,.34012,.33312,.3262,.31933,.31251,.30574,.299,.2923,.28563,.27899,.27239,.26583,.25933,.25288,.24652,.24025,.2341,.22808,.22221,.21653,.21104,.20576,.20072,.19592,.19138,.18712,.18313,.17943,.17602,.17292,.17013,.16766,.16551,.16369,.16222,.1611,.16036,.16001,.16007,.16055,.16148,.16286,.16471,.16705,.16988,.17321,.17706,.18144,.18636,.19182,.19785,.20443,.21158,.2193]},{distance:[-2.31317,-2.3191,-2.32189,-2.32154,-2.31811,-2.31174,-2.30254,-2.29062,-2.27609,-2.25904,-2.23954,-2.21767,-2.19355,-2.16732,-2.13907,-2.10885,-2.07672,-2.04268,-2.00677,-1.96911,-1.92985,-1.88914,-1.84713,-1.80397,-1.75979,-1.71467,-1.66864,-1.62171,-1.57395,-1.52546,-1.47625,-1.42628,-1.3755,-1.32384,-1.27131,-1.218,-1.16408,-1.10972,-1.05508,-1.00031,-.94551,-.89077,-.83615,-.7817,-.72757,-.6739,-.62076,-.56821,-.51625,-.46484,-.41397,-.36366,-.314,-.26506,-.21689,-.16957,-.12316,-.07766,-.03301,.01085,.05399,.09643,.13827,.17967,.22079,.26176,.30265,.34342,.38397,.42414,.46381,.50285,.54115,.57863,.61524,.65093,.6856,.71914,.75153,.78275,.81283,.84182,.86972,.89651,.92208,.94634,.96919,.99052,1.01025,1.02835,1.04484,1.05976,1.07309,1.08479,1.09492,1.1036,1.11096,1.11714,1.12224,1.12627,1.12916,1.13083,1.13125,1.13036,1.12816,1.12466,1.11992,1.11397,1.10677,1.09827,1.08849,1.07746,1.06527,1.05203,1.03786,1.02283,1.00695,.99025,.97279,.9546,.93573,.9163,.8965,.8765,.85647,.83652,.81687,.79775,.77939,.76199,.74568,.73049,.71635,.70316,.69082,.67925,.66834,.65804,.64831,.63911,.63032,.62184,.61363,.60564,.59788,.59036,.58308,.57597,.5689,.56177,.55447,.5469,.53896,.53062,.5219,.51283,.5034,.49355,.48335,.47287,.46223,.45154,.44085,.43012,.41923,.40805,.39648,.38441,.37176,.35849,.34458,.32999,.31461,.29833,.28109,.26288,.2437,.22361,.20265,.18082,.15807,.13434,.1096,.0838,.0569,.02894,0,-.0298,-.0604,-.09173,-.12364,-.15594,-.18843,-.22092,-.25331,-.28559,-.31781,-.35006,-.38244,-.41502,-.44785,-.48098,-.5144,-.54811,-.58218,-.61666,-.65153,-.68677,-.72232,-.75807,-.79397,-.83002,-.86628,-.90281,-.93968,-.97693,-1.01465,-1.05282,-1.09139,-1.13031,-1.16956,-1.20917,-1.24905,-1.28907,-1.32908,-1.36891,-1.40844,-1.44765,-1.48658,-1.52527,-1.56376,-1.60206,-1.64016,-1.67801,-1.71552,-1.75264,-1.78936,-1.8257,-1.86161,-1.89702,-1.93182,-1.96584,-1.99894,-2.03102,-2.06203,-2.0919,-2.12056,-2.14794,-2.17397,-2.19852,-2.22138,-2.24235,-2.26129,-2.27805,-2.29243,-2.30422],pressure:[.9681,.97424,.98046,.98674,.99309,.9995,.99404,.98754,.981,.97444,.96785,.96124,.95462,.94801,.94139,.93479,.92822,.92167,.91515,.90868,.90225,.89589,.88959,.88336,.87722,.87115,.86519,.85932,.85356,.84792,.84239,.83699,.83173,.8266,.82162,.81679,.81211,.80759,.80324,.79906,.79505,.79121,.78756,.78409,.78081,.77771,.77481,.77211,.76959,.76728,.76516,.76324,.76153,.76001,.75869,.75757,.75665,.75593,.7554,.75507,.75493,.75498,.75523,.75565,.75627,.75706,.75803,.75917,.76049,.76197,.76361,.76541,.76737,.76947,.77172,.77409,.7766,.77923,.78198,.78484,.7878,.79086,.79401,.79724,.80055,.80394,.8074,.81092,.8145,.81813,.82182,.82556,.82934,.83317,.83703,.84093,.84487,.84884,.85284,.85687,.86094,.86503,.86915,.87329,.87746,.88166,.88587,.89011,.89436,.89863,.90291,.9072,.91149,.91579,.92009,.92438,.92867,.93295,.9372,.94144,.94566,.94985,.954,.95812,.96219,.96623,.97021,.97415,.97802,.98184,.9856,.9893,.99293,.9965,1,.99657,.9932,.98991,.98668,.98352,.98042,.97738,.9744,.97148,.9686,.96577,.96298,.96023,.95751,.95482,.95214,.94949,.94684,.9442,.94156,.93892,.93627,.93361,.93094,.92825,.92555,.92284,.9201,.91735,.91458,.91179,.90899,.90616,.90332,.90047,.8976,.89472,.89183,.88893,.88603,.88314,.88024,.87735,.87448,.87162,.86878,.86597,.86319,.86044,.85774,.85508,.85247,.84993,.84744,.84503,.84269,.84042,.83825,.83616,.83417,.83227,.83048,.8288,.82724,.82578,.82445,.82324,.82215,.82119,.82037,.81967,.81911,.81868,.81839,.81824,.81823,.81835,.81862,.81903,.81957,.82026,.82109,.82206,.82317,.82443,.82583,.82737,.82906,.83089,.83287,.83499,.83726,.83968,.84223,.84494,.84778,.85077,.8539,.85717,.86058,.86412,.86781,.87163,.87559,.87968,.88391,.88826,.89275,.89737,.90211,.90698,.91198,.91709,.92233,.92768,.93315,.93873,.94441,.95019,.95607,.96205]},{distance:[4.72925,4.81721,4.9037,4.98859,5.07177,5.15311,5.23249,5.3098,5.38491,5.45772,5.52811,5.59598,5.66122,5.72375,5.78346,5.84028,5.8941,5.94486,5.99248,6.03689,6.07803,6.11584,6.15028,6.18128,6.20882,6.23285,6.25336,6.27031,6.28369,6.29348,6.29969,6.3023,6.30133,6.29678,6.28867,6.27703,6.26187,6.24324,6.22116,6.19567,6.16683,6.13468,6.09928,6.06068,6.01896,5.97417,5.92639,5.87569,5.82217,5.76589,5.70696,5.64545,5.58147,5.5151,5.44644,5.37559,5.30265,5.2277,5.15085,5.0722,4.99184,4.90987,4.82639,4.74151,4.65533,4.56794,4.47945,4.38996,4.29959,4.20843,4.11658,4.02416,3.93125,3.83796,3.74437,3.65057,3.55666,3.46272,3.36884,3.27509,3.18155,3.08831,2.99545,2.90303,2.81114,2.71984,2.62922,2.53933,2.45026,2.36207,2.27484,2.18862,2.10349,2.01951,1.93675,1.85528,1.77515,1.69644,1.61919,1.54348,1.46935,1.39685,1.32605,1.25698,1.18967,1.12417,1.06049,.99863,.93862,.88044,.82408,.76953,.71676,.66574,.61644,.56882,.52282,.47841,.43553,.39413,.35414,.31551,.27817,.24206,.20712,.17328,.14048,.10866,.07776,.04772,.01848,-.00999,-.03776,-.06487,-.09134,-.11721,-.14251,-.16725,-.19144,-.21509,-.2382,-.26076,-.28275,-.30416,-.32496,-.34511,-.36459,-.38334,-.40134,-.41852,-.43485,-.45026,-.46471,-.47815,-.49052,-.50179,-.51189,-.52081,-.52849,-.5349,-.54003,-.54383,-.54627,-.54734,-.54702,-.54528,-.54211,-.53752,-.53149,-.52403,-.51515,-.50487,-.4932,-.48015,-.46575,-.45001,-.43297,-.41463,-.39503,-.37419,-.35213,-.32887,-.30443,-.27885,-.25214,-.22432,-.19541,-.16544,-.13442,-.10235,-.06926,-.03514,0,.03616,.07336,.11159,.15088,.19125,.23272,.27531,.31906,.36401,.41019,.45764,.5064,.55651,.60802,.66096,.71538,.77129,.82874,.88776,.94836,1.01056,1.07438,1.13982,1.20687,1.27554,1.34581,1.41766,1.49107,1.56599,1.64239,1.72025,1.79951,1.88013,1.96209,2.04532,2.12979,2.21546,2.30226,2.39017,2.47911,2.56905,2.65991,2.75164,2.84416,2.93742,3.03133,3.12582,3.2208,3.31619,3.41191,3.50785,3.60393,3.70006,3.79612,3.89202,3.98765,4.08291,4.17767,4.27182,4.36525,4.45783,4.54944,4.63995],pressure:[.30942,.30838,.30765,.30724,.30715,.30738,.30795,.30884,.31007,.31164,.31354,.31578,.31837,.32129,.32455,.32815,.33209,.33636,.34097,.34591,.35117,.35675,.36265,.36887,.37539,.38221,.38933,.39674,.40442,.41238,.4206,.42907,.43779,.44675,.45593,.46533,.47493,.48473,.49471,.50486,.51517,.52563,.53623,.54694,.55777,.5687,.57971,.59079,.60194,.61313,.62435,.6356,.64686,.65811,.66935,.68056,.69174,.70286,.71391,.72489,.73579,.74659,.75728,.76785,.7783,.7886,.79876,.80877,.81861,.82827,.83776,.84706,.85617,.86507,.87378,.88227,.89056,.89863,.90649,.91412,.92153,.92872,.93568,.94241,.94892,.95519,.96122,.96702,.97258,.97791,.98299,.98783,.99242,.99677,.99911,.99525,.99164,.98827,.98515,.98228,.97966,.97728,.97514,.97324,.97159,.97017,.96898,.96801,.96727,.96674,.96641,.96629,.96635,.96661,.96703,.96762,.96838,.96928,.97032,.97149,.97279,.9742,.97572,.97734,.97905,.98085,.98273,.98468,.98669,.98877,.99091,.99311,.99535,.99765,1,.9976,.99516,.99267,.99014,.98755,.98491,.98222,.97947,.97666,.97378,.97083,.96781,.96471,.96153,.95826,.9549,.95144,.94787,.9442,.94042,.93651,.93249,.92834,.92407,.91966,.91512,.91045,.90564,.90069,.8956,.89037,.885,.87949,.87384,.86806,.86214,.85608,.84988,.84356,.83711,.83053,.82383,.81702,.81009,.80306,.79594,.78872,.78141,.77403,.76657,.75905,.75148,.74385,.73619,.72849,.72076,.71302,.70526,.69749,.68972,.68195,.67419,.66644,.65871,.65099,.64329,.63561,.62795,.62032,.61271,.60512,.59755,.59001,.58248,.57497,.56749,.56002,.55256,.54512,.5377,.5303,.52291,.51554,.50819,.50087,.49358,.48632,.4791,.47192,.4648,.45773,.45072,.44378,.43692,.43015,.42346,.41687,.41039,.40403,.39779,.39168,.38571,.37989,.37423,.36873,.36342,.35828,.35335,.34862,.34409,.3398,.33573,.3319,.32831,.32498,.32192,.31912,.3166,.31436,.31242,.31077]}]};function te(t){if(!Array.isArray(t))return se(t)?t.type:2;let e;for(const r of t){const o=r.type;if(se(r)){if(e==null)e=o;else if(e!==o)return 2}}return e??2}function re(t){let e=0;for(const{material:r}of t)if(xe(r)){if(r.color[3]*r.opacity<1)return 0;e=1}return e}function oe(t){let e=0;for(const{material:r}of t)if(xe(r)){switch(r.objectTransparency){case 0:return 0;case 1:if(r.opacity<1)return 0}e=1}return e}function xe(t){return t.size*t.color[3]*t.opacity>0}function se(t){return t.size*t.color[3]>0}function ne(t,e,r,o){for(let s=0;s<t.length;s++){const n=t[s].index,l=e[s],a=e[s+1];if(o)for(let i=l;i<a;i++){const d=o[i];r.set(d,n)}else for(let i=l;i<a;i++)r.set(i,n)}}const Zt=128;let _=class extends Je{constructor(t){super(t),this._updatingHandles=new Qe,this._objectEntries=new Map,this._pendingDeletions=new Map,this._renderers=new Map,this._gpuMemoryUsage=0,this._workerAbort=new AbortController,this._tmpModelPosition=k(),this._localOrigins=new jt(new et(t.renderSR));const e=bt.createBuffer(4);for(let r=0;r<4;r++)e.sideness.set(r,0,r===0||r===3?0:1),e.sideness.set(r,1,r===0||r===1?0:1);this._vertexBuffer=new N(t.rctx,yt,e.buffer)}initialize(){this._workerHandle=new Ot(this.schedule),this._componentColorManager=new tt(this.rctx,3)}destroy(){this.destroyed||(this._objectEntries.forEach(t=>this._discardObjectEntry(t)),this._objectEntries.clear(),this._pendingDeletions.forEach(t=>this._discardObjectEntry(t)),this._pendingDeletions.clear(),this._strokesTexture=ve(this._strokesTexture),this._componentColorManager=rt(this._componentColorManager),this._workerAbort.abort(),this._workerHandle.destroy(),this._vertexBuffer.dispose(),this._renderers.clear(),this._updatingHandles.destroy(),this._set("schedule",n9))}get updating(){return this._updatingHandles.updating}get usedMemory(){return this._gpuMemoryUsage}shouldRender(){return this._renderers.size>0}async addComponentObject(t,e,r,o,s,n,l){if(this.hasObject(t))return this._getObjectMemoryUsage(t);let a;const i=new ie(null,new Promise(u=>a=u),t.obb.center,t.obb.radius);this._objectEntries.set(t,i);const d=await this._updatingHandles.addPromise(this._addComponentGeometry(t.transform,i,e,r,o,s,n,l));return this.setNeedsRender(),a(),d}async addOrUpdateObject3D(t,e,r,o){if(this.destroyed)return void ot.getLogger(this).warn("Attempt to add an object to a destroyed instance");const s=new AbortController;let n;const l=t.boundingVolumeWorldSpace.bounds,a=new ie(s,new Promise(d=>n=d),st(l,k()),nt(l)),i=this._objectEntries.get(t);i&&(this._pendingDeletions.has(t)?this._discardObjectEntry(i):this._pendingDeletions.set(t,i)),this._objectEntries.set(t,a);try{const d=new Array;if(t.geometries.length>1&&Jt(t))d.push(this._addObjectMergedGeometries(t,a,e,r,o));else for(const u of t.geometries)u.material.supportsEdges&&d.push(this._addGeometry(t,a,u,e,r,o));await this._updatingHandles.addPromise(Promise.all(d)),this._removePendingDeletion(t)}catch(d){at(d)?this._discardObjectEntry(a):this._removePendingDeletion(t)}finally{this.setNeedsRender(),n()}}removeObject(t){const e=this._objectEntries.get(t);this._objectEntries.delete(t),this._discardObjectEntry(e),this._removePendingDeletion(t)}_removePendingDeletion(t){const e=this._pendingDeletions.get(t);this._pendingDeletions.delete(t),this._discardObjectEntry(e)}async _getObjectEntry(t){const e=this._objectEntries.get(t);if(!e)throw new Error("no object");return await e.loaded,e.loaded==null?null:e}fastUpdateObject3DEdgesTransform(t){if(this.destroyed)return!1;const e=this._objectEntries.get(t);if(!e)return!1;const{geometries:r}=t,{renderables:o}=e;if(r.length===0||o.length===0)return!0;if(o.length>1)return!1;const[s]=o,n=s.transform;if(!(n instanceof E))return!1;const[l]=r;if(l.localOrigin!==n.origin.origin)return!1;const a=D(),i=this._computeModelTransformWithLocalOrigin(t,l,a);return s.transform=new E(a,i),this.setNeedsRender(),!0}_discardObjectEntry(t){t&&(t.abort?.abort(),t.renderables.length&&(t.renderables.forEach(e=>this._removeRenderable(e)),this.setNeedsRender()),t.loaded=null)}hasObject(t){return this._objectEntries.has(t)}async updateAllComponentOpacities(t,e){const r=await this._updatingHandles.addPromise(this._getObjectEntry(t));if(r==null)return;const o=Array.isArray(e)?s=>e[s]:()=>e;r.renderables.forEach(s=>{const n=s.components.meta.length;for(let l=0;l<n;l++){const a=o(l),i=s.components.meta[l],d=i.index;i.material.opacity=a,s.components.buffer.textureBuffer.setDataElement(d,1,3,255*a)}this._updateTransparency(s)}),this.setNeedsRender()}async _getObjectMemoryUsage(t){const e=await this._getObjectEntry(t);return e?e.renderables.reduce((r,o)=>r+o.statistics.gpuMemoryUsage,0):0}async updateAllComponentMaterials(t,e,r,o){const s=t instanceof dt,n=te(e),l=j.getKey(n,r,s),a=await this._updatingHandles.addPromise(this._getObjectEntry(t));a!=null&&(a.renderables.forEach(i=>{if(l!==i.rendererKey){const d=this._renderers.get(i.rendererKey),u=this._acquireRenderer(n,r,s);d.removeRenderable(i),--d.refCount,i.rendererKey=l,u.addRenderable(i)}if(Array.isArray(e))for(let d=0;d<e.length;d++)i.components.meta[d].material=e[d];else i.components.meta[0].material=e;o&&I(i.components),this._updateTransparency(i)}),this.setNeedsRender())}async updateAllVerticalOffsets(t,e){const r=await this._updatingHandles.addPromise(this._getObjectEntry(t));r!=null&&this._updateAllVerticalOffsets(r,e)}_updateAllVerticalOffsets(t,e){t.renderables.forEach(r=>{const o=r.components.meta;for(let s=0;s<o.length;s++)r.components.meta[s].verticalOffset=e?.[s]??0;I(r.components)}),this.setNeedsRender()}async updateObjectVisibility(t,e){const r=await this._updatingHandles.addPromise(this._getObjectEntry(t));r&&(r.renderables.forEach(o=>o.visible=e),this.setNeedsRender())}render(t,e){if(this._componentColorManager==null)return;this._localOrigins.updateViewMatrices(t.camera.viewMatrix);const r=t.camera.viewInverseTransposeMatrix,o=k(),s=new he;let n=0,l=0;if(this._renderers.forEach(i=>{i.refCount!==0?(++this.techniques.precompiling,i.forEachRenderable(d=>{d.visible&&(n+=d.statistics.averageEdgeLength,l++,d.regular&&i.acquireTechnique(t,!1),d.silhouette&&i.acquireTechnique(t,!0))},e),--this.techniques.precompiling):this._renderers.delete(i.key)}),this._componentColorManager.garbageCollect(),this._componentColorManager.updateTextures(),l===0)return;const a=new $t(40*n/l,e);z(o,r[3],r[7],r[11]),s.set(o),G(a.transformWorldFromViewTH,s.high),G(a.transformWorldFromViewTL,s.low),ct(a.transformViewFromCameraRelativeRS,t.camera.viewMatrix),pe(de,a.transformViewFromCameraRelativeRS),ge(a.transformNormalViewFromGlobal,de),a.transformProjFromView=t.camera.projectionMatrix,this._updateObjectCameraDistances(t),this._renderers.forEach(i=>{t9(i,t,a),r9(i,t,a)})}_updateTransparency(t){const e=re(t.components.meta),r=oe(t.components.meta);e===t.edgeTransparency&&r===t.objectTransparency||(t.edgeTransparency=e,t.objectTransparency=r,this._renderers.get(t.rendererKey).setRenderablesDirty())}_computeModelTransformWithLocalOrigin(t,e,r){t.getCombinedShaderTransformation(e,r);const o=e.localOrigin!=null?this._localOrigins.register(e.localOrigin):this._localOrigins.acquire(z(this._tmpModelPosition,r[12],r[13],r[14]));return e.localOrigin=o.origin,Vt(o.origin.vec3,r),o}_createComponentBuffers(t){if(this._componentColorManager==null)return null;const e=new Array,r=this._componentColorManager.getBuffer(t.length);for(let s=0;s<t.length;s++){const n=t[s],l=r.acquireIndex();e.push({index:l,verticalOffset:0,material:n})}const o=new Qt(r,e);return I(o),o}_extractEdges(t,e,r,o,s,n,l=n.length){return l<Zt&&(s=!0),this._workerHandle.process({data:r,indices:n,indicesLength:l,writerSettings:e,skipDeduplicate:o},t,s)}_createRenderable(t,e,r,o,s){const n=d=>new e9(new ut(this.rctx,new Map([["vertices",this._vertexBuffer],["instances",d===0?new N(this.rctx,At,t.regular.instancesData.buffer):new N(this.rctx,Lt,t.silhouette.instancesData.buffer)]])),d===0?t.regular.lodInfo:t.silhouette.lodInfo),l=t.regular.lodInfo.lengths.length>0?n(0):null,a=t.silhouette.lodInfo.lengths.length>0?n(1):null,i=(l?.vao.usedMemory??0)+(a?.vao.usedMemory??0);return new U(l,a,{gpuMemoryUsage:i,externalMemoryUsage:s,averageEdgeLength:t.averageEdgeLength},r,re(e.meta),oe(e.meta),e,o)}async _addGeometry(t,e,r,o,s,n){if(r.edgeIndicesLength<=0)return;const l=r.attributes.get("position"),a=D(),i=this._computeModelTransformWithLocalOrigin(t,r,a),d=new le(l,a,i);return this._addPositionData(e,d,r.edgeIndicesLength,o,s,n)}async _addPositionData(t,e,r,o,s,n=!1){if(t.loaded==null)return;const l=this._createComponentBuffers([o]);if(l==null)return;const a=this._acquireRenderer(o.type,s,!0),{modelTransform:i,origin:d}=e,u=e.position.indices,m=e.position,f=m.data.length/m.size,w=Y.createBuffer(f);for(let p=0;p<f;p++)w.position.set(p,0,m.data[p*m.size]),w.position.set(p,1,m.data[p*m.size+1]),w.position.set(p,2,m.data[p*m.size+2]);ne(l.meta,[0,w.componentIndex.count],w.componentIndex);const P=await this._updatingHandles.addPromise(this._extractEdges(t.abort?.signal||this._workerAbort.signal,a.writerSettings,w,!1,n,u,r));if(t.loaded==null)return;const g=this._createRenderable(P,l,new E(i,d),a.key,!1);t.renderables.push(g),a.addRenderable(g),this._gpuMemoryUsage+=g.statistics.gpuMemoryUsage}async _addComponentGeometry(t,e,r,o,s,n,l,a){if(e.loaded==null)return 0;const i=this._createComponentBuffers(n);if(i==null)return 0;const d=te(n),u=this._acquireRenderer(d,l||!1,!1),m=Y.createBuffer(r.length/3);it(m.position.typedBuffer,r,m.position.typedBufferStride,3),ne(i.meta,s,m.componentIndex,o);const f=!0,w=u.writerSettings,P=await this._updatingHandles.addPromise(this._extractEdges(this._workerAbort.signal,w,m,f,!1,o));if(e.loaded==null)return 0;const g=this._createRenderable(P,i,t,u.key,!0);return e.renderables.push(g),u.addRenderable(g),this._updateAllVerticalOffsets(e,a),g.statistics.gpuMemoryUsage}async _addObjectMergedGeometries(t,e,r,o,s){const n=new Map;let l=0,a=0,i=null;const d=t.geometries.filter(h=>{if(h.edgeIndicesLength<=0||!h.material.supportsEdges)return!1;!i&&h.localOrigin&&(i=h);const x=h.positionAttribute;return a+=x.data.length/x.size,l+=h.edgeIndicesLength,!0});if(d.length===0)return;const u=a>=65536?Uint32Array:Uint16Array,m=l?new u(l):null,f=[];let w=0;d.forEach(h=>{const x=h.attributes.get("position"),R=x.indices;let S=n.get(x.data);if(S==null){S=f.length/3;for(let b=0;b<x.data.length;b+=x.size)f.push(x.data[b]),f.push(x.data[b+1]),f.push(x.data[b+2]);n.set(x.data,S)}for(let b=0;b<h.edgeIndicesLength;b++)m[w++]=S+R[b]});const P=i||t.geometries[0],g=D(),p=this._computeModelTransformWithLocalOrigin(t,P,g);for(let h=0;h<t.geometries.length;h++)t.geometries[h].localOrigin=p.origin;const O=new le(new lt(f,m,3),g,p);await this._updatingHandles.addPromise(this._addPositionData(e,O,m.length,r,o,s))}_acquireRenderer(t,e,r){const o=j.getKey(t,e,r);let s=this._renderers.get(o);return this._strokesTexture==null&&(this._strokesTexture=Gt(this.rctx)),s||(s=new j(this.rctx,this.techniques,{type:t,hasSlicePlane:e,strokesTexture:this._strokesTexture,legacy:r,spherical:this.viewingMode===1}),this._renderers.set(o,s)),++s.refCount,s}_removeRenderable(t){ae(t.regular),ae(t.silhouette);const e=this._renderers.get(t.rendererKey);if(e){e.removeRenderable(t),--e.refCount,this._localOrigins.release(t.transform.origin),this._gpuMemoryUsage-=t.statistics.externalMemoryUsage?0:t.statistics.gpuMemoryUsage;for(const r of t.components.meta)t.components.buffer.releaseIndex(r.index)}}_updateObjectCameraDistances(t){const e=t.camera.eye,r=t.camera.viewForward,o=k(),s=n=>{ft(o,n.center,e);const l=mt(o,r),a=n.radius,i=l<-a?1/0:l<a?0:l-a;n.renderables.forEach(d=>d.distanceToCamera=i)};this._objectEntries.forEach(s),this._pendingDeletions.forEach(s)}get test(){}};function ae(t){t?.vao&&(t.vao.buffer("instances")?.dispose(),t.vao.disposeVAOOnly(),t.vao=null)}function Jt(t){let e=null,r=null;for(const o of t.geometries)if(o.material.supportsEdges){if(e){if(!gt(e,o.transformation))return!1}else e=o.transformation;if(r||o.localOrigin==null){if(r?.localOrigin!=null&&o.localOrigin!=null&&r.localOrigin.id!==o.localOrigin.id)return!1}else r=o}return!0}v([y({constructOnly:!0})],_.prototype,"rctx",void 0),v([y({constructOnly:!0})],_.prototype,"renderSR",void 0),v([y({constructOnly:!0})],_.prototype,"viewingMode",void 0),v([y({constructOnly:!0})],_.prototype,"techniques",void 0),v([y({constructOnly:!0})],_.prototype,"setNeedsRender",void 0),v([y({constructOnly:!0})],_.prototype,"schedule",void 0),v([y({readOnly:!0})],_.prototype,"_updatingHandles",void 0),v([y({readOnly:!0})],_.prototype,"updating",null),_=v([xt("esri.views.3d.webgl-engine.lib.edgeRendering.EdgeView")],_);class ie{constructor(e,r,o,s){this.abort=e,this.radius=s,this.renderables=new Array;const n=e?ht(e.signal,()=>e.abort()):null;this.loaded=r,this.loaded.then(()=>{this.loaded!=null&&(this.loaded=!0),this.abort=null,n?.remove()}),this.center=pt(o)}}class Qt{constructor(e,r){this.buffer=e,this.meta=r}}class e9{constructor(e,r){this.vao=e,this.lod=r}}class E{constructor(e,r){this.modelMatrix=e,this.origin=r}}class U{constructor(e,r,o,s,n,l,a,i){this.regular=e,this.silhouette=r,this.statistics=o,this.transform=s,this.edgeTransparency=n,this.objectTransparency=l,this.components=a,this.rendererKey=i,this.distanceToCamera=0,this.visible=!0}}class b9 extends U{}function I(t){const{meta:e,buffer:r}=t,o=new Uint8Array(4);for(let s=0;s<e.length;s++){const n=e[s].material,l=e[s].index,a=X(Math.round(n.size*qt),0,255),i=X(n.extensionLength,-F,255-F)+F,d=255*n.opacity,u=n.color,m=255*u[0],f=255*u[1],w=255*u[2],P=255*u[3];r.textureBuffer.setData(l,0,m,f,w,P),r.textureBuffer.setData(l,1,a,i,n.type,d),vt(e[s].verticalOffset,o),r.textureBuffer.setData(l,2,o[0],o[1],o[2],o[3])}}function t9(t,e,r){let o,s;const n=r.transparency,l=e.camera.perScreenPixelRatio;t.forEachRenderable(a=>{if(!o9(a)||!a.visible)return;o??=t.acquireTechnique(e,!1),s??=t.rctx.bindTechnique(o,e,r);const i=Pe(a.regular.lod.lengths,a.distanceToCamera,l);t.renderRegularEdges(s,a,r,e,i)},n)}function r9(t,e,r){let o,s;const n=r.transparency,l=e.camera.perScreenPixelRatio;t.forEachRenderable(a=>{if(!s9(a)||!a.visible)return;o??=t.acquireTechnique(e,!0),s??=t.rctx.bindTechnique(o,e,r);const i=Pe(a.silhouette.lod.lengths,a.distanceToCamera,l);t.renderSilhouetteEdges(s,a,r,e,i)},n)}function o9(t){return t.regular!=null}class y9 extends U{}function s9(t){return t.silhouette!=null}function Pe(t,e,r){const o=e*r,s=wt(t,o,!0);return s===-1?o<t[0]?t.length:0:t.length-s}class le{constructor(e,r,o){this.position=e,this.modelTransform=r,this.origin=o}}const de=C(),n9=()=>Promise.reject(),a9=Object.freeze(Object.defineProperty({__proto__:null,build:we},Symbol.toStringTag,{value:"Module"}));export{_ as EdgeView,E as LegacyTransform,b9 as RegularRenderable,U as Renderable,y9 as SilhouetteRenderable};
