import React from "react";
import { TableComponents } from "react-virtuoso";
import { ColumnData, Participants, ParticipantsData } from "./TableTypes";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export const columns: ColumnData[] = [
  {
    width: 50,
    label: "number",
    dataKey: "number",
    numeric: true,
  },
  {
    width: 50,
    label: "id",
    dataKey: "id",
  },
  {
    width: 100,
    label: "avatar",
    dataKey: "avatar",
  },
];

export function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function rowContent(index: number, row: Participants) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {column.dataKey === "avatar" ? (
            <UserAvatar
              participant={row[column.dataKey] as string}
              index={index}
            />
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export const VirtuosoTableComponents: TableComponents<Participants> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};
