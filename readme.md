# 📸 Image Upload & Management App (MERN + Cloudinary)

A full-stack application that allows users to upload images with details, store them in the cloud, and manage them with features like view and delete.

---

## 🚀 Features

*  Upload images with name & email
*  Store images using Cloudinary
*  Save image data in MongoDB Atlas
*  Delete image from both Cloudinary & database
*  Real-time UI updates after actions

---

## 🧱 Tech Stack

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Cloud Storage

* Cloudinary

---

## 📂 Project Structure

```
project/
│
├── Frontend/        # React frontend
├── Backend/         # Node.js backend
│  ├── uploads/      # Temporary storage (if using multer)
│       
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/SuyashM013/Cloudinary---FullStack-Media
cd Backend
cd Frontend
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### ➕ Upload Image

```
POST /api/upload
```

### 📥 Get All Users

```
GET /api/get-users
```

### ❌ Delete User + Image

```
DELETE /api/delete/:id
```

---

## 🧠 Key Concepts Implemented

* Multipart form data handling using FormData
* File uploads with multer
* Cloudinary integration for image storage
* Full CRUD flow (Create, Read, Delete)
* State management in React
* Conditional rendering (image preview panel)

---

## 🚀 Future Improvements

* ✏️ Update/Edit user data
* 📄 PDF upload support
* 🔐 Authentication (JWT)
* 📊 Pagination & search
* 🎨 Better UI/UX with animations

---

## 🙌 Author

**Suyash Mishra**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
