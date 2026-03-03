"use client"

import { useState, useCallback } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { ModelSelector } from "@/components/new-scoring/model-selector"
import { DatasetCard } from "@/components/new-scoring/dataset-card"
import { DataPreviewTable } from "@/components/new-scoring/data-preview-table"
import { ScoringProgress } from "@/components/new-scoring/scoring-progress"
import { ScoringHistory } from "@/components/new-scoring/scoring-history"
import {
  AVAILABLE_MODELS,
  mockDatasetPreviews,
  mockScoringResults,
  mockScoringHistory,
  ScoringJobStatus,
  ScoringResultData,
} from "@/lib/mock-data-new-scoring"
import { useDashboardPublish } from "@/lib/dashboard-publish-context"
import { Play, Database, FileSearch, ArrowRight } from "lucide-react"

const USE_MOCK = true

type RightPanelView = "empty" | "preview" | "scoring"

export default function NewScoringPage() {
  // Model selection
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null)
  const selectedModel = AVAILABLE_MODELS.find((m) => m.id === selectedModelId) ?? null

  // Dataset upload state
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, { name: string; size: number; rowCount: number }>
  >({})

  // Right panel state
  const [rightView, setRightView] = useState<RightPanelView>("empty")
  const [activePreviewKey, setActivePreviewKey] = useState<string | null>(null)

  // Scoring state
  const [jobStatus, setJobStatus] = useState<ScoringJobStatus>({
    scenarioId: "",
    runId: "",
    status: "IDLE",
    progress: 0,
  })
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<ScoringResultData | null>(null)

  const requiredDatasets = selectedModel?.requiredDatasets ?? []
  const uploadedCount = requiredDatasets.filter((d) => uploadedFiles[d.key]).length
  const totalRequired = requiredDatasets.length
  const allUploaded = totalRequired > 0 && uploadedCount === totalRequired

  const handleModelSelect = useCallback((modelId: string) => {
    setSelectedModelId(modelId)
    // Reset state when switching model
    setUploadedFiles({})
    setActivePreviewKey(null)
    setRightView("empty")
    setJobStatus({ scenarioId: "", runId: "", status: "IDLE", progress: 0 })
    setResults(null)
    setIsRunning(false)
  }, [])

  const handleFileAccepted = useCallback((key: string, file: File) => {
    const mockPreview = mockDatasetPreviews[key]
    setUploadedFiles((prev) => ({
      ...prev,
      [key]: {
        name: file.name,
        size: file.size,
        rowCount: USE_MOCK ? mockPreview?.rowCount ?? 0 : 0,
      },
    }))
    setActivePreviewKey(key)
    setRightView("preview")
  }, [])

  const handleRemove = useCallback((key: string) => {
    setUploadedFiles((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
    if (activePreviewKey === key) {
      setActivePreviewKey(null)
      setRightView("empty")
    }
  }, [activePreviewKey])

  const handlePreview = useCallback((key: string) => {
    setActivePreviewKey(key)
    setRightView("preview")
  }, [])

  const { publish } = useDashboardPublish()

  const handlePublish = useCallback(() => {
    publish({
      runId: jobStatus.runId || `run_${Date.now()}`,
      modelName: selectedModel?.name ?? "Model",
      totalLeadsPublished: results?.summary.totalLeadsScored ?? 0,
    })
  }, [publish, jobStatus.runId, selectedModel, results])

  const handleScoreAgain = useCallback(() => {
    setUploadedFiles({})
    setActivePreviewKey(null)
    setRightView("empty")
    setJobStatus({ scenarioId: "", runId: "", status: "IDLE", progress: 0 })
    setResults(null)
    setIsRunning(false)
  }, [])

  const handleRunScoring = useCallback(async () => {
    setRightView("scoring")
    setIsRunning(true)
    setJobStatus((prev) => ({ ...prev, status: "RUNNING", progress: 0, message: "Uploading datasets..." }))

    if (USE_MOCK) {
      const modelName = selectedModel?.name ?? "model"
      const stages = [
        { progress: 15, message: "Uploading datasets..." },
        { progress: 30, message: "Joining data tables..." },
        { progress: 55, message: `Running ${modelName} model...` },
        { progress: 80, message: "Computing predictions..." },
        { progress: 95, message: "Finalizing results..." },
        { progress: 100, message: "Done!" },
      ]

      for (const stage of stages) {
        await new Promise((r) => setTimeout(r, 550))
        setJobStatus((prev) => ({ ...prev, progress: stage.progress, message: stage.message }))
      }

      await new Promise((r) => setTimeout(r, 300))
      setJobStatus((prev) => ({ ...prev, status: "DONE", progress: 100 }))
      setResults(mockScoringResults)
      setIsRunning(false)
    }
  }, [selectedModel])

  // Preview data
  const previewData = activePreviewKey ? mockDatasetPreviews[activePreviewKey] : null
  const activeDataset = activePreviewKey
    ? requiredDatasets.find((d) => d.key === activePreviewKey)
    : null

  return (
    <MainLayout title="Score New Leads" description="Upload and score new leads">
      <div className="max-w-7xl mx-auto space-y-6">


        {/* ── Step 1: Model Selection ── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-enterprise-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#1B7FB5] text-white text-xs font-bold flex items-center justify-center">1</div>
            <h2 className="text-sm font-bold text-slate-800">Select Model</h2>
          </div>
          <ModelSelector
            models={AVAILABLE_MODELS}
            selectedModelId={selectedModelId}
            onSelect={handleModelSelect}
          />
        </div>

        {/* ── Step 2: Upload Datasets + Preview (split panel) ── */}
        {selectedModel && (
          <div className="flex flex-col lg:flex-row gap-5 min-h-[480px]">

            {/* Left: Required Datasets */}
            <div className="lg:w-[340px] shrink-0 space-y-5">
              <div className="bg-white rounded-xl border border-slate-200 shadow-enterprise-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center" style={{ background: selectedModel.color }}>2</div>
                    <h2 className="text-sm font-bold text-slate-800">Required Datasets</h2>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${allUploaded
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                    }`}>
                    {uploadedCount}/{totalRequired}
                  </span>
                </div>

                <div className="space-y-3">
                  {requiredDatasets.map((ds) => (
                    <DatasetCard
                      key={ds.key}
                      dataset={ds}
                      uploadedFile={uploadedFiles[ds.key] ?? null}
                      isActive={activePreviewKey === ds.key && rightView === "preview"}
                      onFileAccepted={handleFileAccepted}
                      onRemove={handleRemove}
                      onPreview={handlePreview}
                    />
                  ))}
                </div>
              </div>

              {/* Run Button */}
              <Button
                onClick={handleRunScoring}
                disabled={!allUploaded || isRunning}
                className="w-full py-3 text-white font-semibold rounded-xl shadow-md transition-all disabled:opacity-50"
                style={{ background: allUploaded && !isRunning ? selectedModel.color : undefined }}
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? "Scoring..." : `Run ${selectedModel.name} Model`}
              </Button>

              {!allUploaded && (
                <p className="text-[11px] text-slate-400 text-center">
                  Upload all {totalRequired} required datasets to enable scoring
                </p>
              )}
            </div>

            {/* Right: Preview / Results */}
            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-enterprise-sm p-6 overflow-hidden">
              {rightView === "empty" && (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center min-h-[350px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
                    <FileSearch className="w-8 h-8 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-500">Upload datasets to preview</p>
                    <p className="text-sm text-slate-400 mt-1 max-w-sm">
                      Drag & drop files to the dataset cards, then click the eye icon to inspect the data
                    </p>
                  </div>
                </div>
              )}

              {rightView === "preview" && previewData && activeDataset && (
                <DataPreviewTable
                  datasetLabel={activeDataset.label}
                  columns={previewData.columns}
                  rows={previewData.rows}
                  totalRows={previewData.rowCount}
                />
              )}

              {rightView === "scoring" && (
                <ScoringProgress
                  jobStatus={jobStatus}
                  results={results}
                  onRunScoring={handleRunScoring}
                  onScoreAgain={handleScoreAgain}
                  onPublish={handlePublish}
                  isRunning={isRunning}
                  modelId={selectedModelId ?? ""}
                />
              )}
            </div>

          </div>
        )}

        {/* ── Scoring History ── */}
        <ScoringHistory history={mockScoringHistory} />

      </div>
    </MainLayout>
  )
}
