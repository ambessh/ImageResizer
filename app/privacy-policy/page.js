import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Exam Photo Resizer",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="space-y-3 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Client-Side Privacy
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: September 2026</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-sm leading-relaxed text-slate-600">
          
          {/* Key Feature Card */}
          <section className="space-y-2 bg-emerald-50/50 p-5 sm:p-6 rounded-xl border border-emerald-200/80">
            <h2 className="text-base font-semibold text-emerald-950 flex items-center gap-2">
              1. Client-Side Image Privacy (Zero Server Storage)
            </h2>
            <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
              At Exam Photo Resizer, we respect your personal data. We do NOT store, transmit, or process your photos or signatures on any remote cloud server. All resizing, cropping, and compression operations are carried out solely inside your browser using HTML5 Canvas technology. Your files never leave your device.
            </p>
          </section>

          <section className="space-y-2 bg-slate-50/70 p-5 sm:p-6 rounded-xl border border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              2. Cookies & Advertising
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We may use third-party advertising vendors (such as Google AdSense) to serve advertisements when you visit our website. These vendors may use cookies to serve ads based on your prior visits to this or other websites. You can manage or disable cookie tracking directly via your browser settings.
            </p>
          </section>

          <section className="space-y-2 bg-slate-50/70 p-5 sm:p-6 rounded-xl border border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              3. Log Files & Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Like many web applications, standard anonymous web server logs (such as browser type, device type, referring pages, and timestamp) are captured for diagnostic, telemetry, and platform stability purposes only. No personal identity or uploaded document data is ever correlated.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
}