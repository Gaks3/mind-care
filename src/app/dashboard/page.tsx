import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user

  return (
    <>
      <h1>{user?.email}</h1>
      <h1>{user?.name}</h1>
    </>
  )
}

