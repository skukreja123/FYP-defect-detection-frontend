import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./UploadVideo.css"; // Assuming you have a CSS file for styles

const VideoCapture = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoChunks, setVideoChunks] = useState([]);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing camera", err);
        alert("Unable to access camera. Please check permissions.");
      });
  };

  const startRecording = () => {
    if (!videoRef.current.srcObject) {
      alert("Start the camera first!");
      return;
    }
    const recorder = new MediaRecorder(videoRef.current.srcObject, { mimeType: "video/webm" });
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setVideoChunks((prev) => [...prev, event.data]);
      }
    };
    recorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    setTimeout(() => {
      const blob = new Blob(videoChunks, { type: "video/webm" });
      const videoURL = URL.createObjectURL(blob);
      setCapturedVideo(videoURL);
      sendVideoToBackend(blob);
      setVideoChunks([]);
    }, 1000);
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedVideo(URL.createObjectURL(file));
      sendVideoToBackend(file);
    }
  };

  const sendVideoToBackend = (videoFile) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("video", videoFile);

    axios
      .post(" https://specialized-rice-ka-timing.trycloudflare.com/video/predict_video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const base64Images = response.data.results || [];
        const formatted = base64Images.map((img) => ({
          label: img.label,
          confidence: img.confidence,
          image: img.frame,
        }));
        setPredictions(formatted);
      })
      .catch((error) => {
        console.error("Error predicting video", error);
        alert("Error processing video. Try again.");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Defect Detection System (Video)</h1>

      <div style={styles.section}>
        <button onClick={startCamera} style={styles.button}>Start Camera</button>
        <div style={styles.videoContainer}>
          <video ref={videoRef} width="640" height="480" autoPlay style={styles.video} />
        </div>
        {isRecording ? (
          <button onClick={stopRecording} style={{ ...styles.button, backgroundColor: "red" }}>
            Stop Recording
          </button>
        ) : (
          <button onClick={startRecording} style={styles.button}>Start Recording</button>
        )}
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Or Upload a Video</h2>
        <input type="file" accept="video/*" onChange={handleVideoUpload} disabled={isProcessing} />
      </div>

      {(capturedVideo || uploadedVideo) && (
        <div style={styles.videoPreview}>
          <h3>Preview:</h3>
          <video src={capturedVideo || uploadedVideo} controls width="640" height="480" />
        </div>
      )}

      {isProcessing && <p>Processing video...</p>}
      {predictions.length > 0 && (
        <div style={styles.predictionContainer}>
          <h2>Defects Detected:</h2>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>
                <p>{`${prediction.label} - Confidence: ${prediction.confidence.toFixed(2)}`}</p>
                <img src={`data:image/jpeg;base64,${prediction.image}`} alt={`frame-${index}`} style={styles.image} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "30px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    margin: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#6e8efb",
    color: "white",
    transition: "0.3s",
  },
  videoContainer: {
    margin: "20px auto",
    border: "2px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    maxWidth: "100%",
    width: "640px",
  },
  video: {
    width: "100%",
    height: "auto",
  },
  subtitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  videoPreview: {
    marginTop: "20px",
  },
  predictionContainer: {
    marginTop: "20px",
    textAlign: "left",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    overflowX: "auto",
  },
  image: {
    width: "100%",
    maxWidth: "300px",
    height: "auto",
    borderRadius: "4px",
    margin: "10px 0",
  },
};


export default VideoCapture;
