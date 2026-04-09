"use client"

import { useRef, useEffect } from 'react'

export default function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let animationId: number
    let time = 0
    const mouse = { x: -1000, y: -1000 }
    let isVisible = true

    // Pause when tab is hidden
    const handleVisibility = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // Render at 1/3 viewport resolution — CSS scales it up with bilinear filtering
    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / 3)
      canvas.height = Math.ceil(window.innerHeight / 3)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / 3 // Scale mouse coords to match 1/3-res canvas
      mouse.y = e.clientY / 3
    }
    const onMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)

    const isMobile = window.innerWidth < 768

    // Additional pixel-level downsampling for the caustic computation
    const scale = isMobile ? 3 : 2

    // Simplex-like noise function (fast 2D noise) — original visual hash
    function noise(x: number, y: number): number {
      const ix = Math.floor(x)
      const iy = Math.floor(y)
      const fx = x - ix
      const fy = y - iy

      // Hash function
      const h = (a: number, b: number) => {
        const n = a * 127.1 + b * 311.7
        return (Math.sin(n) * 43758.5453) % 1
      }

      // Smooth interpolation
      const sx = fx * fx * (3 - 2 * fx)
      const sy = fy * fy * (3 - 2 * fy)

      const n00 = h(ix, iy)
      const n10 = h(ix + 1, iy)
      const n01 = h(ix, iy + 1)
      const n11 = h(ix + 1, iy + 1)

      return n00 * (1 - sx) * (1 - sy) + n10 * sx * (1 - sy) + n01 * (1 - sx) * sy + n11 * sx * sy
    }

    // Multi-octave noise for realistic water
    // On mobile, use only 2 octaves instead of 3
    const octaves = isMobile ? 2 : 3
    function waterNoise(x: number, y: number, t: number): number {
      let value = 0
      let amplitude = 1
      let frequency = 1
      let maxValue = 0

      for (let i = 0; i < octaves; i++) {
        value += amplitude * noise(x * frequency + t * 0.3, y * frequency + t * 0.2)
        maxValue += amplitude
        amplitude *= 0.5
        frequency *= 2
      }

      return value / maxValue
    }

    // Frame skip toggle for 30fps effective rendering
    let frameToggle = false

    function draw() {
      // Only render every 2nd frame for performance at higher resolution
      frameToggle = !frameToggle
      if (frameToggle) {
        animationId = requestAnimationFrame(draw)
        return
      }

      // Skip rendering when tab is hidden
      if (!isVisible) {
        animationId = requestAnimationFrame(draw)
        return
      }

      time += 0.016 // ~30fps worth of time advancement per rendered frame

      const w = canvas.width
      const h = canvas.height

      // === LAYER 1: Deep caustic light patterns ===
      const imageData = ctx.createImageData(w, h)
      const data = imageData.data

      const sw = Math.ceil(w / scale)
      const sh = Math.ceil(h / scale)

      for (let sy = 0; sy < sh; sy++) {
        for (let sx = 0; sx < sw; sx++) {
          const nx = sx / sw * 3
          const ny = sy / sh * 3

          // Multiple noise layers at different speeds create caustic-like refraction
          const n1 = waterNoise(nx, ny, time)
          const n2 = waterNoise(nx * 1.5 + 5.2, ny * 1.5 + 1.3, time * 1.3)
          const n3 = waterNoise(nx * 0.7 + 2.1, ny * 0.7 + 4.7, time * 0.7)

          // Caustic pattern: sharp bright lines where waves focus light
          const caustic = Math.pow(Math.abs(Math.sin(n1 * 6.28 + n2 * 3.14)), 3)

          // Secondary softer pattern
          const soft = n3 * 0.3

          // Mouse interaction: brighten near cursor
          const px = sx * scale
          const py = sy * scale
          const dx = px - mouse.x
          const dy = py - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const mouseGlow = dist < 200 ? (1 - dist / 200) * 0.45 : 0 // bright flash near cursor

          // Combine — caustic brightness
          const brightness = caustic * 0.21 + soft * 0.09 + mouseGlow

          // Fill the scaled area (Uint8ClampedArray auto-clamps to 0-255)
          for (let fy = 0; fy < scale && sy * scale + fy < h; fy++) {
            for (let fx = 0; fx < scale && sx * scale + fx < w; fx++) {
              const idx = ((sy * scale + fy) * w + (sx * scale + fx)) * 4
              // Teal-cyan color: rgb(56, 217, 220) = #38D9DC
              data[idx] = 56 * brightness * 3         // R
              data[idx + 1] = 217 * brightness * 3    // G
              data[idx + 2] = 220 * brightness * 3    // B
              data[idx + 3] = brightness * 255 * 2.5  // A
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0)

      // === MOUSE GLOW SPOTLIGHT (subtle, drawn on top of caustics) ===
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 100  // ~300px on screen
        )
        gradient.addColorStop(0, 'rgba(56, 217, 220, 0.25)')
        gradient.addColorStop(0.3, 'rgba(56, 217, 220, 0.12)')
        gradient.addColorStop(0.7, 'rgba(56, 217, 220, 0.03)')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

      // === LAYER 2: A few floating bubbles ===
      for (let i = 0; i < 15; i++) {
        const seed = i * 137.5
        const bx = ((seed * 7.3 + time * (10 + i * 3)) % (w + 20)) - 10 // Adjusted for 1/3-res
        const by = h - ((seed * 3.7 + time * (15 + i * 5)) % (h + 20)) - 10
        const size = 0.4 + (i % 3) * 0.25 // Smaller for 1/3-res canvas
        const alpha = 0.06 + (i % 5) * 0.025 // Slightly increased

        ctx.beginPath()
        ctx.arc(bx, by, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 217, 220, ${alpha})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        width: '100vw',
        height: '100vh',
        imageRendering: 'auto', // Browser bilinear filtering for smooth upscale
      }}
      aria-hidden="true"
    />
  )
}
