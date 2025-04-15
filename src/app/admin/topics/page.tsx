import { Button } from "@/components/ui/button";
import { client } from "@/lib/api";
import Link from "next/link";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { headers } from "next/headers";

export default async function TopicsPage() {
  const topicRes = await client.api.topics.$get(void 0, {
    init: {
      headers: await headers(),
    },
  });

  const { data: topicsData } = await topicRes.json();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Topic Management</h2>
        <Link href="/admin/add">
          <Button size="lg">Add User</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={topicsData} defaultFilter="name" />
    </div>
  );
}
