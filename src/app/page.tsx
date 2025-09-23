"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export default function AuthPage() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const { data: session } = authClient.useSession()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "signUp") {
      authClient.signUp.email(
        { email, password, name },
        {
          onError: (error) => {
            alert("Error signing up")
            console.error("Sign up error:", error)
          },
          onSuccess: (data) => {
            alert("Sign up successful!")
            console.log("Sign up success:", data)
          },
        }
      )
    } else {
      authClient.signIn.email(
        { email, password },
        {
          onError: (error) => {
            alert("Error signing in")
            console.error("Sign in error:", error)
          },
          onSuccess: (data) => {
            alert("Sign in successful!")
            console.log("Sign in success:", data)
          },
        }
      )
    }
  }

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-3xl font-bold">Welcome, {session.user?.name || session.user?.email}!</h2>
          <p className="text-gray-600">You are logged in.</p>
          <Button variant="destructive" onClick={() => authClient.signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in"
      >
        <div className="text-center">
          {/* Optional Logo */}
          <div className="mb-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              🔐
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            {mode === "signIn" ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-sm text-gray-500">
            {mode === "signIn"
              ? "Welcome back! Please login to your account."
              : "Let's get you set up with a new account."}
          </p>
        </div>

        {mode === "signUp" && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full text-base font-semibold transition hover:scale-[1.01]"
        >
          {mode === "signIn" ? "Sign In" : "Sign Up"}
        </Button>

        <div className="text-center text-sm text-gray-600">
          {mode === "signIn" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
            className="text-blue-600 font-medium hover:underline ml-1"
          >
            {mode === "signIn" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  )
}
