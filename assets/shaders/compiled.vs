{@}AboutBase.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tNormal;
uniform sampler2D tIBL;
uniform vec3 uScreenColor;
uniform float uUVScale;
uniform float uNormalStrength;
uniform float uNormalScale;
uniform float uLightStrength;
uniform vec3 uBaseColor;

#!VARYINGS
varying vec3 vNormal;
varying vec3 vNormalM;
varying vec3 vPos;
varying vec3 vEye;

#!SHADER: AboutBase.vs
void main() {
    vPos = position;
    vNormal = normal;
    vNormalM = normalMatrix * normal;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vEye = mvPosition.xyz;
}

#!SHADER: AboutBase.fs

#require(transformUV.glsl)
#require(conditionals.glsl)
#require(range.glsl)
#require(matcap.vs)
#require(lights.fs)
#require(rgb2hsv.fs)
#require(normalmap.glsl)

vec2 getUV(vec3 dNormal, float start, float end) {
    vec2 uv0 = vec2(0.0);
    uv0.x = range(vPos.z, -5.0, 5.0, start, end);
    uv0.y = range(vPos.y, 0.0, 20.0, start, end);

    vec2 uv1 = vec2(0.0);
    uv1.x = range(vPos.x, -5.0, 5.0, start, end);
    uv1.y = range(vPos.z, -5.0, 5.0, start, end);

    vec2 uv2 = vec2(0.0);
    uv2.x = range(vPos.x, -5.0, 5.0, start, end);
    uv2.y = range(vPos.y, 0.0, 20.0, start, end);

    vec3 n = normalize(dNormal);
    vec2 uv = mix(uv0, uv1, min(when_gt(abs(n.y), abs(n.x)), when_gt(abs(n.y), abs(n.z))));
    uv = mix(uv, uv2, min(when_gt(abs(n.z), abs(n.x)), when_gt(abs(n.z), abs(n.y))));

    return uv;
}

vec3 getIBL(vec2 uv) {
    vec2 vuv = scaleUV(uv, vec2(2.0));
    vuv.x += -0.3;
    vec3 ibl = texture2D(tIBL, vuv).rgb;

    vec3 color0 = rgb2hsv(uScreenColor);
    color0.z = mix(color0.z, range(color0.z, 0.0, 1.0, 0.0, 0.2), color0.z);
    color0 = hsv2rgb(color0);

    vec3 color1 = rgb2hsv(color0);
    color1.x += 0.1;
    color1 = hsv2rgb(color1);

    vec3 texel = vec3(ibl.b);
    texel = mix(texel.rgb, color0, ibl.r);
    texel = mix(texel.rgb, color1, ibl.g);

    return texel * 0.35 * uLightStrength;
}

void main() {
    vec2 uv = getUV(vNormal, 0.0, 1.0);
    vec3 normal = unpackNormal(vEye, vNormalM, tNormal, uNormalStrength, uNormalScale, uv);

    vec3 lightPos = worldLight(vec3(0.0, 100.0, 5.0), vPos);
    float volume = dot(normalize(lightPos), vNormalM);

    vec3 color = getIBL(uv);
    color += uBaseColor;

    color += uScreenColor * volume * crange(vPos.y, 5.0, 0.0, 1.0, 0.0) * (1.0-step(3.0, vPos.y));

    color *= crange(vPos.y, 1.0, 0.0, 1.0, 0.0);

    gl_FragColor = vec4(color, 1.0);
}{@}AboutProjection.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;

#!VARYINGS
varying vec2 vUv;

