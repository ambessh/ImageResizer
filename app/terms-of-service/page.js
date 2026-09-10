export const metadata = {
  title: "Terms of Service | Exam Photo Resizer",
};

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-slate-700 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
      <p className="text-xs text-slate-400">Last updated: September 2026</p>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-800">1. Acceptance of Terms</h2>
        <p className="text-sm leading-relaxed">
          By accessing and using Exam Photo Resizer, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our utility tools.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-800">2. Permitted Use</h2>
        <p className="text-sm leading-relaxed">
          This service is provided free of charge for personal and non-commercial use to assist in resizing and compressing images for academic, employment, and governmental online forms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-800">3. Disclaimer of Warranty</h2>
        <p className="text-sm leading-relaxed">
          While we calibrate presets according to official exam notifications, guidelines may change without notice. Users are advised to verify final image dimensions and file sizes against the official recruitment portals prior to final submission.
        </p>
      </section>
    </main>
  );
}