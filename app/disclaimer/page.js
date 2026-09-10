import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Disclaimer - Exam Photo Resizer",
  description: "Official legal disclaimer and non-affiliation notice.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Resizer
        </Link>

        {/* Title Header */}
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Legal Notice
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Disclaimer</h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </div>

        {/* Legal Text Content */}
        <div className="space-y-4 text-sm leading-relaxed text-slate-600">
          <section className="space-y-2 bg-slate-50/70 p-5 sm:p-6 rounded-xl border border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">1. Non-Affiliation Disclaimer</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This platform is an independent, free online image processing utility. It is not affiliated, associated, authorized, endorsed by, or in any way officially connected with any government organization, department, or recruitment agency such as the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), National Testing Agency (NTA), Institute of Banking Personnel Selection (IBPS), Railway Recruitment Boards (RRB), or any other Central or State Government portal.
            </p>
          </section>

          <section className="space-y-2 bg-slate-50/70 p-5 sm:p-6 rounded-xl border border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">2. Accuracy of Specifications</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Preset dimensions, maximum file sizes (KB), and file formats provided on this website are aggregated from past public notifications and official guidelines for convenience only. Examination boards may alter upload rules or criteria without prior notice. Users are strictly advised to review their active official recruitment notifications before final submission.
            </p>
          </section>

          <section className="space-y-2 bg-slate-50/70 p-5 sm:p-6 rounded-xl border border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">3. Zero Data Retention & Security</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All image operations, including cropping, compression, and conversion, are performed locally within your client browser using client-side JavaScript APIs. No personal documents, images, signatures, or biometric files are uploaded to, stored on, or transmitted across any external web servers.
            </p>
          </section>

          <section className="space-y-2 bg-slate-50/70 p-5 sm:p-6 rounded-xl border border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">4. Limitation of Liability</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Under no circumstances shall the operators of this platform be held liable for any rejection of candidate applications, missed deadlines, typographical errors, technical anomalies, or consequential damages resulting from the use of this tool.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}