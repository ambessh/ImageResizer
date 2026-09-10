import Link from "next/link";
import { Shield } from "lucide-react";
import { PRESETS } from "@/config/presets";

export default function Footer() {
  return (
    <footer className="bg-slate-50/70 border-t border-slate-200 mt-10 pt-12 pb-10 text-slate-600">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* All Exam & Document Presets Directory */}
        <div className="mb-10 pb-8 border-b border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              All Examination & Portal Document Presets
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded">
              {PRESETS.length} Presets
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
             <Link
  key={preset.id}
  href={`/${preset.slug}#tool`}
  className="text-xs text-slate-600 hover:text-emerald-700 bg-white hover:border-emerald-600 border border-slate-200 px-2.5 py-1.5 rounded-lg transition"
>
  {preset.title}
</Link>
            ))}
          </div>
        </div>

        {/* 4-Column Minimal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          <div className="sm:col-span-2 space-y-3">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-900 tracking-tight">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 font-bold text-white text-xs">
                R
              </div>
              <span>
                Resize<span className="text-emerald-700">Wala</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Free, client-side photo and signature formatter designed for students and online application centers. Zero server uploads.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              100% In-Browser Privacy
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-700 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-emerald-700 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-700 transition">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-700 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-700 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ResizeWala. All rights reserved.</p>
          <p className="text-[11px]">Not affiliated with any government recruitment authority.</p>
        </div>

      </div>
    </footer>
  );
}