#!SHADER: AboutProjection.vs
void main() {
    vUv = uv;
    vUv.x = 1.0 - uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: AboutProjection.fs
void main() {
    gl_FragColor = texture2D(tMap, vUv);
}{@}AboutViewBrick.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tNormal;
uniform sampler2D tNormal2;
uniform sampler2D tBump;
uniform sampler2D tIBL;
uniform float uUVScale;
uniform float uNormalStrength;
uniform vec3 uScreenColor;
uniform vec3 uBaseColor;
uniform float uLightStrength;

#!VARYINGS
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vEye;
varying vec3 vPos;

#!SHADER: AboutViewBrick.vs
void main() {
    vUv = uv * uUVScale;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    vEye = mvPosition.xyz;
    vNormal = normalMatrix * normal;
    vPos = position;

    gl_Position = projectionMatrix * mvPosition;
 }

#!SHADER: AboutViewBrick.fs

#require(normalmap.glsl)
#require(transformUV.glsl)
#require(range.glsl)
#require(lights.fs)
#require(rgb2hsv.fs)

vec3 getIBL(vec3 normal, vec3 normal2) {
    vec2 uv = scaleUV(vUv, vec2(1.0, 2.5));
    uv += normal.xy * 0.2;
    uv += normal2.xy * 0.2;
    vec3 ibl = texture2D(tIBL, uv).rgb;

    vec3 color0 = rgb2hsv(uScreenColor);
    color0.z = mix(color0.z, range(color0.z, 0.0, 1.0, 0.0, 0.2), color0.z);
    color0 = hsv2rgb(color0);

    vec3 color1 = rgb2hsv(color0);
    color1.x += 0.1;
    color1 = hsv2rgb(color1);

    vec3 texel = vec3(ibl.b);
    texel = mix(texel.rgb, color0, ibl.r);
    texel = mix(texel.rgb, color1, ibl.g);

    return texel * 0.15 * uLightStrength;
}

void main() {
    vec3 normal = unpackNormal(vEye, vNormal, tNormal, uNormalStrength, 1.0, vUv);
    vec3 normal2 = texture2D(tNormal2, vUv * 3.0).xyz;

    vec3 lightPos = worldLight(vec3(0.0, 10.0, 10.0), vPos);
    float volume = dot(normalize(lightPos), normal);

    vec3 color = getIBL(normal, normal2);
    color += uBaseColor * volume;

    float y = vPos.y;
    y += range(normal2.y, 0.0, 1.0, -1.0, 1.0) * 0.3;

    float edge0 = 1.0 - smoothstep(0.25, 0.3, vPos.x);
    float edge1 = smoothstep(-0.21, -0.16, vPos.x);

    float center = pow(crange(vPos.x, 0.03, 0.045, 0.83, 1.0), 3.0);
    center = max(center, pow(crange(vPos.x, 0.034, 0.02, 0.83, 1.0), 3.0));
    center = mix(center, 1.0, crange(vPos.y, 0.5, 0.1, 0.0, 1.0));

    color += volume * pow(crange(y, 0.5, -0.3, 1.0, 0.0), 3.0) * uScreenColor * edge0 * edge1 * 0.8 * center * uLightStrength;

    float edgeTop = crange(y, 0.44, 0.43, 0.0, 1.0);
    color += volume * pow(crange(y, 0.4, 0.2, 1.0, 0.0), 3.0) * uScreenColor * edge0 * edge1 * 0.5 * edgeTop * center * uLightStrength;

    color *= crange(vPos.y, -0.3, -0.5, 1.0, 0.0);

    gl_FragColor = vec4(color, 1.0);
}{@}AboutViewProjection.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform sampler2D tVideo;
uniform sampler2D tBump;
uniform float uRGBStrength;
uniform float uBumpScale;
uniform float uTime;
uniform float uTextBrightness;
uniform float uTextAnimation;
uniform float uVideoBlend;

#!VARYINGS
varying vec2 vUv;
varying vec3 vPos;

#!SHADER: AboutViewProjection.vs
void main() {
    vUv = uv;

    float s = texture2D(tBump, uv * uBumpScale).r;
    vec3 pos = position;
    pos.z += s * 0.3;

    vPos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: AboutViewProjection.fs

#require(range.glsl)
#require(rgbshift.fs)
#require(simplenoise.glsl)


void main() {
    vec2 d = vec2(0.5) - vUv;
    float angle = atan(d.y, d.x);
    vec4 texel = getRGB(tMap, vUv, angle, 0.0005 * uRGBStrength * 0.3 * range(uTextAnimation, 0.0, 1.0, 70.0, 1.0));

    float noise = cnoise(vUv + uTime*0.5);
    texel *= mix(vec4(1.0), texture2D(tVideo, vUv), uVideoBlend);
//
//    texel *= mix(texel, vec4(1.0), 0.5+noise*0.3);
    float bump = texture2D(tBump, vUv * uBumpScale).r;
    texel.rgb *= range(bump, 0.5, 1.0, 0.5, 1.0);
    texel.rgb *= range(vPos.y, 0.2, 0.5, 1.0, 0.5);
    texel.rgb *= uTextBrightness + sin(uTime * 0.25) * 0.5;

    texel.a *= 0.8 * uTextAnimation;


    gl_FragColor = texel;
}{@}AlleyBackground.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform float uTime;
uniform float uMin;
uniform float uMax;
uniform float uSpeed;

#!VARYINGS
varying vec2 vUv;

#!SHADER: AlleyBackground.vs
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}

#!SHADER: AlleyBackground.fs
#require(range.glsl)

void main() {
    float dist = length(vUv - vec2(0.5));
    vec3 color = vec3(1.0-dist);
    color *= 0.8+sin(uTime)*0.15;
    gl_FragColor = vec4(color*0.7, 1.0);
}{@}AlleyGeometry.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform float uTime;
uniform float uNormalStrength;
uniform float uNormalScale;
uniform float uPointLightStrength;
uniform float uNormalBottom;
uniform float uLightFalloffDist;
uniform float uLightFalloffRange;
uniform float uFogDistance;
uniform float uFogRange;
uniform float uReflScale;
uniform float uReflStrength;
uniform vec2 uResolution;
uniform vec3 uCRTColor;
uniform vec3 uScreenColor;
uniform sampler2D tBump;
uniform sampler2D tBump2;
uniform sampler2D tBump3;
uniform sampler2D tIBL;
uniform sampler2D tSky;
uniform sampler2D tMatcap;
uniform sampler2D tInteraction;
uniform sampler2D tCRT;
uniform mat4 uTextureMatrix;
uniform sampler2D tReflection;
uniform sampler2D tBuffer;

#!VARYINGS
varying vec3 vViewPosition;
varying vec3 vWorldPos;
varying vec3 vPos;
varying vec3 vNormal;
varying vec4 vDepth;
varying vec4 vMirrorCoord;

#!SHADER: AlleyGeometry.vs

#require(transformUV.glsl)

vec4 getDepth(vec3 pos) {
    float dist = length(pos - cameraPosition);
    return vec4(1.0 - (dist / 40.0));
}

void main() {
    vec3 pos = position;
    vec4 mPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = mPos.xyz;
    vPos = pos;
    vNormal = normal;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vViewPosition = -mvPosition.xyz;

    vMirrorCoord = uTextureMatrix * mPos;

    vDepth = getDepth(mPos.xyz);
}

#!SHADER: AlleyGeometry.fs

#require(dnormal.fs)
#require(rgb2hsv.fs)
#require(matcap.vs)
#require(normalmap.glsl)
#require(range.glsl)
#require(lights.fs)
#require(conditionals.glsl)

highp float random(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

vec2 getUV(vec3 dNormal, float start, float end) {
    vec2 uv0 = vec2(0.0);
    uv0.x = range(vPos.z, -5.0, 5.0, start, end);
    uv0.y = range(vPos.y, 0.0, 20.0, start, end);

    vec2 uv1 = vec2(0.0);
    uv1.x = range(vPos.x, -5.0, 5.0, start, end);
    uv1.y = range(vPos.z, -5.0, 5.0, start, end);

    vec2 uv2 = vec2(0.0);
    uv2.x = range(vPos.x, -5.0, 5.0, start, end);
    uv2.y = range(vPos.y, 0.0, 20.0, start, end);

    vec3 n = normalize(dNormal);
    vec2 uv = mix(uv0, uv1, min(when_gt(abs(n.y), abs(n.x)), when_gt(abs(n.y), abs(n.z))));
    uv = mix(uv, uv2, min(when_gt(abs(n.z), abs(n.x)), when_gt(abs(n.z), abs(n.y))));

    return uv;
}

vec4 getIBL(vec3 dNormal) {
    vec2 uv = getUV(dNormal, 0.0, 1.0);
    vec3 ibl = texture2D(tIBL, uv).rgb;

    vec3 color0 = rgb2hsv(uScreenColor);
    color0.z = mix(color0.z, range(color0.z, 0.0, 1.0, 0.0, 0.2), color0.z);
    color0 = hsv2rgb(color0);

    vec3 color1 = rgb2hsv(color0);
    color1.x += 0.1;
    color1 = hsv2rgb(color1);

    vec4 texel = vec4(ibl.b);
    texel.rgb = mix(texel.rgb, color0, ibl.r);
    texel.rgb = mix(texel.rgb, color1, ibl.g);

    vec2 screenUV = gl_FragCoord.xy / uResolution;

    #test Tests.iblLights()
    for (int i = 0; i < 6; i++) {
        vec3 lPos = lightPos[i];
        vec3 loPos = worldLight(lPos, vPos);
        vec3 lColor = mix(color0, color1, when_gt(vPos.x, 0.0));
        float lRadius = lightDistance[i];

        float falloff = crange(length(vWorldPos - lPos), 0.0, lRadius, 1.0, 0.0);
        falloff *= crange(length(lPos - cameraPosition), uLightFalloffDist - uLightFalloffRange, uLightFalloffDist + uLightFalloffRange, 1.0, 0.0);

        float volume = max(0.0, dot(normalize(lPos), normalize(dNormal)));
        vec3 lighting = lColor * falloff * crange(volume, 0.0, 1.0, uNormalBottom, 1.0) * uPointLightStrength;
        texel += vec4(lighting, 1.0);
    }
    #endtest

    texel.rgb *= mix(pow(crange(length(vPos.x), 0.0, 1.5, 1.0, 0.0), 1.4), 1.0, when_gt(vPos.y, 1.0));

//    float interaction = texture2D(tInteraction, screenUV * 0.8).r;
//    interaction = crange(interaction, 0.2, 1.0, 0.0, 1.0);
//    texel += texture2D(tCRT, uv * 40.0) * 0.3 * interaction * vec4(uCRTColor, 1.0);

    vec4 sky = texture2D(tSky, screenUV);
    float fog = crange(length(vWorldPos - cameraPosition), uFogDistance - uFogRange, uFogDistance + uFogRange, 0.0, 1.0);

    vec3 matcapIBL = texture2D(tMatcap, reflectMatcap(vPos, modelViewMatrix, dNormal)).rgb;
    vec3 matcapColor = vec3(matcapIBL.b);
    matcapColor = mix(matcapColor, color0, matcapIBL.r);
    matcapColor = mix(matcapColor, color1, matcapIBL.g);

    #test !Tests.renderFogLight()
    matcapColor *= 6.0;
    #endtest

    texel.rgb += matcapColor * 0.2;

    vec2 bump = texture2D(tBump2, uv * uReflScale).xy;
    bump.x = range(bump.x, 0.0, 1.0, -1.0, 1.0);
    bump.y = range(bump.y, 0.0, 1.0, -1.0, 1.0);

    float roughness = range(texture2D(tBump3, uv).r, 0.0, 1.0, 0.3, 1.0);

    #test Tests.renderMirror()
    vec4 mirrorCoord = vMirrorCoord;
    mirrorCoord.y += 0.4;
    mirrorCoord.xy += bump;
    float fadeRefl = crange(vWorldPos.z, 0.0, 3.0, 0.0, 1.0);
    fadeRefl *= min(when_gt(abs(dNormal.y), abs(dNormal.x)), when_gt(abs(dNormal.y), abs(dNormal.z))) * when_lt(vPos.y, 1.0);
    texel += texture2DProj(tReflection, mirrorCoord) * fadeRefl * uReflStrength * roughness;
    #endtest

    vec2 bufuv = gl_FragCoord.xy / uResolution;
    bufuv.x = 1.0 - bufuv.x;
    bufuv.y = 1.0 - bufuv.y;
    bufuv.xy += bump * 0.3;
    vec3 obuffer = texture2D(tBuffer, bufuv).rgb * roughness;

    texel.rgb += obuffer * 0.06;

    texel = mix(texel, sky, pow(fog, 1.3));

    return texel;
}

void main() {
    vec2 uv = getUV(vNormal, 0.0, 1.0);

    float r = random(uv) * 0.02;

    vec3 mNormal = unpackNormal(-vViewPosition, vNormal, tBump, uNormalStrength, uNormalScale, uv);

    #drawbuffer Color gl_FragColor = getIBL(mNormal);
    #drawbuffer Depth gl_FragColor = vDepth;

    #test Tests.deferredLighting()
    #drawbuffer Normals gl_FragColor = vec4(mNormal, 1.0);
    #drawbuffer WorldPosition gl_FragColor = vec4(vWorldPos, 1.0);
    #endtest
}
{@}AlleyVideo.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform vec2 uScale;
uniform vec2 uOffset;

#!VARYINGS
varying vec2 vUv;

#!SHADER: AlleyVideo.vs

#require(transformUV.glsl)

void main() {
    vUv = scaleUV(uv, uScale);
    vUv += uOffset;
    gl_Position = vec4(position, 1.0);
}

#!SHADER: AlleyVideo.fs
void main() {
    gl_FragColor = texture2D(tMap, vUv);
}{@}AreaLight.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform float uLight;
uniform vec3 uColor;
uniform float uFogDistance;
uniform float uFogRange;
uniform vec2 uResolution;
uniform sampler2D tSky;

#!VARYINGS
varying vec3 vPos;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;

#!SHADER: AreaLight.vs

void main() {
    vUv = uv;

    vNormal = normalize(normalMatrix * normal);

    vec3 pos = position;

    vPos = pos;

    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: AreaLight.fs

#require(range.glsl)
#require(simplex3d.glsl)
#require(rgb2hsv.fs)

void main() {
    vec3 color = uColor;

    float noise = range(snoise(vPos * 2.0), -1.0, 1.0, 0.0, 1.0);

    color = rgb2hsv(color);
    color.y += noise * 0.3;
    color.z += noise * 0.5;
    color = hsv2rgb(color);
    color *= 3.0;

    vec3 sky = texture2D(tSky, gl_FragCoord.xy / uResolution).rgb;
    float fog = crange(length(vWorldPos - cameraPosition), uFogDistance - uFogRange, uFogDistance + uFogRange, 0.0, 1.0);
    color = mix(color, sky, pow(fog, 1.3));

    gl_FragColor = vec4(color, 1.0);
}{@}FogInstance.glsl{@}#!ATTRIBUTES
attribute vec3 offset;
attribute vec3 attribs;

#!UNIFORMS
uniform vec4 quaternion;
uniform float planeScale;
uniform sampler2D tMap;
uniform float alpha;
uniform float time;

#!VARYINGS
varying vec2 vUv;
varying vec3 vAttribs;
varying float vAlpha;
varying vec3 vWorldPos;

#!SHADER: FogInstance.vs

#require(range.glsl)

void main() {
    vec3 pos = position;
    pos.x *= range(attribs.x, 0.0, 1.0, 0.8, 1.5);
    pos.y *= range(attribs.y, 0.0, 1.0, 0.8, 1.5);
    pos *= planeScale;

    vec3 vcv = cross(quaternion.xyz, pos);
    pos = vcv * (2.0 * quaternion.w) + (cross(quaternion.xyz, vcv) * 2.0 + pos);
    pos += offset;

    vUv = uv;
    vAttribs = attribs;

    vec3 worldPos = vec4(modelMatrix * vec4(pos, 1.0)).xyz;
    vAlpha = crange(abs(worldPos.z - cameraPosition.z), 1.0, 2.0, 0.0, 1.0);
    vAlpha *= crange(length(worldPos - cameraPosition), 20.0, 40.0, 1.0, 0.0);
    vWorldPos = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: FogInstance.fs

vec2 rotate2d(vec2 uv, float angle){
    mat2 m = mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
    uv -= 0.5;
    uv *= m;
    uv += 0.5;

    return uv;
}

void main() {
    float a = texture2D(tMap, rotate2d(vUv, vAttribs.z)).g * alpha;

    float flow = texture2D(tMap, rotate2d(vUv, vAttribs.x * 3.14 + time * 0.2)).g;
    a *= flow;

    gl_FragColor.rgb = vWorldPos;
    gl_FragColor.a = vAlpha * a * 0.3;
}{@}Glow.glsl{@}#!ATTRIBUTES

#!UNIFORMS

uniform sampler2D uRender;
uniform vec2 uResolution;

#!VARYINGS

varying vec2 vUv;

#!SHADER: Glow.vs

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
//    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: Glow.fs

#define ITERATIONS 10
#define TAU 6.28318530718

highp float random(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

//Use last part of hash function to generate new random radius and angle
vec2 mult(inout vec2 r) {
    r = fract(r * vec2(12.9898,78.233));
    return sqrt(r.x + .001) * vec2(sin(r.y * TAU), cos(r.y * TAU));
}

vec3 sample(vec2 uv) {
    return texture2D(uRender, uv).rgb;
}

vec3 blur(vec2 uv, float radius, float aspect, float offset) {
    vec2 circle = vec2(radius);
    circle.x *= aspect;
    vec2 rnd = vec2(random(vec2(uv + offset)));

    vec3 acc = vec3(0.0);
    for (int i = 0; i < ITERATIONS; i++) {
        acc += sample(uv + circle * mult(rnd)).xyz;
    }
    return acc / float(ITERATIONS);
}

void main() {
//    vec4 tex = texture2D(uRender, vUv);

    vec3 tex = blur(vUv, 0.003, uResolution.x / uResolution.y, 0.5);

//    vec4 tex = blur13(uRender, vUv, uResolution * 0.1, vec2(0.3));

    gl_FragColor.rgb = tex;
    gl_FragColor.a = 1.0;
}
{@}HoloScreen.glsl{@}#!ATTRIBUTES

#!UNIFORMS

uniform sampler2D uMap;
uniform sampler2D uGlowMap;
uniform float uRatio;
uniform float uTime;
uniform float uGlow;
uniform float uIndexOffset;
uniform vec2 uScale;

#!VARYINGS

varying vec2 vUv;
varying vec2 vUv2;

#!SHADER: HoloScreen.vs

void main() {
    vUv = uv;
    vUv2 = uv;

    vec3 pos = position;
    pos.xz *= (1.0 + uGlow / uScale);

    vUv -= 0.5;
    vUv *= (1.0 + uGlow / uScale);
    vUv += 0.5;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: HoloScreen.fs

void updateUV(inout vec2 uv) {
    vec2 r = vec2(2.0, 3.0);
    uv /= r;
    uv -= 0.5 / r;
    uv.x *= uRatio;
    uv.x *= 2.0 / 3.0;
    uv /= max(1.0, uRatio / (3.0 / 2.0));
    uv += 0.5 / r;

    float seq = mod(floor(uTime) + uIndexOffset, 6.0);
    float xIndex = floor(seq / 3.0);
    float yIndex = mod(seq, 3.0);
    uv += vec2(xIndex,  yIndex) / r;
}

void main() {
    vec2 uv = vUv;
    vec2 uvGlow = vUv2;
    updateUV(uv);
    updateUV(uvGlow);

    vec4 tex = texture2D(uMap, uv);
    tex.a *= step(0.0, vUv.x) * step(0.0, vUv.y)* (1.0 - step(1.0, vUv.x)) * (1.0 - step(1.0, vUv.y));

    vec4 glow = texture2D(uGlowMap, uvGlow);
    glow.a *= smoothstep(1.0 + 0.5 * (uGlow / uScale.x), 1.0, vUv.x);
    glow.a *= smoothstep(-0.5 * (uGlow / uScale.x), 0.0, vUv.x);
    glow.a *= smoothstep(1.0 + 0.5 * (uGlow / uScale.y), 1.0, vUv.y);
    glow.a *= smoothstep(-0.5 * (uGlow / uScale.y), 0.0, vUv.y);
    glow.a = pow(glow.a, 3.0);

    vec2 uvStripes = vUv * uScale;
    float stripe = smoothstep(-0.7, -0.6, sin(uvStripes.y * 100.0 + uTime * 20.0));

    vec2 uvDots = mod(vUv * uScale * 200.0, vec2(1.0));
    float dots = smoothstep(0.5, 0.4, length(uvDots - 0.5));


    gl_FragColor.rgb = mix(glow.rgb, tex.rgb + glow.rgb * 0.2, tex.a * (stripe * 0.5 + 0.5) * dots);
//    gl_FragColor.a = tex.a;
//    gl_FragColor.a = tex.a * 0.5 + glow.a * 0.5;
    gl_FragColor.a = mix(glow.a * (stripe * 0.1 + 0.9) * 0.6, 1.0 * (dots * 0.5 + 0.5), tex.a) * 0.8;
}
{@}LightRay.glsl{@}#!ATTRIBUTES

#!UNIFORMS

uniform sampler2D uTexture;
uniform vec2 uResolution;

#!VARYINGS

varying vec2 vUv;
varying float vDepth;

#!SHADER: LightRay.vs

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vec4 mPos = modelMatrix * vec4(position, 1.0);

    // Just z
    float dist = abs(cameraPosition.z - mPos.z);
    vDepth = smoothstep(1.0, 5.0, dist) * smoothstep(35.0, 15.0, dist);
}

#!SHADER: LightRay.fs

highp float random(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float r = random(uv) * 0.1;
    float light = texture2D(uTexture, vUv).g;

    gl_FragColor.rgb = vec3(1.0);
//    gl_FragColor.a = light * vDepth;
    gl_FragColor.a = light * 0.2 * (vDepth + r);
//    gl_FragColor = vec4(vUv, 0.0, 1.0);
}
{@}LightReflection.glsl{@}#!ATTRIBUTES

#!UNIFORMS

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uLight;
uniform sampler2D uBump;

#!VARYINGS

varying vec2 vUv;
varying float vDepth;
varying vec3 vNormal;
varying vec3 vMVPos;

#!SHADER: LightReflection.vs

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec3 pos = position;
    vec4 mPos = modelMatrix * vec4(position, 1.0);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vMVPos = mvPos.xyz;

    vDepth = length(cameraPosition - mPos.xyz) / 40.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: LightReflection.fs

void main() {

    vec2 uv = vUv;

    vec2 uvBump = vUv;
    uvBump.y *= 5.0;
    uvBump *= 1.0;

    float bump = texture2D(uBump, uvBump).g * 2.0 - 1.0;

    uv.x += sin(uv.y * 10.0) * 0.01;
    uv.x += bump * 0.1;

    uv.y *= 5.0;
    uv.y -= 0.5;

    float angle = dot(vNormal, normalize(-vMVPos));

    uv.y *= smoothstep(0.2, 1.0, angle) * 0.93 + 0.07;
    uv.y += 0.35;


    vec3 render = texture2D(uLight, uv).rgb;
    render = render * 0.7 + pow(render, vec3(2.0)) * 0.5;

    gl_FragColor.rgb = render;

    gl_FragColor.a = render.g;

    gl_FragColor.a *= smoothstep(0.6, 0.1, vDepth);
    gl_FragColor.a *= 1.0;

    if (gl_FragColor.a < 0.01) discard;
}
{@}Mist.glsl{@}#!ATTRIBUTES

attribute float scale;
attribute float rotation;
attribute float speed;

#!UNIFORMS

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform sampler2D uSwirl;

#!VARYINGS

varying float vDepth;
varying float vRotation;
varying float vSpeed;

#!SHADER: Mist.vs

void main() {
    vRotation = rotation;
    vSpeed = speed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vec3 mVPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vec3 mPos = (modelMatrix * vec4(position, 1.0)).xyz;

    // Just z
    float dist = abs(cameraPosition.z - mPos.z);
    vDepth = smoothstep(0.0, 4.0, dist) * smoothstep(25.0, 10.0, dist);

    gl_PointSize = 1.0 * scale * (1000.0 / length(mVPos.xyz));
}

#!SHADER: Mist.fs

void rotate2d(inout vec2 v, float a){
    mat2 m = mat2(cos(a),-sin(a),
                sin(a),cos(a));

    v -= vec2(0.5);
    v *= m;
    v += vec2(0.5);
}

void main() {
    vec2 uvScreen = gl_FragCoord.xy / uResolution.xy;
    uvScreen *= 4.0;
//    uvScreen.y -= uTime * 0.3;
    uvScreen.x -= uTime * 0.3;
    vec2 swirl = texture2D(uSwirl, uvScreen).rg * 2.0 - 1.0;

    vec2 uv = gl_PointCoord.xy;
    uv.y = 1.0 - uv.y;
    rotate2d(uv, vRotation + vSpeed * uTime * 0.1);
    uv += swirl * 0.03;

    float mist = texture2D(uTexture, uv).g;

    gl_FragColor.rgb = vec3(1.0);
    gl_FragColor.a = mist * 0.1 * vDepth;

    if (gl_FragColor.a < 0.01) discard;
}
{@}Rain.glsl{@}#!ATTRIBUTES

attribute float scale;
attribute float offset;
attribute float speed;

#!UNIFORMS

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;

#!VARYINGS

varying float vDepth;

#!SHADER: Rain.vs

void main() {
    vec3 pos = position;

    float d = 10.0;
    pos.y += d * 0.5;
    pos.y -= mod(uTime * 30.0 * (speed * 0.5 + 0.5) + offset * d, d);
    pos.x += mod(uTime * 30.0 * (speed * 0.5 + 0.5) + offset * d, d) * 0.05;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

//    vDepth = length(mvPos.xyz) / 40.0;

    gl_PointSize = 0.5 * scale * (1000.0 / length(mvPos.xyz));
}

#!SHADER: Rain.fs

void main() {
    vec2 uv = gl_PointCoord.xy;
    uv.y = 1.0 - uv.y;
    uv.x -= 0.5;
    uv.x *= 20.0;
    uv.x += 0.5;
    uv.x = max(0.0, min(1.0, uv.x));

    float rain = texture2D(uTexture, uv).g;


    gl_FragColor.rgb = vec3(1.0);
    gl_FragColor.a = rain * 0.5;
}
{@}ScreenLight.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform float uLight;
uniform sampler2D tMap;
uniform float uFogDistance;
uniform float uFogRange;
uniform float time;
uniform vec2 uResolution;
uniform sampler2D tSky;

#!VARYINGS
varying vec3 vPos;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;

#!SHADER: ScreenLight.vs

void main() {
    vUv = uv;

    vNormal = normalize(normalMatrix * normal);

    vec3 pos = position;

    vPos = pos;

    // Increase scale of light
//    pos += vNormal * 0.6;

    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: ScreenLight.fs

#require(range.glsl)
#require(simplex2d.glsl)
#require(rgb2hsv.fs)

void main() {
    vec3 color = texture2D(tMap, vUv).rgb;

    vec3 sky = texture2D(tSky, gl_FragCoord.xy / uResolution).rgb;
    float fog = crange(length(vWorldPos - cameraPosition), uFogDistance - uFogRange, uFogDistance + uFogRange, 0.0, 1.0);
    color = mix(color, sky, pow(fog, 1.3));

    gl_FragColor = vec4(color, 1.0);
}{@}InteractionMaskClear.glsl{@}#!ATTRIBUTES

#!UNIFORMS

#!VARYINGS

#!SHADER: InteractionMaskClear.vs
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: InteractionMaskClear.fs
void main() {
    gl_FragColor = vec4(vec3(0.0), 0.01);
}{@}InteractionMaskCopy.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;

#!VARYINGS
varying vec2 vUv;

#!SHADER: InteractionMaskCopy.vs
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: InteractionMaskCopy.fs
void main() {
    gl_FragColor = texture2D(tMap, vUv);
}{@}InteractionMaskStamp.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform vec2 uVelocity;

#!VARYINGS
varying vec2 vUv;

#!SHADER: InteractionMaskStamp.vs
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: InteractionMaskStamp.fs

#require(range.glsl)

void main() {
    float mask = texture2D(tMap, vUv).a;
    gl_FragColor.r = mask;
    gl_FragColor.g = range(uVelocity.x, -1.0, 1.0, 0.0, 1.0);
    gl_FragColor.b = range(uVelocity.y, -1.0, 1.0, 0.0, 1.0);
    gl_FragColor.a = mask;
}{@}AntimatterCopy.fs{@}uniform sampler2D tDiffuse;

varying vec2 vUv;

void main() {
    gl_FragColor = texture2D(tDiffuse, vUv);
}{@}AntimatterCopy.vs{@}varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}{@}AntimatterPass.vs{@}void main() {
    gl_Position = vec4(position, 1.0);
}{@}AntimatterPosition.vs{@}uniform sampler2D tPos;

#require(antimatter.glsl)

void main() {
    vec4 decodedPos = texture2D(tPos, position.xy);
    vec3 pos = decodedPos.xyz;
    float size = 0.02;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (1000.0 / length(mvPosition.xyz));
    gl_Position = projectionMatrix * mvPosition;
}{@}antimatter.glsl{@}vec3 getData(sampler2D tex, vec2 uv) {
    return texture2D(tex, uv).xyz;
}

vec4 getData4(sampler2D tex, vec2 uv) {
    return texture2D(tex, uv);
}{@}blendmodes.glsl{@}const vec3 white = vec3(1.0);

#require(rgb2hsv.fs)

#define BlendColorDodgef(base, blend) 	((blend == 1.0) ? blend : min(base / (1.0 - blend), 1.0))
#define BlendColorBurnf(base, blend) 	((blend == 0.0) ? blend : max((1.0 - ((1.0 - base) / blend)), 0.0))
#define BlendVividLightf(base, blend) 	((blend < 0.5) ? BlendColorBurnf(base, (2.0 * blend)) : BlendColorDodgef(base, (2.0 * (blend - 0.5))))
#define Blend(base, blend, funcf) 		vec4(funcf(base.r, blend.r), funcf(base.g, blend.g), funcf(base.b, blend.b), 1.0)
#define BlendVividLight(base, blend) 	Blend(base, blend, BlendVividLightf)
#define BlendOverlayf(base, blend) 		(base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))
#define BlendOverlay(base, blend) 		Blend(base, blend, BlendOverlayf)
#define BlendAddf(base, blend) 			min(base + blend, 1.0)
#define BlendSubstractf(base, blend) 	max(base + blend - 1.0, 0.0)
#define BlendLinearLightf(base, blend) 	(blend < 0.5 ? BlendLinearBurnf(base, (2.0 * blend)) : BlendLinearDodgef(base, (2.0 * (blend - 0.5))))
#define BlendLinearDodgef 				BlendAddf
#define BlendLinearBurnf 				BlendSubstractf
#define BlendLinearLight(base, blend) 	Blend(base, blend, BlendLinearLightf)
#define BlendVividLightf(base, blend) 	((blend < 0.5) ? BlendColorBurnf(base, (2.0 * blend)) : BlendColorDodgef(base, (2.0 * (blend - 0.5))))
#define BlendHardMixf(base, blend) 		((BlendVividLightf(base, blend) < 0.5) ? 0.0 : 1.0)
#define BlendHardMix(base, blend) 		Blend(base, blend, BlendHardMixf)
#define BlendReflectf(base, blend) 		((blend == 1.0) ? blend : min(base * base / (1.0 - blend), 1.0))
#define BlendReflect(base, blend) 		Blend(base, blend, BlendReflectf)
#define BlendGlow(base, blend) 			BlendReflect(blend, base)

vec3 blendScreen(vec3 base, vec3 blend) {
    return white - ((white - blend) * (white - base));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
    return 2.0 * base * blend + base * base - 2.0 * base * base * blend;
}

vec3 blendSubtract(vec3 base, vec3 blend) {
    return base - blend;
}

vec3 blendVividLight(vec3 base, vec3 blend) {
    return BlendVividLight(vec4(base, 1.0), vec4(blend, 1.0)).rgb;
}

vec3 blendOverlay(vec3 base, vec3 blend) {
    return BlendOverlay(vec4(base, 1.0), vec4(blend, 1.0)).rgb;
}

vec3 blendLum(vec3 base, vec3 blend) {
    vec3 baseHSL = rgb2hsv(base);
    return hsv2rgb(vec3(baseHSL.r, baseHSL.g, rgb2hsv(blend).b));
}

vec3 blendPhoenix(vec3 base, vec3 blend) {
    return (min(base, blend) - max(base, blend) + white);
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
    return Blend(vec4(base, 1.0), vec4(blend, 1.0), BlendLinearLightf).rgb;
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
    return max(base + blend - 1.0, 0.0);
}

vec3 blendLighten(vec3 base, vec3 blend) {
    return max(base, blend);
}

vec3 blendInverseDifference(vec3 base, vec3 blend) {
    return white - abs(white - base - blend);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
    return white - (white - base) / blend;
}

vec3 blendHardMix(vec3 base, vec3 blend) {
    return BlendHardMix(vec4(base, 1.0), vec4(blend, 1.0)).rgb;
}

vec3 blendGlow(vec3 base, vec3 blend) {
    return BlendGlow(vec4(base, 1.0), vec4(blend, 1.0)).rgb;
}{@}conditionals.glsl{@}vec4 when_eq(vec4 x, vec4 y) {
  return 1.0 - abs(sign(x - y));
}

vec4 when_neq(vec4 x, vec4 y) {
  return abs(sign(x - y));
}

vec4 when_gt(vec4 x, vec4 y) {
  return max(sign(x - y), 0.0);
}

vec4 when_lt(vec4 x, vec4 y) {
  return max(sign(y - x), 0.0);
}

vec4 when_ge(vec4 x, vec4 y) {
  return 1.0 - when_lt(x, y);
}

vec4 when_le(vec4 x, vec4 y) {
  return 1.0 - when_gt(x, y);
}

vec3 when_eq(vec3 x, vec3 y) {
  return 1.0 - abs(sign(x - y));
}

vec3 when_neq(vec3 x, vec3 y) {
  return abs(sign(x - y));
}

vec3 when_gt(vec3 x, vec3 y) {
  return max(sign(x - y), 0.0);
}

vec3 when_lt(vec3 x, vec3 y) {
  return max(sign(y - x), 0.0);
}

vec3 when_ge(vec3 x, vec3 y) {
  return 1.0 - when_lt(x, y);
}

vec3 when_le(vec3 x, vec3 y) {
  return 1.0 - when_gt(x, y);
}

vec2 when_eq(vec2 x, vec2 y) {
  return 1.0 - abs(sign(x - y));
}

vec2 when_neq(vec2 x, vec2 y) {
  return abs(sign(x - y));
}

vec2 when_gt(vec2 x, vec2 y) {
  return max(sign(x - y), 0.0);
}

vec2 when_lt(vec2 x, vec2 y) {
  return max(sign(y - x), 0.0);
}

vec2 when_ge(vec2 x, vec2 y) {
  return 1.0 - when_lt(x, y);
}

vec2 when_le(vec2 x, vec2 y) {
  return 1.0 - when_gt(x, y);
}

float when_eq(float x, float y) {
  return 1.0 - abs(sign(x - y));
}

float when_neq(float x, float y) {
  return abs(sign(x - y));
}

float when_gt(float x, float y) {
  return max(sign(x - y), 0.0);
}

float when_lt(float x, float y) {
  return max(sign(y - x), 0.0);
}

float when_ge(float x, float y) {
  return 1.0 - when_lt(x, y);
}

float when_le(float x, float y) {
  return 1.0 - when_gt(x, y);
}

vec4 and(vec4 a, vec4 b) {
  return a * b;
}

vec4 or(vec4 a, vec4 b) {
  return min(a + b, 1.0);
}

vec4 not(vec4 a) {
  return 1.0 - a;
}

vec3 and(vec3 a, vec3 b) {
  return a * b;
}

vec3 or(vec3 a, vec3 b) {
  return min(a + b, 1.0);
}

vec3 not(vec3 a) {
  return 1.0 - a;
}

vec2 and(vec2 a, vec2 b) {
  return a * b;
}

vec2 or(vec2 a, vec2 b) {
  return min(a + b, 1.0);
}


vec2 not(vec2 a) {
  return 1.0 - a;
}

float and(float a, float b) {
  return a * b;
}

float or(float a, float b) {
  return min(a + b, 1.0);
}

float not(float a) {
  return 1.0 - a;
}{@}curl.glsl{@}#require(simplex3d.glsl)

vec3 snoiseVec3( vec3 x ){
    
    float s  = snoise(vec3( x ));
    float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
    float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
    vec3 c = vec3( s , s1 , s2 );
    return c;
    
}


vec3 curlNoise( vec3 p ){
    
    const float e = 1e-1;
    vec3 dx = vec3( e   , 0.0 , 0.0 );
    vec3 dy = vec3( 0.0 , e   , 0.0 );
    vec3 dz = vec3( 0.0 , 0.0 , e   );
    
    vec3 p_x0 = snoiseVec3( p - dx );
    vec3 p_x1 = snoiseVec3( p + dx );
    vec3 p_y0 = snoiseVec3( p - dy );
    vec3 p_y1 = snoiseVec3( p + dy );
    vec3 p_z0 = snoiseVec3( p - dz );
    vec3 p_z1 = snoiseVec3( p + dz );
    
    float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
    float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
    float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;
    
    const float divisor = 1.0 / ( 2.0 * e );
    return normalize( vec3( x , y , z ) * divisor );
}{@}desaturate.fs{@}vec3 desaturate(vec3 color, float amount) {
    vec3 gray = vec3(dot(vec3(0.2126,0.7152,0.0722), color));
    return vec3(mix(color, gray, amount));
}{@}dnormal.fs{@}vec3 getDNormal(vec3 viewPos) {
    vec3 dfx = vec3(0.0);
    vec3 dfy = vec3(0.0);

    dfx.x = dFdx(viewPos.x);
    dfx.y = dFdx(viewPos.y);
    dfx.z = dFdx(viewPos.z);

    dfy.x = dFdy(viewPos.x);
    dfy.y = dFdy(viewPos.y);
    dfy.z = dFdy(viewPos.z);

    return cross(dfx, dfy);
}{@}gaussianblur.fs{@}vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.411764705882353) * direction;
  vec2 off2 = vec2(3.2941176470588234) * direction;
  vec2 off3 = vec2(5.176470588235294) * direction;
  color += texture2D(image, uv) * 0.1964825501511404;
  color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
  color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
  return color;
}

vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3333333333333333) * direction;
  color += texture2D(image, uv) * 0.29411764705882354;
  color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
  color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
  return color;
}

vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(image, uv) * 0.2270270270;
  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
  return color;
}{@}GLUIObject.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform float alpha;

