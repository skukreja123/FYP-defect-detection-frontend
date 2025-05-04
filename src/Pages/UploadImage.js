import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./UploadImage.css"; // Assuming you have a CSS file for styles
import ImageViewer from "./ImageView";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [predictions, setPredictions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);


  const startCamera = () => {
    // First try to get the back camera, fallback to default if fails
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: { exact: "environment" }, // Try back camera
        },
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.warn("Back camera not found. Falling back to default camera.", err);
        // Fallback: use any available camera (usually front on laptops)
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            videoRef.current.srcObject = stream;
          })
          .catch((err) => {
            console.error("Error accessing any camera", err);
            alert("Unable to access the camera. Please check permissions.");
          });
      });
  };


  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    sendImageToBackend(imageData);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        sendImageToBackend(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  const sendImageToBackend = (imageData) => {
    setIsLoading(true);
    setUploadProgress(0);

    axios
      .post(
        " http://localhost:5000/image/predict_image",
        { image: imageData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headers
          },
          maxContentLength: Infinity,
        },
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
            }
          },
        }
      )
      .then((response) => {
        setPredictions(response.data);
      })
      .catch((error) => {
        console.error("Error predicting image", error);
        alert("Error predicting the image. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
        setUploadProgress(0);
      });
  };


  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Defect Detection System</h1>
      {isLoading && (
        <div className="spinner-overlay">
          <div>
            <div className="spinner"></div>
            {uploadProgress > 0 && (
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Camera Section */}
      <div style={styles.section}>
        <button onClick={startCamera} style={styles.button}>
          Start Camera
        </button>
        <div style={styles.videoContainer}>
          <video ref={videoRef} width="640" height="480" autoPlay style={styles.video} />
        </div>
        <button onClick={captureImage} disabled={isLoading} style={styles.button}>
          {isLoading ? "Processing..." : "Capture Image"}
        </button>
      </div>

      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />

      {/* Upload Section */}
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Or Upload an Image</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isLoading} />
        {uploadedImage && (
          <div style={styles.imagePreview}>
            <h3 style={styles.previewTitle}>Uploaded Image:</h3>
            <img src={uploadedImage} alt="Uploaded Preview" style={styles.image} />
          </div>
        )}
      </div>

      {/* Predictions */}
      {Object.keys(predictions).length > 0 && (
        <div style={styles.predictionContainer}>
          <h2 style={styles.predictionTitle}>Prediction Results:</h2>

          {/* Show image */}
          <img
            src={uploadedImage || capturedImage}
            alt="Prediction Preview"
            style={styles.predictionImage}
          />

          {/* Show model predictions */}
          <div style={styles.predictionCards}>
  {Object.entries(predictions).map(([modelKey, data]) => {
    if (!data) return null; // <-- Skip if data is null

    return (
      <div key={modelKey} style={styles.card}>
        <h3>{modelKey}</h3>
        <p><strong>Defect:</strong> {data.label}</p>
        <p><strong>Confidence:</strong> {(data.confidence * 100).toFixed(2)}%</p>
      </div>
    );
  })}
</div>



        </div>
      )}
    </div>
  );
};

export default CameraCapture;

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    color: "#343a40",
    marginBottom: "20px",
    fontSize: "2rem",
  },
  section: {
    marginBottom: "30px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px",
    transition: "background 0.3s",
  },
  videoContainer: {
    margin: "20px auto",
    width: "100%",
    maxWidth: "640px",
    aspectRatio: "4 / 3",
    border: "2px solid #007bff",
    borderRadius: "5px",
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  subtitle: {
    color: "#495057",
    fontSize: "1.25rem",
  },
  imagePreview: {
    marginTop: "20px",
  },
  previewTitle: {
    color: "#495057",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  image: {
    width: "100%",
    maxWidth: "320px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  predictionContainer: {
    marginTop: "30px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  predictionTitle: {
    color: "#007bff",
    marginBottom: "20px",
    fontSize: "1.5rem",
  },
  predictionImage: {
    width: "100%",
    maxWidth: "320px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
 
  predictionCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    padding: "30px",
    background: "linear-gradient(145deg, #e0eaff, #f3f8ff)",
    borderRadius: "20px",
    boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.4)",
  },
  
  card: {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "20px",
    padding: "20px",
    color: "#333",
    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.1)",
    transition: "all 0.3s ease-in-out",
    transform: "scale(1)",
    textAlign: "center",
    cursor: "pointer",
  },
  
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#0077ff",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  
  // Add this logic in a useEffect or inject via styled-components if needed
  cardHover: {
    transform: "scale(1.03)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
  }
  



};
