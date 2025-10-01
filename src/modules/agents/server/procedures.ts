import db from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({ 
    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(
                and(
                    (eq(agents.id, input.id)),
                    eq(agents.userId, ctx.auth.user.id)
                )
            );
    
            if(!existingAgent){
                throw new TRPCError({code: "NOT_FOUND", message: "Agent not found"});
            }
    
        return existingAgent;
    }),

    getMany: protectedProcedure.query(async ({ctx}) => {
        const data = await db
            .select()
            .from(agents)
            .where(
                eq(agents.userId, ctx.auth.user.id)
            );

        // await new Promise((resolve) => setTimeout(resolve, 5000))
        // throw new TRPCError({ code: "BAD_REQUEST" })

        return data;
    }),

    create: protectedProcedure
        .input(agentsInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db
                .insert(agents)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning();

            return createdAgent;
        })
})