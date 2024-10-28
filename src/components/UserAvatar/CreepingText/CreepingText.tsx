import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./CreepingText.scss";

interface ICreepingText {
  text: string;
}

export const CreepingText: React.FC<ICreepingText> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  let animating = false;
  let xPercent = 0;
  let direction = -1;

  const checkTextOverflow = () => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (container && textElement) {
      const containerWidth = container.clientWidth;
      const textWidth = textElement.scrollWidth;

      if (textWidth > containerWidth) {
        animating = true;
        requestAnimationFrame(animate);
      } else {
        animating = false;
        requestAnimationFrame(stopAnimate);
      }
    }
  };

  useEffect(() => {
    checkTextOverflow();

    window.addEventListener("resize", checkTextOverflow);

    return () => {
      window.removeEventListener("resize", checkTextOverflow);
    };
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(textRef.current, { xPercent: xPercent });
    animating && requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  const stopAnimate = () => {
    gsap.set(textRef.current, { xPercent: 0 });
  };

  return (
    <div className="text-container" ref={containerRef}>
      <span className="creeping-text" ref={textRef}>
        {text}
      </span>
    </div>
  );
};
