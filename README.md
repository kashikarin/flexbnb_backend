# 🏡 Flexbnb

**Flexbnb** is a full-stack web application inspired by Airbnb — a modern home-rental platform built with a polished, high-fidelity design and a robust backend architecture.  
The project combines advanced frontend functionality with a scalable Node.js-Express backend and real-time communication features.

🌐 **Live Demo:** [https://flexbnb-karin.onrender.com](https://flexbnb-karin.onrender.com)

---

## ✨ Project Overview

Flexbnb delivers a seamless experience for both **guests** and **hosts**, featuring:

- 🔍 **Dynamic home search** by destination, dates, and number of guests  
- 🏠 **Detailed home pages** with images, amenities, reviews, and location via Google Maps  
- 💳 **Interactive booking flow** including confirmation and success modals  
- 🏗️ **Multi-step host flow** for creating new listings with progress tracking  
- 👤 **Host dashboard** for managing bookings and approving or declining requests  
- 🔔 **Real-time notifications** powered by Socket.io  
- ❤️ **Persistent wishlist** stored in MongoDB  

The app’s design closely follows Airbnb’s UX patterns while integrating complex server-side logic and secure authentication.

---

## ⚙️ Backend Architecture

The backend serves as the foundation of the project, built with **Node.js** and **Express**, and designed for clarity, modularity, and scalability.

Key responsibilities include:
- Managing all **API endpoints** for homes, users, orders, and authentication  
- Handling **data persistence** via **MongoDB** and **Mongoose**  
- Managing **real-time socket connections** between clients for instant updates  
- Integrating with **Cloudinary** for image uploads  
- Implementing **middlewares** for authentication, parameter validation, and async request tracking (ALS)  
- Providing secure **OAuth Google Sign-In** and traditional email/password login  

---

## 🧱 Data Model Overview

| Entity | Description |
|--------|--------------|
| **User** | Stores profile info, authentication data, and wishlist |
| **Home** | Represents a property listed by a host |
| **Order** | Tracks bookings and their approval status |
| **Review** | Manages user reviews for each home |

---

## 🧩 Tech Stack

- **Node.js + Express** – REST API and server logic  
- **MongoDB + Mongoose** – database modeling and queries  
- **Socket.io** – real-time bi-directional communication  
- **Cloudinary** – media storage for images  
- **ALS (Async Local Storage)** – request-context tracking across async calls  
- **Custom Middleware** – for auth and parameter validation  
- **React + Redux (Frontend)** – integrated via static build in the backend’s `public/` folder  

---

## 👥 Team Collaboration

Developed by a **team of three**, working collaboratively through **Git** and **GitHub** with a feature-branch workflow:

- Independent feature development in dedicated branches  
- Regular merges, pull requests, and conflict resolution  
- Coordinated frontend-backend integration  
- Code reviews and version-control best practices  

This workflow ensured smooth development, consistent architecture, and high-quality delivery across all parts of the app.

---

## 🧠 Highlights & Takeaways

- Full-stack architecture with clean API separation and real-time communication  
- Complex data flow handled via Redux and backend filtering  
- Scalable, production-ready Express server deployed on **Render**  
- Strong emphasis on design fidelity and UX consistency  
- Demonstrates teamwork, technical depth, and attention to maintainability  

---

## 🔗 Related Repositories

- 🖥️ **Frontend:** [Flexbnb Frontend](https://github.com/kashikarin/flexbnb-frontend)
- ⚙️ **Backend (Current Repo):** Flexbnb Backend

---

## 👩‍💻 About

Built with passion for combining **frontend experience and backend logic** — delivering a seamless Airbnb-like platform that blends performance, design, and functionality.
