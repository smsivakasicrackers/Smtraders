// Central source of truth for brand/contact details shown across the site
// (Footer, invoices, Terms, Contact page, etc.). Values copied verbatim from
// where they previously lived as literals — no business data changed here.

export const BRAND = {
  name: "SM Crackers",
  legalName: "SM Sivakasi Crackers",
  foundedYear: 2015,
  address: {
    line1: "4/175/A Sattur to Sivakasi Road",
    line2: "Veerapandiyapuram",
    line3: "Near Toll Gate, Sattur - 626203",
    full: "4/175/A Sattur to Sivakasi Road, Veerapandiyapuram, Near Toll Gate, Sattur - 626203",
  },
  email: "smpyropark.2019@gmail.com",
  phones: {
    primary: "8903359989",
    secondary: "8248450298",
    tertiary: "6381933039",
  },
  // Kept distinct on purpose: the floating chat button and the
  // order-invoice "notify admin" action historically use different numbers.
  whatsapp: {
    chat: "918903359989",
    orderNotify: "918248450298",
  },
};

export const PHONE_DISPLAY = `+91 ${BRAND.phones.primary} / +91 ${BRAND.phones.secondary} / +91 ${BRAND.phones.tertiary}`;
