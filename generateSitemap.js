const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const BASE_URL = "https://www.starflickswiki.com";
const API_URL = process.env.REACT_APP_BASE_URL;

async function generateSitemap() {
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add Static Pages
  const staticRoutes = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/seriesList", priority: "0.8", changefreq: "daily" },
    { path: "/contact", priority: "0.6", changefreq: "monthly" },
    { path: "/privacy-policy", priority: "0.5", changefreq: "yearly" },
    // { path: "/addSeries", priority: "0.6", changefreq: "monthly" },
    // { path: "/addSeriesCharacter", priority: "0.6", changefreq: "monthly" },
  ];

  staticRoutes.forEach((route) => {
    sitemapContent += `<url>\n<loc>${BASE_URL}${route.path}</loc>\n<changefreq>${route.changefreq}</changefreq>\n<priority>${route.priority}</priority>\n</url>\n`;
  });

  try {
    // Fetch Series from API
    const seriesResponse = await axios.get(`${API_URL}/getAllSeries`);
    seriesResponse.data.forEach((series) => {
      let seriesSlug = encodeURIComponent(series.title);
      sitemapContent += `<url>\n<loc>${BASE_URL}/series/${seriesSlug}</loc>\n<changefreq>weekly</changefreq>\n<priority>0.7</priority>\n</url>\n`;
      sitemapContent += `<url>\n<loc>${BASE_URL}/information/${seriesSlug}</loc>\n<changefreq>weekly</changefreq>\n<priority>0.7</priority>\n</url>\n`;
      //   sitemapContent += `<url>\n<loc>${BASE_URL}/addSeriesDetails/${seriesSlug}</loc>\n<changefreq>weekly</changefreq>\n<priority>0.7</priority>\n</url>\n`;
    });

    // Fetch Characters from API
    const characterResponse = await axios.get(`${API_URL}/getAllCharacters`);
    characterResponse.data.forEach((character) => {
      let charSlug = encodeURIComponent(character.name);
      sitemapContent += `<url>\n<loc>${BASE_URL}/character/${charSlug}</loc>\n<changefreq>weekly</changefreq>\n<priority>0.7</priority>\n</url>\n`;
    });

    sitemapContent += `</urlset>`;

    // Save Sitemap to Public Directory
    fs.writeFileSync("./public/sitemap.xml", sitemapContent);
    console.log("✅ Sitemap generated successfully with correct encoding!");
  } catch (error) {
    console.error("❌ Error fetching data for sitemap:", error);
  }
}

// Run the script
generateSitemap();
