"use client"

interface SemicircleGaugeProps {
  /** Value between 0 and 100 */
  value: number
  /** Threshold value (0-100), shown as a marker */
  threshold?: number
  /** Size of the gauge in pixels */
  size?: number
  /** Label below the value */
  label?: string
}

export function SemicircleGauge({ value, threshold, size = 220, label }: SemicircleGaugeProps) {
  const clampedValue = Math.max(0, Math.min(100, value))
  const clampedThreshold = threshold != null ? Math.max(0, Math.min(100, threshold)) : undefined

  // Layout
  const strokeWidth = Math.max(6, Math.round(size * 0.032))
  const tickLen = 4
  const outerMargin = strokeWidth / 2 + tickLen + 6
  const radius = size / 2 - outerMargin
  const cx = size / 2
  const cy = outerMargin + radius

  const svgHeight = Math.ceil(cy + size * 0.2)

  const startAngle = Math.PI
  const endAngle = 0

  function angleForValue(v: number) {
    return startAngle - (v / 100) * Math.PI
  }

  function pointOnArc(angle: number, r: number = radius) {
    return {
      x: cx + r * Math.cos(angle),
      y: cy - r * Math.sin(angle),
    }
  }

  // Background arc
  const bgStart = pointOnArc(startAngle)
  const bgEnd = pointOnArc(endAngle)
  const bgPath = `M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 0 1 ${bgEnd.x} ${bgEnd.y}`

  // Value arc — starts from 0% (left) to value
  const valueAngle = angleForValue(clampedValue)
  const valueArcEnd = pointOnArc(valueAngle)
  // Our semicircle spans max 180° of the full circle, so large-arc is always 0
  const largeArc = 0
  const valuePath = clampedValue > 0.5
    ? `M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 ${largeArc} 1 ${valueArcEnd.x} ${valueArcEnd.y}`
    : ""

  // Color based on THRESHOLD relationship — not arbitrary fixed ranges
  function getColor(v: number) {
    if (clampedThreshold != null) {
      // Above threshold = green, close below = amber, far below = red
      if (v >= clampedThreshold) return "#10b981" // emerald — passed
      if (v >= clampedThreshold - 15) return "#f59e0b" // amber — close
      return "#ef4444" // red — far below
    }
    // Fallback: no threshold provided
    if (v >= 65) return "#10b981"
    if (v >= 35) return "#f59e0b"
    return "#ef4444"
  }

  const color = getColor(clampedValue)

  // Threshold marker — thin dark line
  let thresholdMarker = null
  if (clampedThreshold != null) {
    const thAngle = angleForValue(clampedThreshold)
    const outer = pointOnArc(thAngle, radius + strokeWidth / 2 + 2)
    const inner = pointOnArc(thAngle, radius - strokeWidth / 2 - 2)
    thresholdMarker = (
      <line
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke="#334155"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    )
  }

  // Tick marks at 0, 25, 50, 75, 100
  const ticks = [0, 25, 50, 75, 100]

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={svgHeight} viewBox={`0 0 ${size} ${svgHeight}`}>
        {/* Background track */}
        <path
          d={bgPath}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Value arc */}
        {valuePath && (
          <path
            d={valuePath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        )}

        {/* Tick marks */}
        {ticks.map((t) => {
          const a = angleForValue(t)
          const p1 = pointOnArc(a, radius + strokeWidth / 2 + 2)
          const p2 = pointOnArc(a, radius + strokeWidth / 2 + 2 + tickLen)
          return (
            <line
              key={t}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#cbd5e1"
              strokeWidth={1}
              strokeLinecap="round"
            />
          )
        })}

        {/* Threshold marker */}
        {thresholdMarker}

        {/* Center value text */}
        <text
          x={cx}
          y={cy - radius * 0.08}
          textAnchor="middle"
          dominantBaseline="middle"
          className="tabular-nums"
          style={{
            fontSize: size * 0.13,
            fontWeight: 700,
            fill: color,
            fontFamily: "Manrope, sans-serif",
          }}
        >
          {clampedValue.toFixed(1)}%
        </text>

        {/* Label */}
        {label && (
          <text
            x={cx}
            y={cy + size * 0.04}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: size * 0.048,
              fontWeight: 500,
              fill: "#94a3b8",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            {label}
          </text>
        )}

        {/* Min/Max labels */}
        <text
          x={bgStart.x}
          y={cy + size * 0.06}
          textAnchor="middle"
          style={{ fontSize: 9, fill: "#94a3b8", fontFamily: "Manrope, sans-serif" }}
        >
          0%
        </text>
        <text
          x={bgEnd.x}
          y={cy + size * 0.06}
          textAnchor="middle"
          style={{ fontSize: 9, fill: "#94a3b8", fontFamily: "Manrope, sans-serif" }}
        >
          100%
        </text>
      </svg>

      {/* Threshold label */}
      {clampedThreshold != null && (
        <p className="text-[10px] text-slate-400 -mt-1">
          Threshold: <span className="font-semibold text-slate-600">{clampedThreshold}%</span>
        </p>
      )}
    </div>
  )
}
