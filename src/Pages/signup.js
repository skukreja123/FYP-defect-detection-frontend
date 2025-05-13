import React, { useState } from "react";
import axios from "axios";
import "./signup.css";

const Register = () => {
  const [username, setUsername] = useState(""); // Optional for now
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");       // Optional for now
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(" https://sq-mike-lesser-institute.trycloudflare.com/auth/signup", {
        email,
        password
      });
      alert("Registered successfully! Now you can log in.");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
