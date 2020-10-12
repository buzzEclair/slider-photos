import React, { useEffect, useState } from "react";
import "../Scss/Slider.scss";
import "../Scss/KeyFrames.scss";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

const Slider = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const setUp = () => {
    const els = document.getElementsByClassName("slider-content");
    for (let i = 0; i < els.length; i++) {
      if (i === 0) {
        document.getElementsByClassName("slider-content")[i].style.display =
          "block";
      }
    }
  };

  const nextSlide = () => {
    const els = document.getElementsByClassName("slider-content");

    for (let i = 0; i < els.length; i++) {
      const src = els[currentSlide].childNodes[1].src;
      document.getElementsByClassName("nav")[0].style.display = "none";
      if (i === currentSlide + 1) {
        const videoCurrent = els[i].childNodes[1];
        const videoFake = els[i].childNodes[2];
        videoCurrent.style.opacity = "0";
        videoFake.style.opacity = "1";
        videoFake.src = src;
        els[i].style.display = "block";
        setCurrentSlide(currentSlide + 1);
      } else if (currentSlide + 1 === els.length) {
        const videoCurrent = els[0].childNodes[1];
        const videoFake = els[0].childNodes[2];
        videoCurrent.style.opacity = "0";
        videoFake.style.opacity = "1";
        videoFake.src = src;
        els[0].style.display = "block";
        setCurrentSlide(0);
      } else {
        els[i].style.display = "none";
        setCurrentSlide(currentSlide + 1);
      }
    }

    if (currentSlide + 1 === els.length) {
      setTimeout(() => {
        els[0].childNodes[1].style.opacity = 1;
        els[0].childNodes[2].style.opacity = 0;
        document.getElementsByClassName("nav")[0].style.display = "flex";
      }, 3000);
    } else {
      setTimeout(() => {
        els[currentSlide + 1].childNodes[1].style.opacity = 1;
        els[currentSlide + 1].childNodes[2].style.opacity = 0;
        document.getElementsByClassName("nav")[0].style.display = "flex";
      }, 3000);
    }

    for (let j = 0; j < els[0].childNodes[3].childNodes.length; j++) {
      if (currentSlide + 1 === els.length) {
        els[0].childNodes[3].childNodes[j].childNodes[0].style.animation =
          "animKey" + j + " 4s linear ";
      } else {
        els[currentSlide + 1].childNodes[3].childNodes[
          j
        ].childNodes[0].style.animation = "animKey" + j + " 4s linear ";
      }
    }
  };

  const prevSlide = () => {
    const els = document.getElementsByClassName("slider-content");
    document.getElementsByClassName("nav")[0].style.display = "none";
    for (let i = 0; i < els.length; i++) {
      const src = els[currentSlide].childNodes[1].src;
      if (i === currentSlide - 1) {
        const videoCurrent = els[i].childNodes[1];
        const videoFake = els[i].childNodes[2];
        videoCurrent.style.opacity = "0";
        videoFake.style.opacity = "1";
        videoFake.src = src;
        els[i].style.display = "block";
        setCurrentSlide(currentSlide - 1);
      } else if (currentSlide - 1 < 0) {
        if (i === els.length - 1) {
          const videoCurrent = els[els.length - 1].childNodes[1];
          const videoFake = els[els.length - 1].childNodes[2];
          videoCurrent.style.opacity = "0";
          videoFake.style.opacity = "1";
          videoFake.src = src;
          els[els.length - 1].style.display = "block";
          setCurrentSlide(els.length - 1);
        } else {
          els[i].style.display = "none";
        }
      } else {
        els[i].style.display = "none";
        setCurrentSlide(currentSlide - 1);
      }
    }

    if (currentSlide - 1 < 0) {
      setTimeout(() => {
        els[els.length - 1].childNodes[1].style.opacity = 1;
        els[els.length - 1].childNodes[2].style.opacity = 0;
        document.getElementsByClassName("nav")[0].style.display = "flex";
      }, 3000);
    } else {
      setTimeout(() => {
        els[currentSlide - 1].childNodes[1].style.opacity = 1;
        els[currentSlide - 1].childNodes[2].style.opacity = 0;
        document.getElementsByClassName("nav")[0].style.display = "flex";
      }, 3000);
    }

    for (let j = 0; j < els[0].childNodes[3].childNodes.length; j++) {
      if (currentSlide - 1 < 0) {
        els[els.length - 1].childNodes[3].childNodes[
          j
        ].childNodes[0].style.animation = "animKey" + j + " 4s linear ";
      } else {
        els[currentSlide - 1].childNodes[3].childNodes[
          j
        ].childNodes[0].style.animation = "animKey" + j + " 4s linear ";
      }
    }
  };
  useEffect(() => {
    setUp();
  }, []);

  return (
    <>
      <div className="slider">
        <div className="nav">
          <div className="prev-slide" onClick={prevSlide}>
            <HiChevronLeft />
          </div>
          <div className="next-slide" onClick={nextSlide}>
            <HiChevronRight />
          </div>
        </div>
        {data.map((data, index) => (
          <div key={index} className={"slider-content slider-content-" + index}>
            <div className="slider-part-content">
              <div className="slider-part"></div>
              <div className="slider-part"></div>
              <div className="slider-part"></div>
            </div>
            <img src={data} className="img-current" alt="" />
            <img src={data} className="img-fake" alt="" />
            <div className="slider-anim">
              <div className="slider-part">
                <img src={data} alt="" />
              </div>
              <div className="slider-part">
                <img src={data} alt="" />
              </div>
              <div className="slider-part">
                <img src={data} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Slider;
