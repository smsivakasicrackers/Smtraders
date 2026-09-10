import React, { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send } from "lucide-react";
import Footer from "../footer/Footer";
import MetaData from "../../Pages/Home/MetaData";
import { SectionHeading, Card, Button } from "../ui";
import { BRAND, PHONE_DISPLAY } from "../../constants/brand";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const message = `Hello ${BRAND.name}! I'd like to make an enquiry.\n\n*Name:* ${form.firstName} ${form.lastName}\n*Email:* ${form.email}\n*Phone:* ${form.phone}\n*Message:* ${form.message}`;
    const whatsappUrl = `https://wa.me/${BRAND.whatsapp.chat}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper-50">
      <MetaData title={"Contact"} />

      <section className="section-container py-16 sm:py-20">
        <SectionHeading
          eyebrow="Contact Us"
          title="Get in Touch"
          subtitle="Have a question about our products or services? Reach us directly or send an enquiry below."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Need Help? */}
          <Card className="flex flex-col gap-6 lg:col-span-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink-900">
                Need Help?
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                Call, WhatsApp, or email us directly — we're happy to help.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={`tel:+91${BRAND.phones.primary}`}
                className="flex min-h-[44px] items-center gap-4 rounded-card border border-crimson-200 bg-crimson-50 px-4 py-4 transition hover:border-crimson-300 hover:bg-crimson-100"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-crimson-600 text-white">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-crimson-700">
                    Call Us
                  </span>
                  <span className="block text-sm font-semibold text-ink-900 sm:text-base">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>

              <a
                href={`https://wa.me/${BRAND.whatsapp.chat}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-4 rounded-card border border-emerald-200 bg-emerald-50 px-4 py-4 transition hover:border-emerald-300 hover:bg-emerald-100"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    WhatsApp
                  </span>
                  <span className="block text-sm font-semibold text-ink-900 sm:text-base">
                    Chat with us instantly
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="flex min-h-[44px] items-center gap-4 rounded-card border border-ink-100 bg-white px-4 py-4 transition hover:border-crimson-200"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Email
                  </span>
                  <span className="block text-sm font-semibold text-ink-900 sm:text-base break-all">
                    {BRAND.email}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4 rounded-card border border-ink-100 bg-white px-4 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-700">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Address
                  </span>
                  <span className="block text-sm leading-relaxed text-ink-700">
                    {BRAND.address.full}
                  </span>
                </span>
              </div>
            </div>
          </Card>

          {/* Send an Enquiry */}
          <Card className="lg:col-span-3">
            <h2 className="font-display text-xl font-semibold text-ink-900">
              Send an Enquiry
            </h2>
            <p className="mt-1 text-sm text-ink-600">
              Fill in the form and we'll open WhatsApp with your message
              ready to send.
            </p>

            <form onSubmit={submitHandler} className="mt-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={onChange}
                    placeholder="Enter your first name"
                    className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-ink-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={onChange}
                    placeholder="Enter your last name"
                    className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-ink-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-ink-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ink-700">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Write your query here..."
                  rows="5"
                  className="w-full resize-none rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson-100"
                  required
                ></textarea>
              </div>

              <Button type="submit" variant="primary" size="lg" icon={Send} className="w-full sm:w-auto">
                Send via WhatsApp
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Google Map */}
      <section className="section-container pb-16 sm:pb-20">
        <div className="overflow-hidden rounded-card border border-ink-100 shadow-card">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.3778127552728!2d77.9098025!3d9.3881994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cbf39a3eab71%3A0xd9fb1439ac0c587e!2ssm%20crackers!5e0!3m2!1sen!2sin!4v1757345080519!5m2!1sen!2sin"
            className="h-[350px] w-full border-0 sm:h-[400px]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SM Crackers Location"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
