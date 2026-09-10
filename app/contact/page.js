import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us | Exam Photo Resizer",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 space-y-6">
        
        {/* Subtle Category Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
            Help & Support
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Have questions, feedback, or need a specific exam preset added to our tool? Reach out to our technical support team.
          </p>
        </div>

        <hr className="border-slate-200" />

        {/* Contact Card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Email Support</h3>
            <a 
              href="mailto:support@examphotoresizer.com" 
              className="mt-0.5 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              resizewala.help@gmail.com
            </a>
            <p className="mt-1 text-xs text-slate-500">
              We typically reply within 24–48 business hours.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}