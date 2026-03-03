"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { DatasetDefinition } from "@/lib/mock-data-new-scoring"
import { UploadCloud, FileSpreadsheet, CheckCircle2, X, Eye } from "lucide-react"

interface DatasetCardProps {
  dataset: DatasetDefinition
  uploadedFile: { name: string; size: number; rowCount: number } | null
  isActive: boolean
  onFileAccepted: (key: string, file: File) => void
  onRemove: (key: string) => void
  onPreview: (key: string) => void
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function DatasetCard({
  dataset,
  uploadedFile,
  isActive,
  onFileAccepted,
  onRemove,
  onPreview,
}: DatasetCardProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted.length > 0) onFileAccepted(dataset.key, accepted[0])
    },
    [dataset.key, onFileAccepted]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
    multiple: false,
    noClick: !!uploadedFile,
    noDrag: !!uploadedFile,
  })

  const isUploaded = !!uploadedFile

  return (
    <div
      {...(isUploaded ? {} : getRootProps())}
      className={`relative rounded-lg border-2 transition-all duration-200 ${
        isUploaded
          ? isActive
            ? "border-[#1B7FB5] bg-blue-50/40 shadow-sm"
            : "border-emerald-300 bg-emerald-50/30"
          : isDragActive
          ? "border-[#1B7FB5] bg-blue-50/50 border-dashed"
          : "border-dashed border-slate-300 hover:border-[#1B7FB5]/50 hover:bg-slate-50 cursor-pointer"
      }`}
    >
      {!isUploaded && <input {...getInputProps()} />}

      <div className="p-3.5">
        {isUploaded ? (
          /* ── Uploaded state ── */
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{dataset.label}</p>
                  <p className="text-[11px] text-slate-500 truncate">{uploadedFile.name}</p>
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {uploadedFile.rowCount.toLocaleString()} rows · {formatSize(uploadedFile.size)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); onPreview(dataset.key) }}
                  className="p-1 rounded hover:bg-blue-100 text-slate-400 hover:text-[#1B7FB5] transition-colors"
                  title="Preview data"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onRemove(dataset.key) }}
                  className="p-1 rounded hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── Empty / drop state ── */
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              isDragActive ? "bg-[#1B7FB5]/10" : "bg-slate-100"
            }`}>
              <UploadCloud className={`w-4.5 h-4.5 ${isDragActive ? "text-[#1B7FB5]" : "text-slate-400"}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-700">{dataset.label}</p>
              <p className="text-[11px] text-slate-400 truncate">{dataset.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
