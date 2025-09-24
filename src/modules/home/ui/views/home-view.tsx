"use client"

import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {

  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "from tRPC" }));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      {data?.greeting}
    </div>
  )
}
