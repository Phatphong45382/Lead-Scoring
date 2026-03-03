"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRight,
  Upload,
  BarChart4,
  Settings,
  Check,
  TrendingUp,
  Target,
  Users,
  Clock,
  Zap,
  Activity,
} from "lucide-react"

const STEPS = [
  {
    n: 1,
    icon: Upload,
    title: "Upload your leads",
    desc: "Import leads from your CRM or CSV with the required attributes.",
  },
  {
    n: 2,
    icon: BarChart4,
    title: "ML model scores each lead",
    desc: "Our model calculates a 0–100 score with feature importance per lead.",
  },
  {
    n: 3,
    icon: Settings,
    title: "Analyze & hand off to sales",
    desc: "Review hot leads, analytics insights, and export results for your sales team.",
  },
]

const OUTCOMES = [
  "Lead Score 0–100 with probability tier (Hot / Warm / Cold)",
  "Feature importance: key factors driving each lead's score",
  "Analytics: conversion rate, segment breakdown, trend over time",
]

const KEY_FEATURES = [
  {
    icon: <Target className="w-5 h-5" style={{ color: "#3DB9EB" }} />,
    title: "Precision Scoring",
    desc: "Score 0–100 powered by an ML model trained on real sales data.",
  },
  {
    icon: <Users className="w-5 h-5 text-emerald-500" />,
    title: "Segment Analysis",
    desc: "Automatically segment leads by source, score bucket, and behavior.",
  },
  {
    icon: <Activity className="w-5 h-5 text-indigo-500" />,
    title: "Real-time Analytics",
    desc: "Track conversion trends and model performance in real time.",
  },
  {
    icon: <Zap className="w-5 h-5" style={{ color: "#FFC223" }} />,
    title: "Fast Turnaround",
    desc: "Results in under 2 minutes, ready to export for your sales team.",
  },
]

