import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./UploadVideo.css";

const VideoCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoChunks, setVideoChunks] = useState([]);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const [mode, setMode] = useState("realtime"); // 'realtime' or 'upload'

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { exact: "environment" } } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
        setIsStreaming(true); 
        setMode("realtime");
      })
      .catch((err) => {
        console.error("Error accessing the camera", err);
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            videoRef.current.srcObject = stream;
            setIsCameraOn(true);
            setIsStreaming(true); 
            setMode("realtime");
          })
          .catch((err) => {
            console.error("Error accessing any camera", err);
            alert("Unable to access the camera. Please check permissions.");
          });
      });
  };
  

  const stopRealtime = () => {
    setIsStreaming(false); // Stop sending frames
    setIsCameraOn(false);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  



  const captureAndSendFrame = async () => {
    if (!videoRef.current || !canvasRef.current || mode !== "realtime" || !isStreaming) return;
  
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
  
    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
  
      const formData = new FormData();
      formData.append("frame", blob, "frame.jpg");
  
      try {
        const response = await axios.post("http://localhost:5000/video/predict_frame", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (response.data.label) {
          setPredictions((prev) => [
            {
              label: response.data.label,
              confidence: response.data.confidence,
              image: response.data.frame,
            },
            ...prev.slice(0, 10),
          ]);
        }
      } catch (error) {
        console.error("Error predicting frame", error);
      }
    }, "image/jpeg");
  };
  

  // const startRecording = () => {
  //   if (!videoRef.current.srcObject) {
  //     alert("Start the camera first!");
  //     return;
  //   }
  //   const recorder = new MediaRecorder(videoRef.current.srcObject, { mimeType: "video/webm" });
  //   mediaRecorderRef.current = recorder;
  //   recorder.ondataavailable = (event) => {
  //     if (event.data.size > 0) {
  //       setVideoChunks((prev) => [...prev, event.data]);
  //     }
  //   };
  //   recorder.start();
  //   setIsRecording(true);
  // };

  // const stopRecording = () => {
  //   if (!mediaRecorderRef.current) return;
  //   mediaRecorderRef.current.stop();
  //   setIsRecording(false);
  
  //   mediaRecorderRef.current.onstop = () => {
  //     const blob = new Blob(videoChunks, { type: "video/webm" });
  //     const videoURL = URL.createObjectURL(blob);
  //     setCapturedVideo(videoURL);
  //     setUploadedVideo(null);
  //     sendVideoToBackend(blob);
  //     setVideoChunks([]);
  //   };
  // };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    // Reset previous states
    setCapturedVideo(null);
    setPredictions([]);
    setUploadedVideo(URL.createObjectURL(file));
    sendVideoToBackend(file);
    setMode("upload");
  };

  const sendVideoToBackend = (videoFile) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("video", videoFile);

    axios
      .post(" http://localhost:5000/video/predict_video", formData, {
        headers: { "Content-Type": "multipart/form-data" ,
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token in the headers
         },
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
    let intervalId;

    if (isCameraOn && mode === "realtime") {
      intervalId = setInterval(captureAndSendFrame, 1000); // Capture frame every 1 second
    }

    return () => clearInterval(intervalId);
  }, [isCameraOn, mode]);

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Defect Detection System</h1>
    

      <div style={styles.section}>
        <button onClick={startCamera} style={styles.button}>Start Camera (Real-Time)</button>
        <div style={styles.videoContainer}>
          <video ref={videoRef} width="640" height="480" autoPlay muted style={styles.video} />
          <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />
        </div>
       

      </div>
      <button onClick={startCamera} style={styles.button}>Start Camera (Real-Time)</button>
{isCameraOn && (
  <button onClick={stopRealtime} style={{ ...styles.button, backgroundColor: "#f76c6c" }}>
    Stop
  </button>
)}


      <div style={styles.section}>
        <h2 style={styles.subtitle}>Or Upload a Video</h2>
        <input type="file" accept="video/*" onChange={handleVideoUpload} disabled={isProcessing} />
      </div>

      {(capturedVideo || uploadedVideo) && (
        <div style={styles.videoPreview}>
          <h3>Video Preview:</h3>
          <video src={capturedVideo || uploadedVideo} controls width="640" height="480" />
        </div>
      )}

{isProcessing && (
  <div style={{ color: "#333", fontWeight: "bold", marginTop: "20px" }}>
    🔄 Processing video, please wait...
  </div>
)}


      {predictions.length > 0 && (
        <div style={styles.predictionContainer}>
          <h2>Predictions:</h2>
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
    maxHeight: "400px",
overflowY: "auto",

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
