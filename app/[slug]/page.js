import ImageResizerTool from "@/components/ImageResizerTool";
import PresetTable from "@/components/PresetTable";
import { PRESETS } from "@/config/presets";
import { notFound } from "next/navigation";
import { ShieldCheck, HelpCircle, FileText, AlertTriangle } from "lucide-react";

export async function generateStaticParams() {
  return PRESETS.map((preset) => ({
    slug: preset.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const preset = PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    return {
      title: "Preset Not Found - ExamResize",
    };
  }

  const primaryDoc = preset.subDocs?.[0] || {};

  return {
    title: `${preset.title} Photo & Document Resizer - Free Online Tool`,
    description: `Resize and compress your photograph, signature, and documents for ${preset.title} strictly under ${primaryDoc.maxKB || 50}KB with exact pixel dimensions. 100% client-side.`,
  };
}

export default async function PresetPage({ params }) {
  const { slug } = await params;
  const preset = PRESETS.find((p) => p.slug === slug);

  if (!preset) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 pb-6">
      {/* 1. Main Interactive Tool */}
      <section className="max-w-5xl mx-auto px-4 pt-6 mb-12">
        <ImageResizerTool initialPresetSlug={preset.slug} />
      </section>

      {/* 2. Structured Information & Reusable Table */}
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        
        {/* Step-by-Step Instructions */}
        <section className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">
              How to Resize Your {preset.title} Documents Online
            </h3>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-600 list-decimal list-inside leading-relaxed">
            <li>Choose whether you are resizing a <strong>Photograph</strong>, <strong>Signature</strong>, or <strong>Impression</strong> above.</li>
            <li>Click <strong>Browse Image</strong>. The interactive Cropper opens automatically with the exact ratio locked.</li>
            <li>Adjust your framing using zoom, rotate, or drag, then click <strong>Apply Crop</strong>.</li>
            <li>The binary search compression immediately fits your file under the strict official KB limit.</li>
            <li>Click <strong>Download Image</strong> to save your ready-to-upload JPEG file.</li>
          </ol>
        </section>

        {/* FAQs */}
        <section className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Frequently Asked Questions
            </h3>
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-slate-600">
            <div className="border-b border-slate-200 pb-4">
              <p className="font-semibold text-slate-900">Why does my application portal reject my photo upload?</p>
              <p className="mt-1 leading-relaxed">
                Most government recruitment portals run automatic server validators. If your file is even 1KB over the limit or if the aspect ratio doesn't match the required dimensions, the portal rejects the file instantly.
              </p>
            </div>
            <div className="border-b border-slate-200 pb-4">
              <p className="font-semibold text-slate-900">Will compression make my signature or face blurry?</p>
              <p className="mt-1 leading-relaxed">
                Our engine uses bicubic canvas interpolation with binary search compression, ensuring that edges and handwritten ink strokes stay crisp while strictly meeting the file size cap.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Is it safe to format government exam documents here?</p>
              <p className="mt-1 leading-relaxed">
                Yes, 100%. No photographs or signatures ever leave your phone or computer. All processing happens in local browser memory.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Reusable Shared Reference Table */}
        <PresetTable activeSlug={preset.slug} />

        {/* Official Portal Disclaimer */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <AlertTriangle className="w-4 h-4 text-emerald-700" />
            Official Portal Disclaimer
          </div>
          <p className="leading-relaxed">
            This tool is an independent utility created to assist candidates in formatting photographs and signatures to match prescribed pixel dimensions and file sizes. We are <strong className="text-slate-800">not affiliated, endorsed, or associated with any government body</strong> (including SSC, UPSC, NTA, IBPS, or state examination commissions).
          </p>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Candidates are advised to independently verify their respective recruitment or exam notification guidelines before submitting any online application.
          </p>
        </section>

        {/* Security Guarantee */}
        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 flex items-center gap-3 text-xs text-emerald-900">
          <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-700" />
          <span className="leading-relaxed">
            All document formatting and compression runs locally inside your browser memory. Your personal files are never uploaded to any cloud server or database.
          </span>
        </div>

      </div>
    </main>
  );
}