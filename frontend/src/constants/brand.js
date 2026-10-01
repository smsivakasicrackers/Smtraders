// Central source of truth for brand/contact details shown across the site
// (Footer, invoices, Terms, Contact page, etc.). Values copied verbatim from
// where they previously lived as literals — no business data changed here.

export const BRAND = {
  name: "SM Crackers",
  legalName: "SM Sivakasi Crackers",
  foundedYear: 2015,
  address: {
    line1: "Sattur to Thayilpatti road, Unjampatti",
    line2: "Near Jeyasri matches",
    line3: "",
    full: "Permanent: Sattur to Thayilpatti road, Unjampatti (Near Jeyasri matches) | Branch: Near RVCE college, Subbramaniyapuram",
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
