const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      error: "URL is required",
    });
  }

  try {
    new URL(url);

    const start = Date.now();

    const response = await axios.get(url, {
        timeout: 5000,
    });
    const contentType = response.headers["content-type"];

if (!contentType.includes("text/html")) {
  return res.status(415).json({
    error: "URL does not return an HTML page.",
  });
}

    const end = Date.now();

    const responseTime = end - start;

    // Load HTML into Cheerio
    const $ = cheerio.load(response.data);

    // Extract data
    const title = $("title").text();

    const metaDescription =
      $('meta[name="description"]').attr("content") || "";

    const h1Count = $("h1").length;

    const missingAltImages = $("img").filter((i, img) => {
      return !$(img).attr("alt");
    }).length;

    const wordCount = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .split(" ").length;

    res.json({
      status: response.status,
      responseTime: `${responseTime} ms`,
      title,
      metaDescription,
      h1Count,
      missingAltImages,
      wordCount,
    });

  } catch (err) {

  if (err.code === "ECONNABORTED") {
    return res.status(408).json({
      error: "Request timed out.",
    });
  }

  if (err.response) {
    return res.status(err.response.status).json({
      error: `Website returned status ${err.response.status}`,
    });
  }

  if (err.request) {
    return res.status(502).json({
      error: "Unable to reach the website.",
    });
  }

  return res.status(500).json({
    error: "Something went wrong.",
  });

}
});

module.exports = router;