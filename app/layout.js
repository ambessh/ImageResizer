import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Exam & Passport Photo Resizer Tool",
  description: "Free online photo and signature resizer for government exams and passport forms.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}