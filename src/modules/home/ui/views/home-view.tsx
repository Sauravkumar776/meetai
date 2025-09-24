"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export const HomeView = () => {

  const { data: session } = authClient.useSession()
  const router = useRouter();

  if (!session) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-3xl font-bold">Welcome, {session.user?.name || session.user?.email}!</h2>
          <p className="text-gray-600">You are logged in.</p>
          <Button variant="destructive" onClick={() => authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                }
            }
          })}
          >
            Sign Out
          </Button>
        </div>
      </div>
  )
}
