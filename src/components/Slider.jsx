import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const Slider = () => {
  const items = [
    { src: "./assets/image1.jpg", alt: "Image 1" },
    { src: "./assets/image2.jpg", alt: "Image 2" },
    { src: "./assets/image3.jpg", alt: "Image 3" },
  ];

  return (
    <Carousel>
      {items.map((item, index) => (
        <Paper key={index}>
          <img
            src={item.src}
            alt={item.alt}
            style={{ width: "100%", height: "auto" }}
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default Slider;
