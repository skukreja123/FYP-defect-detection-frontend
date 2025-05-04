import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllFramesPage = () => {
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/image/All_frame', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFrames(response.data);
      } catch (error) {
        console.error('Error fetching frames:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFrames();
  }, []);

  const handleDelete = async (frameId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/image/delete_frame/${frameId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFrames(frames.filter((frame) => frame.frame_id !== frameId));
      alert('Frame deleted successfully');
    } catch (error) {
      console.error('Error deleting frame:', error);
      alert('Failed to delete frame');
    }
  };

  const handleDownload = (frameData) => {
    const a = document.createElement('a');
    a.href = frameData;
    a.download = 'frame_image.jpg';
    a.click();
  };

  if (loading) return <p style={styles.loading}>Loading frames...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🖼️ Your Uploaded Frames</h2>
      {frames.length === 0 ? (
        <p style={styles.noFrames}>No frames found.</p>
      ) : (
        <div style={styles.grid}>
          {frames.map((frame) => (
            <div key={frame.frame_id} style={styles.card}>
              <img
                src={frame.image_base64}
                alt={`Frame ${frame.frame_id}`}
                style={styles.image}
              />
              <div style={styles.predictions}>
                <p><strong style={styles.keras}>Keras:</strong> {frame.keras_label} <span style={styles.percent}>({(frame.keras_confidence * 100).toFixed(1)}%)</span></p>
                <p><strong style={styles.pytorch}>PyTorch:</strong> {frame.pytorch_label} <span style={styles.percent}>({(frame.pytorch_confidence * 100).toFixed(1)}%)</span></p>
              </div>
              <div style={styles.buttonsContainer}>
                <button
                  onClick={() => handleDelete(frame.frame_id)}
                  style={styles.deleteButton}
                >
                  🗑️ Delete
                </button>
                <button
                  onClick={() => handleDownload(frame.image_base64)}
                  style={styles.downloadButton}
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 🎨 Inline CSS styles
const styles = {
  container: {
    padding: '3rem 1.5rem',
    background: 'linear-gradient(to bottom right, #f7f9fc, #eef2f7)',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '2.2rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#333',
  },
  noFrames: {
    textAlign: 'center',
    color: '#888',
    fontSize: '1.2rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.4rem',
    padding: '2rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  card: {
    width: '280px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    padding: '1.5rem',
    textAlign: 'center',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1.2rem',
  },
  predictions: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '1.2rem',
  },
  keras: {
    color: '#0077cc',
  },
  pytorch: {
    color: '#d4483b',
  },
  percent: {
    color: '#666',
    fontStyle: 'italic',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  deleteButton: {
    backgroundColor: '#d4483b',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  downloadButton: {
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  deleteButtonHover: {
    backgroundColor: '#a63828',
  },
  downloadButtonHover: {
    backgroundColor: '#005a8f',
  },
};

export default AllFramesPage;
