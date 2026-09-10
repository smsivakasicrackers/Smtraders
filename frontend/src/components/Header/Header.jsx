import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Sparkles, PackageSearch, MessageCircle } from "lucide-react";
import { Button } from "../ui";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Premium Quality" },
  { icon: Sparkles, label: "Sivakasi Direct" },
  { icon: PackageSearch, label: "Wide Product Range" },
  { icon: MessageCircle, label: "Easy Enquiry" },
];

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="relative overflow-hidden bg-ink-950 text-white">
      {/* Ambient festive glow, decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 10%, rgba(246,81,15,0.35) 0%, rgba(11,11,17,0) 60%), radial-gradient(50% 50% at 10% 90%, rgba(184,31,66,0.35) 0%, rgba(11,11,17,0) 60%)",
        }}
      />

      {/* Large emblem watermark filling the empty right side on wide screens */}
      <img
        src="/images/logo.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-[420px] w-auto -translate-y-1/2 opacity-[0.14] drop-shadow-[0_0_80px_rgba(230,178,51,0.35)] lg:block xl:h-[520px]"
      />

      <div className="section-container relative flex flex-col items-start gap-6 py-20 sm:py-24 lg:py-28">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-300">
          Sivakasi &bull; Tamil Nadu
        </span>

        <h1 className="max-w-2xl font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
          Light Up Every Celebration.
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg">
          Discover premium Sivakasi fireworks, festive collections and celebration
          essentials from a trusted local supplier.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="primary" size="lg" onClick={() => navigate("/products")}>
            Explore Collection
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/Price")}
            className="!border-white/20 !bg-white/5 !text-white hover:!border-gold-300 hover:!text-gold-200"
          >
            Get Price List
          </Button>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm text-ink-200">
              <Icon className="h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
