# 🛍️ E-Commerce Web Application (Work in Progress)

An modern, high-performance E-Commerce web application built with **Next.js 14/15**, **TypeScript**, and **Tailwind CSS**. This project is currently focused on front-end architecture, responsive layouts, and core user features, with a full-stack transition planned.

> **Note:** This project is under active development. The frontend layout and core user features are currently being built.

---

## 🚀 Tech Stack & Tools

- **Framework:** [Next.js](https://nextjs.org) (App Router) - For server-side rendering and optimized performance.
- **Language:** [TypeScript](https://typescriptlang.org) - For type safety and scalable code.
- **Styling:** [Tailwind CSS](https://tailwindcss.com) - For rapid, responsive utility-first styling.
- **Package Manager & Runtime:** [Bun](https://bun.sh) - For ultra-fast package installation and execution.
- **Internationalization (i18n):** [next-intl](https://vercel.app) - For multi-language support (Localization).
- **Containerization:** [Docker](https://docker.com) - To ensure environment consistency across development and production.

---

## ✨ Features & Layouts (Implemented)

- 📱 **Responsive Layout:** Mobile-first design covering Home, Product Listing, and Cart pages.
- 🌐 **Multi-language Support:** Configured using `next-intl` for seamless language switching.
- 🛒 **Interactive UI Components:** Smooth product cards, navigation, and interactive elements.
- 🐳 **Dockerized Setup:** Ready-to-go development environment using Docker.

---

## 🛠️ Upcoming Features (Roadmap)

- [ ] Complete Shopping Cart functionality (State management).
- [ ] Backend integration (Authentication, Product API, Order management).
- [ ] Database Setup (PostgreSQL / MongoDB).
- [ ] Stripe Payment Gateway integration.

---

## 🏃 Getting Started

### Prerequisites
Make sure you have **Bun** and **Docker** installed on your machine.

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd YOUR_REPO_NAME
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Run the development server:**
   ```bash
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running with Docker

If you prefer to run the project via Docker:
```bash
docker compose up --build
```
