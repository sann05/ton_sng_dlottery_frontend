import React from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import "./UserAvatar.scss";
import { Address } from "@ton/core";
import { CreepingText } from "./CreepingText/CreepingText";

interface UserProps {
  participant: Address;
  index: number;
}

export const UserAvatar: React.FC<UserProps> = ({ participant, index }) => {
  const config = genConfig(participant.toString() + index);

  return (
    <div className="user" style={{ "--i": index } as React.CSSProperties}>
      <div className="avatar-container">
        <Avatar style={{ width: "60px", height: "60px" }} {...config} />
      </div>
      <div className="username">
        <CreepingText text={participant.toString()} />
      </div>
    </div>
  );
};
