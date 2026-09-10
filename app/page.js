import ImageResizerTool from "@/components/ImageResizerTool";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { PRESETS } from "@/config/presets";
import PresetTable from "@/components/PresetTable";
export const metadata = {
  title: "Free Online Photo & Signature Resizer for Govt Exams & Passport",
  description:
    "Resize and compress photos to exact 20KB, 50KB, or 100KB for SSC, UPSC, CUET, NEET, and Indian Passport online application forms instantly.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 pb-6">
      {/* 1. Main Interactive Tool */}
      <section className="max-w-5xl mx-auto px-4 pt-6 mb-12">
        <ImageResizerTool />
      </section>

      {/* 2. Trust & Features Strip */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">100% Privacy Protected</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Your photos never leave your device. All compression happens directly inside your browser memory.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Instant Processing</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Zero upload waiting time or server queues. Resize and download in less than 2 seconds.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Exact Dimensions</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Pre-configured pixel and KB constraints verified for SSC, UPSC, and NTA admission forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specs Table & Guides Container */}
      <section className="max-w-5xl mx-auto px-4 space-y-10">
        <PresetTable />
        {/* How to Guide Card */}
        <div className="bg-slate-50/70 p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            How to Resize Your Photo to 20KB or 50KB Online
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
            <li>
              Select your exam preset (e.g., <em className="text-slate-800">SSC Exam Photo</em> or <em className="text-slate-800">UPSC Photo</em>) from the list.
            </li>
            <li>
              Choose whether you are resizing a <strong className="text-slate-800">Photograph</strong>, <strong className="text-slate-800">Signature</strong>, or <strong className="text-slate-800">Thumb Impression</strong>.
            </li>
            <li>
              Click <strong className="text-slate-800">Browse Image</strong>. The interactive Cropper opens automatically with the exact aspect ratio locked.
            </li>
            <li>
              Adjust your photo framing using pinch, zoom, rotate, or drag, then click <strong className="text-slate-800">Apply Crop</strong>.
            </li>
            <li>
              The binary search compression immediately fits your file under the strict KB limit. Click <strong className="text-slate-800">Download</strong> to save.
            </li>
          </ol>
        </div>

        {/* FAQs */}
        <div className="bg-slate-50/70 p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-5">
          <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-semibold text-slate-900">
                Why does my government job form reject my photo upload?
              </h3>
              <p className="mt-1 leading-relaxed">
                Most portals (like SSC, UPSC, or NTA) run automatic server validators. If your photo is even 51KB when the maximum limit is 50KB, or if pixel aspect ratios do not match, the portal drops the file.
              </p>
            </div>
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-semibold text-slate-900">
                Will resizing compress my photo and make it blurry?
              </h3>
              <p className="mt-1 leading-relaxed">
                Our engine uses bicubic canvas image smoothing and binary search quality targeting so facial details and signatures remain sharp even when squeezed under 20KB.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Is it safe to upload personal documents here?
              </h3>
              <p className="mt-1 leading-relaxed">
                Yes, 100%. Unlike cloud converters, no images or signatures are sent to external servers. All processing and compression happen locally inside your browser memory.
              </p>
            </div>
          </div>
        </div>

        {/* Official Compliance Disclaimer Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Official Portal Disclaimer
          </div>
          <p className="leading-relaxed">
            This tool is an independent utility created to assist candidates in formatting photographs and signatures to match prescribed pixel dimensions and file sizes. We are <strong className="text-slate-800">not affiliated, endorsed, or associated with any government body</strong> (including SSC, UPSC, NTA, IBPS, or state examination commissions). 
          </p>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Candidates are advised to independently verify their respective recruitment or exam notification guidelines before submitting any online application.
          </p>
        </div>
      </section>
    </main>
  );
}