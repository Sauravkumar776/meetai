import { LoadingState } from "@/components/loading-state";
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { AgentsListHeader } from "@/modules/agents/ui/views/components/agents-list-header";
import { getQueryClient, trpc } from "@/trpc/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { auth } from "@/lib/auth";

// we can use error boundary from react-error-boundary for showing errors rather than using error.tsx (this is for the whole page)

const Page = async () => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())
    return (
        <>
            <AgentsListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<LoadingState title="Loading Agents" description="This may take few seconds..." />}>
                    <AgentsView />
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default Page;