#!VARYINGS
varying vec2 vUv;

#!SHADER: GLUIObject.vs
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: GLUIObject.fs
void main() {
    gl_FragColor = texture2D(tMap, vUv);
    gl_FragColor.a *= alpha;
}{@}GLUIObjectMask.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform float alpha;
uniform vec4 mask;

#!VARYINGS
varying vec2 vUv;
varying vec2 vWorldPos;

#!SHADER: GLUIObjectMask.vs
void main() {
    vUv = uv;
    vWorldPos = (modelMatrix * vec4(position.xy, 0.0, 1.0)).xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: GLUIObjectMask.fs
void main() {
    gl_FragColor = texture2D(tMap, vUv);
    gl_FragColor.a *= alpha;

    if (vWorldPos.x > mask.x + mask.z) discard;
    if (vWorldPos.x < mask.x) discard;
    if (vWorldPos.y > mask.y) discard;
    if (vWorldPos.y < mask.y - mask.w) discard;
}{@}luma.fs{@}float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float luma(vec4 color) {
  return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}{@}matcap.vs{@}vec2 reflectMatcap(vec3 position, mat4 modelViewMatrix, mat3 normalMatrix, vec3 normal) {
    vec4 p = vec4(position, 1.0);
    
    vec3 e = normalize(vec3(modelViewMatrix * p));
    vec3 n = normalize(normalMatrix * normal);
    vec3 r = reflect(e, n);
    float m = 2.0 * sqrt(
        pow(r.x, 2.0) +
        pow(r.y, 2.0) +
        pow(r.z + 1.0, 2.0)
    );
    
    vec2 uv = r.xy / m + .5;
    
    return uv;
}

vec2 reflectMatcap(vec3 position, mat4 modelViewMatrix, vec3 normal) {
    vec4 p = vec4(position, 1.0);
    
    vec3 e = normalize(vec3(modelViewMatrix * p));
    vec3 n = normalize(normal);
    vec3 r = reflect(e, n);
    float m = 2.0 * sqrt(
                         pow(r.x, 2.0) +
                         pow(r.y, 2.0) +
                         pow(r.z + 1.0, 2.0)
                         );
    
    vec2 uv = r.xy / m + .5;
    
    return uv;
}{@}normalmap.glsl{@}vec3 unpackNormal( vec3 eye_pos, vec3 surf_norm, sampler2D normal_map, float intensity, float scale, vec2 uv ) {
    surf_norm = normalize(surf_norm);
    
    vec3 q0 = dFdx( eye_pos.xyz );
    vec3 q1 = dFdy( eye_pos.xyz );
    vec2 st0 = dFdx( uv.st );
    vec2 st1 = dFdy( uv.st );
    
    vec3 S = normalize( q0 * st1.t - q1 * st0.t );
    vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
    vec3 N = normalize( surf_norm );
    
    vec3 mapN = texture2D( normal_map, uv * scale ).xyz * 2.0 - 1.0;
    mapN.xy *= intensity;
    mat3 tsn = mat3( S, T, N );
    return normalize( tsn * mapN );
}

//mvPosition.xyz, normalMatrix * normal, normalMap, scale, uv{@}parallaxmap.fs{@}vec2 processParallaxMap( in vec3 V, vec2 uv, float pScale, float pMinLayers,  float pMaxLayers, sampler2D displacementMap) {

    // Determine number of layers from angle between V and N
    float numLayers = mix( pMaxLayers, pMinLayers, abs( dot( vec3( 0.0, 0.0, 1.0 ), V ) ) );

    float layerHeight = 1.0 / numLayers;
    float currentLayerHeight = 0.0;
    // Shift of texture coordinates for each iteration
    vec2 dtex = pScale * V.xy / V.z / numLayers;

    vec2 currentTextureCoords = uv;

    float heightFromTexture = texture2D( displacementMap, currentTextureCoords ).r;

    // while ( heightFromTexture > currentLayerHeight )
    // Infinite loops are not well supported. Do a "large" finite
    // loop, but not too large, as it slows down some compilers.
    for ( int i = 0; i < 30; i += 1 ) {
        if ( heightFromTexture <= currentLayerHeight ) {
            break;
        }
        currentLayerHeight += layerHeight;
        // Shift texture coordinates along vector V
        currentTextureCoords -= dtex;
        heightFromTexture = texture2D( displacementMap, currentTextureCoords ).r;
    }

    vec2 deltaTexCoord = dtex / 2.0;
    float deltaHeight = layerHeight / 2.0;

    // Return to the mid point of previous layer
    currentTextureCoords += deltaTexCoord;
    currentLayerHeight -= deltaHeight;

    // Binary search to increase precision of Steep Parallax Mapping
    const int numSearches = 5;
    for ( int i = 0; i < numSearches; i += 1 ) {

        deltaTexCoord /= 2.0;
        deltaHeight /= 2.0;
        heightFromTexture = texture2D( displacementMap, currentTextureCoords ).r;
        // Shift along or against vector V
        if( heightFromTexture > currentLayerHeight ) { // Below the surface

            currentTextureCoords -= deltaTexCoord;
            currentLayerHeight += deltaHeight;

        } else { // above the surface

            currentTextureCoords += deltaTexCoord;
            currentLayerHeight -= deltaHeight;

        }

    }
    return currentTextureCoords;

}

