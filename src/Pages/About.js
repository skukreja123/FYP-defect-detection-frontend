import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Ayaan Patel", role: "ML Developer", image: "/team/ayaan.jpg" },
  { name: "Zara Khan", role: "UI/UX Designer", image: "/team/zara.jpg" },
  { name: "Ravi Sharma", role: "Backend Engineer", image: "/team/ravi.jpg" },
  { name: "Emma Li", role: "Data Scientist", image: "/team/emma.jpg" },
];

const AboutSection = () => {
  return (
    <section style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.contentBox}
      >
        <h2 style={styles.title}>About Our Vision</h2>
        <p style={styles.description}>
          We leverage computer vision to detect industrial defects with precision and efficiency.
          Our AI-driven platform ensures faster quality control, minimized wastage, and optimized production lines.
        </p>
      </motion.div>

      <div style={styles.teamContainer}>
        <h3 style={styles.subTitle}>Meet Our Team</h3>
        <div style={styles.grid}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              style={styles.card}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img src={member.image} alt={member.name} style={styles.avatar} />
              <h4 style={styles.name}>{member.name}</h4>
              <p style={styles.role}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.3 }}
        style={styles.buttonWrapper}
      >
        <button style={styles.button}>Learn More About Our Work →</button>
      </motion.div>
    </section>
  );
};

const styles = {
  section: {
    background: "linear-gradient(135deg, #e0f7ff, #fdfdfd, #dcefff)",
    padding: "60px 20px",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  contentBox: {
    maxWidth: "800px",
    margin: "0 auto 50px auto",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    color: "#555",
    lineHeight: "1.6",
  },
  teamContainer: {
    marginTop: "40px",
  },
  subTitle: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "30px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    width: "200px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease-in-out",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
  },
  name: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "5px",
  },
  role: {
    fontSize: "14px",
    color: "#777",
  },
  buttonWrapper: {
    marginTop: "60px",
  },
  button: {
    padding: "12px 30px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)",
  },
};

export default AboutSection;
