import React from "react";
import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const CarouselSlider = () => {
  const items = [
    { src: "./assets/image1.jpg", alt: "Image 1" },
    { src: "./assets/image2.jpg", alt: "Image 2" },
    { src: "./assets/image3.jpg", alt: "Image 3" },
  ];

  return (
    <Box maxW="container.xl" mx="auto">
      <Slider {...sliderSettings}>
        {items.map((item, index) => (
          <Box key={index} overflow="hidden">
            <Image
              src={item.src}
              alt={item.alt}
              width="100%"
              height="auto"
              objectFit="cover"
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselSlider;
