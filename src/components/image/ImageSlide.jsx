import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/ApiSetup";

const ImageSlide = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

//   src={`${baseUrl}${item.url}`}
  return <img src={`${baseUrl}${images[currentIndex]}`} className="w-full aspect-square object-cover rounded-lg" alt={`image ${currentIndex}`} />;
};

export default ImageSlide;
