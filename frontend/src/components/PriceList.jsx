import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { Download } from "lucide-react";
import Footer from "./footer/Footer";
import MetaData from "../Pages/Home/MetaData";
import { SectionHeading, Card, Badge } from "./ui";
import pdf from "../SMSivakasiCrackers.pdf";

const PriceList = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-paper-50">
      <MetaData title={"Price List"} />

      <section className="section-container flex-1 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Price List"
          title={`${year} Crackers Price List`}
          subtitle="Download our latest crackers price list in PDF format."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mx-auto mt-12 max-w-md">
          <Card
            as="a"
            href={pdf}
            download
            interactive
            className="flex flex-col items-center gap-4 p-8 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-crimson-50 text-crimson-600">
              <FaFilePdf className="h-8 w-8" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-900">
                PDF Price List
              </h3>
              <p className="mt-1 text-sm text-ink-600">
                View and print a formatted PDF of our full price list.
              </p>
            </div>
            <Badge tone="crimson" className="mt-1">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download PDF
            </Badge>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PriceList;
