import LandingNav from "../ui/landingNav";

export default function Landing() {
  return (
    <div className="w-full bg-bg flex flex-col min-h-screen">
      {/* Header */}
      <header>
        <LandingNav />
      </header>

      <main className="flex-1 cursor-default">
        <section className="px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-text leading-tight">
              Smart Receipt Scanning <br /> with <span className="text-primary">Flowceipt</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-lg">
              Scan, process, and store receipts instantly with AI-powered OCR.
              Integrated with Stripe for effortless expense tracking and financial management.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition cursor-pointer">
                Get Started
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/hero-receipt.png"
              alt="Receipt Scanning Illustration"
              className="max-w-md w-full rounded-2xl shadow-lg"
            />
          </div>
        </section>

        <section className="px-6 md:px-12 py-16 bg-card">
          <h2 className="text-3xl font-bold text-center text-text">Why Flowceipt?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="p-6 rounded-2xl bg-bg shadow hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-text">AI OCR Accuracy</h3>
              <p className="mt-4 text-muted">
                Extract vendor, date, total, and items with high precision.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-bg shadow hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-text">Stripe Integration</h3>
              <p className="mt-4 text-muted">
                Sync expenses directly with your Stripe dashboard for streamlined finance tracking.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-bg shadow hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-text">Secure Cloud Storage</h3>
              <p className="mt-4 text-muted">
                Store all your receipts securely and access them from anywhere.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-8 px-6 md:px-12 cursor-default">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Flowceipt. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm text-muted">
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
