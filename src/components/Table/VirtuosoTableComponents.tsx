import React from "react";
import { TableComponents } from "react-virtuoso";
import { ColumnData, Participants } from "./TableTypes";
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
import { CreepingText } from "../UserAvatar/CreepingText/CreepingText";

export const columns: ColumnData[] = [
  {
    width: 20,
    label: "N",
    dataKey: "number",
  },
  {
    width: 50,
    label: "avatar",
    dataKey: "avatar",
  },
  {
    width: 150,
    label: "id",
    dataKey: "id",
  },
];

export function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function rowContent(index: number, row: Participants | null) {
  if (!row) return <TableCell colSpan={3}>Empty seed</TableCell>;

  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell key={column.dataKey}>
          {column.dataKey === "avatar" ? (
            <UserAvatar
              participant={row[column.dataKey] as string}
              index={index}
            />
          ) : column.dataKey === "id" ? (
            <CreepingText text={row[column.dataKey]} />
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export const VirtuosoTableComponents: TableComponents<Participants | null> = {
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
