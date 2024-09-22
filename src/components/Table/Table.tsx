import React from "react";
import "./Table.scss";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { Address } from "@ton/core";
import { UserPlaceholder } from "../UserAvatar/Placeholder/Placeholder";

interface TableProps {
  participants: Address[];
  participantsCount: number;
}

export const Table: React.FC<TableProps> = ({
  participants,
  participantsCount,
}) => {
  const totalItems = 10;
  const items = [
    ...participants,
    ...new Array(totalItems - participants.length).fill("placeholder"),
  ];

  return (
    <div className="table-container">
      <div className="table-background"></div>
      <div className="table-counter">
        <span>{participantsCount < 10 ? `${participantsCount}/10` : ""}</span>
      </div>
      <div className="users-container">
        {items.map((participant, index) =>
          participant !== "placeholder" ? (
            <UserAvatar
              key={participant.toString()}
              participant={participant}
              index={index}
            />
          ) : (
            <UserPlaceholder key={index} index={index} />
          )
        )}
      </div>
    </div>
  );
};
