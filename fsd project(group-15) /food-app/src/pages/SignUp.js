import React, { useState } from "react";

export default function SignUp() {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up data submitted", signupData);
    // Handle sign-up logic here (e.g., send data to API)
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={signupData.email}
          onChange={handleInputChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleInputChange}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
