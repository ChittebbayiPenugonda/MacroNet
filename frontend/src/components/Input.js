import React from "react";

function Input() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Centers horizontally
        alignItems: "center",     // Centers vertically at the same position
        position: "absolute",     // Positions the form absolutely
        left: "50%",              // Moves the form to the center horizontally
        top: "15%",               // Adjust this value to place the form at the desired height
        transform: "translateX(-50%)", // To precisely center the form horizontally
        flexDirection: "column",  // Stack input and button vertically
        gap: "20px",              // Space between input and button
      }}
    >
      <input
        type="text"
        placeholder="Enter your hypothetical scenario"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "800px",        // 60% width of the container
          height: "60px",
          textAlign: "center", // Centers text inside input
        }}
      />
      <button
        style={{
          padding: "10px 15px",
          backgroundColor: "#4A90E2",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "200px",         // Same width as input
        }}
      >
        Predict
      </button>
    </div>
  );
}

export default Input;
