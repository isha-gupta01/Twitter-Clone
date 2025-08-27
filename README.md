# TwitterOn 🐦 — A Full-Stack Twitter Clone

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://twitter-clone-tweets.vercel.app)
[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?logo=next.js)](https://nextjs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://mongodb.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**TwitterOn** is a feature-rich, modern Twitter clone built using **Next.js** and **Express.js**, integrating **real-time chat**, **media uploads**, and a fully secure **authentication system** using **JWT**. Designed for scalability and performance, this project mirrors core functionalities of Twitter while incorporating some enhanced features for a better user experience.

---

## 🚀 Features

### 📝 Tweets and Feeds
- Post tweets with or without **images or videos**.
- Auto-generated tweet feed showing all public posts.
- Tweet sorting by **latest first**.
- Like, comment, and view interaction counts.

### 🔐 Authentication & Authorization
- Full **JWT-based authentication** flow.
- **Login / Signup** with validation.
- Protected routes and tokens stored securely.
- Auto session persist with refresh.

### 🧑‍💼 User Profiles
- **Setup Profile** with username, name, bio.
- **Update profile image**, banner, or remove them.
- Follow / unfollow other users.
- View list of followers and following.

### 🔎 Smart Search
- **Live user search bar** to find other users.
- Instant display of matching profiles as you type.

### 💬 Tweet-Based Group Chat
- Every tweet creates its own **unique real-time chat room**.
- Users can join chats related to specific tweets.
- Messages are stored in **MongoDB**, secured with **JWT** tokens.
- Chat includes **timestamp**, **sender**, and auto-scroll.

### 🖼️ Media Handling
- Upload profile pictures and tweet images/videos.
- All uploads are stored via **Cloudinary**.
- **Multer** used for parsing file uploads.

---

## 🧱 Tech Stack

| Category         | Technology                          |
|------------------|--------------------------------------|
| **Frontend**     | Next.js, React.js, Tailwind CSS      |
| **Backend**      | Node.js, Express.js                  |
| **Database**     | MongoDB Atlas                        |
| **Real-time**    | Socket.IO                            |
| **Media Storage**| Cloudinary, Multer                   |
| **Auth**         | JSON Web Tokens (JWT), bcryptjs      |
| **Deployment**   | Vercel (frontend), Render (backend)  |

---

## 📁 Project Structure
```bash
📦 twitter-frontend
┣ 📂app
┣ 📂components
┣ 📂lib
┣ 📂public
┣ 📂styles
┣ 📄next.config.mjs
┣ 📄tailwind.config.mjs
┗ 📄README.md

📦 backend
┣ 📂routes
┣ 📂controllers
┣ 📂models
┣ 📂middlewares
┣ 📄server.js
┗ 📄.env
```


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🧑 About the Developer

Hi, I'm [**Isha Gupta**](https://next-portfolio-ishagupta.vercel.app) — a passionate full-stack developer. I love building scalable applications with real-time and user-centric features. This project demonstrates my skills in backend architecture, frontend UI, and advanced integrations.

- 📫 [Portfolio](https://next-portfolio-ishagupta.vercel.app/)
- 🧑‍💻 [GitHub](https://github.com/isha-gupta01)
- 📮 Feel free to fork, star, or connect!

