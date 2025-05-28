# 🧵 Fabric Defect Detection – Frontend Interface

> Smart inspection for smart fabrics — powered by AI and built with React.

This is the **frontend** of a Final Year Project focused on **automated fabric defect detection** using deep learning. The system allows users to upload fabric images and get intelligent, visual feedback on potential defects — streamlining quality control processes in textile industries.

[🌐 Live Demo on Vercel](https://fyp-defect-detection.vercel.app)

---

## 📸 Features

- 🖼️ Upload fabric images with drag-and-drop support
- ⚙️ Real-time defect detection via API
- 📊 Displays AI predictions and defect overlays
- 💡 Minimalist UI with a focus on clarity and usability
- 📱 Responsive design for desktop and mobile

---

## 📂 Project Structure

FYP-defect-detection-frontend/
  ├──   public/
  │   └──   index.html
  ├──   src/
  │   ├──   components/
  │ │   ├──   Upload.js # Image upload and API integration
  │ │   ├──   Result.js # Displays detection results
  │ │   └──   Navbar.js # App navbar
  │   ├──   App.js # Routing setup
  │   ├──   index.js # Entry point
  │   └──   App.css # Global styles
  ├── package.json
  └── README.md



---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (v14+)
- npm or yarn

### 🔧 Installation

bash
git clone https://github.com/skukreja123/FYP-defect-detection-frontend.git
cd FYP-defect-detection-frontend
npm install
npm start

Layer	Tech
  Frontend	= React (Create React App)
  State	 = useState / useEffect
  Routing	 = React Router DOM
  HTTP	 = Axios
  Styling	 = CSS
  Hosting	 = Vercel
Screenshots
![image](https://github.com/user-attachments/assets/80f7deae-a0c8-436d-9266-8041405bf013)

![image](https://github.com/user-attachments/assets/b7fc8cc0-f16b-4369-948c-f85e9da94019)


🧠 Code Highlights
📤 Upload.js
  Handles file selection and preview
  
  Submits to backend using Axios
  
  Redirects to /result upon success

📊 Result.js
  Fetches prediction results from localStorage
  
  Renders the output image and defect insights

🔗 App.js
  Manages routing between Upload and Result pages

🙌 Acknowledgements
Developed by Sahil Kukreja, Areeb, Mustafa

Final Year Project @ FAST NUCES, Karachi

Backend powered by Flask [backend repo](https://github.com/skukreja123/FYP-defect-dection-backend)

