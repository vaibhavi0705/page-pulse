# Page Pulse

A lightweight full-stack web application that audits a webpage and provides useful insights such as page title, meta description, H1 count, missing image alt attributes, word count, HTTP status, and response time.

---

## Features

- Analyze any public webpage
- Displays:
  - HTTP Status
  - Response Time
  - Page Title
  - Meta Description
  - H1 Count
  - Images Missing Alt Text
  - Word Count
- Input validation
- Error handling
- Automated API tests using Jest and Supertest

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Axios
- Cheerio
- CORS

### Testing
- Jest
- Supertest

---

## Project Structure

```
Internship-1
│
├── Frontend
├── Backend
│   ├── routes
│   ├── tests
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## API Endpoint

### POST /audit

Request

```json
{
  "url": "https://example.com"
}
```

Successful Response

```json
{
  "status": 200,
  "responseTime": "120 ms",
  "title": "Example Domain",
  "metaDescription": "...",
  "h1Count": 1,
  "missingAltImages": 2,
  "wordCount": 350
}
```

---

## Running Tests

```bash
cd Backend
npm test
```

Current test coverage includes:

- Missing URL
- Invalid URL
- Successful page parsing

---

## Design Decisions

### 1. Express Backend

Express.js was chosen because it is lightweight and ideal for creating REST APIs.

### 2. Cheerio for HTML Parsing

Cheerio provides a simple jQuery-like API that makes extracting HTML elements fast and efficient.

### 3. Jest + Supertest

Jest and Supertest were used to automate API testing without requiring the server to run separately.

---

## Future Improvements

- Lighthouse integration
- SEO scoring
- Performance visualization
- Accessibility audit
- Export reports as PDF

---

## Author

**Vaibhavi Subhash Gunjalkar**