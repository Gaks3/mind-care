import type { ColumnDef } from "@tanstack/react-table";

export type Article = {
  id: number;
  title: string;
  createdBy: string;
  thumbnail: string;
  createdAt: string;
};

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  PSYCHOLOGY = "PSYCHOLOGY",
}

export enum GenderUser {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum StatusUser {
  WORKER = "WORKER",
  STUDENT = "STUDENT",
}

export enum StatusBooking {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultFilter: string;
}
