import React, { useEffect, useRef } from "react";
import "./CreepingText.scss";

interface ICreepingText {
  text: string;
}

export const CreepingText: React.FC<ICreepingText> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const checkTextOverflow = () => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (container && textElement) {
      const containerWidth = container.clientWidth;
      const textWidth = textElement.scrollWidth;

      if (textWidth > containerWidth) {
        const overflowAmount = textWidth - containerWidth;

        const animationDuration = Math.max(
          3,
          (overflowAmount / containerWidth) * 5
        );

        textElement.style.animationDuration = `${animationDuration}s`;
        textElement.style.transform = `translateX(0)`;
        textElement.style.animation = `creep ${animationDuration}s linear infinite`;

        container.classList.add("animate");
      } else {
        textElement.style.animation = "";
        container.classList.remove("animate");
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

  return (
    <div className="text-container" ref={containerRef}>
      <span className="creeping-text" ref={textRef}>
        {text}
      </span>
    </div>
  );
};
