const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;

export const siteUrl = configuredUrl
  ? new URL(
      configuredUrl.startsWith("http")
        ? configuredUrl
        : `https://${configuredUrl}`,
    ).origin
  : "http://localhost:3000";

export const business = {
  name: "55 South Contractors",
  legalName: "55 South Contractors LLC",
  phone: "+1-314-717-9971",
  description:
    "St. Louis roofing, flooring, and home improvement contractors serving homeowners throughout the St. Louis area.",
  facebook:
    "https://www.facebook.com/people/55-South-Contractors/61550928122415/",
  bbb: "https://www.bbb.org/us/mo/saint-louis/profile/roofing-contractors/55-south-contractors-0734-1000046257",
};
