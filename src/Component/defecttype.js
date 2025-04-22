import React, { useRef } from "react";
import { motion } from "framer-motion";
import oilIcon from "../asset/icon/defect.png";
import holeIcon from "../asset/icon/defect.png";
import threadIcon from "../asset/icon/defect.png";
import objectIcon from "../asset/icon/defect.png";
import stainIcon from "../asset/icon/defect.png";

const defects = [
  {
    title: "Oil",
    icon: oilIcon,
    description: "Oil stains or leaks that weaken materials and pose safety concerns.",
  },
  {
    title: "Hole",
    icon: holeIcon,
    description: "Punctures or tears reducing product integrity and functionality.",
  },
  {
    title: "Thread",
    icon: threadIcon,
    description: "Loose or broken threads signaling poor stitching quality.",
  },
  {
    title: "Object",
    icon: objectIcon,
    description: "Unwanted foreign objects stuck to the surface or embedded inside.",
  },
  {
    title: "Stain",
    icon: stainIcon,
    description: "Surface discoloration or dirt that degrades product appearance.",
  },
];

const DefectTypes = () => {
  const scrollRef = useRef(null);

  const handleNextScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section style={styles.container}>
      <h2 style={styles.heading}>Types of Defects We Detect</h2>
      <div style={styles.scrollWrapper}>
        <div ref={scrollRef} style={styles.scrollContainer}>
          {defects.map((defect, index) => (
            <motion.div
              key={index}
              style={styles.card}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img src={defect.icon} alt={defect.title} style={styles.icon} />
              <h3 style={styles.title}>{defect.title}</h3>
              <p style={styles.description}>{defect.description}</p>
            </motion.div>
          ))}
        </div>
        <button style={styles.nextButton} onClick={handleNextScroll}>
          ➡️
        </button>
      </div>
    </section>
  );
};

const styles = {
  container: {
    padding: "60px 30px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#2c3e50",
    fontWeight: "700",
    marginBottom: "30px",
  },
  scrollWrapper: {
    position: "relative",
    overflow: "hidden",
  },
  scrollContainer: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    padding: "10px",
    scrollBehavior: "smooth",
  },
  card: {
    minWidth: "260px",
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    flex: "0 0 auto",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
  },
  icon: {
    width: "70px",
    height: "70px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "1.3rem",
    color: "#34495e",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.4",
  },
  nextButton: {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  transition: "background-color 0.3s ease",
},

};

export default DefectTypes;
