import React from "react";
import Footer from "./footer/Footer";
import LegalNotice from "./LegalNotice";

const Termsandcondition = () => {
  return (
    <div>
      <div className="section-container max-w-3xl py-16 sm:py-20">
        <LegalNotice className="mb-8" />

        <div className="rounded-card border border-ink-100 bg-white p-6 shadow-card sm:p-10">
          <h1 className="text-center font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-700">
            <p>
              Welcome to <strong className="text-ink-900">SM Sivakasi Crackers</strong>. By accessing and
              purchasing from our website{" "}
              <a
                href="https://smsivakasicrackers.com"
                target="_blank"
                rel="noreferrer"
                className="text-crimson-600 underline decoration-crimson-200 underline-offset-2 hover:text-crimson-700"
              >
                smsivakasicrackers.com
              </a>
              , you agree to the following terms and conditions. Please read them
              carefully before placing your order.
            </p>

            <section>
              <h2 className="border-l-4 border-gold-400 pl-3 font-display text-xl font-semibold text-ink-900">
                1. Order Process
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Customers can browse our cracker products and create their order
                  list.
                </li>
                <li>
                  Once the order is finalized, you must{" "}
                  <strong className="text-ink-900">download the PDF invoice</strong> from our website.
                </li>
                <li>
                  Send the invoice to our official number{" "}
                  <strong className="text-ink-900">+91 82484 50298 / +91 89033 59989</strong> for confirmation.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="border-l-4 border-gold-400 pl-3 font-display text-xl font-semibold text-ink-900">
                2. Payment
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  We do <strong className="text-ink-900">not</strong> provide online payment gateway facilities.
                </li>
                <li>
                  Payment must be made via <strong className="text-ink-900">Google Pay / UPI / Bank Transfer</strong> to the details shared after order confirmation.
                </li>
                <li>
                  Orders will only be processed once the payment is confirmed.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="border-l-4 border-gold-400 pl-3 font-display text-xl font-semibold text-ink-900">
                3. Shipping &amp; Delivery
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Delivery timelines will be communicated after order confirmation and
                  payment.
                </li>
                <li>
                  Shipping charges (if applicable) will be informed prior to delivery.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="border-l-4 border-gold-400 pl-3 font-display text-xl font-semibold text-ink-900">
                4. Cancellations &amp; Refunds
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Orders once confirmed and paid are <strong className="text-ink-900">non-refundable</strong>.
                </li>
                <li>
                  In case of cancellation before payment, no charges will apply.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="border-l-4 border-gold-400 pl-3 font-display text-xl font-semibold text-ink-900">
                5. Legal Disclaimer
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  Crackers will only be sold to customers above{" "}
                  <strong className="text-ink-900">18 years of age</strong>.
                </li>
                <li>
                  Buyers must comply with all local laws and regulations related to
                  the purchase and use of fireworks.
                </li>
                <li>
                  SM Sivakasi Crackers is not liable for misuse of products after
                  delivery.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="border-l-4 border-gold-400 pl-3 font-display text-xl font-semibold text-ink-900">
                6. Contact Information
              </h2>
              <p className="mt-3">
                For order confirmation, payment, or queries, please contact us at:{" "}
                <br />
                <strong className="text-ink-900">Phone:</strong> +91 82484 50298 / +91 89033 59989 <br />
                <strong className="text-ink-900">Email:</strong> smpyropark.2019@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Termsandcondition;
