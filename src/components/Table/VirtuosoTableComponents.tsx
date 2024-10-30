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

export function fixedHeaderContent(me: Participants | null) {
  return () => (
    <>
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
      {me && (
        <TableRow sx={{ backgroundColor: "background.paper" }}>
          {rowContent(me.number, me)}
        </TableRow>
      )}
    </>
  );
}

export function rowContent(index: number, row: Participants | null) {
  if (!row)
    return (
      <>
        <TableCell>{index + 1}</TableCell>
        <TableCell colSpan={2}>Empty seed</TableCell>
      </>
    );

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
          ) : column.dataKey === "number" ? (
            row[column.dataKey] + 1
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
