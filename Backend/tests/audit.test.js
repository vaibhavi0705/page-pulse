const request = require("supertest");
const axios = require("axios");
const app = require("../app");

jest.mock("axios");

describe("POST /audit", () => {

  test("should return 400 if URL is missing", async () => {

    const response = await request(app)
      .post("/audit")
      .send({});

    expect(response.statusCode).toBe(400);

    expect(response.body.error).toBe("URL is required");

  });

  test("should return 400 for an invalid URL", async () => {

  const response = await request(app)
    .post("/audit")
    .send({
      url: "abcd"
    });

  expect(response.statusCode).toBe(400);

  expect(response.body.error).toBe("Invalid URL");

});

test("should return parsed page data for a valid HTML page", async () => {

  axios.get.mockResolvedValue({
    status: 200,
    headers: {
      "content-type": "text/html",
    },
    data: `
      <html>
        <head>
          <title>Test Page</title>
          <meta name="description" content="This is a test website">
        </head>

        <body>

          <h1>Welcome</h1>

          <p>Hello World</p>

          <img src="logo.png">

          <img src="banner.png" alt="Banner">

        </body>
      </html>
    `,
  });

  const response = await request(app)
    .post("/audit")
    .send({
      url: "https://example.com",
    });

  expect(response.statusCode).toBe(200);

  expect(response.body.title).toBe("Test Page");

  expect(response.body.metaDescription).toBe("This is a test website");

  expect(response.body.h1Count).toBe(1);

  expect(response.body.missingAltImages).toBe(1);

});

});