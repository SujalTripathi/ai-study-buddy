# 📚 AI Study Buddy

> Your intelligent learning companion - Built with React and Appwrite

[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)](LICENSE)
[![Appwrite](https://img.shields.io/badge/Appwrite-1.6-f02e65?logo=appwrite)](https://appwrite.io)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev)

A modern, full-stack study management application that helps students organize their notes, track their learning progress, and enhance their study experience with AI-powered features.

## ✨ Features

- 🔐 **Secure Authentication** - Email/password authentication powered by Appwrite
- 📝 **Note Management** - Create, read, update, and delete study notes
- 🏷️ **Subject Organization** - Categorize notes by subject for easy retrieval
- 🎨 **Modern UI** - Clean, responsive interface with gradient themes
- ⚡ **Real-time Updates** - Instant synchronization across devices
- 🔍 **Search Functionality** - Quickly find notes by title or content
- 📱 **Mobile Responsive** - Works seamlessly on all device sizes

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **Custom Hooks** - Reusable state management logic

### Backend (BaaS)
- **Appwrite** - Open-source backend platform
  - Authentication
  - Database (NoSQL)
  - Storage
  - Functions (serverless)

### Architecture
- **Service Layer Pattern** - Separation of concerns
- **Custom Hooks** - React best practices
- **Error Handling** - Comprehensive error management
- **Validation** - Input validation utilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Appwrite account ([cloud.appwrite.io](https://cloud.appwrite.io))

### Installation

1. **Clone the repository**

git clone https://github.com/SujalTripathi/ai-study-buddy.git
cd ai-study-buddy


2. **Install dependencies**
npm install


3. **Configure environment variables**

Create a `.env` file in the root directory:


VITE_APPWRITE_ENDPOINT=https://sgp.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_NOTES_COLLECTION_ID=study_notes


4. **Start development server**
npm run dev


Open [http://localhost:5173](http://localhost:5173)

## 📦 Appwrite Setup

### 1. Create Project

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project named "AI Study Buddy"
3. Note down the Project ID

### 2. Enable Authentication

1. Navigate to **Auth** section
2. Enable **Email/Password** provider
3. Add platform: **localhost** (for development)

### 3. Create Database

1. Go to **Databases** → Create database named `study-buddy-db`
2. Note down the Database ID

### 4. Create Collection

Create a collection named `study_notes` with these attributes:

| Attribute | Type   | Size  | Required | Description        |
|-----------|--------|-------|----------|--------------------|
| title     | String | 255   | Yes      | Note title         |
| content   | String | 10000 | Yes      | Note content       |
| subject   | String | 100   | Yes      | Subject category   |

**Permissions:** 
- Role: Any
- Create, Read, Update, Delete: ✅

## 🎯 Usage

1. **Sign Up** - Create a new account with email and password
2. **Login** - Access your account
3. **Create Notes** - Fill in title, select subject, write content
4. **Manage Notes** - Edit or delete existing notes
5. **Organize** - Notes are automatically categorized by subject
6. **Logout** - Securely end your session

## 🏗️ Project Structure

ai-study-buddy/
├── src/
│ ├── components/
│ │ ├── auth/
│ │ │ ├── LoginForm.jsx # Login form component
│ │ │ └── SignupForm.jsx # Signup form component
│ │ ├── layout/
│ │ │ └── Header.jsx # App header with logout
│ │ └── notes/
│ │ ├── NoteCard.jsx # Individual note card
│ │ └── NoteForm.jsx # Note creation form
│ ├── hooks/
│ │ ├── useAuth.js # Authentication hook
│ │ └── useNotes.js # Notes management hook
│ ├── pages/
│ │ ├── Login.jsx # Login/signup page
│ │ └── Dashboard.jsx # Main dashboard
│ ├── services/
│ │ ├── auth.service.js # Auth API calls
│ │ └── notes.service.js # Notes CRUD operations
│ ├── styles/
│ │ └── theme.js # Cyberpunk theme config
│ ├── utils/
│ │ ├── constants.js # App constants
│ │ └── validators.js # Input validation
│ ├── config/
│ │ └── appwrite.config.js # Appwrite configuration
│ ├── App.jsx # Root component
│ ├── App.css # Global styles
│ └── main.jsx # Entry point
├── .env.example # Environment template
├── package.json
└── README.md



## 🎨 Design System

### Color Palette
- **Neon Pink**: `#ff006e`
- **Neon Purple**: `#b721ff`
- **Neon Blue**: `#00d9ff`
- **Neon Green**: `#06ffa5`
- **Dark Background**: `#0a0e27`

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800, 900

## 📝 API Documentation

### Auth Service

- `register(email, password, name)` - Register new user
- `login(email, password)` - Login user
- `getCurrentUser()` - Get current user
- `logout()` - Logout current user
- `isAuthenticated()` - Check auth status

### Notes Service

- `createNote({ title, content, subject })` - Create note
- `getNotes()` - Get all notes
- `getNote(noteId)` - Get single note
- `updateNote(noteId, updates)` - Update note
- `deleteNote(noteId)` - Delete note

## 🚀 Deployment

### Build for Production

npm run build



### Deploy to Vercel

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables
5. Deploy!

**Environment Variables:**
- `VITE_APPWRITE_ENDPOINT`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_DATABASE_ID`
- `VITE_APPWRITE_NOTES_COLLECTION_ID`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for [Appwrite Hacktoberfest 2025](https://apwr.dev/hf2025-hackathon)
- Powered by [Appwrite](https://appwrite.io)
- Design inspired by cyberpunk aesthetics

## 👨‍💻 Author

**Sujal Tripathi**
- GitHub: [@SujalTripathi](https://github.com/SujalTripathi)
- Project: [AI Study Buddy](https://github.com/SujalTripathi/ai-study-buddy)

## 🐛 Bug Reports

If you discover any bugs, please create an issue on GitHub with:
- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## 💡 Feature Requests

Have ideas for new features? Open an issue with the `enhancement` label!

---

⭐ **Star this repo if you find it helpful!**

Made with ❤️ and ⚡ for Appwrite Hacktoberfest 2025

