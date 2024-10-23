import React, { useMemo } from "react";
import "./Table.scss";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Participants, ParticipantsData } from "./TableTypes";
import { TableVirtuoso } from "react-virtuoso";
import {
  fixedHeaderContent,
  rowContent,
  VirtuosoTableComponents,
} from "./VirtuosoTableComponents";

export const ParticipantsTable: React.FC<ParticipantsData> = ({
  participants,
}) => {
  const rows: Participants[] = useMemo(
    () =>
      participants.map((participant, index) => ({
        number: index,
        id: participant.toString(),
        avatar: participant.toString(),
      })),
    []
  );

  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};
