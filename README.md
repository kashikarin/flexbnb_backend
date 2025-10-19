# 🏡 Flexbnb

**Flexbnb** is a full-stack web application inspired by Airbnb — a modern home-rental platform with a polished, high-fidelity design that closely replicates Airbnb’s user experience.  
It includes dynamic search, booking flow, host management, real-time notifications, and a persistent wishlist.

🌐 **Live Demo:** [https://flexbnb-karin.onrender.com/](https://flexbnb-karin.onrender.com/)

---

## ✨ Main Features

### 🔍 Home Page (Home Index)
- Search for homes by **destination (city)**, **dates (check-in / check-out)**, and **number of guests**.  
- Displays all homes initially and dynamically filters results based on user selections.  
- Each home is represented by a `HomePreview` component — clicking on one opens the detailed view.

### 🏠 Home Details Page
- Shows comprehensive information about the selected home, including:
  - Image gallery  
  - Home description and amenities  
  - User reviews  
  - Home location displayed on a **Google Map** (`google-maps-react`)  
- Includes a **booking modal** that allows users to set or adjust booking dates and number of guests, then confirm the reservation through an interactive flow.

### 💳 Booking Flow
- Multi-step booking process:
  1. Choose dates and guests.  
  2. Review booking summary.  
  3. Confirm booking and view a success modal.  
- Designed to closely mimic Airbnb’s checkout experience.

### 🏗️ Host Flow (Create New Home)
- A step-by-step hosting experience inspired by Airbnb’s home-creation flow.  
- Each stage is represented by a separate screen with a visual progress bar.  
- Hosts can upload images (via **Cloudinary**) and complete the listing process.  
- Once created, a new **home** is stored in the database.

### 👤 Host Dashboard
- Each host can view all bookings made for their homes.  
- Hosts can **approve** or **decline** pending reservations.  
- Real-time status updates are sent to guests when actions are taken.

### 🔔 Real-Time Notifications
- Implemented using **Socket.io**.  
- When a guest books a home, the host receives an immediate notification.  
- When the host accepts or declines, the guest receives a live update as well.

### ❤️ Wishlist
- Registered users can “like” homes to add them to their wishlist.  
- The wishlist persists across sessions — data is stored in **MongoDB**.

---

## 🧠 Tech Stack

### 🖥️ Frontend
- **React**  
- **Redux** for global state management  
- **SCSS** for advanced styling and layout  
- **Google Maps React** for map rendering  
- **Socket.io-client** for real-time updates  

### ⚙️ Backend
- **Node.js** with **Express**  
- **MongoDB** & **Mongoose** for data persistence  
- **Socket.io** for live communication  
- **Cloudinary** for image uploads  
- **ALS (Async Local Storage)** for maintaining request context  
- **Custom middlewares** like `requireAuth` and `requireParams`  

### 🔐 Authentication
- Email/password authentication  
- **Google Sign-In** integration via OAuth  

---

## 🗄️ Data Models

- **User** – stores user info, auth credentials, and wishlist  
- **Home** – represents home listings  
- **Order** – tracks bookings between guests and hosts  
- **Review** – user reviews for each home  

---

## 🧭 App Flow Overview

1. **Guest** visits the home page → filters homes by destination and dates.  
2. Clicks a home → opens the details page → views reviews and images.  
3. Opens the booking modal → selects dates → confirms the order.  
4. **Host** receives a real-time notification → approves or declines.  
5. Both parties see instant updates via Socket.io.  
6. Hosts can manage homes and view all transactions in their dashboard.

---

## 🧭 Team Collaboration
- Flexbnb was developed by a team of three developers working collaboratively through **Git** and **GitHub**.  
- The workflow followed a feature-branch model, where each developer implemented new features or fixes in dedicated branches before merging them into the main branch via pull requests.

Key collaboration highlights: 

- Coordinated development across frontend and backend modules
- Regular merges and conflict resolutions through Git
- Code reviews and version control best practices
- Consistent branch naming conventions (e.g. feature/search-bar, fix/socket-bug, etc.)
- This teamwork ensured smooth integration and a professional development process from start to finish.

