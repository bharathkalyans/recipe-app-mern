import React from "react";

const LogoutButton = ({ logout }) => {
  const myStyle = {
    padding: "10px",
    border: "2px solid gray",
    borderRadius: "5px",
    
  };
  return (
    <button style={myStyle} onClick={logout}>
      LogOut
    </button>
  );
};

export default LogoutButton;
