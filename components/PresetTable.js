"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRESETS } from "@/config/presets";
import { Table as TableIcon, ChevronDown, ChevronUp } from "lucide-react";

export default function PresetTable({ activeSlug = null }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Flatten all sub-documents
  const allRows = PRESETS.flatMap((preset) =>
    preset.subDocs.map((doc) => ({
      ...doc,
      presetId: preset.id,
      presetTitle: preset.title,
      presetSlug: preset.slug,
      category: preset.category,
    }))
  );

  // Show 10 rows by default or all if expanded
  const visibleRows = isExpanded ? allRows : allRows.slice(0, 10);

  return (
    <div className="border border-slate-200 bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium mb-1.5">
            <TableIcon className="w-3.5 h-3.5 text-emerald-600" />
            Official 2026 Portal Standards
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Official Exam & Document Dimensions Directory
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Verified dimensions and strict upload constraints across all {PRESETS.length} recruitment, entrance, and civic portals.
          </p>
        </div>
        <div className="text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          Total Presets: <span className="text-emerald-700 font-bold">{PRESETS.length}</span>
        </div>
      </div>

      {/* Table - Exact locked widths */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full table-fixed text-left text-xs text-slate-700 min-w-[620px] sm:min-w-full">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th className="w-[38%] px-3.5 py-3 font-semibold">Exam / Portal</th>
              <th className="w-[24%] px-3.5 py-3 font-semibold">Document</th>
              <th className="w-[22%] px-3.5 py-3 font-semibold">Target Resolution</th>
              <th className="w-[16%] px-3.5 py-3 font-semibold text-right">Size Limit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {visibleRows.map((item, idx) => {
              const isCurrent = activeSlug && item.presetSlug === activeSlug;
              return (
                <tr
                  key={`${item.presetId}-${item.id}-${idx}`}
                  className={`transition-colors ${
                    isCurrent
                      ? "bg-emerald-50/70 font-medium"
                      : "hover:bg-slate-50/80"
                  }`}
                >
                  {/* Col 1: Exam + Category Badge */}
                  <td className="px-3.5 py-2.5">
                    <Link
                      href={`/${item.presetSlug}`}
                      className="font-semibold text-slate-900 hover:text-emerald-700 block truncate"
                    >
                      {item.presetTitle}
                    </Link>
                    <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200/80">
                      {item.category}
                    </span>
                  </td>

                  {/* Col 2: Document Name */}
                  <td className="px-3.5 py-2.5 text-slate-700 font-medium truncate">
                    {item.label}
                  </td>

                  {/* Col 3: Resolution */}
                  <td className="px-3.5 py-2.5 text-slate-600 font-mono text-[11px]">
                    <div>{item.width} × {item.height} px</div>
                    <div className="text-[10px] font-sans text-slate-400 truncate">
                      {item.dimensionsLabel}
                    </div>
                  </td>

                  {/* Col 4: Size Badge */}
                  <td className="px-3.5 py-2.5 text-right">
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-medium whitespace-nowrap">
                      {item.minKB}-{item.maxKB} KB
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Expand / Collapse Button (No scroll-trap issue!) */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
        >
          {isExpanded ? (
            <>
              Show Less Standard Rows <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              View All {allRows.length} Exam Documents ({PRESETS.length} Portals) <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}