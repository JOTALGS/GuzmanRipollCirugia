import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 R;
uniform float T;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1,0));
  float c = hash(i + vec2(0,1)), d = hash(i + vec2(1,1));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(11.7, 7.3);
    a *= 0.53;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / R;
  vec2 p = uv - 0.5;
  p.x *= R.x / R.y;

  // ═══════════════════════════════════════════════
  // SPEED — velocidad general del movimiento
  // 0.01 = ultra lento | 0.05 = suave | 0.15 = moderado | 0.3 = rápido
  // ═══════════════════════════════════════════════
  float t = T * 0.08;

  // ═══════════════════════════════════════════════
  // SCALE — zoom del patrón de ruido
  // más bajo = formas más grandes y difusas
  // más alto = formas más chicas y detalladas
  // rango útil: 0.3 ~ 1.5
  // ═══════════════════════════════════════════════
  float scale = 0.55;

  // ═══════════════════════════════════════════════
  // FLOW — dirección y velocidad del flujo
  // los multiplicadores de t controlan qué tan rápido
  // fluye en cada eje (x horizontal, y vertical)
  // ═══════════════════════════════════════════════
  vec2 flow = vec2(
    fbm(p * scale + vec2(t * 0.22, -t * 0.08)),   // flow horizontal
    fbm(p * scale + vec2(-t * 0.12, t * 0.16))     // flow vertical
  );

  // ═══════════════════════════════════════════════
  // FLOW STRENGTH — cuánto distorsiona el flujo
  // 0.34 y 0.26 = intensidad de la deformación
  // más alto = más orgánico/líquido
  // rango útil: 0.1 ~ 0.6
  // ═══════════════════════════════════════════════
  float fA = fbm((p + flow * 0.34) * (scale * 0.9));
  float fB = fbm((p * 1.45 - flow * 0.26) * (scale * 0.68));

  // ═══════════════════════════════════════════════
  // AURORA — suavidad de las bandas de color
  // smoothstep(borde_inicio, borde_fin, ...)
  // más cerca = transición más suave
  // ═══════════════════════════════════════════════
  float aurora = smoothstep(0.12, 0.95, fA * 0.85 + fB * 0.55);

  // ═══════════════════════════════════════════════
  // BAND / RIBBON — la onda sinusoidal principal
  // el último multiplicador de t (0.2) = velocidad de la onda
  // ═══════════════════════════════════════════════
  float band = smoothstep(-0.35, 0.95, sin((p.x * 0.7 - p.y * 1.4 + fA * 1.9 - t * 0.2) * 3.14159265));

  // ═══════════════════════════════════════════════
  // GLOW — punto de luz
  // vec2(x, y) = posición (+ derecha, + arriba)
  // -4.5 = qué tan rápido cae (más negativo = más concentrado)
  // ═══════════════════════════════════════════════
  float glow = exp(-4.5 * dot(p - vec2(0.30, 0.08), p - vec2(0.30, 0.08)));

  // ═══════════════════════════════════════════════
  // VIGNETTE — oscurecimiento en los bordes
  // 1.15 = radio exterior | 0.08 = radio interior
  // ═══════════════════════════════════════════════
  float haze = smoothstep(1.15, 0.08, length(p));

  // ═══════════════════════════════════════════════
  // COLORES — paleta del shader (RGB 0-255)
  // c0 = fondo oscuro base
  // c1 = tono medio
  // c2 = acento aurora
  // c3 = highlights / brillo
  // ═══════════════════════════════════════════════
  vec3 c0 = vec3(8.0, 8.0, 52.0) / 255.0;       // azul muy oscuro
  vec3 c1 = vec3(20.0, 19.0, 82.0) / 255.0;      // azul oscuro medio
  vec3 c2 = vec3(0.0, 85.0, 150.0) / 255.0;      // azul cyan
  vec3 c3 = vec3(45.0, 115.0, 195.0) / 255.0;    // azul claro

  // ═══════════════════════════════════════════════
  // COLOR MIX — cómo se mezclan los colores
  // aurora * 0.72 = peso del color aurora
  // band * 0.67 = peso de la onda/ribbon
  // glow * 0.58 = peso del punto de luz
  // leftMask empuja el brillo hacia la derecha, lejos del texto
  // ═══════════════════════════════════════════════
  float leftMask = smoothstep(-0.15, 0.35, uv.x);
  vec3 col = mix(c0, c1, smoothstep(-0.15, 0.85, uv.y + fB * 0.12));
  col = mix(col, c2, aurora * 0.72 * leftMask);
  col = mix(col, c3, clamp((band * 0.67 + glow * 0.58) * leftMask, 0.0, 1.0));

  // ═══════════════════════════════════════════════
  // VIGNETTE STRENGTH — intensidad del oscurecimiento
  // 0.88 = brillo en bordes | 1.03 = brillo en centro
  // ═══════════════════════════════════════════════
  col *= mix(0.88, 1.03, haze);

  // ═══════════════════════════════════════════════
  // DIFFUSE GRAIN — suaviza bordes duros, efecto smooth
  // 0.025 = intensidad (0.01 = casi nada, 0.05 = visible)
  // el hash es estático por pixel, no se mueve (no CRT)
  // ═══════════════════════════════════════════════
  float grain = (hash(gl_FragCoord.xy * 0.5) - 0.5) * 0.025;
  col += grain;

  O = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function linkProgram(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error("Link:", gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

export function ShaderMakerEmbed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = linkProgram(gl, vs, fs);
    if (!prog) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "a_pos");
    const uR = gl.getUniformLocation(prog, "R");
    const uT = gl.getUniformLocation(prog, "T");

    gl.useProgram(prog);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const t0 = performance.now();
    let raf = 0;
    let prevW = 0;
    let prevH = 0;

    const render = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);

      if (prevW !== w || prevH !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        prevW = w;
        prevH = h;
      }

      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, (performance.now() - t0) * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