vec2 parallaxMap( vec3 surfPosition, vec3 surfNormal, vec3 viewPosition, vec2 uv, float scale, float minLayers, float maxLayers, sampler2D displacementMap ) {

    vec2 texDx = dFdx( uv );
    vec2 texDy = dFdy( uv );

    vec3 vSigmaX = dFdx( surfPosition );
    vec3 vSigmaY = dFdy( surfPosition );
    vec3 vR1 = cross( vSigmaY, surfNormal );
    vec3 vR2 = cross( surfNormal, vSigmaX );
    float fDet = dot( vSigmaX, vR1 );

    vec2 vProjVscr = ( 1.0 / fDet ) * vec2( dot( vR1, viewPosition ), dot( vR2, viewPosition ) );
    vec3 vProjVtex;
    vProjVtex.xy = texDx * vProjVscr.x + texDy * vProjVscr.y;
    vProjVtex.z = dot( surfNormal, viewPosition );

    return processParallaxMap( vProjVtex, uv, scale, minLayers, maxLayers, displacementMap );

} //mvPosition.xyz, normal, normalize(-mvPosition), vUv, scale, minLayers, maxLayers, displacementMap

vec3 unpackParallaxNormal( vec3 eye_pos, vec3 surf_norm, sampler2D normalMap, vec2 uv ) {

    vec3 q0 = dFdx( eye_pos.xyz );
    vec3 q1 = dFdy( eye_pos.xyz );
    vec2 st0 = dFdx( vUv.st );
    vec2 st1 = dFdy( vUv.st );

    vec3 S = normalize( q0 * st1.t - q1 * st0.t );
    vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
    vec3 N = normalize( surf_norm );

    vec3 mapN = texture2D( normalMap, uv ).xyz * 2.0 - 1.0;
//    vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
//    mapN.xy = normalScale * mapN.xy;
    mapN.xy = 1.0 * mapN.xy;
    mat3 tsn = mat3( S, T, N );
    return normalize( tsn * mapN );

} //mvPosition.xyz, normal, normalMap, parallaxMapUV
{@}phong.fs{@}#define saturate(a) clamp( a, 0.0, 1.0 )

float dPhong(float shininess, float dotNH) {
    return (shininess * 0.5 + 1.0) * pow(dotNH, shininess);
}

vec3 schlick(vec3 specularColor, float dotLH) {
    float fresnel = exp2((-5.55437 * dotLH - 6.98316) * dotLH);
    return (1.0 - specularColor) * fresnel + specularColor;
}

vec3 calcBlinnPhong(vec3 specularColor, float shininess, vec3 normal, vec3 lightDir, vec3 viewDir) {
    vec3 halfDir = normalize(lightDir + viewDir);
    
    float dotNH = saturate(dot(normal, halfDir));
    float dotLH = saturate(dot(lightDir, halfDir));
    
    vec3 F = schlick(specularColor, dotLH);
    float G = 0.85;
    float D = dPhong(shininess, dotNH);
    
    return F * G * D;
}

vec3 phong(float amount, vec3 diffuse, vec3 specular, float shininess, float attenuation, vec3 normal, vec3 lightDir, vec3 viewDir) {
    float cosineTerm = saturate(dot(normal, lightDir));
    vec3 brdf = calcBlinnPhong(specular, shininess, normal, lightDir, viewDir);
    return brdf * amount * diffuse * attenuation * cosineTerm;
}

vec3 phong(float amount, vec3 diffuse, vec3 specular, float shininess, float attenuation, vec3 normal, vec3 lightDir, vec3 viewDir, float minThreshold) {
    float cosineTerm = saturate(range(dot(normal, lightDir), 0.0, 1.0, minThreshold, 1.0));
    vec3 brdf = calcBlinnPhong(specular, shininess, normal, lightDir, viewDir);
    return brdf * amount * diffuse * attenuation * cosineTerm;
}

//viewDir = -mvPosition.xyz
//lightDir = normalize(lightPos){@}range.glsl{@}float range(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
    float oldRange = oldMax - oldMin;
    float newRange = newMax - newMin;
    return (((oldValue - oldMin) * newRange) / oldRange) + newMin;
}

float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
    return clamp(range(oldValue, oldMin, oldMax, newMin, newMax), min(newMax, newMin), max(newMin, newMax));
}
{@}RayTraceBackground.glsl{@}#!ATTRIBUTES

#!UNIFORMS

uniform vec2 uResolution;
uniform float uTime;

uniform float uDiffuse;
uniform float uFOV;
uniform vec3 uBaseColor;
uniform vec2 uRotSpeed;

#define NUM_COLORS __NUM_BG_COLORS__
uniform vec3 uColor[__NUM_BG_COLORS__];
uniform vec2 uRotation[__NUM_BG_COLORS__];
uniform float uStrength[__NUM_BG_COLORS__];
uniform float uOpacity[__NUM_BG_COLORS__];
uniform float uSpread[__NUM_BG_COLORS__];
uniform float uFalloff[__NUM_BG_COLORS__];

#!VARYINGS

#!SHADER: RayTraceBackground.vs

void main() {
    gl_Position = vec4(position, 1.0);
}

#!SHADER: RayTraceBackground.fs

#define BLUR_ITERATIONS 1

const float PI = 3.141592653589793;
const float TAU = 6.283185307179586;

const mat3 IDENTITY = mat3(
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0
);

highp float random(vec2 co) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt = dot(co.xy, vec2(a, b));
    highp float sn = mod(dt, 3.14);
    return fract(sin(sn) * c);
}

mat3 rotateX(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat3(
        1.0, 0.0, 0.0,
        0.0, c, s,
        0.0, -s, c
    );
}

mat3 rotateY(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
    );
}

float sineInOut(float t) {
  return -0.5 * (cos(PI * t) - 1.0);
}

vec2 diffuse(vec2 v, float s, inout vec2 r) {
    r = fract(r * vec2(12.9898, 78.233));
    return v + vec2(s) * sqrt(r.x + .001) * vec2(sin(r.y * TAU), cos(r.y * TAU));
}

void blendColor(vec3 dir, inout vec3 c, vec3 c1, vec2 r, float opacity, float spread, float falloff) {
    vec3 p = vec3(0.0, 0.0, -1.0);
    p *= rotateX(r.x * TAU);
    p *= rotateY(r.y * TAU);
    falloff = max(0.001, falloff * 2.0);
    spread = sineInOut(spread); // Ease to give more control at points
    opacity *= smoothstep(-1.0 + spread * 2.0 + falloff * 0.5, max(-1.0, -1.0 + spread * 2.0 - falloff * 0.5), -dot(dir, normalize(p)));
	c = mix(c, c1, opacity);
}

vec3 gradient(vec3 dir) {
	vec3 c = uBaseColor;
    for (int i = 0; i < NUM_COLORS; i++) {
	    blendColor(dir, c, uColor[i] * uStrength[i], uRotation[i], uOpacity[i], uSpread[i], uFalloff[i]);
    }
	return c;
}

vec3 diffuseBackground(vec2 uv) {
    uv -= 0.5;
    uv *= -1.0;
    vec3 c = vec3(0.0);
    vec2 r = vec2(random(uv));
    float s = uDiffuse;
    vec2 rot = uRotSpeed * uTime;
    float fov = uFOV;
	for (int i = 0; i < BLUR_ITERATIONS; i++) {
        vec3 dir = normalize(vec3(diffuse(uv, s, r) * fov, 1.0)__MOUSE_CONTROLS__);
        dir *= rotateY(rot.y * TAU);
        dir *= rotateX(rot.x * TAU);
        c += gradient(dir) / float(BLUR_ITERATIONS);
    }
    return c;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv.x -= 0.5;
    uv.x *= uResolution.x / uResolution.y;
    uv.x += 0.5;

	gl_FragColor.rgb = diffuseBackground(uv);
    gl_FragColor.a = 1.0;
}
{@}rgb2hsv.fs{@}vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}{@}rgbshift.fs{@}vec4 getRGB(sampler2D tDiffuse, vec2 uv, float angle, float amount) {
    vec4 texel;
    #test Tests.renderRGB()
        vec2 offset = vec2(cos(angle), sin(angle)) * amount;
        vec4 r = texture2D(tDiffuse, uv + offset);
        vec4 g = texture2D(tDiffuse, uv);
        vec4 b = texture2D(tDiffuse, uv - offset);
        texel = vec4(r.r, g.g, b.b, g.a);
    #endtest

    #test !Tests.renderRGB()
        texel = texture2D(tDiffuse, uv);
    #endtest

    return texel;
}

