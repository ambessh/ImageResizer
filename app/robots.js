export default function robots() {
  const baseUrl = "https://www.resizewala.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}