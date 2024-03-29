import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function ScrollArrows() {
  const handleScroll = (direction) => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (direction === "up") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (direction === "down") {
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <div
        style={{ cursor: "pointer", marginBottom: "10px" }}
        onClick={() => handleScroll("up")}
      >
        <FaArrowUp />
      </div>
      <div style={{ cursor: "pointer" }} onClick={() => handleScroll("down")}>
        <FaArrowDown />
      </div>
    </div>
  );
}
