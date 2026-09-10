import React from "react";
import Link from "next/link";
import { PRESETS } from "@/config/presets";

export default function PresetTable() {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Examination / Portal</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Supported Documents</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Max File Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {PRESETS.map((preset) => {
              // Extract max KB range (e.g., "10 - 50 KB" or "Max 50 KB")
              const kbValues = preset.subDocs?.map((d) => d.maxKB) || [];
              const minKB = Math.min(...kbValues);
              const maxKB = Math.max(...kbValues);
              const sizeLabel =
                minKB === maxKB ? `Max ${maxKB} KB` : `${minKB} – ${maxKB} KB`;

              return (
                <tr 
                  key={preset.id} 
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  {/* 1. Exam Title with Clean Link */}
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-900 leading-snug">
                   <Link
  href={`/${preset.slug}#tool`}
  className="hover:text-emerald-700 hover:underline transition-colors block"
>
  {preset.title}
</Link>
                  </td>

                  {/* 2. Category Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/80">
                      {preset.category}
                    </span>
                  </td>

                  {/* 3. Supported Documents */}
                  <td className="py-3.5 px-4 text-slate-500 leading-relaxed max-w-xs sm:max-w-md">
                    {preset.subDocs?.map((d) => d.label).join(", ")}
                  </td>

                  {/* 4. Official Specs Limit (Clean, high-utility metric) */}
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <span className="font-mono text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-md">
                      {sizeLabel}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}