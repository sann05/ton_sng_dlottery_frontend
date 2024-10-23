import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import "./UserAvatar.scss";

interface UserProps {
  participant: string;
  index: number;
}

export const UserAvatar: React.FC<UserProps> = ({ participant, index }) => {
  const config = genConfig(participant + index);

  return (
    <div className="user" style={{ "--i": index } as React.CSSProperties}>
      <div className="avatar-container">
        <Avatar style={{ width: "40px", height: "40px" }} {...config} />
      </div>
    </div>
  );
};
