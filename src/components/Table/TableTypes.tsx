import { Address } from "@ton/core";

export interface ColumnData {
  dataKey: keyof Participants;
  label: string;
  numeric?: boolean;
  width?: number;
}

export interface Participants {
  number: number;
  id: string;
  avatar: string;
}

export interface ParticipantsData {
  participants: Address[];
  participantsCount: number;
}
