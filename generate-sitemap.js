/** @type {import('node')} */
// Explicitly inform the IDE to treat this as a CommonJS file

const fs = require("fs");
const path = require("path");
const routes = require("./src/Routes/routesForSitemap"); // Import routes using CommonJS

function generateSitemap() {
  const baseUrl = "http://localhost:3000"; // Replace with your live URL upon deployment

  // Generate the XML structure for the sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      ({ path }) => `
  <url>
    <loc>${baseUrl}${path.replace(/:\w+/g, "example")}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  `
    )
    .join("\n")}
</urlset>`;

  // Write the sitemap to the public folder
  try {
    const outputPath = path.join(__dirname, "public", "sitemap.xml");
    fs.writeFileSync(outputPath, sitemap);
    console.log(`Sitemap generated successfully! File saved to: ${outputPath}`);
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
}

// Execute the sitemap generation
generateSitemap();
