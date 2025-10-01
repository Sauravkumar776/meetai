"use client"

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { DataTable } from "../components/data-table";
import { columns } from '../components/columns';
import { EmptyState } from "@/components/empty-state";
import { EmptyStates } from "@/components/empty-state";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    // If no data, show empty state instead of table
    // if (data.length === 0) {
    //     return (
    //         <div className="flex-1 px-4 pb-4 md:px-8 flex flex-col">
    //             <div className="rounded-lg border bg-background min-h-[100%] flex items-center justify-center">
    //                 {EmptyStates.NoAgents()}
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="flex-1 px-4 pb-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data} columns={columns} />
                { data.length === 0 &&  <div className="rounded-lg min-h-[50%] flex items-center justify-center">
                    {EmptyStates.NoAgents()}
                </div>}
        </div>
    );
}