vec4 getRGB(sampler2D tDiffuse, vec2 uv, float angle, float amount, vec4 g) {
    vec4 texel;
    #test Tests.renderRGB()
        vec2 offset = vec2(cos(angle), sin(angle)) * amount;
        vec4 r = texture2D(tDiffuse, uv + offset);
        vec4 b = texture2D(tDiffuse, uv - offset);
        texel = vec4(r.r, g.g, b.b, g.a);
    #endtest

    #test !Tests.renderRGB()
        texel = g;
    #endtest

    return texel;
}{@}screenprojection.glsl{@}vec2 applyProjection(vec3 pos, mat4 projMatrix, vec2 resolution) {
    float x = pos.x;
    float y = pos.y;
    float z = pos.z;

    mat4 e = projMatrix;

    float d = 1.0 / ( e[0][3] * x + e[1][3] * y + e[2][3] * z + e[3][3] );

    x = ( e[0][0] * x + e[1][0] * y + e[2][0] * z + e[3][0] ) * d;
    y = ( e[0][1] * x + e[1][1] * y + e[2][1] * z + e[3][1] ) * d;
    z = ( e[0][2] * x + e[1][2] * y + e[2][2] * z + e[3][2] ) * d;

    vec2 screen = vec2(0.0);
    screen.x = (x + 1.0) / 2.0 * resolution.x;
    screen.y = -(y - 1.0) / 2.0 * resolution.y;
    return vec2(x, y);
}{@}ScreenQuad.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;

#!VARYINGS
varying vec2 vUv;

#!SHADER: ScreenQuad.vs
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}

#!SHADER: ScreenQuad.fs
void main() {
    gl_FragColor = texture2D(tMap, vUv);
}{@}WorldQuad.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;

#!VARYINGS
varying vec2 vUv;

#!SHADER: WorldQuad.vs
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: WorldQuad.fs
void main() {
    gl_FragColor = texture2D(tMap, vUv);
}{@}SDFText.fs{@}uniform sampler2D map;
uniform float opacity;
uniform float count;
uniform vec3 color;

varying vec2 vUv;
varying float vLetter;

float aastep(float threshold, float value) {
    #ifdef GL_OES_standard_derivatives
        float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
        return smoothstep(threshold-afwidth, threshold+afwidth, value);
    #else
        return step(threshold, value);
    #endif
}

#require(range.glsl)

void main() {
    vec4 texColor = texture2D(map, vUv);
    float sdf = texColor.a;
    float alpha = aastep(0.5, sdf);

    float index = vLetter / count;

    gl_FragColor = vec4(color, alpha);
    gl_FragColor *= opacity;

    if (gl_FragColor.a < 0.001) discard;
}{@}SDFText.vs{@}attribute vec3 offset;
attribute vec4 orientation;
attribute float scale;
attribute float letter;
uniform float opacity;
uniform float count;

varying vec2 vUv;
varying float vLetter;

#require(range.glsl)

void main() {
    vUv = uv;
    vLetter = letter;

    vec3 pos = position;

    float index = vLetter / count;
    float transition = pow(1.0 - max(0.0, min(1.0, range(opacity, index * 0.6, index * 0.6 + 0.4, 0.0, 1.0))), 2.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}{@}simplenoise.glsl{@}const float PI = 3.141592653589793;
const float TAU = 6.283185307179586;

float getNoise(vec2 uv, float time) {
    float x = uv.x * uv.y * time * 1000.0;
    x = mod(x, 13.0) * mod(x, 123.0);
    float dx = mod(x, 0.01);
    float amount = clamp(0.1 + dx * 100.0, 0.0, 1.0);
    return amount;
}

highp float getRandom(vec2 co, float time) {
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt = dot(co.xy, vec2(a, b));
    highp float sn = mod(time, 3.14);
    return fract(sin(sn) * c);
}

float cnoise(vec3 v) {
    float t = v.z * 0.3;
    v.y *= 0.8;
    float noise = 0.0;
    float s = 0.5;
    noise += range(sin(v.x * 0.9 / s + t * 10.0) + sin(v.x * 2.4 / s + t * 15.0) + sin(v.x * -3.5 / s + t * 4.0) + sin(v.x * -2.5 / s + t * 7.1), -1.0, 1.0, -0.3, 0.3);
    noise += range(sin(v.y * -0.3 / s + t * 18.0) + sin(v.y * 1.6 / s + t * 18.0) + sin(v.y * 2.6 / s + t * 8.0) + sin(v.y * -2.6 / s + t * 4.5), -1.0, 1.0, -0.3, 0.3);
    return noise;
}

float cnoise(vec2 v) {
    float t = v.x * 0.3;
    v.y *= 0.8;
    float noise = 0.0;
    float s = 0.5;
    noise += range(sin(v.x * 0.9 / s + t * 10.0) + sin(v.x * 2.4 / s + t * 15.0) + sin(v.x * -3.5 / s + t * 4.0) + sin(v.x * -2.5 / s + t * 7.1), -1.0, 1.0, -0.3, 0.3);
    noise += range(sin(v.y * -0.3 / s + t * 18.0) + sin(v.y * 1.6 / s + t * 18.0) + sin(v.y * 2.6 / s + t * 8.0) + sin(v.y * -2.6 / s + t * 4.5), -1.0, 1.0, -0.3, 0.3);
    return noise;
}{@}simplex2d.glsl{@}//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
{
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    // First corner
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    
    // Other corners
    vec2 i1;
    //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
    //i1.y = 1.0 - i1.x;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    // x0 = x0 - 0.0 + 0.0 * C.xx ;
    // x1 = x0 - i1 + 1.0 * C.xx ;
    // x2 = x0 - 1.0 + 2.0 * C.xx ;
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    
    // Permutations
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                     + i.x + vec3(0.0, i1.x, 1.0 ));
    
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    
    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
    
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    
    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    
    // Compute final noise value at P
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}{@}simplex3d.glsl{@}// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

    i = mod289(i);
    vec4 p = permute( permute( permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

//float surface(vec3 coord) {
//    float n = 0.0;
//    n += 1.0 * abs(snoise(coord));
//    n += 0.5 * abs(snoise(coord * 2.0));
//    n += 0.25 * abs(snoise(coord * 4.0));
//    n += 0.125 * abs(snoise(coord * 8.0));
//    float rn = 1.0 - n;
//    return rn * rn;
//}{@}lights.fs{@}vec3 worldLight(vec3 pos, vec3 vpos) {
    vec4 mvPos = modelViewMatrix * vec4(vpos, 1.0);
    vec4 worldPosition = viewMatrix * vec4(pos, 1.0);
    return worldPosition.xyz - mvPos.xyz;
}{@}lights.glsl{@}vec3 worldLight(vec3 pos) {
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vec4 worldPosition = viewMatrix * vec4(pos, 1.0);
    return worldPosition.xyz - mvPos.xyz;
}

vec3 worldLight(vec3 lightPos, vec3 localPos) {
    vec4 mvPos = modelViewMatrix * vec4(localPos, 1.0);
    vec4 worldPosition = viewMatrix * vec4(lightPos, 1.0);
    return worldPosition.xyz - mvPos.xyz;
}

vec3 transformNormal(vec4 orientation) {
    vec3 n = normal;
    vec3 ncN = cross(orientation.xyz, n);
    n = ncN * (2.0 * orientation.w) + (cross(orientation.xyz, ncN) * 2.0 + n);
    return n;
}{@}shadow.fs{@}#chunk(common);
#chunk(bsdfs);
#chunk(packing);
#chunk(lights_pars);
#chunk(shadowmap_pars_fragment);

varying vec3 vNormal;


float getShadowValue() {
    float shadow = 1.0;
//    #ifdef USE_SHADOWMAP

    #if ( NUM_POINT_LIGHTS > 0 )

	    PointLight pointLight;

	    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		    pointLight = pointLights[ i ];

		    float shadowValue = getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] );
		    shadowValue += 1.0 - step(0.002, dot(pointLight.position, vNormal));
		    shadowValue = clamp(shadowValue, 0.0, 1.0);
		    shadow *= shadowValue;

	    }

    #endif

    #if ( NUM_DIR_LIGHTS > 0 )

        IncidentLight directLight;
        DirectionalLight directionalLight;

        for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

            directionalLight = directionalLights[ i ];

            float shadowValue = getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] );
            shadowValue += (1.0 - step(0.002, dot(directionalLight.direction, vNormal))) * clamp(length(vNormal), 0.0, 1.0);
            shadowValue = clamp(shadowValue, 0.0, 1.0);
            shadow *= shadowValue;
        }

    #endif

//    #endif

    return shadow;
}{@}shadow.vs{@}vNormal = normalMatrix * normal;

vec4 worldPosition = modelMatrix * vec4(position, 1.0);
#chunk(shadowmap_vertex);{@}shadowparam.vs{@}#chunk(shadowmap_pars_vertex);

varying vec3 vNormal;{@}transformUV.glsl{@}vec2 transformUV(vec2 uv, float a[9]) {

    // Convert UV to vec3 to apply matrices
	vec3 u = vec3(uv, 1.0);

    // Array consists of the following
    // 0 translate.x
    // 1 translate.y
    // 2 skew.x
    // 3 skew.y
    // 4 rotate
    // 5 scale.x
    // 6 scale.y
    // 7 origin.x
    // 8 origin.y

    // Origin before matrix
    mat3 mo1 = mat3(
        1, 0, -a[7],
        0, 1, -a[8],
        0, 0, 1);

    // Origin after matrix
    mat3 mo2 = mat3(
        1, 0, a[7],
        0, 1, a[8],
        0, 0, 1);

    // Translation matrix
    mat3 mt = mat3(
        1, 0, -a[0],
        0, 1, -a[1],
    	0, 0, 1);

    // Skew matrix
    mat3 mh = mat3(
        1, a[2], 0,
        a[3], 1, 0,
    	0, 0, 1);

    // Rotation matrix
    mat3 mr = mat3(
        cos(a[4]), sin(a[4]), 0,
        -sin(a[4]), cos(a[4]), 0,
    	0, 0, 1);

    // Scale matrix
    mat3 ms = mat3(
        1.0 / a[5], 0, 0,
        0, 1.0 / a[6], 0,
    	0, 0, 1);

	// apply translation
   	u = u * mt;

	// apply skew
   	u = u * mh;

    // apply rotation relative to origin
    u = u * mo1;
    u = u * mr;
    u = u * mo2;

    // apply scale relative to origin
    u = u * mo1;
    u = u * ms;
    u = u * mo2;

    // Return vec2 of new UVs
    return u.xy;
}

vec2 rotateUV(vec2 uv, float r) {
    float a[9];
    a[0] = 0.0;
    a[1] = 0.0;
    a[2] = 0.0;
    a[3] = 0.0;
    a[4] = r;
    a[5] = 1.0;
    a[6] = 1.0;
    a[7] = 0.5;
    a[8] = 0.5;

    return transformUV(uv, a);
}

vec2 translateUV(vec2 uv, vec2 translate) {
    float a[9];
    a[0] = translate.x;
    a[1] = translate.y;
    a[2] = 0.0;
    a[3] = 0.0;
    a[4] = 0.0;
    a[5] = 1.0;
    a[6] = 1.0;
    a[7] = 0.5;
    a[8] = 0.5;

    return transformUV(uv, a);
}

vec2 scaleUV(vec2 uv, vec2 scale) {
    float a[9];
    a[0] = 0.0;
    a[1] = 0.0;
    a[2] = 0.0;
    a[3] = 0.0;
    a[4] = 0.0;
    a[5] = scale.x;
    a[6] = scale.y;
    a[7] = 0.5;
    a[8] = 0.5;

    return transformUV(uv, a);
}
vec2 scaleUV(vec2 uv, vec2 scale, vec2 origin) {
    float a[9];
    a[0] = 0.0;
    a[1] = 0.0;
    a[2] = 0.0;
    a[3] = 0.0;
    a[4] = 0.0;
    a[5] = scale.x;
    a[6] = scale.y;
    a[7] = origin.x;
    a[8] = origin.x;

    return transformUV(uv, a);
}{@}FlatNoise.fs{@}uniform float speed;

#require(curl.glsl)

void main() {
    vec2 uv = getUV();
    vec3 pos = getData(tInput, uv);

    vec3 curl = curlNoise(pos * 0.002);

    pos += curl * 2.0;
    pos.y += 2.5;

    gl_FragColor = vec4(pos, 1.0);
}{@}ParticleTestMesh.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;

#!VARYINGS
varying vec2 vUv;

#!SHADER: ParticleTestMesh.vs
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: ParticleTestMesh.fs
void main() {
    gl_FragColor = texture2D(tMap, vUv);
}{@}LogoTexture.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform sampler2D tNormal;
uniform float uAlpha;
uniform float uTransition;

#!VARYINGS
varying vec2 vUv;

#!SHADER: LogoTexture.vs
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: LogoTexture.fs

#require(range.glsl)

void main() {
    vec2 uv = vUv;
    vec2 normal = texture2D(tNormal, vUv).xy;
    normal.x = range(normal.x, 0.0, 1.0, -1.0, 1.0);
    normal.y = range(normal.y, 0.0, 1.0, -1.0, 1.0);

    uv += normal * 0.04 * uTransition;

    gl_FragColor = texture2D(tMap, uv) * uAlpha;
}{@}VideoCanvas.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform float uX;
uniform float uY;
uniform float uScale;

