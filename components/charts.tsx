"use client"

import { useEffect, useState } from "react"

export function LineChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="space-y-4">
          <div className="h-[200px] w-full">
            <div className="relative h-full w-full">
              {/* Simplified chart visualization */}
              <div className="absolute bottom-0 left-0 right-0 top-0">
                <div className="grid h-full w-full grid-cols-7 items-end gap-2">
                  {[5000, 7500, 10000, 8500, 12000, 15000, 18000].map((value, i) => (
                    <div key={i} className="relative h-full">
                      <div
                        className="absolute bottom-0 w-full rounded-t bg-blue-500/50"
                        style={{ height: `${(value / 20000) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              {/* X-axis labels */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month, i) => (
                  <div key={i}>{month}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-blue-500/50"></div>
              <span className="text-xs text-muted-foreground">Impressions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BarChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  const data = [1.2, 3.5, 4.8, 2.7, 3.9]
  const labels = ["Text Only", "With Image", "With Video", "Threads", "Polls"]

  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="space-y-4">
          <div className="h-[200px] w-full">
            <div className="relative h-full w-full">
              {/* Simplified chart visualization */}
              <div className="absolute bottom-0 left-0 right-0 top-0">
                <div className="grid h-full w-full grid-cols-5 items-end gap-4">
                  {data.map((value, i) => (
                    <div key={i} className="relative h-full">
                      <div
                        className="absolute bottom-0 w-full rounded-t bg-blue-500/50"
                        style={{ height: `${(value / 5) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              {/* X-axis labels */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                {labels.map((label, i) => (
                  <div key={i} className="text-center" style={{ width: `${100 / labels.length}%` }}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-blue-500/50"></div>
              <span className="text-xs text-muted-foreground">Engagement Rate (%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
