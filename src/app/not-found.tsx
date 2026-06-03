"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import binocularAnimation from "../../animation/d3ca2a84-1b6e-11f0-ade5-3fd05ee5aacb.json";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at center, #111111 0%, #050505 100%)",
      color: "white",
      textAlign: "center",
      padding: "40px 20px",
      boxSizing: "border-box"
    }}>
      <div style={{
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px"
      }}>
        {/* Binocular Lottie Animation */}
        <div style={{ width: "240px", height: "240px" }}>
          <Lottie
            animationData={binocularAnimation}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <h1 style={{
          fontSize: "48px",
          margin: "0",
          fontFamily: "Playfair Display, serif",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "2px"
        }}>
          Page <span style={{ color: "#d4af37" }}>Not Found</span>
        </h1>

        <p style={{
          fontSize: "16px",
          color: "#a0a0a0",
          lineHeight: "1.6",
          margin: "0"
        }}>
          The page you are looking for might have been removed, had its name changed, is temporarily down, or is undergoing maintenance.
        </p>

        <Link href="/" style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #d4af37, #f5d76e)",
          color: "black",
          padding: "14px 28px",
          borderRadius: "50px",
          textDecoration: "none",
          fontWeight: "700",
          fontSize: "14px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(212, 175, 55, 0.25)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 175, 55, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.25)";
        }}
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