#!VARYINGS
varying vec2 vUv;

#!SHADER: VideoCanvas.vs

#require(transformUV.glsl)
#require(range.glsl)

void main() {
    vUv = uv;

    vec2 origin = vec2(-uX, uY);

    vUv = scaleUV(vUv, vec2(uScale));
    vUv += origin;

    gl_Position = vec4(position, 1.0);
}

#!SHADER: VideoCanvas.fs
void main() {
    gl_FragColor = texture2D(tMap, vUv);
}{@}AboutTreatment.fs{@}uniform sampler2D tLights;
uniform sampler2D tRain;
uniform sampler2D tLogo;
uniform sampler2D tInteraction;
uniform sampler2D tNormal;
uniform float uTime;
uniform float uLightAdd;
uniform float uRainRefraction;
uniform vec3 uColor;
uniform float uColorBlend;
uniform float uDPR;
uniform float uTransition;
uniform float uTransitionDir;
uniform float uShowLogo;
uniform float uInteractionScale;

#require(conditionals.glsl)
#require(transformUV.glsl)
#require(range.glsl)
#require(rgb2hsv.fs)
#require(simplenoise.glsl)
#require(simplex2d.glsl)
#require(rgbshift.fs)
#require(treatment.fs)

void applyRain(float rain, float vignette, inout vec2 uv) {
    uv.x += uRainRefraction*0.1 * smoothstep(0.05, 0.2, rain) * vignette;
    uv.y += uRainRefraction*0.1 * smoothstep(0.05, 0.2, rain) * vignette;
    uv.x += uRainRefraction*0.05 * rain * vignette;
    uv.y += uRainRefraction*0.05 * rain * vignette;

    uv = scaleUV(uv, vec2(range(rain * vignette, 0.0, 1.0, 1.0, 0.97)), uv);
}

void main() {
    vec2 uv = vUv;
    vec3 trans = transition();

    vec2 v = vUv - vec2(0.5);
    float dist = length(v);
    float vign = crange(dist, 0.3, 0.5, 0.0, 1.0);
    float angle = atan(v.y, v.x);

    float rainRGB = 0.0;
    #test Tests.renderRain()
        float rain = crange(texture2D(tRain, uv).r, 0.05, 1.0, 0.0, 1.0);
        applyRain(rain, vign, uv);
        rainRGB = rain * 0.001 * vign;
    #endtest

//    #test Tests.renderInteraction()
//        vec2 normal = texture2D(tNormal, vUv).xy;
//        float interaction = texture2D(tInteraction, vUv).r;
//        interaction = crange(interaction, 0.2, 1.0, 0.0, 1.0) * uInteractionScale;
//
//        uv.x += range(normal.x, 0.0, 1.0, -1.0, 1.0) * 0.05 * interaction;
//        uv.y += range(normal.y, 0.0, 1.0, -1.0, 1.0) * 0.05 * interaction;
//    #endtest

    vec3 color = getRGB(tDiffuse, uv, 0.01, 0.0007 + rainRGB).rgb;
    color += texture2D(tLights, uv).rgb * uLightAdd;

    vignette(color);

    color = mix(color, vec3(0.0), 1.0 - trans.y);

    gl_FragColor = vec4(color, 1.0);
}{@}Composite.fs{@}uniform sampler2D tNormals;
uniform sampler2D tMVPos;
uniform sampler2D tPositions;
uniform sampler2D tDepth;
uniform sampler2D tLight0;
uniform sampler2D tLight1;
uniform sampler2D tLight2;
uniform sampler2D tFog;
uniform sampler2D tInteraction;
uniform sampler2D tLogo;
uniform float uFadeTransition;
uniform float uTime;
uniform float uShowLogo;
uniform float uLightStrength;
uniform float uHoldInteraction;
uniform float uHoldTransition;
uniform float uBounceStrength;
uniform float uFogStrength;
uniform float uFogOverlay;
uniform float uFogScreen;
uniform float uColorBlend;
uniform vec3 uFogColor;
uniform vec3 uColor;
uniform float uTransition;
uniform float uTransitionDir;
uniform float uDPR;
uniform float uRainRefraction;
uniform sampler2D tNormal;
uniform sampler2D tRain;
uniform float uInteractionScale;
uniform mat4 modelViewMatrix;

#require(blendmodes.glsl)
#require(conditionals.glsl)
#require(range.glsl)
#require(phong.fs)
#require(simplex2d.glsl)
#require(simplenoise.glsl)
#require(transformUV.glsl)
#require(treatment.fs)
#require(luma.fs)
#require(rgbshift.fs)

void applyRain(float rain, float vignette, inout vec2 uv) {
    uv.x += uRainRefraction*0.1 * smoothstep(0.05, 0.2, rain) * vignette;
    uv.y += uRainRefraction*0.1 * smoothstep(0.05, 0.2, rain) * vignette;
    uv.x += uRainRefraction*0.05 * rain * vignette;
    uv.y += uRainRefraction*0.05 * rain * vignette;

    uv = scaleUV(uv, vec2(range(rain * vignette, 0.0, 1.0, 1.0, 0.97)), uv);
}

vec3 calcLighting(vec3 worldPos, vec3 mvPos, float depth, vec3 normal, vec2 uv, vec4 light0, vec4 light1) {
    vec3 lightColor = light0.rgb;
    float lightMask = max(0.0, light0.w);
    float lightRadius = 30.0;

    vec3 lightPos = light1.xyz;
    float lightDepth = light1.w;

    float falloff = crange(length(worldPos - lightPos), 0.0, lightRadius, 1.0, 0.0);
    lightPos = lightPos - (modelViewMatrix * vec4(worldPos, 1.0)).xyz;
    float volume = max(0.0, dot(normalize(lightPos), normalize(normal)));

    falloff = when_lt(light0.w, 1.5);//pow(falloff, 2.0);

    float fade = crange(lightDepth, 0.5, 0.0, 1.0, 0.0);

    vec3 lightAdd = lightColor * volume * lightMask * falloff * 1.5;
    return mix(lightAdd, vec3(0.0), when_lt(lightDepth, depth));
}

void applyFog(inout vec3 color, float depth, vec4 light1, vec4 light0, vec2 uv) {
    float fog = texture2D(tFog, uv).a;

    vec3 bFogColor = rgb2hsv(uFogColor);
    bFogColor.z = 0.9;
    bFogColor = hsv2rgb(bFogColor);

    float lightDepth = light1.w;
    vec3 lightAdd = texture2D(tLight2, uv).rgb;
    vec3 fogColor = vec3(fog) * bFogColor;
    fogColor = mix(fogColor, fogColor * lightAdd, length(lightAdd));

    vec3 fogMix = fogColor * uFogStrength * crange(length(lightAdd), 0.2, 1.0, 0.5, 1.0);
    vec3 colorWithFog = blendOverlay(color, fogMix * uFogOverlay);
    colorWithFog = mix(colorWithFog, blendScreen(colorWithFog, fogMix), uFogScreen);

    float texelBrightness = rgb2hsv(color).z;

    color = mix(color, colorWithFog, 1.0 - texelBrightness);

    color += lightAdd * uLightStrength;
//    color += lightAdd * fog * 0.1;

    vec2 buv = vec2(0.0);
    buv.x = 1.0 - vUv.x;
    buv.y = 1.0 - vUv.y;
    vec3 bounceLight = texture2D(tLight2, buv).rgb;
    color += bounceLight * uBounceStrength;
}

void main() {
    vec2 uv = vUv;

    vec3 trans = transition();
//    uv.y -= trans.x * 0.2 * trans.z;

    vec2 normal = texture2D(tNormal, vUv).xy;

    float interaction = 1.0;
    float strength = 0.002;
    #test Tests.renderInteraction()
        interaction = texture2D(tInteraction, vUv).r;
        interaction = crange(interaction, 0.2, 1.0, 0.0, 1.0) * uInteractionScale;

        uv.x += range(normal.x, 0.0, 1.0, -1.0, 1.0) * 0.1 * interaction * mix(1.0, 2.0, uHoldInteraction);
        uv.y += range(normal.y, 0.0, 1.0, -1.0, 1.0) * 0.1 * interaction * mix(1.0, 2.0, uHoldInteraction);

        strength = (0.002 * crange(interaction, 0.0, 1.0, 0.6, 5.0)) * 0.7;
    #endtest

    float dist = length(vec2(0.5) - vUv);
    float vign = crange(dist, 0.3, 0.5, 0.0, 1.0);

    #test Tests.renderRain()
        float rain = crange(texture2D(tRain, uv).r, 0.05, 1.0, 0.0, 1.0);
        applyRain(rain, vign, uv);
    #endtest

    uv.x += range(normal.x, 0.0, 1.0, -1.0, 1.0) * 0.04 * uHoldTransition;
    uv.y += range(normal.y, 0.0, 1.0, -1.0, 1.0) * 0.04 * uHoldTransition;

//    uv.x += range(normal.x, 0.0, 1.0, -1.0, 1.0) * 0.1 * trans.z;
//    uv.y += range(normal.y, 0.0, 1.0, -1.0, 1.0) * 0.1 * trans.z;

    vec4 light0 = texture2D(tLight0, uv);
    vec4 light1 = texture2D(tLight1, uv);
    float depth = texture2D(tDepth, uv).r;

    #test !Tests.isRecording()
    vec3 logo = applyLogo(uv, uHoldInteraction);
    #endtest

    vec2 v = vUv - vec2(0.5);
    float angle = atan(v.y, v.x);
    vec4 baseTexel = texture2D(tDiffuse, uv);
    float bStrength = range(luma(baseTexel), 0.0, 0.5, 0.0, 1.0) + (0.1 * interaction);
    vec3 color = getRGB(tDiffuse, uv, angle, strength * bStrength * mix(0.2, 1.0, uHoldInteraction) * crange(trans.z, 0.0, 1.0, 1.0, 10.0), baseTexel).rgb;

    #test Tests.renderFogLight()
    applyFog(color, depth, light1, light0, uv);
    #endtest

    #test !Tests.isRecording()
    color += logo.r * (0.22+sin(uTime*0.4)*0.2) * (1.0 - uHoldInteraction) * uShowLogo;
    color += logo.r * (0.75+sin(uTime*0.4)*0.1+sin(uTime*40.0)*0.01+sin(uTime*15.0)*0.01) * uHoldInteraction * uShowLogo;
    color += logo.b * 0.4 * uHoldInteraction * uShowLogo;
    color += 0.3 * uHoldTransition * uHoldInteraction * uShowLogo;
    #endtest

    #test Tests.deferredLighting()
    vec3 worldPos = texture2D(tPositions, uv).xyz;
    vec3 mnormal = texture2D(tNormals, uv).xyz;
    color += calcLighting(worldPos, vec3(0.0), depth, mnormal, uv, light0, light1) * 0.75;
    #endtest

    tint(color);

    #test !Tests.isRecording()
    vignette(color);
    #endtest

    vec3 t0 = mix(color, vec3(0.0), 1.0 - trans.y);
    vec3 t1 = mix(color, vec3(0.0), trans.z);
    color = mix(t0, t1, uFadeTransition);

    gl_FragColor = vec4(color, 1.0);
}{@}Treatment.fs{@}uniform sampler2D tNormal;
uniform sampler2D tInteraction;
uniform sampler2D tLogo;
uniform sampler2D tRain;
uniform float uTime;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor;
uniform float uColorBlend;
uniform float uRainRefraction;
uniform float uShowLogo;
uniform float uRainBrightness;
uniform float uTransition;
uniform float uTransitionDir;
uniform float uHoldTransition;
uniform float uHoldInteraction;
uniform float uInteractionScale;
uniform float uFadeTransition;
uniform float uDPR;

#require(simplex2d.glsl)
#require(range.glsl)
#require(transformUV.glsl)
#require(simplenoise.glsl)
#require(rgbshift.fs)
#require(rgb2hsv.fs)
#require(luma.fs)
#require(conditionals.glsl)
#require(treatment.fs)

void applyRain(float rain, float vignette, inout vec2 uv) {
    uv.x += uRainRefraction*0.1 * smoothstep(0.05, 0.2, rain) * vignette;
    uv.y += uRainRefraction*0.1 * smoothstep(0.05, 0.2, rain) * vignette;
    uv.x += uRainRefraction*0.05 * rain * vignette;
    uv.y += uRainRefraction*0.05 * rain * vignette;

    uv = scaleUV(uv, vec2(range(rain * vignette, 0.0, 1.0, 1.0, 0.97)), uv);
}

