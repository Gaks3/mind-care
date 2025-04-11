import { User, LogOut, ChevronDown, Brain } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <div>
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-gray-900">MindCare</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.image || "Image user"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.name?.charAt(0) || <User />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <form
                    action={async () => {
                      "use server";
                      await auth.api.signOut({
                        headers: await headers(),
                      });
                      redirect("/");
                    }}
                  >
                    <Button type="submit" size="xs" variant="ghost">
                      Sign Out
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome, {role} 👋
              </h1>
              <p className="text-primary-foreground/80">Email: {user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">User Management</h2>
          <Link href="/admin/add">
            <Button size="lg">Add User</Button>
          </Link>
        </div>
        <DataTable columns={columns} data={usersData} defaultFilter="name" />
      </div>
    </div>
  );
}
