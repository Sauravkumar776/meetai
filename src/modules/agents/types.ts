import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/routers/_app";

// fetch type directly from procedure (getOne) // you can use schema but what if we change the output of the getOne.
export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"]