import React from "react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Download } from "lucide-react";
import Footer from "./footer/Footer";
import MetaData from "../Pages/Home/MetaData";
import { SectionHeading, Card, Badge } from "./ui";
import pdf from "../SMSivakasiCrackers.pdf";
import xcl from "../SMCRACKERS.xlsx";

const PriceList = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-paper-50">
      <MetaData title={"Price List"} />

      <section className="section-container flex-1 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Price List"
          title={`${year} Crackers Price List`}
          subtitle="Download our latest crackers price list in PDF or Excel format."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          <Card
            as="a"
            href={pdf}
            download
            interactive
            className="flex flex-col items-center gap-4 text-center"
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

          <Card
            as="a"
            href={xcl}
            download
            interactive
            className="flex flex-col items-center gap-4 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <FaFileExcel className="h-8 w-8" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink-900">
                Excel Price List
              </h3>
              <p className="mt-1 text-sm text-ink-600">
                Get an editable spreadsheet version for easy comparison.
              </p>
            </div>
            <Badge tone="success" className="mt-1">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download Excel
            </Badge>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PriceList;
