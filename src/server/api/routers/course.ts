import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "@/env";

const google = createGoogleGenerativeAI({
	apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// AI Response Schema for Outline
const courseOutlineSchema = z.object({
	title: z.string(),
	description: z.string(),
	lessons: z.array(z.object({ title: z.string() })),
});

export const courseRouter = createTRPCRouter({
	generate: protectedProcedure
		.input(z.object({ text: z.string().min(1) }))
		.mutation(async ({ ctx, input }) => {
		}),
});
