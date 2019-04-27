import React from "react";

function Footer() {
  return (
    <div
      className="bg-primary"
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        color: "#fff",
        textAlign: "center"
      }}
    >
      <p style={{ paddingTop: 10 }}>Node.js and React app by Ivan Ristic</p>
    </div>
  );
}

export default Footer;
