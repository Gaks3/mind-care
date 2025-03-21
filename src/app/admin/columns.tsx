"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import RoleFilterDropdown from "@/components/role-filter-dropdown";
import SortColumnHeader from "@/components/sort-column-header";

import type { client } from "@/lib/api";
import { UserRole } from "@/types";
import { EditUserDialog } from "./functions/edit-user";
import { DeleteUserDialog } from "./functions/delete-user";

type DataType = Awaited<
  ReturnType<Awaited<ReturnType<typeof client.api.users.$get>>["json"]>
>["data"];

export const columns: ColumnDef<DataType[number]>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ table, column }) => (
      <RoleFilterDropdown table={table} column={column} />
    ),
    cell: ({ row }) => <RoleBadge role={row.original.role} />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortColumnHeader column={column} title="Name" />,
    cell: ({ row }) => format(row.original.updatedAt, "PPP"),
    enableColumnFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <EditUserDialog id={row.original.id} currentRole={row.original.role} />
        <DeleteUserDialog id={row.original.id} />
      </div>
    ),
  },
];

export const RoleBadge = ({ role }: { role: string }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      role === UserRole.ADMIN
        ? "bg-blue-100 text-blue-800"
        : role === UserRole.PSYCHOLOGY
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {role}
  </span>
);
