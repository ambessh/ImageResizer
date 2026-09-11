import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  metadataBase: new URL('https://www.resizewala.in'),
  title: 'ResizeWala - Official Exam Photo & Signature Resizer',
  description: 'Resize and compress government exam documents strictly under official KB and dimension limits.',
  verification: {
    google: '9NB-yZlDL565jh1Ivvz-u6-BVTmMx3jAqgKvZicLteY',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

