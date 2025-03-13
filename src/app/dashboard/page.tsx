import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/")
  }

  const user = session?.user

  return (
    <>
      <h1>{user?.email}</h1>
      <h1>{user?.name}</h1>
    </>
  )
}