void main() {
    vec2 uv = vUv;

    vec3 trans = transition();
//    uv.y -= trans.x * 0.2 * trans.z;

    float strength = 0.002;

    vec2 normal = texture2D(tNormal, vUv).xy;

    #test Tests.renderInteraction()
        float interaction = texture2D(tInteraction, vUv).r;
        interaction = crange(interaction, 0.2, 1.0, 0.0, 1.0) * uInteractionScale;

        uv.x += range(normal.x, 0.0, 1.0, -1.0, 1.0) * 0.1 * interaction * mix(1.0, 2.0, uHoldInteraction);
        uv.y += range(normal.y, 0.0, 1.0, -1.0, 1.0) * 0.1 * interaction * mix(1.0, 2.0, uHoldInteraction);

        strength = (0.002 * crange(interaction, 0.0, 1.0, 0.6, 5.0)) * 0.7;
    #endtest

    float dist = length(vec2(0.5) - vUv);
    float vign = crange(dist, 0.3, 0.5, 0.0, 1.0)*0.5;

    #test Tests.renderRain()
        float rain = crange(texture2D(tRain, uv).r, 0.05, 1.0, 0.0, 1.0);
        applyRain(rain, vign, uv);
    #endtest

    uv.x += range(normal.x, 0.0, 1.0, -1.0, 1.0) * 0.04 * uHoldTransition;
    uv.y += range(normal.y, 0.0, 1.0, -1.0, 1.0) * 0.04 * uHoldTransition;

    vec3 logo = applyLogo(uv, uHoldInteraction);

    vec2 v = vUv - vec2(0.5);
    float angle = atan(v.y, v.x);
    vec4 baseTexel = texture2D(tDiffuse, uv);
    float bStrength = range(luma(baseTexel), 0.0, 0.5, 0.0, 1.0);
    gl_FragColor = getRGB(tDiffuse, uv, angle, strength * bStrength, baseTexel);
    gl_FragColor.rgb += logo.r * 0.2 * (1.0 - uHoldInteraction) * uShowLogo;
    gl_FragColor.rgb += logo.r * 0.4 * uHoldInteraction * uShowLogo;
    gl_FragColor.rgb += logo.b * 0.4 * uHoldInteraction * uShowLogo;
    gl_FragColor.rgb += 0.3 * uHoldTransition * uHoldInteraction * uShowLogo;

    #test Tests.renderRain()
        gl_FragColor.rgb += uRainBrightness * 0.1 * vign;
    #endtest

    #test Tests.applyTint()
    tint(gl_FragColor.rgb);
    #endtest

    vignette(gl_FragColor.rgb);

    vec3 color = gl_FragColor.rgb;
    vec3 t0 = mix(color, vec3(0.0), 1.0 - trans.y);
    vec3 t1 = mix(color, vec3(0.0), trans.z);
    color = mix(t0, t1, uFadeTransition);

    gl_FragColor.rgb = color;
}
{@}WorkTreatment.fs{@}uniform float uTime;
uniform float uTransition;
uniform float uTransitionDir;
uniform float uColorBlend;
uniform vec3 uColor;
uniform sampler2D tLogo;
uniform sampler2D tLight;
uniform float uDPR;
uniform float uShowLogo;
uniform float uLight;
uniform float uLightBlend;
uniform float uLightBrightness;

#require(conditionals.glsl)
#require(simplex2d.glsl)
#require(range.glsl)
#require(rgb2hsv.fs)
#require(rgbshift.fs)
#require(simplenoise.glsl)
#require(transformUV.glsl)
#require(treatment.fs)

void main() {
    vec3 v = transition();

    vec2 uv = vUv;
//    uv.y -= v.x * 0.2 * v.z;

    vec4 texel = texture2D(tDiffuse, vUv);

    tint(texel.rgb);
    vignette(texel.rgb, mix(0.9, 0.8, when_gt(uColorBlend, 0.1)));

    texel.rgb = rgb2hsv(texel.rgb);
    texel.x += range(vUv.y*vUv.x, 0.0, 1.0, -0.05, 0.05);
    texel.rgb = hsv2rgb(texel.rgb);
	
    vec4 light = texture2D(tLight, vUv);
    texel.rgb += light.rgb * uLight * uLightBlend * uLightBrightness;

    texel.rgb = mix(texel.rgb, vec3(0.0), 1.0 - v.y);

    gl_FragColor = texel;
}{@}treatment.fs{@}vec3 linearBurn(vec3 base, vec3 blend) {
    return max(base + blend - 1.0, 0.0);
}

void tint(inout vec3 texel) {
    float noise = range(cnoise(vUv + (uTime*0.05)), -1.0, 1.0, 0.0, 1.0);
    vec3 color1 = rgb2hsv(uColor);//mix(uColor0, uColor1, noise);
    color1.x += 0.2;
    color1 = hsv2rgb(color1);
    vec3 color = mix(uColor, color1, noise);
    texel = mix(texel, linearBurn(texel, color), uColorBlend);
}

void vignette(inout vec3 color, float v) {
    float dist = length(vec2(0.5) - vUv);
    color *= range(dist, 0.0, 0.5, 1.0, 0.8);
    color *= range(getNoise(vUv * uDPR, uTime), 0.0, 1.0, v, 1.0);
}

void vignette(inout vec3 color) {
    vignette(color, 0.85);
}

vec3 transition() {
    float noise = range(snoise(vUv.yy*1.2 + uTime), -1.0, 1.0, 0.0, 1.0) * crange(uTransition, 0.0, 1.0, 1.0, 0.1);
    vec2 uv = vUv;
    uv.y = mix(uv.y, 1.0 - uv.y, when_gt(0.0, uTransitionDir));

    float trans = clamp(uTransition, 0.0, 1.0);

    float y = rotateUV(uv, -0.3).y;
    float amt = 1.0 - smoothstep(y, y + noise, uTransition);

    return vec3(noise, mix(amt, amt - 0.5, uTransition), trans);
}

vec3 applyLogo(inout vec2 uv, float hold) {
    vec4 mask = texture2D(tLogo, uv);
    uv += mask.r * mix(0.03, 0.2, step(0.5, hold)) * uShowLogo * sin(uTime*0.3);

    float dist = length(vUv - vec2(0.5));
    uv = mix(uv, scaleUV(uv, vec2(1.4-pow(dist, 2.0))), hold);

    return mask.rgb;
}
{@}DistortionInteraction.fs{@}uniform sampler2D tInput;
uniform sampler2D tNormal;
uniform float uMix;

#require(range.glsl)

void main() {
    vec2 vuv = vUv * 1.0;
    vec2 uv = vuv;
    vec2 normal = texture2D(tDiffuse, vuv).xy;

    vec4 interaction = texture2D(tInput, vUv);
    float i = crange(interaction.r, 0.2, 1.0, 0.0, 1.0);
    float x = crange(interaction.g, 0.0, 1.0, -1.0, 1.0);
    float y = crange(interaction.b, 0.0, 1.0, -1.0, 1.0);

    uv.x += 0.01 * i * -x;
    uv.y += 0.01 * i * y;

    vec4 diffuse = texture2D(tDiffuse, uv);
    vec4 origin = texture2D(tNormal, vuv);

    gl_FragColor = mix(origin, diffuse, uMix);
}{@}VFXDOF.fs{@}uniform sampler2D tDepth;
uniform vec2 resolution;
uniform vec2 dir;

#require(range.glsl)
#require(gaussianblur.fs)

void main() {
    float depth = texture2D(tDepth, vUv).r;
    float strength = crange(depth, 1.0, 0.5, 0.0, 1.0);

    gl_FragColor = blur5(tDiffuse, vUv, resolution, dir * strength);
}{@}DeferredLight.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform vec3 uColor;
uniform float uRadius;
uniform vec3 uPos;
uniform float uScale;
uniform float uColorScale;
uniform sampler2D tDepth;
uniform vec2 uResolution;

#!VARYINGS
varying vec2 vUv;
varying float vFalloff;
varying vec3 vWorldPos;

#!SHADER: DeferredLight.vs

#require(range.glsl)

void main() {
    vUv = uv;
    vec3 pos = position;

    vec3 vNormal = normalize(normalMatrix * normal);

    pos += vNormal * uScale;

    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: DeferredLight.fs

//fxlayer

#require(range.glsl)
#require(simplenoise.glsl)

float getDepth() {
    float dist = length(vWorldPos - cameraPosition);
    return 1.0 - (dist / 40.0);
}

void main() {
    float noise = range(cnoise(vec3(vUv, vUv.x) * 0.3), -1.0, 1.0, 0.5, 1.0);
    float depth = getDepth();

//    float worldDepth = texture2D(tDepth, gl_FragCoord.xy / uResolution).r;

    vec3 color = uColor;

//    if (worldDepth > depth && uScale > 1.0) {
//        color *= 0.0;
//    }

    float falloff = crange(length(vUv - vec2(0.5)), 0.0, 0.5, 1.0, 0.0) * noise;
    #drawbuffer Color gl_FragColor = vec4(color * uColorScale * noise, falloff);
    #drawbuffer LightPosition gl_FragColor = vec4(uPos, depth);
}{@}DeferredScreen.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform float uRadius;
uniform vec3 uPos;

#!VARYINGS
varying vec2 vUv;
varying float vFalloff;
varying vec3 vWorldPos;
varying float vBlend;

#!SHADER: DeferredScreen.vs

#require(range.glsl)
#require(conditionals.glsl)

void main() {
    vUv = uv;
    vec3 pos = position;

    vec3 vNormal = normalize(normalMatrix * normal);

//    pos -= vNormal * 0.1;

    vBlend = 1.0;
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

    vBlend = mix(1.0, crange(abs(vWorldPos.z - cameraPosition.z), 0.0, 3.0, 1.0, 0.0), when_lt(pos.x, -3.5));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: DeferredScreen.fs

//fxlayer

#require(range.glsl)

float getDepth() {
    float dist = length(vWorldPos - cameraPosition);
    return 1.0 - (dist / 40.0);
}


void main() {
    float depth = getDepth();
    vec3 color = texture2D(tMap, vUv).rgb * crange(depth, 0.1, 0.5, 0.0, 1.0);
    color *= vBlend;
    float falloff = crange(length(vUv - vec2(0.5)), 0.0, 0.5, 1.0, 0.0);
    #drawbuffer Color gl_FragColor = vec4(color * 1.3, 2.0);
    #drawbuffer LightPosition gl_FragColor = vec4(uPos, depth);
}{@}LightBlur.fs{@}uniform vec2 resolution;
uniform vec2 dir;

#require(range.glsl)
#require(gaussianblur.fs)

void main() {
    gl_FragColor = blur5(tDiffuse, vUv, resolution, dir);
}{@}LightOccluder.glsl{@}#!ATTRIBUTES

#!UNIFORMS

#!VARYINGS

#!SHADER: LightOccluder.vs
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: LightOccluder.fs
void main() {
    gl_FragColor = vec4(vec3(0.0), 1.0);
}{@}LightVolume.fs{@}uniform vec2 lightPos;
uniform float fExposure;
uniform float fDecay;
uniform float fDensity;
uniform float fWeight;
uniform float fClamp;

const int iSamples = 20;

void main() {
    vec2 deltaTextCoord = vUv - lightPos;
    deltaTextCoord *= 1.0  / float(iSamples) * fDensity;
    vec2 coord = vUv;

    float illuminationDecay = 1.0;
    vec4 color = vec4(0.0);

    for (int i = 0; i < iSamples; i++) {
        coord -= deltaTextCoord;
        vec4 texel = texture2D(tDiffuse, coord);
        texel *= illuminationDecay * fWeight;

        color += texel;
        illuminationDecay *= fDecay;
    }

    color *= fExposure;
    color = clamp(color, 0.0, fClamp);
    gl_FragColor = color;
}{@}WorkListGradient.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform float uTime;
uniform float uSpeed;
uniform vec3 uColor;
uniform float uOffsetY;
uniform float uDPR;

#!VARYINGS
varying vec2 vUv;

#!SHADER: WorkListGradient.vs
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}

#!SHADER: WorkListGradient.fs

#require(simplex2d.glsl)
#require(range.glsl)
#require(simplenoise.glsl)
#require(rgb2hsv.fs)

void main() {
    vec2 offset = vec2(0.0, uOffsetY);
    float noise = cnoise(vUv * 0.5 + uTime*uSpeed + offset);
    noise = range(noise, -1.0, 1.0, 0.0, 1.0);

    vec3 color0 = uColor;
    vec3 color1 = rgb2hsv(color0);
    color1.x += 0.03;
    color1 = hsv2rgb(color1);

    vec3 color = mix(color0, color1, noise);

    color *= range(getNoise(vUv * uDPR, uTime), 0.0, 1.0, 0.95, 1.0);

    gl_FragColor = vec4(color, 1.0);
}{@}WorkListItem.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tFill;
uniform sampler2D tOutline;
uniform sampler2D tGrad;
uniform sampler2D tRGB;
uniform vec2 uResolution;
uniform float uActive;
uniform float uTime;
uniform float uHoverWobble;
uniform float uInvert;
uniform float uWarpSpeed;
uniform float uWarpRange;

#!VARYINGS
varying vec2 vUv;

#!SHADER: WorkListItem.vs
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: WorkListItem.fs

#require(range.glsl)
#require(simplenoise.glsl)
#require(desaturate.fs)

float getMask() {
    #test !Tests.fillWIL()
    vec2 uv = vUv;
    float warp = crange(uActive, 0.0, 0.5, 0.0, 1.0) * crange(uActive, 0.5, 1.0, 1.0, 0.0);
    uv.x += cnoise(uv.yy*1.2 + uTime) * 0.0022 * warp * uHoverWobble;
    uv.y += cnoise(uv.yy*1.2 + uTime) * 0.022 * warp * uHoverWobble;

    float outline = texture2D(tOutline, uv).a;

    float fill = texture2D(tFill, uv).a + outline;
    vec4 effect = texture2D(tRGB, (gl_FragCoord.xy / uResolution) * 20.0);

    return mix(outline, fill, uActive);
    #endtest

    #test Tests.fillWIL()
    return texture2D(tFill, vUv).r * uActive;
    #endtest
}

void main() {
    float mask = getMask();

    vec3 color = texture2D(tGrad, gl_FragCoord.xy / uResolution).rgb;

    float noise = cnoise(vUv*0.8 + uTime*0.3);
    color = mix(color, vec3(1.0), 0.3+noise*0.2);
    color = mix(color, vec3(1.0), uActive);


    //color = mix(color, vec3(1.0), range(noise, -1.0, 1.0, uActive*0.3, uActive)*uActive);

    vec3 invert = vec3(1.0 - step(0.01, color));
    color = mix(color, invert, uInvert*0.92);

    gl_FragColor = vec4(color, mask);
}{@}WorkProjectTitle.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform sampler2D tParticles;
uniform sampler2D tInteraction;
uniform sampler2D tNormal;
uniform float uTrans;
uniform float uTime;
uniform vec2 uResolution;

#!VARYINGS
varying vec2 vUv;

#!SHADER: WorkProjectTitle.vs
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

#!SHADER: WorkProjectTitle.fs

#require(range.glsl)
#require(simplex2d.glsl)

vec2 getUV() {
    float y = 0.3;
    vec2 uv = vUv;
    //uv.y = crange(uv.y, 1.0 - y, 1.0 - y - 0.42, 1.0, 0.0);
    return uv;
}

void main() {
    vec2 uv = getUV();

    float noise = snoise(vUv.yy * 2.0 + uTime*1.5) * 0.8;
    uv.y += noise * uTrans * 0.3;
    uv.x += noise * uTrans * 0.05 * 0.3;

    vec2 screenUV = gl_FragCoord.xy / uResolution;

    float interaction = texture2D(tInteraction, screenUV).r;
    interaction = crange(interaction, 0.2, 1.0, 0.0, 1.0);

    vec2 normal = texture2D(tNormal, screenUV).xy;
    uv.x += range(normal.x, 0.0, 1.0, -1.0, 1.0) * 0.05 * mix(interaction, 0.3, uTrans);
    uv.y += range(normal.y, 0.0, 1.0, -1.0, 1.0) * 0.05 * mix(interaction, 0.3, uTrans);

    float a = texture2D(tMap, uv).a;

    gl_FragColor = vec4(vec3(1.0), a);
}{@}WorkVideo.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap0;
uniform sampler2D tMap1;
uniform sampler2D tMap2;
uniform vec2 uScale0;
uniform vec2 uScale1;
uniform float uTime;
uniform float uDeform;
uniform float uTransition;
uniform float uDirection;
uniform float uDarken;

#!VARYINGS
varying vec2 vUv;

#!SHADER: WorkVideo.vs
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}

