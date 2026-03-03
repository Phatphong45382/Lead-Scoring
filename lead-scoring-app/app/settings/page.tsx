"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <MainLayout title="Settings" description="Configuration and preferences">
      <div className="max-w-7xl mx-auto space-y-6">


        {/* Placeholder */}
        <div className="bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center gap-4 shadow-enterprise-sm min-h-[400px]">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
            <Settings className="w-8 h-8 text-slate-500" />
          </div>
          <div className="text-center">
            <p className="text-slate-700 font-semibold text-lg">Settings — Coming Soon</p>
            <p className="text-slate-400 text-sm mt-1">Dataiku API config · scoring thresholds · user preferences</p>
          </div>
        </div>

      </div>
    </MainLayout>
  )
}
