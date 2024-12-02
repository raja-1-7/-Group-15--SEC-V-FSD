import React, { useState } from "react";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data submitted", loginData);
    // Handle login logic here (e.g., send data to API)
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