#!SHADER: WorkVideo.fs

#require(conditionals.glsl)
#require(transformUV.glsl)
#require(simplex2d.glsl)
#require(range.glsl)
#require(rgbshift.fs)

const float cPadding = 0.4;

float cubicOut(float t) {
  float f = t - 1.0;
  return f * f * f + 1.0;
}

vec2 getUV0(float transition) {
    vec2 iuv = vUv;
    float uT = range(transition, 0.0, 1.0, -cPadding, 1.0 + cPadding);
    float s = 1.0 - smoothstep(uT - cPadding, uT + cPadding, vUv.x);
    float y = s * transition;
    iuv.y = range(vUv.y, 1.0, y, 1.0, 0.0);

    vec2 uv = scaleUV(iuv, uScale0);
    uv.x += (snoise(vec2(uv.y) * 3.0) * 0.1) * crange(transition, 0.4, 1.0, 0.0, 1.0) * 0.3;

    return uv;
}

vec2 getUV1(float transition) {
    vec2 iuv = vUv;
    float uT = range(transition, 0.0, 1.0, -cPadding, 1.0 + cPadding);
    float s = smoothstep(uT - cPadding, uT + cPadding, vUv.x);
    float y = 1.0 - s;
    iuv.y = range(vUv.y, y, 0.0, 1.0, 0.0);

    vec2 uv = scaleUV(iuv, uScale1);

    float noise = snoise(vUv.yy * 2.0 + uTime*0.8) * 0.2;
    uv.x += noise * uDeform * 0.3;

    float aScale = crange(cubicOut(transition), 0.0, 1.0, 2.5, 1.0);
    uv = scaleUV(uv, vec2(aScale));

    return uv;
}

vec2 getUV2(float transition) {
    vec2 iuv = vUv;
    float uT = range(transition, 0.0, 1.0, -cPadding, 1.0 + cPadding);
    float s = smoothstep(uT - cPadding, uT + cPadding, vUv.x);
    float y = 1.0 - (s * transition);
    iuv.y = range(vUv.y, s, 0.0, 1.0, 0.0);

    vec2 uv = scaleUV(iuv, uScale0);
    uv.x += (snoise(vec2(uv.y) * 3.0) * 0.1) * crange(transition, 0.4, 1.0, 0.0, 1.0) * 0.3;

    return uv;
}

vec2 getUV3(float transition) {
    vec2 iuv = vUv;
    float uT = range(transition, 0.0, 1.0, -cPadding, 1.0 + cPadding);
    float s = smoothstep(uT - cPadding, uT + cPadding, vUv.x);
    float y = s;
    iuv.y = range(vUv.y, 1.0, y, 1.0, 0.0);

    vec2 uv = scaleUV(iuv, uScale1);

    float noise = snoise(vUv.yy * 2.0 + uTime*0.8) * 0.2;
    uv.x += noise * uDeform * 0.3;

    float aScale = crange(cubicOut(transition), 0.0, 1.0, 2.5, 1.0);
    uv = scaleUV(uv, vec2(aScale));

    return uv;
}

void main() {
    vec2 uv0 = vec2(0.0);
    vec2 uv1 = vec2(0.0);

    if (uDirection > 0.0) {
        uv0 = getUV0(uTransition);
        uv1 = getUV1(uTransition);
    } else {
        uv0 = getUV2(uTransition);
        uv1 = getUV3(uTransition);
    }

    if (uDeform > 0.0) {
        float noise = snoise(vUv.yy * 2.0 + uTime*0.8) * 0.2;
        uv0.y += noise * uDeform;
        uv1.y += noise * uDeform;
    }

    float r = 0.004 * uDeform * 0.15;
    vec4 t0 = getRGB(tMap0, uv0, 0.2, r);
    vec4 t1 = getRGB(tMap1, uv1, 0.2, r);

    if (uDirection < 0.0) {
        gl_FragColor = mix(t0, t1, 1.0 - step(uv0.y, 0.9999));
    } else {
        gl_FragColor = mix(t0, t1, step(uv0.y, 0.0001));
    }

    float vignette = range(length(vUv - vec2(0.5)), 0.0, 0.5, 0.7, 1.0);
    vignette = mix(1.0, vignette, range(uDarken, 1.0, 0.8, 0.0, 1.0));

    gl_FragColor = mix(gl_FragColor, t1, crange(uTransition, 0.6, 0.8, 0.0, 1.0));
    gl_FragColor.rgb *= uDarken * vignette;
}{@}WorkListBackground.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tGrad;
uniform vec2 uScale;
uniform float uYPos;
uniform float uPadding;
uniform float uReveal;
uniform float uTime;
uniform float uDeform;
uniform float uDesaturate;
uniform vec3 uBaseColor;
uniform float uTransition;
uniform float uFade;

#!VARYINGS
varying vec2 vUv;
varying vec2 vOUv;

#!SHADER: WorkListBackground.vs

#require(transformUV.glsl)

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}

#!SHADER: WorkListBackground.fs

#require(range.glsl)
#require(simplenoise.glsl)
#require(desaturate.fs)

void applyGradient(inout vec4 texel) {
    texel.rgb = desaturate(texel.rgb, uDesaturate);
    vec3 grad = texture2D(tGrad, vUv).rgb;
    texel.rgb *= grad;
}

void transition(inout vec4 texel) {
    float noise = cnoise(vOUv.yy * 0.3 + uTime*0.8) * 0.2;
    float x = vOUv.x;
    float trans = uTransition + (noise * 0.3);
    texel.a *= 1.0 - step(trans, 1.0 - x);
}

void fade(inout vec4 texel) {
    texel.a *= uFade;
}

void main() {
    vec2 uv = vUv;
    float noise = cnoise(vUv.yy * 2.0 + uTime*0.8) * 0.2;
    uv.y += noise * uDeform;

    vec4 texel = texture2D(tGrad, uv);

    gl_FragColor = texel;
}{@}WorkListBackgroundColor.glsl{@}#!ATTRIBUTES

#!UNIFORMS
uniform sampler2D tMap;
uniform sampler2D tVideo;
uniform float uDarkSpeed;
uniform float uDarkMin;
uniform float uDarkMax;
uniform float uTime;
uniform float uWarpSpeed;
uniform float uWarpRange;

#!VARYINGS
varying vec2 vUv;

#!SHADER: WorkListBackgroundColor.vs
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}

#!SHADER: WorkListBackgroundColor.fs

#require(range.glsl)
#require(simplenoise.glsl)

void main() {
    float darken = range(cnoise(vUv * 0.4 + uTime * uDarkSpeed), -1.0, 1.0, uDarkMin, uDarkMax);

    float dist = length(vec2(0.5) - vUv);
    float vignette = crange(dist, 0.0, 0.5, 0.0, 1.0);
    darken *= crange(1.0 - vignette, 0.0, 1.0, 0.7, 1.0);

    vec3 color = texture2D(tMap, vUv).rgb;

//    vec2 uv = vUv;
//    uv.x = 0.5+sin(uTime)*0.2;
    ///float warp = snoise(uv.yy + uTime*uWarpSpeed) * uWarpRange;
    //uv.y += warp;
    //color = mix(color, texture2D(tVideo, uv).rgb, 0.01);
//    color += texture2D(tVideo, uv).rgb*0.03;

    color *= darken;

    gl_FragColor = vec4(color, 1.0);
}{@}WorkListBackgroundHolograms.glsl{@}#!ATTRIBUTES
attribute vec3 offset;
attribute vec4 scale;

#!UNIFORMS
uniform sampler2D tMap;
uniform sampler2D tMask;
uniform sampler2D tRGB;
uniform float uTime;
uniform float uLineMod;
uniform float uLineStep;
uniform float uLineAlpha;
uniform float uLineSpeed;
uniform float uVertScale;
uniform float uVertSpeed;
uniform float uVertRange;
uniform float uWarpSpeed;
uniform float uWarpRange;
uniform float uAlpha;
uniform float uFalloff;
uniform float uTransparent;

#!VARYINGS
varying vec2 vUv;
varying vec2 vScale;
varying vec3 vOffset;
varying float vAttrib;
varying float vAspect;

#!SHADER: WorkListBackgroundHolograms.vs

#require(simplex2d.glsl)

void main() {
    vUv = uv;
    vec3 pos = position;

    float noise = snoise(offset.xy + pos.xy * uVertScale + uTime*uVertSpeed);
    pos.y += noise * uVertRange;
    pos.xy *= scale.xy;

    vOffset = offset;
    vAspect = scale.z;
    vAttrib = scale.w;
    vScale = scale.xy;

    pos += offset;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: WorkListBackgroundHolograms.fs

#require(conditionals.glsl)
#require(range.glsl)
#require(simplenoise.glsl)
#require(transformUV.glsl)
#require(simplex2d.glsl)
#require(rgbshift.fs)

void main() {
    vec2 uv = vUv;

//    uv.y += sin((uv.x * 300.0) + uTime) * 0.003;
//    uv.y += mod(uv.x + uTime*0.3, 0.05) * mod(uv.y, 0.2);

    float warp = cnoise(vOffset.xy + uv.yy + uTime*uWarpSpeed) * uWarpRange * range(sin(uTime + vOffset.x), -1.0, 1.0, 0.0, 1.0);
    uv.y += warp;

    float alpha = getNoise(vUv, uTime);
    alpha = range(alpha, 0.0, 1.0, 0.7, 1.0);
    alpha *= range(snoise(vUv + uTime*0.5), -1.0, 1.0, 0.5, 1.0);
    alpha *= range(step(uLineStep, mod(uv.y + uTime*uLineSpeed, uLineMod)), 0.0, 1.0, uLineAlpha, 1.0);
    alpha *= uAlpha;
    alpha *= pow(texture2D(tMask, vUv).r, uFalloff);

    vec2 scaleAspect = mix(vec2(1.0, vAspect), vec2(1.0 / vAspect), when_gt(vScale.y, vScale.x));
    uv = scaleUV(uv, scaleAspect);
    uv = scaleUV(uv, vec2(range(vAttrib, 0.0, 1.0, 1.0, 1.6)));
//    uv = translateUV(uv, vec2(range(vAttrib, 0.0, 1.0, -1.0, 1.0) * 0.2));

    vec2 d = vec2(0.5) - vUv;
    float angle = atan(d.y, d.x);
    float strength = 0.003 + range(warp, 0.0, 0.2, 0.0, 1.0)*0.01;
    vec3 color = getRGB(tMap, uv, angle, strength).rgb;



    alpha *= 0.9 + sin(uTime*50.0)*0.02 + sin(uTime*20.0)*0.02 + sin(uTime)*0.12;

    //float scan = range(1.0 - step(mod(vUv.y - uTime*0.12, 0.002), 0.001), 0.0, 1.0, 0.0, 1.0);
    //alpha -= scan*0.1;

    gl_FragColor = vec4(color, alpha * uTransparent);
}{@}WorkListBackgroundLogos.glsl{@}#!ATTRIBUTES
attribute vec3 offset;

#!UNIFORMS
uniform sampler2D tMap;
uniform sampler2D tGrad;
uniform float uTime;
uniform float uDarken;
uniform float uTransition;
uniform vec2 uResolution;
uniform float uWarpSpeed;
uniform float uWarpRange;

#!VARYINGS
varying vec2 vUv;
varying vec3 vOffset;

#!SHADER: WorkListBackgroundLogos.vs
void main() {
    vUv = uv;
    vec3 pos = position * 4.5;
    pos += offset;
    vOffset = offset;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

#!SHADER: WorkListBackgroundLogos.fs

#require(simplex2d.glsl)
#require(range.glsl)

void main() {
    vec2 uv = vUv;
    float warp = snoise(vOffset.xy + uv.yy + uTime*uWarpSpeed) * uWarpRange;
    uv.y += warp;
    uv += warp * 0.5 * uTransition;

    float alpha = texture2D(tMap, uv).a;
    vec3 color = texture2D(tGrad, gl_FragCoord.xy / uResolution).rgb;
    color *= uDarken;

    alpha *= 0.07 + sin(uTime*0.5)*0.03;
    alpha *= 1.0 - uTransition;

    gl_FragColor = vec4(color, alpha);
}{@}workcommon.fs{@}float getMask(vec2 uv, vec2 uv2, float ypos, float uPadding, float uTime, float uReveal) {
    float noise = snoise(uv2.xx * 0.3 + uTime*0.8) * 0.7;
    float padding = uPadding * uReveal;
    padding += noise * 0.1 * uDeform;
    float dist = abs(uv.y - ypos - (padding*0.5));
    return step(dist, padding);
}
