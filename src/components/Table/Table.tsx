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
import { useTonAddress } from "@tonconnect/ui-react";

const totalItems = 500;

const compareIds = (id: string, id2: string) => {
  return id.substring(3, id.length - 3) === id2.substring(3, id2.length - 3);
};

export const ParticipantsTable: React.FC<ParticipantsData> = ({
  participants,
}) => {
  const userFriendlyAddress = useTonAddress();
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
  const me = rows.find((r) => (r ? compareIds(r.id, userFriendlyAddress) : 0));

  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent(me)}
        itemContent={rowContent}
      />
    </Paper>
  );
};
