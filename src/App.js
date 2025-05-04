import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
// import Pricing from "./";
import Navbar from "./Component/Navbar";
import Upload from "./Pages/UploadImage"
import Video from "./Pages/UploadVideo";
import Footer from "./Component/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/signup";
import AboutSection from "./Pages/About";
import ContactUs from "./Pages/Contact";
import AllFramesPage from "./Pages/AllFrame";
// import Footer from "./Component/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<AboutSection />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/Video" element={<Video/>} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/All_frame" element={<AllFramesPage />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
