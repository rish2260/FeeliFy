export default function InfluencersMediaPage() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen">
      <span className="font-mono text-xs text-[var(--acc)] uppercase tracking-widest mb-4 block">
        Network
      </span>
      <h1 className="text-[8vw] font-black uppercase leading-[0.8] tracking-tighter mb-12">
        Influencers
        <br />& Media
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12">
          <h3 className="text-3xl font-black uppercase mb-4">
            Influencer Management
          </h3>
          <p className="opacity-70 text-lg mb-8">
            End-to-end influencer campaign management from discovery to
            performance tracking. We connect you with voices that matter.
          </p>
          <div className="flex gap-2">
            <div className="w-12 h-12 rounded-full bg-white/10" />
            <div className="w-12 h-12 rounded-full bg-white/20" />
            <div className="w-12 h-12 rounded-full bg-white/10" />
            <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 text-xs font-mono">
              +50
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12">
          <h3 className="text-3xl font-black uppercase mb-4">
            Media Relations
          </h3>
          <p className="opacity-70 text-lg mb-8">
            Strategic PR and media placement to get your brand featured in
            top-tier publications and digital outlets.
          </p>
          <button className="px-6 py-3 border border-white/20 text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors">
            View Press Kit
          </button>
        </div>
      </div>
    </div>
  );
}
