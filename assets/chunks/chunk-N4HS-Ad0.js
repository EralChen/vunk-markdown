import{_ as M}from"./chunk-DsYbGKja.js";import{de as Le,pe as Ue,g8 as je,gU as Ae,gb as $e,gc as ze,gV as Ie,xZ as We,Lb as ie,pH as Ne,fJ as Ze,nr as Ke,I8 as w,IS as ne,gW as Je,o2 as he,I9 as re,Lc as de,Ks as Xe,I7 as K,Jp as Qe,Ii as pe,Ld as fe,Jn as me,KT as Ye,Id as et,Ij as tt,Kn as Me,I$ as te,Ik as L,Il as U,Ku as j,Im as W,Js as qe,Io as oe,Le as at,KJ as Ge,KV as st,Iv as _e,Kv as it,b0 as z,c_ as nt,KQ as ve,bm as rt,aF as ae,Kg as J,lb as ot,mp as ge,cu as lt,ct as xe,d2 as ct,b2 as X,cA as ut,BF as ht,d4 as ye,mZ as dt,Ju as pt,Ak as ft,nn as mt,Lf as _t,bZ as vt,n2 as gt,Lg as xt,am as Oe,gA as yt,rV as wt,aL as bt,rX as Pt,F as St,iX as we,sb as Ct,dd as Tt,rW as Dt,bB as At,B1 as $t,S as zt,T as It,Lh as Mt,bV as qt,q2 as Gt,nt as Ot,df as kt,ak as Q}from"./chunk-DbiObNSB.js";import{_ as Ft}from"./chunk-DfTxgNeo.js";import{l as Rt}from"./chunk-DaTx8i7d.js";import{_ as N}from"./chunk-BBnM6NiO.js";/* empty css              */let Bt=class extends Le{constructor(e,t,s,n){super(e,0,0,0,t),this.cachedNodes=s,this.memoryMBCached=n}};const T=4096,ke=16,k=1023,F=k+1,Et=T*ke/F,H=4,Fe=F*H,be=k*H;let Ht=class{constructor(e=Et){this._pageCount=e;const t=Math.ceil(e/32);this._bitset=new Uint32Array(t)}get pageCount(){return this._pageCount}isAllocated(e){const t=e/32|0,s=e%32;return!!(this._bitset[t]&1<<s)}allocate(e){const t=e/32|0,s=e%32;this._bitset[t]|=1<<s}free(e){const t=e/32|0,s=e%32;this._bitset[t]&=~(1<<s)}findFirstFreePage(){for(let e=0;e<this._bitset.length;e++)if(this._bitset[e]!==4294967295)for(let t=0;t<32;t++){const s=32*e+t;if(s>=this._pageCount)break;if(!(this._bitset[e]&1<<t))return s}return null}resize(e){this._pageCount=e;const t=Math.ceil(e/32),s=this._bitset.length;if(t!==s){const n=new Uint32Array(t),i=Math.min(s,t);n.set(this._bitset.subarray(0,i)),this._bitset=n}this._clearExcessBits(this._bitset,e)}_clearExcessBits(e,t){const s=Math.floor((t-1)/32),n=(t-1)%32;if(t>0&&n<31){const i=(1<<n+1)-1;e[s]&=i}s+1<e.length&&e.fill(0,s+1)}};class Vt{constructor(e,t,s,n,i,p,u){this.handle=e,this.obb=t,this.gaussianAtlasIndices=s,this.pageIds=n,this.positions=i,this.squaredScales=p,this.maxScale=u,this.isVisible=!1,this.usedMemory=Ue(this.gaussianAtlasIndices,this.positions,this.squaredScales)+this.pageIds.length*Fe*4}}class Lt extends je{constructor(e){super("GaussianSplatSortWorker","sort",{sort:t=>[t.distances.buffer,t.sortOrderIndices.buffer]},e,{strategy:"dedicated"})}sort(e,t){return this.invokeMethod("sort",e,t)}async destroyWorkerAndSelf(){await this.broadcast({},"destroy"),this.destroy()}}let Ut=class{constructor(e){this.texture=null,this._orderTextureCapacity=0,this._rctx=e}ensureCapacity(e){if(this._orderTextureCapacity<e){this.texture?.dispose();const t=Math.ceil(e*ie),s=this._evalTextureSize(t),n=s[0]*s[1];this._orderBuffer=new Uint32Array(n);const i=new Ae;i.height=s[0],i.width=s[1],i.pixelFormat=36244,i.dataType=$e.UNSIGNED_INT,i.internalFormat=ze.R32UI,i.wrapMode=33071,i.samplingMode=9728,this.texture=new Ie(this._rctx,i),this._orderTextureCapacity=n}}setData(e,t){this.ensureCapacity(t),this._orderBuffer?.set(e),this.texture?.setData(this._orderBuffer)}clear(){this._orderTextureCapacity=0,this.texture?.dispose(),this.texture=null}destroy(){this.texture?.dispose()}_evalTextureSize(e){const t=Math.ceil(Math.sqrt(e)),s=Math.ceil(e/t);return We(t,s)}},jt=class{constructor(e,t,s){this._splatAtlasTextureHeight=ke,this.texture=null,this._rctx=e,this._fboCache=s,this.pageAllocator=new Ht,this._cache=t.newCache("gaussian texture cache",n=>n.dispose())}ensureTextureAtlas(){if(this.texture)return;const e=this._cache.pop("splatTextureAtlas");if(e)return void(this.texture=e);const t=new Ae;t.height=this._splatAtlasTextureHeight,t.width=T,t.pixelFormat=36249,t.dataType=$e.UNSIGNED_INT,t.internalFormat=ze.RGBA32UI,t.samplingMode=9728,t.wrapMode=33071,this.texture=new Ie(this._rctx,t),this._updatePageAllocator()}grow(){if(!this.texture)return this.ensureTextureAtlas(),!1;const e=Math.floor(this._splatAtlasTextureHeight*ie);if(e*T>this._rctx.parameters.maxPreferredTexturePixels)return!1;const t=new Ne(this._rctx,this.texture),s=this._fboCache.acquire(T,e,"gaussian splat atlas resize",11);return this._rctx.blitFramebuffer(t,s.fbo,16384,9728,0,0,T,this._splatAtlasTextureHeight,0,0,T,this._splatAtlasTextureHeight),this.texture?.dispose(),this.texture=s.fbo?.detachColorTexture(),t.dispose(),s.dispose(),this._splatAtlasTextureHeight=e,this._updatePageAllocator(),!0}requestPage(){let e=this.pageAllocator.findFirstFreePage();return e===null&&this.grow()&&(e=this.pageAllocator.findFirstFreePage()),e!==null&&this.pageAllocator.allocate(e),e}freePage(e){this.pageAllocator.free(e)}update(e,t,s){this.ensureTextureAtlas(),this.texture.updateData(0,e,t,F,1,s)}_updatePageAllocator(){const e=T*this._splatAtlasTextureHeight/F;this.pageAllocator.pageCount!==e&&this.pageAllocator.resize(e)}clear(){this.texture&&(this._cache.put("splatTextureAtlas",this.texture),this.texture=null)}destroy(){this._cache.destroy(),this.texture?.dispose()}},Wt=class{constructor(e){this._updating=Ze(!1),this.visibleGaussians=0,this._visibleGaussianTiles=new Array,this._workerHandle=null,this._isSorting=!1,this._pendingSortTask=!1,this._bufferCapacity=0,this._renderer=e,this._orderTexture=new Ut(this._renderer.renderingContext),this._textureAtlas=new jt(this._renderer.renderingContext,this._renderer.view.resourceController.memoryController,this._renderer.fboCache);const{resourceController:t}=this._renderer.view;this._workerHandle=new Lt(Ke(t))}get textureAtlas(){return this._textureAtlas}get orderTexture(){return this._orderTexture}get visibleGaussianTiles(){return this._visibleGaussianTiles}updateGaussianVisibility(e){this._visibleGaussianTiles=e,this.requestSort()}isUpdating(){return this._updating.value}destroy(){this._pendingSortTask=!1,this._workerHandle?.destroyWorkerAndSelf(),this._textureAtlas.destroy(),this._orderTexture.destroy()}requestSort(){this._updating.value=!0,this._isSorting?this._pendingSortTask=!0:(this._isSorting=!0,this._pendingSortTask=!1,this._sortOnWorker().then(()=>this._handleSortComplete()).catch(()=>this._handleSortComplete()))}_handleSortComplete(){this._isSorting=!1,this._pendingSortTask?this.requestSort():this._updating.value=!1}_clearBuffersAndTextures(){this._bufferCapacity=0,this._orderTexture.clear(),this._textureAtlas.clear()}_ensureBufferCapacity(e){if(this._bufferCapacity<e){const t=Math.ceil(e*ie);this._atlasIndicesBuffer=new Uint32Array(t),this._sortedAtlasIndicesBuffer=new Uint32Array(t),this._distancesBuffer=new Float64Array(t),this._sortOrderBuffer=new Uint32Array(t),this._bufferCapacity=t}}async _sortOnWorker(){let e=0;if(this._visibleGaussianTiles.forEach(r=>e+=r.gaussianAtlasIndices.length),e===0)return this.visibleGaussians=0,this._clearBuffersAndTextures(),void this._renderer.requestRender(1);this._ensureBufferCapacity(e),this._textureAtlas.ensureTextureAtlas();const t=this._renderer.camera.eye,s=t[0],n=t[1],i=t[2],p=this._atlasIndicesBuffer.subarray(0,e);let u=0;this._visibleGaussianTiles.forEach(r=>{const c=r.gaussianAtlasIndices,h=r.positions;for(let o=0;o<c.length;o++){p[u]=c[o];const x=3*o,g=h[x],l=h[x+1],d=h[x+2],_=g-s,v=l-n,b=d-i;this._distancesBuffer[u]=_*_+v*v+b*b,u++}});for(let r=0;r<e;r++)this._sortOrderBuffer[r]=r;const f={distances:this._distancesBuffer,sortOrderIndices:this._sortOrderBuffer,numGaussians:e,preciseSort:!1};await this._workerHandle?.sort(f).then(r=>{this._distancesBuffer=r.distances,this._sortOrderBuffer=r.sortedOrderIndices;const c=this._sortedAtlasIndicesBuffer.subarray(0,e);for(let o=0;o<e;o++)c[o]=p[r.sortedOrderIndices[o]];this._orderTexture.setData(c,e);const h=this._renderer.view.qualitySettings.gaussianSplat.maxAllowedVisibleGaussians;this.visibleGaussians=Math.min(e,h),this._renderer.requestRender(1)})}};function Nt(a){a.code.add(w`void computeCovariance3D(in mat3 rotation, in vec3 scale, out vec3 covarianceA, out vec3 covarianceB) {
mat3 scaleMatrix = mat3(
vec3(scale.x, 0.0, 0.0),
vec3(0.0, scale.y, 0.0),
vec3(0.0, 0.0, scale.z)
);
mat3 M = scaleMatrix * rotation;
mat3 covariance3D = transpose(M) * M;
covarianceA = vec3(covariance3D[0][0], covariance3D[0][1], covariance3D[0][2]);
covarianceB = vec3(covariance3D[1][1], covariance3D[1][2], covariance3D[2][2]);
}
vec3 computeCovariance2D(vec3 center, float focalLength, vec2 tanFov, float[6] cov3D, mat4 view) {
vec4 viewSpacePoint = vec4(center, 1);
vec2 max = 1.3 * tanFov;
vec2 normalized = viewSpacePoint.xy / viewSpacePoint.z;
viewSpacePoint.xy = clamp(normalized, -max, max) * viewSpacePoint.z;
float invZ = 1.0 / viewSpacePoint.z;
float invZSquared = invZ * invZ;
mat3 projectionJacobian = mat3(
focalLength * invZ,  0.0,                   -(focalLength * viewSpacePoint.x) * invZSquared,
0.0,                 focalLength * invZ,    -(focalLength * viewSpacePoint.y) * invZSquared,
0.0,                 0.0,                   0.0
);
mat3 worldToView = transpose(mat3(view));
mat3 T = worldToView * projectionJacobian;
mat3 covariance3D = mat3(
cov3D[0], cov3D[1], cov3D[2],
cov3D[1], cov3D[3], cov3D[4],
cov3D[2], cov3D[4], cov3D[5]
);
mat3 covariance2D = transpose(T) * transpose(covariance3D) * T;
const float regularization = 0.3;
covariance2D[0][0] += regularization;
covariance2D[1][1] += regularization;
return vec3(covariance2D[0][0], covariance2D[0][1], covariance2D[1][1]);
}`)}function Zt(a){a.code.add(w`vec4 unpackColor(uvec4 packedGaussian) {
vec4 color;
color.r = float((packedGaussian.w >> 1u) & 0xfeu);
color.g = float((packedGaussian.w >> 9u) & 0xffu);
color.b = float((packedGaussian.w >> 16u) & 0xfeu);
color.a = float((packedGaussian.w >> 24u) & 0xffu);
return color / 255.0;
}`),a.code.add(w`vec3 unpackScale(uvec4 packedGaussian) {
uint sx = (packedGaussian.z >> 10u) & 0xffu;
uint sy = (packedGaussian.z >> 18u) & 0xffu;
uint szLow = (packedGaussian.z >> 26u) & 0x3fu;
uint szHigh = packedGaussian.a & 0x3u;
uint sz = szLow | (szHigh << 6u);
return exp(vec3(sx, sy, sz) / 16.0 - 10.0);
}`),a.code.add(w`const uint MASK_9_BITS = 0x1FFu;
const float SQRT_HALF = 0.7071067811865476;
const ivec3 COMPONENT_ORDER[4] = ivec3[4](
ivec3(3, 2, 1),
ivec3(3, 2, 0),
ivec3(3, 1, 0),
ivec3(2, 1, 0)
);
vec4 unpackQuaternion(uvec4 packedGaussian) {
uint packedRotation = packedGaussian.x;
uint largestComponent = packedRotation >> 30u;
vec4 quaternion = vec4(0.0);
float sumSquares = 0.0;
uint bitfield = packedRotation;
for (int j = 0; j < 3; ++j) {
int index = COMPONENT_ORDER[int(largestComponent)][j];
uint magnitude = bitfield & MASK_9_BITS;
uint signBit = (bitfield >> 9u) & 1u;
bitfield = bitfield >> 10u;
float value = SQRT_HALF * float(magnitude) / float(MASK_9_BITS);
quaternion[index] = signBit == 1u ? -value : value;
sumSquares += value * value;
}
quaternion[int(largestComponent)] = sqrt(1.0 - sumSquares);
return quaternion;
}`),a.code.add(w`vec3 unpackTileOriginRelativePosition(uvec4 packedGaussian) {
uint packedPositionLow = packedGaussian.y;
uint packedPositionHigh = packedGaussian.z;
uint x = packedPositionLow & 0x3FFFu;
uint y = (packedPositionLow >> 14u) & 0x3FFFu;
uint zLow = (packedPositionLow >> 28u) & 0xFu;
uint zHigh = packedPositionHigh & 0x3FFu;
uint z = zLow | (zHigh << 4u);
return vec3(float(x), float(y), float(z));
}`),a.code.add(w`vec3 unpackCameraRelativeGaussianPosition(uvec4 packedHeader, highp vec3 position, vec3 cameraPosition, vec3 cameraPos8k, vec3 cameraDelta) {
vec3 tileOrigin = uintBitsToFloat(packedHeader.xyz);
float invPosScale = 1.0 / exp2(float(packedHeader.w & 0xffu));
vec3 delta = tileOrigin.xyz - cameraPos8k;
vec3 cameraRelativePosition = position.xyz * invPosScale + delta * 2.048 - cameraDelta;
return cameraRelativePosition;
}`)}function Kt(a){a.code.add(w`mat3 quaternionToRotationMatrix(vec4 q) {
float x2 = q.x + q.x;
float y2 = q.y + q.y;
float z2 = q.z + q.z;
float xx = x2 * q.x;
float yy = y2 * q.y;
float zz = z2 * q.z;
float xy = x2 * q.y;
float xz = x2 * q.z;
float yz = y2 * q.z;
float wx = x2 * q.w;
float wy = y2 * q.w;
float wz = z2 * q.w;
return mat3(
1.0 - (yy + zz), xy - wz, xz + wy,
xy + wz, 1.0 - (xx + zz), yz - wx,
xz - wy, yz + wx, 1.0 - (xx + yy)
);
}`)}class le extends ne{constructor(){super(...arguments),this.totalGaussians=-1,this.focalLength=-1,this.minSplatRadius=-1,this.minSplatOpacity=-1,this.tanFov=Je,this.cameraDelta=he,this.cameraPos8k=he}}function Re(a){const e=new re;e.varyings.add("vColor","vec4"),e.varyings.add("conicOpacity","vec4"),e.varyings.add("depth","float"),e.varyings.add("gaussianCenterScreenPos","vec2"),e.varyings.add("fragScreenPos","vec2"),e.outputs.add("fragColor","vec4",0),e.vertex.uniforms.add(new de("splatOrderTexture",s=>s.splatOrder),new de("splatAtlasTexture",s=>s.splatAtlas),new Xe("numSplats",s=>s.totalGaussians),new K("focalLength",s=>s.focalLength),new K("minSplatRadius",s=>s.minSplatRadius),new K("minSplatOpacity",s=>s.minSplatOpacity),new Qe("tanFov",s=>s.tanFov),new pe("cameraDelta",s=>s.cameraDelta),new pe("cameraPos8k",s=>s.cameraPos8k),new fe("fullWidth",({camera:s})=>s.viewport[2]),new fe("fullHeight",({camera:s})=>s.viewport[3]),new me("proj",s=>s.camera.projectionMatrix),new me("view",s=>s.camera.viewMatrix),new Ye("cameraPosition",s=>s.camera.eye)),e.vertex.include(Zt),e.vertex.include(Kt),e.vertex.include(Nt),e.include(et,a),e.vertex.code.add(w`float ndcToPixel(float ndcCoord, float screenSize) {
return ((ndcCoord + 1.0) * screenSize - 1.0) * 0.5;
}`),e.vertex.main.add(`
    uint instanceID = uint(gl_InstanceID);

    // Transform the instanceID into 2D coordinates
    uint orderTextureWidth = uint(textureSize(splatOrderTexture, 0).x);
    uint x = instanceID % orderTextureWidth;
    uint y = instanceID / orderTextureWidth;

    // Fetch the index of the remaining frontmost Gaussian
    uint gaussianIndex = texelFetch(splatOrderTexture, ivec2(x, y), 0).r;

    uint splatAtlasSize = uint(textureSize(splatAtlasTexture, 0).x);

    // Fetch the packed Gaussian according to the index
    uint gaussianIndexX = gaussianIndex % uint(splatAtlasSize);
    uint gaussianIndexY = gaussianIndex / uint(splatAtlasSize);
    uvec4 packedGaussian = texelFetch(splatAtlasTexture, ivec2(gaussianIndexX, gaussianIndexY), 0);

    // Fetch the header associated with the packed Gaussian (contains tile origin and number of fractional bits)
    uint pageNum = gaussianIndex / 1024u;
    uint headerIndex = (pageNum + 1u) * 1024u - 1u;
    uint headerIndexX = headerIndex % uint(splatAtlasSize);
    uint headerIndexY = headerIndex / uint(splatAtlasSize);
    uvec4 packedHeader = texelFetch(splatAtlasTexture, ivec2(headerIndexX, headerIndexY), 0);

    // Unpack the Gaussian
    vColor = unpackColor(packedGaussian);
    // Ignore gaussians with very small contribution, with tolerance based on the quality profile
    if(vColor.a < minSplatOpacity) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    vec3 scale = unpackScale(packedGaussian); 
    vec4 quaternion = unpackQuaternion(packedGaussian);
    mat3 rotation = quaternionToRotationMatrix(quaternion);
    vec3 tileOriginRelativePosition = unpackTileOriginRelativePosition(packedGaussian);

    vec3 cameraRelativePosition = unpackCameraRelativeGaussianPosition(packedHeader, tileOriginRelativePosition, cameraPosition, cameraPos8k, cameraDelta);

    vec4 viewPos = vec4(mat3(view) * cameraRelativePosition, 1);

    if (viewPos.z > 1.0) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }

    forwardViewPosDepth(viewPos.xyz);

    vec3 covarianceA;
    vec3 covarianceB;
    computeCovariance3D(rotation, scale.xyz, covarianceA, covarianceB);

    float covariance3D[6] = float[6](covarianceA.x, covarianceA.y, covarianceA.z, covarianceB.x, covarianceB.y, covarianceB.z);

    vec3 covariance2D = computeCovariance2D(viewPos.xyz, focalLength, tanFov, covariance3D, view);
    
    // Invert covariance (EWA algorithm)
    float determinant = (covariance2D.x * covariance2D.z - covariance2D.y * covariance2D.y);
    if (determinant == 0.) {
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
      return;
    }
    float invDeterminant = 1. / determinant;
    

    vec4 projPos = proj * viewPos;
    float invW = 1. / (projPos.w + 1e-7);
    vec3 ndcPos = projPos.xyz * invW;

    // Compute extent in screen space (by finding the eigenvalues of the 2D covariance matrix). 
    // Use the extent to compute the bounding rectangle of the Gaussian in screen space.
    float mid = 0.5 * (covariance2D.x + covariance2D.z);
    float lambda1 = mid + sqrt(max(0.1, mid * mid - determinant));
    float lambda2 = mid - sqrt(max(0.1, mid * mid - determinant));
    float radius = ceil(3. * sqrt(max(lambda1, lambda2)));
    gaussianCenterScreenPos = vec2(ndcToPixel(ndcPos.x, float(fullWidth)), ndcToPixel(ndcPos.y, float(fullHeight)));

    // Ignore gaussians with very small contribution, with tolerance based on the quality profile
    if(minSplatRadius > 0.0) {
      float effectiveSize = radius * vColor.a;
      if(effectiveSize < minSplatRadius) {
        gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
        return;
      }
    }

    // This maps vertex IDs 0, 1, 2, 3 to (-1,-1), (1,-1), (-1,1), (1,1)
    vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) - 1.0;

    // Vertex (corner) position in screen space
    fragScreenPos = gaussianCenterScreenPos + radius * corner;

    // We use a conic function to derive the opacity
    vec3 conic = vec3(covariance2D.z, -covariance2D.y, covariance2D.x) * invDeterminant;
    conicOpacity = vec4(conic, vColor.a);

    depth = ndcPos.z;
    
    // Convert from screen-space to clip-space
    vec2 clipPos = fragScreenPos / vec2(fullWidth, fullHeight) * 2. - 1.;

    gl_Position = vec4(clipPos, depth, 1.0);

  `);const t=a.depthPass;return e.fragment.main.add(`
    discardByTerrainDepth();
    vec2 offsetFromCenter = gaussianCenterScreenPos - fragScreenPos;

    // Evaluate the 2D elliptical Gaussian exponent using the general conic form: Ax^2+2Bxy+Cy^2
    float x = offsetFromCenter.x;
    float y = offsetFromCenter.y;
    float A = conicOpacity.x;
    float B = conicOpacity.y;
    float C = conicOpacity.z;
    float opacityScale = conicOpacity.w;
    float gaussianExponent = -0.5 * (A * x * x + 2.0 * B * x * y + C * y * y);

    // A positive exponent indicates alpha > 1, this should not happen
    if (gaussianExponent > 0.0) {
      discard;
    }

    float gaussianFalloff = exp(gaussianExponent);
    
      // cap at 0.99 to avoid blending issues, such as seams between overlapping Gaussians
    float alpha = min(.99f, opacityScale * gaussianFalloff);

    // discard low alpha fragments since their contribution would not be visible
    if (alpha < 1./255.) {
        discard;
    }

    // We cannot write color and depth in the same pass, as they require different blend modes.
    // Regular depth writing based on first hit is not precise enough due to the inherently 
    // transparent nature of Gaussian Splats (especially at the borders of the Splat).
    // We thus use a blended depth that computes a non-linear average using 
    // the splat order and opacity with geometric decay.
    // This means the depth is averaged based on the order and opacity of the Gaussians,
    // with the frontmost Gaussians contributing the most.
    ${tt(t,"fragColor = vec4(depth, 0, 0, alpha);","fragColor = vec4(vColor.rgb * alpha, alpha);")}
  `),e}const Be=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatPassParameters:le,build:Re},Symbol.toStringTag,{value:"Module"}));let ce=class extends ne{};function Ee(){const a=new re;return a.include(Me),a.fragment.uniforms.add(new te("colorTexture",e=>e.color),new te("splatOutputColor",e=>e.splatColor)),a.fragment.main.add(w`vec4 color = texture(colorTexture, uv);
vec4 splatColor = texture(splatOutputColor, uv);
fragColor = splatColor + color * (1.0 - splatColor.a);`),a}const Jt=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:ce,build:Ee},Symbol.toStringTag,{value:"Module"}));let Pe=class extends L{constructor(e,t){super(e,t,new U(Jt,()=>N(()=>Promise.resolve().then(()=>Qt),void 0)),j)}initializePipeline(){return W({colorWrite:oe,depthTest:null,depthWrite:qe})}},ue=class extends ne{};function He(){const a=new re;return a.include(Me),a.fragment.uniforms.add(new te("splatOutputDepth",e=>e.splatDepth)),a.fragment.main.add(w`vec4 splatDepth = texture(splatOutputDepth, uv);
float ndcDepth = splatDepth.x;
float depthCutOff = 0.75;
if(splatDepth.a < depthCutOff) {
discard;
}
gl_FragDepth = (ndcDepth + 1.0) * 0.5;`),a}const Xt=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:ue,build:He},Symbol.toStringTag,{value:"Module"}));let Se=class extends L{constructor(e,t){super(e,t,new U(Xt,()=>N(()=>Promise.resolve().then(()=>Yt),void 0)),j)}initializePipeline(){return W({colorWrite:null,depthTest:{func:515},depthWrite:qe,drawBuffers:{buffers:[at]}})}},Ce=class extends L{constructor(e,t){super(e,t,new U(Be,()=>N(()=>Promise.resolve().then(()=>Ve),void 0)),j)}_createPipeline(){return W({blending:Ge(773,773,772,1,32774,32774),depthTest:{func:513},colorWrite:oe})}initializePipeline(){return this._createPipeline()}};class Te extends L{constructor(e,t){super(e,t,new U(Be,()=>N(()=>Promise.resolve().then(()=>Ve),void 0)),j)}_createPipeline(){return W({blending:Ge(773,773,1,1,32774,32774),depthTest:{func:515},colorWrite:oe})}initializePipeline(){return this._createPipeline()}}class V extends st{constructor(e=!1){super(),this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.occlusionPass=!1,this.depthPass=e}}M([_e()],V.prototype,"terrainDepthTest",void 0),M([_e()],V.prototype,"cullAboveTerrain",void 0);var E;let se=class extends it{constructor(){super(...arguments),this.gaussianPosition=z(),this.intersectionRayDir=z(),this.intersectionPlane=nt(),this._slicePlaneEnabled=!1,this._data=null,this.produces=ve.OPAQUE,this.type=0,this.isGround=!1,this.layerViewUid="",this._gaussianSplatParameters=new le,this._gaussianSplatCompositionParameters=new ce,this._gaussianSplatDepthCompositionParameters=new ue,this._splatTechniqueConfiguration=new V,this._splatDepthTechniqueConfiguration=new V(!0),this._previousCameraPosition=z(),this._previousCameraDirection=z(),this._tanFov=rt(),this._tempVec=z(),this._cameraDelta=z(),this._coarseCameraPosition=z()}static{E=this}async initialize(){this._data=new Wt(this),this.view.sceneIntersectionHelper.addIntersectionHandler(this),this.addHandles([ae(()=>this.view.state.camera,()=>this._onCameraChange())])}precompile(){this._splatTechniqueConfiguration.terrainDepthTest=this.bindParameters.terrainDepthTest,this.techniques.precompile(Te,this._splatTechniqueConfiguration),this._splatDepthTechniqueConfiguration.terrainDepthTest=this.bindParameters.terrainDepthTest,this.techniques.precompile(Ce,this._splatDepthTechniqueConfiguration),this.techniques.precompile(Pe),this.techniques.precompile(Se)}render(a){const e=a.find(({name:v})=>v===ve.OPAQUE);if(!this._data.visibleGaussians||!this._data.orderTexture.texture||!this._data.textureAtlas.texture)return e;const t=this.techniques.get(Te,this._splatTechniqueConfiguration),s=this.techniques.get(Ce,this._splatDepthTechniqueConfiguration),n=this.techniques.get(Pe),i=this.techniques.get(Se);if(!(t.compiled&&s.compiled&&i.compiled&&n.compiled))return this.requestRender(1),e;const{fullWidth:p,fullHeight:u}=this.bindParameters.camera,f=this.fboCache,r=f.acquire(p,u,"gaussian color output");r.attachDepth(e.getAttachment(J));const c=this.renderingContext;c.bindFramebuffer(r.fbo),c.setClearColor(0,0,0,0),c.clear(16384),this._gaussianSplatParameters.totalGaussians=this._data.visibleGaussians,this._gaussianSplatParameters.splatOrder=this._data.orderTexture.texture,this._gaussianSplatParameters.splatAtlas=this._data.textureAtlas.texture;const h=Math.tan(.5*this.camera.fovY),o=h/u*p;ot(this._tanFov,o,h);const x=u/(2*h);this._gaussianSplatParameters.focalLength=x,this._gaussianSplatParameters.tanFov=this._tanFov;const g=this.view.qualitySettings.gaussianSplat,l=g.minimumSplatPixelRadius*Math.sqrt(p*u)/Math.sqrt(2073600);this._gaussianSplatParameters.minSplatRadius=l,this._gaussianSplatParameters.minSplatOpacity=g.minimumOpacity,this._prepareHighPrecisionCameraPosition(),this.renderingContext.bindTechnique(t,this.bindParameters,this._gaussianSplatParameters),this.renderingContext.drawArraysInstanced(ge.TRIANGLE_STRIP,0,4,this._data.visibleGaussians);const d=f.acquire(p,u,"splat depth",8);d.attachDepth(e.getAttachment(J)),c.bindFramebuffer(d.fbo),c.setClearColor(0,0,0,0),c.clear(16384),this.renderingContext.bindTechnique(s,this.bindParameters,this._gaussianSplatParameters),this.renderingContext.drawArraysInstanced(ge.TRIANGLE_STRIP,0,4,this._data.visibleGaussians);const _=f.acquire(p,u,this.produces);return this._gaussianSplatDepthCompositionParameters.splatDepth=d.getTexture(),_.attachDepth(e.getAttachment(J)),c.bindFramebuffer(_.fbo),c.bindTechnique(i,this.bindParameters,this._gaussianSplatDepthCompositionParameters),c.screen.draw(),this._gaussianSplatCompositionParameters.color=e.getTexture(),this._gaussianSplatCompositionParameters.splatColor=r.getTexture(),c.bindFramebuffer(_.fbo),c.bindTechnique(n,this.bindParameters,this._gaussianSplatCompositionParameters),c.screen.draw(),r.release(),d.release(),_}intersect(a,e,t,s){const{gaussianPosition:n,intersectionRayDir:i,intersectionPlane:p,layerViewUid:u}=this,f=lt(t,s);xe(i,s,t);const r=1/ct(i);X(i,i,r);const c=z();ut(c,i),ht(p,i[0],i[1],i[2],-ye(i,t));const h=new Y,o=new Y,x=new Array;this._data.visibleGaussianTiles.forEach(l=>{const{maxScale:d}=l,_=l.obb.minimumDistancePlane(p),v=l.obb.maximumDistancePlane(p),b=v<0,R=h.dist!=null&&o.dist!=null&&h.dist<_*r&&o.dist>v*r;if(b||R)return;const q=dt(l.obb.center,l.obb.radius+d);if(!pt(q,f,null)||!l.obb.intersectRay(t,i,d))return;const{positions:P,squaredScales:m,gaussianAtlasIndices:y}=l,B=y.length;for(let S=0;S<B;S++){const I=3*S;n[0]=P[I]-t[0],n[1]=P[I+1]-t[1],n[2]=P[I+2]-t[2];const D=m[S],G=ye(n,i),Z=G*G;if(ft(n)-Z>D)continue;const A=G*r,$=C=>(C.point=C.point?C.point.fill(n[0],n[1],n[2]):gt(n),C.dist=A,C.normal=c,C.layerViewUid=u,C);if((h.dist==null||A<h.dist)&&(e==null||e(t,s,A))&&$(h),a.options.store!==0&&(o.dist==null||A>o.dist)&&(e==null||e(t,s,A))&&$(o),a.options.store===2&&(e==null||e(t,s,A))){const C=new Y;x.push($(C))}}});const g=(l,d)=>{const{layerViewUid:_}=d,v=new xt(d.point,_);l.set(0,v,d.dist,d.normal)};if(De(h)){const l=a.results.min;(l.distance==null||h.dist<l.distance)&&g(l,h)}if(De(o)&&a.options.store!==0){const l=a.results.max;(l.distance==null||o.dist>l.distance)&&g(l,o)}if(a.options.store===2)for(const l of x){const d=new mt(f);g(d,l),a.results.all.push(d)}}get slicePlaneEnabled(){return this._slicePlaneEnabled}set slicePlaneEnabled(a){this._slicePlaneEnabled!==a&&(this._slicePlaneEnabled=a,this.requestRender(1))}get data(){return this._data}destroy(){this._data.destroy(),super.destroy()}_onCameraChange(){const a=this.view.state.camera.eye,e=this.view.state.camera.ray.direction,t=.001;(Math.abs(a[0]-this._previousCameraPosition[0])>t||Math.abs(a[1]-this._previousCameraPosition[1])>t||Math.abs(a[2]-this._previousCameraPosition[2])>t||Math.abs(e[0]-this._previousCameraDirection[0])>t||Math.abs(e[1]-this._previousCameraDirection[1])>t||Math.abs(e[2]-this._previousCameraDirection[2])>t)&&this._data.requestSort()}_prepareHighPrecisionCameraPosition(){X(this._tempVec,this.camera.eye,1/E.tileSize),_t(this._tempVec,this._tempVec),vt(this._coarseCameraPosition,this._tempVec),this._gaussianSplatParameters.cameraPos8k=this._coarseCameraPosition,X(this._tempVec,this._tempVec,E.tileSize),xe(this._cameraDelta,this.camera.eye,this._tempVec),this._gaussianSplatParameters.cameraDelta=this._cameraDelta}static{this.tileSize=2.048}};function De(a){return a.dist!=null&&a.point!=null}se=E=M([Oe("esri.views.3d.webgl-engine.lib.GaussianSplatRenderNode")],se);class Y{constructor(){this.point=null,this.dist=null,this.normal=null,this.layerViewUid=""}}const ee=()=>St.getLogger("esri.views.3d.layers.GaussianSPlatLayerView3D");let O=class extends Rt(kt){constructor(a){super(a),this.type="gaussian-splat-3d",this._gaussianTileHandles=new Map,this._pageBuffer=new Uint32Array(Fe),this._wasmLayerId=-1,this._metersPerVCSUnit=1,this.ignoresMemoryFactor=!1,this._usedMemory=0,this._cacheMemory=0,this._useEsriCrs=!1,this.fullExtentInLocalViewSpatialReference=null,this._suspendedHandle=null,this._conversionBuffer=new ArrayBuffer(4),this._u32View=new Uint32Array(this._conversionBuffer),this._f32View=new Float32Array(this._conversionBuffer);const{view:e}=a;this._memCache=e.resourceController.memoryController.newCache(`GaussianSplat-${this.uid}`,t=>this._deleteTile(t)),this._renderNode=new se({view:e})}initialize(){if(!this._canProjectWithoutEngine())throw yt("layer",this.layer.spatialReference.wkid,this.view.renderSpatialReference?.wkid);const a=wt(this).then(e=>{this._wasmLayerId=e,this.addHandles([ae(()=>this.layer.elevationInfo,t=>this._elevationInfoChanged(t))]),this._suspendedHandle=ae(()=>this.suspended,t=>this._wasm?.setEnabled(this,!t),bt)});this.addResolvingPromise(a)}get wasmLayerId(){return this._wasmLayerId}get metersPerVCSUnit(){return this._metersPerVCSUnit}isUpdating(){const a=this._wasm;return!(this._wasmLayerId<0||a==null)&&(a.isUpdating(this._wasmLayerId)||this._renderNode.data.isUpdating())}updatingFlagChanged(){this.notifyChange("updating")}get _wasm(){return Pt(this.view)}get usedMemory(){return this._usedMemory}get unloadedMemory(){return 0}get cachedMemory(){return this._cacheMemory}get useEsriCrs(){return this._useEsriCrs}async createRenderable(a){const e=a.meshData;if(e.data==null)throw new Error("meshData.data undefined");if(e.desc=JSON.parse(e.desc),e.desc==null)throw new Error("meshData.desc undefined");const t=e.desc.prims[0],s=t.vertexCount,n=t.atrbs[0].view,i=t.atrbs[0].view.byteCount,p=t.atrbs[0].view.byteOffset;let u=null;if(n.type!=="U32")return ee().warnOnce("unexpected meshData.data format"),{memUsageBytes:0};u=new Uint32Array(e.data.buffer,p,i/4);const f=this.extractHeader(u),r=Math.ceil(s/k),c=new Uint32Array(s),h=[];for(let m=0;m<r;m++){let y=this._data.textureAtlas.requestPage();if(y===null&&(this._freeInvisibleTiles(),y=this._data.textureAtlas.requestPage()),y===null)return ee().warnOnce("ran out of gaussian splat memory"),{memUsageBytes:0};{h.push(y);const B=s-m*k,S=Math.min(B,k),I=m*k;for(let $=0;$<S;$++)c[$+I]=$+F*y;const D=m*be;this._pageBuffer.set(u.subarray(D,D+S*H)),this._pageBuffer.set(f.packedHeader,be);const G=y*F,Z=G%T,A=Math.floor(G/T);this._data.textureAtlas.update(Z,A,this._pageBuffer)}}const o=new Float64Array(3*s),x=new Float64Array(s),g=2.048,l=f.tileOrigin.x*g,d=f.tileOrigin.y*g,_=f.tileOrigin.z*g,v=f.invPosScale;let b=0,R=0;for(let m=0;m<s;m++){const y=m*H,{rawX:B,rawY:S,rawZ:I}=this._extractGaussianPosition(u,y),D=this._extractGaussianSphericalScale(u,y);o[b]=B*v+l,o[b+1]=S*v+d,o[b+2]=I*v+_,x[m]=D*D,R=Math.max(R,D),b+=3}let q=null;if(e.desc.obb){const m=e.desc.obb.quaternion;q=new we(e.desc.obb.center,e.desc.obb.halfSize,Ct(...m))}q||(ee().warnOnce("encountered tile without a bounding box"),q=new we);const P=new Vt(a.handle,q,c,h,o,x,R);return this._memCache.put(`${P.handle}`,P),this._gaussianTileHandles.set(a.handle,P),this._cacheMemory+=P.usedMemory,{memUsageBytes:P.usedMemory}}_extractGaussianPosition(a,e){const t=a[e+1];return{rawX:16383&t,rawY:t>>>14&16383,rawZ:t>>>28&15|(1023&a[e+2])<<4}}_extractGaussianSphericalScale(a,e){const t=a[e+2],s=t>>>10&255,n=t>>>18&255,i=t>>>26&63|(3&a[e+3])<<6,p=Math.exp(s/16-10),u=Math.exp(n/16-10),f=Math.exp(i/16-10);return Math.max(p,u,f)}freeRenderable(a){const e=this._gaussianTileHandles.get(a);e&&(e.isVisible?this._usedMemory-=e.usedMemory:this._cacheMemory-=e.usedMemory,e.pageIds.forEach(t=>this._data.textureAtlas.freePage(t)),this.freeObject(e),this._gaussianTileHandles.delete(a)),this._updateGaussians()}freeObject(a){this._memCache.pop(`${a.handle}`)}get visibleAtCurrentScale(){return Tt(this.layer.effectiveScaleRange,this.view.scale)}setRenderableVisibility(a,e,t){for(let s=0;s<t;s++){if(!e[s])continue;const n=a[s],i=this._gaussianTileHandles.get(n);if(i){if(i.isVisible)continue;i.isVisible=!0,this._usedMemory+=i.usedMemory,this._cacheMemory-=i.usedMemory,this._memCache.pop(`${n}`)}}for(let s=0;s<t;s++){if(e[s])continue;const n=a[s],i=this._gaussianTileHandles.get(n);if(i){if(!i.isVisible)continue;i.isVisible=!1,this._usedMemory-=i.usedMemory,this._cacheMemory+=i.usedMemory,this._memCache.put(`${n}`,i)}}this._updateGaussians()}destroy(){Dt(this),this._suspendedHandle&&(this._suspendedHandle=At(this._suspendedHandle)),this._renderNode.destroy(),this._memCache.destroy()}_canProjectWithoutEngine(){if(this.view.state.viewingMode===1||$t(this.view.renderSpatialReference)||zt(this.view.renderSpatialReference))return!0;if(this.layer.esriCrsSpatialReference&&It(this.layer.esriCrsSpatialReference,this.view.renderSpatialReference)){const a=Ft(this.layer.esriCrsSpatialReference),e=this.view.heightModelInfo;return this._useEsriCrs=Mt(a,e,!1)===0,this._useEsriCrs&&a&&(this._metersPerVCSUnit=qt(1,"meters",a.heightUnit),this.fullExtentInLocalViewSpatialReference=this.layer.esriCrsFullExtent),this._useEsriCrs}return!1}_elevationInfoChanged(a){if(a?.offset)if(this._useEsriCrs){const e=Gt(a?.unit)/this._metersPerVCSUnit,t=a?.offset??0;this._wasm?.setLayerOffset(this,t*e)}else this._wasm?.setLayerOffset(this,Ot(a));else this._wasm?.setLayerOffset(this,0)}_updateGaussians(){const a=new Array;for(const e of this._gaussianTileHandles.values())e.isVisible&&a.push(e);this._data.updateGaussianVisibility(a),this.notifyChange("updating")}_freeInvisibleTiles(){for(const a of this._gaussianTileHandles.values())a.isVisible||this._deleteTile(a)}get _data(){return this._renderNode.data}extractHeader(a){const e=a.length-4,t=this.reinterpretU32AsFloat(a[e]),s=this.reinterpretU32AsFloat(a[e+1]),n=this.reinterpretU32AsFloat(a[e+2]),i=1/(1<<(255&a[e+3]));return{packedHeader:a.subarray(e,e+4),tileOrigin:{x:t,y:s,z:n},invPosScale:i}}_deleteTile(a){this._wasm?.onRenderableEvicted(this,a.handle,a.usedMemory),this.freeRenderable(a.handle)}reinterpretU32AsFloat(a){return this._u32View[0]=a,this._f32View[0]}get performanceInfo(){let a=0,e=0;return this._gaussianTileHandles.forEach(t=>{t.isVisible?a++:e++}),new Bt(this.usedMemory,a,e,this.cachedMemory)}};M([Q()],O.prototype,"layer",void 0),M([Q()],O.prototype,"fullExtentInLocalViewSpatialReference",void 0),M([Q({readOnly:!0})],O.prototype,"visibleAtCurrentScale",null),O=M([Oe("esri.views.3d.layers.GaussianSplatLayerView3D")],O);const _a=O,Qt=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:ce,build:Ee},Symbol.toStringTag,{value:"Module"})),Yt=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:ue,build:He},Symbol.toStringTag,{value:"Module"})),Ve=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatPassParameters:le,build:Re},Symbol.toStringTag,{value:"Module"}));export{_a as default};
