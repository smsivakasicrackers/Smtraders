// Central source of truth for brand/contact details shown across the site
// (Footer, invoices, Terms, Contact page, etc.).

export const BRAND = {
  name: "SM Crackers",
  legalName: "SM Sivakasi Crackers",
  foundedYear: 2015,
  address: {
    line1: "Sattur to Thayilpatti Road, Unjampatti",
    line2: "Near Jai Sree Matches",
    line3: "Sattur - 626203",
    landmark: "Near Jai Sree Matches",
    pincode: "626203",
    full: "Sattur to Thayilpatti Road, Unjampatti, Near Jai Sree Matches, Sattur - 626203",
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
  mapsUrl: "https://maps.app.goo.gl/q17vmtdDpRD5MuKN6",
  mapsEmbed: "https://maps.google.com/maps?q=9.367081,77.845841&hl=en&z=15&output=embed",
};

export const PHONE_DISPLAY = `+91 ${BRAND.phones.primary} / +91 ${BRAND.phones.secondary} / +91 ${BRAND.phones.tertiary}`;