export default function HomePage() {
  return (
    <MainLayout hideTopBar>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">

        {/* ── HERO — SSCI branded gradient ── */}
        <section
          className="relative overflow-hidden rounded-3xl text-white px-10 py-14"
          style={{ background: "linear-gradient(135deg, #1B7FB5 0%, #3DB9EB 50%, #2A9AD4 100%)" }}
        >
          <style>{`
            @keyframes heroFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes heroPulseDot {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(0.8); }
            }
            @keyframes heroSlideUp {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes heroBarGrow {
              from { transform: scaleY(0); }
              to   { transform: scaleY(1); }
            }
          `}</style>

          {/* subtle dot grid */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
          {/* accent blobs */}
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,194,35,0.15)" }} />
          <div className="absolute bottom-0 right-40 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,255,255,0.08)" }} />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            {/* ── LEFT: text + CTA ── */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#FFC223" }}>
                ML-Powered Lead Scoring
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
                Know which leads
                <br />
                <span className="text-white/70">are ready to buy.</span>
              </h1>
              <p className="text-white/65 text-base mb-8 leading-relaxed">
                Automatically score and prioritize leads with ML so your sales team
                can focus on the highest-conversion opportunities.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="font-semibold shadow-lg cursor-pointer"
                  style={{ background: "#FFC223", color: "#1a1a2e" }}
                  asChild
                >
                  <Link href="/new-scoring">
                    <Upload className="mr-2 h-4 w-4" />
                    Score New Leads
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/50 text-white hover:bg-white/15 hover:text-white cursor-pointer"
                  asChild
                >
                  <Link href="/dashboard">
                    View Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* ── RIGHT: Animated Score Preview ── */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative" style={{ width: 396, paddingTop: 24, paddingBottom: 28, paddingRight: 56 }}>

                {/* Main score card */}
                <div
                  className="w-full rounded-2xl p-4 flex flex-col gap-3"
                  style={{
                    background: "rgba(10,60,100,0.65)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1.5px solid rgba(255,255,255,0.35)",
                    boxShadow: "0 24px 70px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                    animation: "heroFloat 4s ease-in-out infinite",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 text-xs font-semibold">Lead Score Distribution</span>
                    <span className="text-emerald-300 text-[10px] font-bold">+18.3% Hot Leads</span>
                  </div>

                  {/* Score bars — SSCI branded colors */}
                  <div className="flex items-end gap-1.5 h-20">
                    {[
                      { h: 30, c: "#94a3b8" }, { h: 45, c: "#94a3b8" }, { h: 38, c: "#94a3b8" },
                      { h: 55, c: "#FFC223" }, { h: 62, c: "#FFC223" }, { h: 58, c: "#FFC223" },
                      { h: 72, c: "#10b981" }, { h: 80, c: "#10b981" }, { h: 76, c: "#10b981" },
                      { h: 88, c: "#3DB9EB" }, { h: 95, c: "#3DB9EB" }, { h: 90, c: "#3DB9EB" },
                    ].map((bar, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${bar.h}%`,
                          background: bar.c,
                          opacity: 0.85,
                          transformOrigin: "bottom",
                          animation: `heroBarGrow 0.5s ease-out ${i * 0.05}s both`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between text-[9px] text-white/40">
                    <span>Cold (0-59)</span>
                    <span>Warm (60-79)</span>
                    <span>Hot (80+)</span>
                  </div>

                  {/* Score metrics */}
                  <div
                    className="flex gap-2"
                    style={{ animation: "heroSlideUp 0.6s ease-out 0.8s both" }}
                  >
                    {[
                      { label: "Avg Score", value: "72.4", color: "#3DB9EB" },
                      { label: "Hot Leads", value: "34%", color: "#10b981" },
                      { label: "Precision", value: "91%", color: "#FFC223" },
                    ].map(({ label, value, color }) => (
                      <div
                        key={label}
                        className="flex-1 rounded-xl px-3 py-2 text-center"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.18)",
                        }}
                      >
                        <p className="text-white/50 text-[9px] font-medium mb-0.5">{label}</p>
                        <p className="font-bold text-sm" style={{ color }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live badge */}
                <div
                  className="absolute top-2 right-8 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: "#1a1a2e",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    animation: "heroFloat 4s ease-in-out infinite",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ background: "#10b981", animation: "heroPulseDot 1.5s ease-in-out infinite" }}
                  />
                  Live Scoring
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                </div>

                {/* Leads count badge */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end px-3 py-2 rounded-xl text-right"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    animation: "heroFloat 5s ease-in-out infinite 1s",
                  }}
                >
                  <span className="text-[9px] text-slate-500 font-medium">Total Leads</span>
                  <span className="text-lg font-bold leading-none" style={{ color: "#3DB9EB" }}>4,821</span>
                </div>

                {/* Notification card */}
                <div
                  className="absolute bottom-0 left-2 flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                    animation: "heroFloat 6s ease-in-out infinite 0.3s",
                  }}
                >
                  <Target className="w-4 h-4 shrink-0" style={{ color: "#FFC223" }} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-800 leading-none">Hot lead detected!</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Score: 94 · Enterprise segment</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── KEY FEATURES + OUTCOMES ── */}
        <section className="grid lg:grid-cols-2 gap-6">

          {/* Left: Key Features */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-enterprise-sm">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#3DB9EB" }} />
              <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">Key Features</p>
            </div>
            <div className="space-y-4">
              {KEY_FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5 border border-slate-100">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{feature.title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: What you get — SSCI blue gradient */}
          <div
            className="rounded-2xl p-6 text-white flex flex-col gap-4"
            style={{ background: "linear-gradient(135deg, #1B7FB5 0%, #2A9AD4 100%)" }}
          >
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#FFC223" }}>
                What you get
              </p>
              <h2 className="text-2xl font-bold mb-4 leading-snug">
                Actionable outputs<br />
                <span className="text-white/70">ready for your sales team.</span>
              </h2>
              <ul className="space-y-3">
                {OUTCOMES.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(255,194,35,0.3)" }}>
                      <Check className="w-3 h-3" style={{ color: "#FFC223" }} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                { icon: <TrendingUp className="w-4 h-4" style={{ color: "#FFC223" }} />, label: "Score Range", value: "0 – 100" },
                { icon: <Target className="w-4 h-4 text-emerald-300" />, label: "Model Accuracy", value: "> 91%" },
                { icon: <Users className="w-4 h-4" style={{ color: "#FFC223" }} />, label: "Lead Segments", value: "Auto" },
                { icon: <Clock className="w-4 h-4 text-white/60" />, label: "Time to Score", value: "< 2 min" },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl px-3 py-2"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,0.10)" }}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-[9px] text-white/60 font-medium leading-none mb-0.5">{label}</p>
                    <p className="text-white font-bold text-sm leading-none">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
              <p className="text-white/50 text-[11px]">
                Scoring models run natively on{" "}
                <span className="text-white font-semibold">Dataiku DSS</span>
                {" "}— automated retraining, versioning, and one-click deployment.
              </p>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">How it works</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-enterprise-sm flex gap-4 items-start"
              >
                <div
                  className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: "#3DB9EB" }}
                >
                  {step.n}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm mb-1">{step.title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="text-center text-xs text-slate-400 pt-4 border-t border-slate-200">
          Lead Scoring System · ML Model · Dataiku DSS · Built with Next.js
        </footer>

      </div>
    </MainLayout>
  )
}
