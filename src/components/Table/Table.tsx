import React, { useMemo } from "react";
import "./Table.scss";
import { Paper } from "@mui/material";
import { Participants, ParticipantsData } from "./TableTypes";
import { TableVirtuoso } from "react-virtuoso";
import {
  fixedHeaderContent,
  rowContent,
  VirtuosoTableComponents,
} from "./VirtuosoTableComponents";

const totalItems = 500;

export const ParticipantsTable: React.FC<ParticipantsData> = ({
  participants,
}) => {
  const rows: (Participants | null)[] = useMemo(
    () =>
      participants
        .map((participant, index) => ({
          number: index,
          id: participant.toString(),
          avatar: participant.toString(),
        }))
        .concat(new Array(totalItems - participants.length).fill(null)),
    [participants]
  );

  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent(rows[1])}
        itemContent={rowContent}
      />
    </Paper>
  );
};
