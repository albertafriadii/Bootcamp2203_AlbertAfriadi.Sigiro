import React, { useState } from "react";
import { SliderData } from "./sliderData";
import * as IoIcons from "react-icons/io";
import "../App.css";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  console.log(current);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <IoIcons.IoIosArrowDropleftCircle
        className="left-arrow"
        onClick={prevSlide}
      />
      <IoIcons.IoIosArrowDroprightCircle
        className="right-arrow"
        onClick={nextSlide}
      />
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <>
                <img
                  src={slide.image}
                  alt="Gambar Barang"
                  className="image-dashboard"
                />
                <h3 className="nama-barang">{slide.nama}</h3>
              </>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
