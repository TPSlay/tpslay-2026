/**
 * TPSLAY 2026 — 21st.dev WebGL Visual FX Engine (Vanilla WebGL + JS)
 * 1. Velaris — живой градиент на Simplex Noise + виньетка + film grain (WebGL)
 * 2. Shader Lines — лучевой мозаичный WebGL-шейдер (@designali-in/shader-lines)
 * 3. Liquid Metal Button — живой ртутный/хромовый WebGL-шейдер на кнопках
 * 4. HyperText Scramble — кибер-дешифровка заголовков
 * 5. Spotlight Effect — подсветка карточек под курсором
 */

const TPSFX = (() => {
  const VERTEX_SHADER = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  // ================= 1. VELARIS (WebGL Simplex-Noise + Vignette + Film Grain) =================
  const VELARIS_FRAGMENT = `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;

    // 2D Simplex Noise (Ashima Arts)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(
        0.211324865405187,
        0.366025403784439,
       -0.577350269189626,
        0.024390243902439
      );
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 aspectUv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);

      float t = time * 0.14;

      // Многослойная деформация Simplex-шума (Velaris living gradients)
      float n1 = snoise(aspectUv * 1.15 + vec2(t * 0.6, -t * 0.4));
      float n2 = snoise(aspectUv * 1.85 + vec2(-t * 0.45 + n1 * 0.65, t * 0.5 + n1 * 0.5));
      float n3 = snoise(aspectUv * 0.75 + vec2(n2 * 0.55, -t * 0.3));

      float blendA = smoothstep(-0.65, 0.75, n1 * 0.5 + n2 * 0.5);
      float blendB = smoothstep(-0.4, 0.85, n3);

      // Палитра Velaris x TPSLAY (глубокий обсидиан, алый РЖД, тёплый янтарь/огонь)
      vec3 colObsidian = vec3(0.025, 0.025, 0.035);
      vec3 colCrimson  = vec3(0.42, 0.035, 0.045);
      vec3 colEmber    = vec3(0.76, 0.11, 0.07);
      vec3 colAmber    = vec3(0.52, 0.16, 0.04);

      vec3 color = mix(colObsidian, colCrimson, blendA);
      color = mix(color, colEmber, pow(blendB, 2.2) * 0.55);
      color += colAmber * pow(max(0.0, n2 * n3), 2.0) * 0.4;

      // Мягкая виньетка (vignette glow)
      float dist = length(uv - 0.5);
      float vignette = smoothstep(0.95, 0.2, dist);
      color *= (0.35 + 0.65 * vignette);

      // Кинематографичный Film Grain
      float grain = (hash(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.038;
      color += grain;

      gl_FragColor = vec4(max(color, 0.0), 1.0);
    }
  `;

  // ================= 2. SHADER LINES (21st.dev @designali-in) =================
  const SHADER_LINES_FRAGMENT = `
    #define TWO_PI 6.2831853072
    #define PI 3.14159265359

    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    uniform float u_mode;

    float random (in float x) {
      return fract(sin(x) * 1e4);
    }

    void main(void) {
      vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

      vec2 fMosaicScal = vec2(4.0, 2.0);
      vec2 vScreenSize = vec2(256.0, 256.0);
      uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
      uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

      float t = time * 0.06 + random(uv.x) * 0.4;
      float lineWidth = 0.0008;

      vec3 color = vec3(0.0);
      for (int j = 0; j < 3; j++) {
        for (int i = 0; i < 5; i++) {
          float fi = float(i);
          float fj = float(j);
          color[j] += lineWidth * (fi * fi) / abs(fract(t - 0.01 * fj + fi * 0.01) * 1.0 - length(uv));
        }
      }

      vec3 origCol = vec3(color[2], color[1], color[0]);

      float intensity = (color[0] + color[1] + color[2]) / 3.0;
      vec3 rzdCol = vec3(
        color[0] * 1.35 + color[2] * 0.25,
        color[1] * 0.16 + pow(clamp(intensity * 0.45, 0.0, 1.0), 3.0) * 0.65,
        color[2] * 0.18 + pow(clamp(intensity * 0.45, 0.0, 1.0), 3.0) * 0.65
      );

      vec3 finalCol = mix(rzdCol, origCol, u_mode);
      float vignette = smoothstep(1.85, 0.35, length(uv));
      finalCol *= (0.45 + 0.55 * vignette);

      gl_FragColor = vec4(finalCol, 1.0);
    }
  `;

  // ================= 3. LIQUID METAL BUTTON SHADER (21st.dev) =================
  const LIQUID_METAL_FRAGMENT = `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    uniform float u_hover;

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 p = uv * 2.0 - 1.0;
      p.x *= resolution.x / max(resolution.y, 1.0);

      float t = time * (1.1 + u_hover * 1.2);

      // Жидкие металлические волны (mercury / liquid chrome)
      float w1 = sin(p.x * 2.6 + t * 1.4 + cos(p.y * 2.2 - t));
      float w2 = cos(p.y * 3.1 - t * 1.1 + sin(p.x * 2.8 + t * 0.8));
      float w3 = sin((p.x + p.y) * 2.4 + t * 1.6);
      float fluid = (w1 + w2 + w3) / 3.0;

      // Хромовые блики и тёмный металл
      float spec = smoothstep(0.15, 0.85, fluid * 0.5 + 0.5);
      float hotSpec = pow(smoothstep(0.45, 0.96, fluid * 0.5 + 0.5), 3.0);

      vec3 darkSteel  = vec3(0.08, 0.08, 0.10);
      vec3 chromeMid  = vec3(0.62, 0.66, 0.72);
      vec3 redRefl    = vec3(0.95, 0.16, 0.12);
      vec3 pureShine  = vec3(1.0, 0.98, 0.96);

      vec3 col = mix(darkSteel, chromeMid, spec);
      // Лёгкий неоновый красный рефлекс в жидком хроме
      float redBand = smoothstep(0.25, 0.85, sin(p.x * 1.8 - t * 1.2 + fluid * 2.0) * 0.5 + 0.5);
      col = mix(col, redRefl, redBand * (0.38 + u_hover * 0.25));
      col = mix(col, pureShine, hotSpec * 0.95);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  // ================= ОБЩИЙ WEBGL РАННЕР =================
  function compile(gl, type, source) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn("WebGL compile:", gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function mountShader(canvas, fragmentSource, options = {}) {
    if (!canvas) return null;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "high-performance" })
            || canvas.getContext("experimental-webgl");
    if (!gl) {
      canvas.classList.add("webgl-fallback");
      return null;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vs || !fs) return null;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;

    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(prog, "resolution");
    const timeLoc = gl.getUniformLocation(prog, "time");
    const modeLoc = gl.getUniformLocation(prog, "u_mode");
    const hoverLoc = gl.getUniformLocation(prog, "u_hover");

    const state = {
      canvas,
      gl,
      time: options.startTime || Math.random() * 10,
      speed: options.speed || 0.016,
      targetMode: 0.0,
      displayMode: 0.0,
      targetHover: 0.0,
      displayHover: 0.0,
      visible: true
    };

    const maxDpr = options.maxDpr || 1.5;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(resize).observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    if (typeof IntersectionObserver !== "undefined") {
      new IntersectionObserver((entries) => {
        state.visible = entries[0].isIntersecting;
      }, { threshold: 0.01 }).observe(canvas);
    }

    function loop() {
      requestAnimationFrame(loop);
      if (!state.visible || document.hidden) return;
      if (canvas.width < 2 || canvas.height < 2) resize();

      state.time += state.speed;
      state.displayMode += (state.targetMode - state.displayMode) * 0.08;
      state.displayHover += (state.targetHover - state.displayHover) * 0.1;

      gl.useProgram(prog);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, state.time);
      if (modeLoc) gl.uniform1f(modeLoc, state.displayMode);
      if (hoverLoc) gl.uniform1f(hoverLoc, state.displayHover);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    loop();
    return state;
  }

  // ================= LIQUID METAL BUTTONS INIT =================
  function initLiquidMetalButtons() {
    document.querySelectorAll(".liquid-metal-btn").forEach((btn) => {
      if (btn.dataset.lmInit) return;
      btn.dataset.lmInit = "1";

      const canvas = document.createElement("canvas");
      canvas.className = "lm-shader-canvas";
      canvas.setAttribute("aria-hidden", "true");
      btn.insertBefore(canvas, btn.firstChild);

      const inst = mountShader(canvas, LIQUID_METAL_FRAGMENT, {
        speed: 0.024,
        maxDpr: 1.5
      });

      if (inst) {
        btn.addEventListener("mouseenter", () => { inst.targetHover = 1.0; });
        btn.addEventListener("mouseleave", () => { inst.targetHover = 0.0; });
        btn.addEventListener("mousedown", () => { inst.time += 0.45; });
      }
    });
  }

  // ================= SPOTLIGHT EFFECT =================
  function initSpotlightEffect() {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.addEventListener("mousemove", (e) => {
      const targets = document.querySelectorAll(".spotlight-card, .nominee-card");
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    }, { passive: true });
  }

  // ================= HYPERTEXT SCRAMBLE =================
  const SCRAMBLE_CHARS = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ0123456789#%*+";

  function scrambleText(element, finalText, durationMs = 400) {
    if (!element) return;
    const text = String(finalText);
    const totalFrames = Math.max(10, Math.round(durationMs / 28));
    let frame = 0;

    if (element._scrambleTimer) clearInterval(element._scrambleTimer);

    element._scrambleTimer = setInterval(() => {
      frame++;
      const locked = Math.floor((frame / totalFrames) * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") out += " ";
        else if (i < locked) out += text[i];
        else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      element.textContent = out;
      if (frame >= totalFrames) {
        clearInterval(element._scrambleTimer);
        element.textContent = text;
      }
    }, 28);
  }

  // ================= ЗАПУСК =================
  function boot() {
    // 1. Живой фон Velaris (Simplex Noise + виньетка + film grain) на весь сайт
    mountShader(document.getElementById("velaris-bg-canvas"), VELARIS_FRAGMENT, {
      speed: 0.015,
      maxDpr: 1.0
    });

    // 2. Дополнительная карточка-витрина Velaris (если присутствует на странице)
    mountShader(document.getElementById("velaris-stage-canvas"), VELARIS_FRAGMENT, {
      speed: 0.022,
      maxDpr: 1.25
    });

    // 3. Shader Lines на главном Hero-баннере
    mountShader(document.getElementById("hero-shader-canvas"), SHADER_LINES_FRAGMENT, {
      speed: 0.05,
      maxDpr: 1.5
    });

    // 4. Кнопки Liquid Metal
    initLiquidMetalButtons();

    // 5. Подсветка карточек
    initSpotlightEffect();

    // 6. Стартовая кибер-анимация бренда
    const heroBrand = document.getElementById("hero-scramble-title");
    if (heroBrand) scrambleText(heroBrand, "TPSLAY 2026", 620);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  return {
    scrambleText,
    initLiquidMetalButtons
  };
})();
