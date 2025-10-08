# HealthGrid 🏥

**HealthGrid** is a full-stack healthcare platform built with **React**, **Node.js**, and **MongoDB**, including:

- 🧑‍⚕️ A **frontend** for patients to view doctors and book appointments
- 🔧 An **admin panel** to manage doctors and users
- 🖥️ A **backend API** built with Express and connected to MongoDB

---

## 📁 Project Structure

HealthGrid/
├── frontend/ → Vite + React (User-facing app)
├── backend/ → Node.js + Express (API server)
├── admin/ → Vite + React (Admin dashboard)

---

## 🔧 Tech Stack

| Layer    | Tech Used                                                    |
| -------- | ------------------------------------------------------------ |
| Frontend | React, Vite, React Router DOM, TailwindCSS, React Toastify   |
| Backend  | Node.js, Express, MongoDB, JWT, Multer, Cloudinary, Razorpay |
| Admin    | React, Vite, React Router DOM, TailwindCSS, React Toastify   |

---

## 📦 Scripts

Each folder has its own `package.json`. Run the following inside each folder:

### Frontend/Admin

```bash
npm install
npm run dev       # Start development server
npm run build     # Build for production

### Backend
npm install
npm run server    # Start backend with nodemon
# or
npm start         # Start backend without nodemon


📂 Environment Variables
Each part has its own .env file. Do not commit these files. Instead, use .env.example files to share variable structure.

🔑 Example: frontend/.env
VITE_API_BASE_URL=http://localhost:5000

🔑 Example: backend/.env
PORT=5000
DB_URL=mongodb://localhost:27017/healthgrid
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret

🔑 Example: admin/.env
VITE_API_BASE_URL=http://localhost:5000
```

📦 Dependencies Overview
🔹 Frontend & Admin (Shared)
react, react-dom, react-router-dom

axios for HTTP requests

react-toastify for alerts

tailwindcss for styling

vite for fast builds

🔹 Backend
express, mongoose, cors

dotenv for env vars
jsonwebtoken for auth
multer, cloudinary for image uploads
razorpay for payments
bcrypt for hashing

🙋‍♂️ Author
Made with ❤️ by Ramchandra
