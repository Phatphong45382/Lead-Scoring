"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface DashboardPublishInfo {
  publishedAt: string
  runId: string
  modelName: string
  totalLeadsPublished: number
}

interface DashboardPublishContextValue {
  publishInfo: DashboardPublishInfo | null
  isPublished: boolean
  publish: (info: Omit<DashboardPublishInfo, "publishedAt">) => void
}

const DashboardPublishContext = createContext<DashboardPublishContextValue | null>(null)

export function DashboardPublishProvider({ children }: { children: ReactNode }) {
  const [publishInfo, setPublishInfo] = useState<DashboardPublishInfo | null>(null)

  const publish = useCallback((info: Omit<DashboardPublishInfo, "publishedAt">) => {
    setPublishInfo({
      ...info,
      publishedAt: new Date().toISOString(),
    })
  }, [])

  return (
    <DashboardPublishContext.Provider value={{ publishInfo, isPublished: !!publishInfo, publish }}>
      {children}
    </DashboardPublishContext.Provider>
  )
}

export function useDashboardPublish() {
  const ctx = useContext(DashboardPublishContext)
  if (!ctx) throw new Error("useDashboardPublish must be used within DashboardPublishProvider")
  return ctx
}
