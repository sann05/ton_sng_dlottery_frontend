import React from "react";
import "./Placeholder.scss";

interface PlaceholderProps {
  index: number;
}

export const UserPlaceholder: React.FC<PlaceholderProps> = ({ index }) => {
  return (
    <div
      className="user-placeholder"
      style={{ "--i": index } as React.CSSProperties}
    >
      <div className="placeholder-image"></div>
    </div>
  );
};
