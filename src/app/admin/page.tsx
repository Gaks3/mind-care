import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";

import { auth } from "@/lib/auth";
import { client } from "@/lib/api";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { UserRole } from "@/types";

export default async function AdminDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const role = session?.user?.role;

  if (!user || role !== UserRole.ADMIN) return notFound();

  const users = await client.api.users.$get(undefined, {
    init: {
      headers: await headers(),
    },
  });

  const { data: usersData } = await users.json();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Link href="/admin/add">
          <Button size="lg">Add User</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={usersData} defaultFilter="name" />
    </div>
  );
}
