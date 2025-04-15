"use client";

import SortColumnHeader from "@/components/sort-column-header";
import { client } from "@/lib/api";
import { UnwrapArray } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { InferResponseType } from "hono";
import EditTopicDialog from "./components/edit-topic-dialog";
import DeleteTopicDialog from "./components/delete-topic-dialog";

type DataType = UnwrapArray<
  InferResponseType<typeof client.api.topics.$get>["data"]
>;

export const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortColumnHeader column={column} title="Name" />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <EditTopicDialog id={row.original.id} name={row.original.name} />
        <DeleteTopicDialog id={row.original.id} />
      </div>
    ),
  },
];
