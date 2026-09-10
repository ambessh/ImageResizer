export const metadata = {
  title: "About Us | Exam Photo Resizer",
};

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        
        {/* Subtle Category/Trust Tag */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
            Privacy-First Utility
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          About Us
        </h1>
        
        {/* Intro Subtitle */}
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Welcome to <strong className="font-semibold text-slate-900">ResizeWala</strong> — an intuitive, fast, and privacy-first utility built specifically for students, job applicants, and cyber cafe operators.
        </p>

        <hr className="my-8 border-slate-200" />

        {/* Content Body */}
        <div className="space-y-6 text-sm leading-relaxed text-slate-600 sm:text-base">
          <p>
            Government examination boards (such as SSC, UPSC, NTA, and State PSCs) and official recruitment portals have stringent criteria regarding file size (e.g., 20KB to 50KB) and exact pixel aspect ratios. Inexperienced candidates frequently struggle with form rejections simply due to improper document dimensions.
          </p>

          {/* Sober Highlight Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
              Our Core Mission
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Our goal is to eliminate application friction through instant browser-side processing. All compression and cropping operations execute directly on your device, ensuring sensitive photographs and signatures remain entirely private and are never uploaded or stored on any external server.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}