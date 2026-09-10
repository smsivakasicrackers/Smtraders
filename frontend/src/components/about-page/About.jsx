import React from "react";
import {
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Tags,
  MapPin,
  PhoneCall,
} from "lucide-react";
import Footer from "../footer/Footer";
import MetaData from "../../Pages/Home/MetaData";
import { SectionHeading, Button, Card, Badge } from "../ui";
import { BRAND, PHONE_DISPLAY } from "../../constants/brand";

const BRAND_NAMES = ["Sri Krishna", "SM Pyropark", "Vadivel", "Sunshine"];

const OFFERINGS = [
  {
    image: "/images/wholesale.jpg",
    title: "Wholesale",
    description:
      "Bulk orders for distributors, event organizers, and resellers looking for a wide range of crackers at competitive prices.",
  },
  {
    image: "/images/retail.jpg",
    title: "Retail",
    description:
      "Individual and family-sized orders — from sparklers to grand aerial shells — for your Diwali, New Year, wedding, or celebration.",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: Sparkles,
    title: "Wide Range of Crackers",
    description:
      "From dazzling sparklers to grand aerial shells, our collection is curated to add excitement and joy to every celebration.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "We provide only the safest and most spectacular crackers, sourced from trusted manufacturers.",
  },
  {
    icon: MessageCircle,
    title: "Easy Enquiry",
    description:
      "Browse our collection, build your list, and send an enquiry with ease — our team takes it from there.",
  },
  {
    icon: Tags,
    title: "Wholesale & Retail",
    description:
      "Whether you need bulk quantities or a curated retail order, we serve both wholesale and retail customers.",
  },
];

const About = () => {
  return (
    <div className="flex min-h-screen flex-col bg-paper-50 text-ink-800">
      <MetaData title={"About Us"} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900">
        <img
          src="/images/Homebanner.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/40" />
        <div className="section-container relative py-20 sm:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <Badge tone="gold">About {BRAND.name}</Badge>
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Lighting Up Every Celebration
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-ink-200 sm:text-lg">
              Welcome to {BRAND.name}, your one-stop destination for
              high-quality crackers that light up every celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-container py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-3">
            <SectionHeading
              eyebrow="Our Story"
              title="Who We Are"
            />
            <div className="flex flex-col gap-4 text-ink-600">
              <p className="leading-relaxed">
                We specialize in offering a wide range of fireworks — from
                dazzling sparklers to grand aerial shells — ensuring that
                your festivities shine brighter than ever.
              </p>
              <p className="leading-relaxed">
                With years of experience in the fireworks industry, we take
                pride in providing only the safest and most spectacular
                crackers, sourced from trusted manufacturers. Whether you're
                celebrating Diwali, New Year's Eve, weddings, or any special
                occasion, our collection is curated to add excitement and joy
                to your moments.
              </p>
              <p className="leading-relaxed">
                At {BRAND.name}, customer satisfaction and safety are our top
                priorities. Our website makes it easy to browse, choose, and
                build your order list — simply send us your enquiry and our
                team takes it from there. Light up the sky and make every
                occasion memorable with {BRAND.name}!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/wholesale.jpg"
              alt="SM Crackers wholesale business"
              className="col-span-2 h-48 w-full rounded-card object-cover shadow-card sm:h-64"
            />
            <img
              src="/images/retail.jpg"
              alt="SM Crackers retail business"
              className="col-span-2 h-48 w-full rounded-card object-cover shadow-card sm:h-64"
            />
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-white py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            eyebrow="What We Offer"
            title="Wholesale & Retail Crackers"
            subtitle="Whichever way you shop, we make sure every order is curated with care."
            align="center"
            className="mx-auto text-center"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {OFFERINGS.map((item) => (
              <Card key={item.title} padding="none" interactive className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-44 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Brands we handle */}
          <div className="mt-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-600">
              Brands We Handle
            </span>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
              <img
                src="/images/brand1.png"
                alt="Maruti Fireworks"
                className="h-16 object-contain transition-transform hover:scale-105 sm:h-20"
              />
              <img
                src="/images/brand2.png"
                alt="Mori Fireworks"
                className="h-16 object-contain transition-transform hover:scale-105 sm:h-20"
              />
            </div>

            {/* Scrolling brand marquee */}
            <div className="relative mt-8 w-full overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper-50 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper-50 to-transparent" />
              <div className="flex animate-scroll-slow gap-4">
                {[...BRAND_NAMES, ...BRAND_NAMES].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="shrink-0 rounded-pill border border-ink-100 bg-white px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-ink-700 shadow-soft"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Customers Choose Us */}
      <section className="section-container py-16 sm:py-20">
        <SectionHeading
          eyebrow="Why Customers Choose Us"
          title="Built Around Your Celebration"
          align="center"
          className="mx-auto text-center"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="flex flex-col items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-crimson-50 text-crimson-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink-900">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-600">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Quality & Safety (Vision & Mission) */}
      <section className="bg-ink-900 py-16 sm:py-20">
        <div className="section-container">
          <SectionHeading
            eyebrow="Quality & Safety"
            title="Our Vision & Mission"
            align="center"
            light
            className="mx-auto text-center"
          />
          <p className="mx-auto mt-6 max-w-3xl text-center leading-relaxed text-ink-200">
            To maintain quality of crackers in every aspect by offering safe,
            unique, and environmentally-friendly sparklers. Our mission is to
            be a first-class wholesale &amp; retail company, producing safe
            and compliant crackers of the highest quality at the best prices
            — enabling you to spread joy and happiness.
          </p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, label: "Safe & Compliant" },
              { icon: Sparkles, label: "Highest Quality" },
              { icon: Tags, label: "Best Prices" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 rounded-card border border-white/10 bg-white/5 p-6 text-center"
              >
                <Icon className="h-6 w-6 text-gold-400" aria-hidden="true" />
                <span className="text-sm font-semibold text-white">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Location */}
      <section className="section-container py-16 sm:py-20">
        <SectionHeading
          eyebrow="Our Location"
          title="Find Us"
          align="center"
          className="mx-auto text-center"
        />
        <Card className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-crimson-50 text-crimson-600">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="leading-relaxed text-ink-600">{BRAND.address.full}</p>
        </Card>
      </section>

      {/* Contact CTA */}
      <section className="bg-crimson-600 py-14 sm:py-16">
        <div className="section-container flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Ready to Light Up Your Celebration?
          </h2>
          <p className="max-w-xl text-sm text-crimson-50 sm:text-base">
            Reach out to us at {PHONE_DISPLAY} or send us a message and our
            team will get back to you shortly.
          </p>
          <Button href="/contact" variant="gold" size="lg" icon={PhoneCall}>
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
