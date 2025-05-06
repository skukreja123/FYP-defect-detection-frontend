import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageViewer = ({ frameId }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`https://appreciate-object-script-leader.trycloudflare.com/image/${frameId}`);
        console.log(response);
        setImageSrc(response.data.image_base64);
        console.log(response.data);
        setMeta({
          keras_label: response.data.keras_label,
          keras_confidence: response.data.keras_confidence,
          pytorch_label: response.data.pytorch_label,
          pytorch_confidence: response.data.pytorch_confidence,
        });
      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [frameId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Frame #{frameId}</h2>
      <img src={imageSrc} alt="Fetched Frame" style={{ maxWidth: '80%', border: '1px solid #ccc' }} />
      {meta && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Keras Label:</strong> {meta.keras_label} ({(meta.keras_confidence * 100).toFixed(2)}%)</p>
          <p><strong>PyTorch Label:</strong> {meta.pytorch_label} ({(meta.pytorch_confidence * 100).toFixed(2)}%)</p>
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
