import { Smartphone, CheckCircle2 } from "lucide-react";

const perks = [
  "Live order tracking on map",
  "Easy one-tap reordering",
  "Exclusive app-only deals",
  "Push notifications for your order",
];

export function AppDownloadSection() {
  return (
    <section className="py-16 bg-charcoal-900">
      <div className="page-container">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Icon side */}
          <div className="flex items-center justify-center h-32 w-32 rounded-3xl bg-charcoal-800 border border-charcoal-700 shrink-0">
            <Smartphone className="h-14 w-14 text-brand-400" />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <p className="section-label text-brand-400 mb-2">Mobile App</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Get the Smart Food Delivery App
            </h2>
            <p className="text-charcoal-400 text-sm mb-6 max-w-md">
              Download our app for the best experience — faster ordering, live tracking, and exclusive deals.
            </p>

            <ul className="space-y-2 mb-8">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-charcoal-300 justify-center md:justify-start">
                  <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
              <button className="flex items-center gap-3 rounded-xl bg-charcoal-800 border border-charcoal-600 hover:border-charcoal-500 px-5 py-3 transition-colors">
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <p className="text-[10px] text-charcoal-400">Download on the</p>
                  <p className="text-sm font-semibold text-white">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-xl bg-charcoal-800 border border-charcoal-600 hover:border-charcoal-500 px-5 py-3 transition-colors">
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <p className="text-[10px] text-charcoal-400">Get it on</p>
                  <p className="text-sm font-semibold text-white">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
