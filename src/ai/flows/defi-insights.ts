// SPDX-License-Identifier: MIT
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating DeFi insights.
 *
 * - defiInsights - A function that generates insights about the DeFi ecosystem.
 * - DefiInsightsInput - The input type for the defiInsights function.
 * - DefiInsightsOutput - The return type for the defiInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DefiInsightsInputSchema = z.object({
  tvl: z.number().describe('Total Value Locked in the Base ecosystem.'),
  volume24h: z.number().describe('24-hour trading volume in the Base ecosystem.'),
  users: z.number().describe('Number of active users in the Base ecosystem.'),
  apy: z.number().optional().describe('The APY of the protocol, if available'),
  protocolNames: z.array(z.string()).describe('Names of the protocols in the Base ecosystem.')
});
export type DefiInsightsInput = z.infer<typeof DefiInsightsInputSchema>;

const DefiInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights summarizing key trends and observations from the DeFi metrics.'),
});
export type DefiInsightsOutput = z.infer<typeof DefiInsightsOutputSchema>;

export async function defiInsights(input: DefiInsightsInput): Promise<DefiInsightsOutput> {
  return defiInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'defiInsightsPrompt',
  input: {schema: DefiInsightsInputSchema},
  output: {schema: DefiInsightsOutputSchema},
  prompt: `You are an AI assistant specializing in providing insights into the DeFi ecosystem on the Base blockchain.
  Given the following metrics, generate a concise summary of the key trends and observations.

  Total Value Locked (TVL): {{tvl}}
  24-Hour Volume: {{volume24h}}
  Active Users: {{users}}
  Protocol Names: {{protocolNames}}
  APY: {{apy}}

  Provide insights that are easy to understand for both novice and experienced DeFi users.`,
});

const defiInsightsFlow = ai.defineFlow(
  {
    name: 'defiInsightsFlow',
    inputSchema: DefiInsightsInputSchema,
    outputSchema: DefiInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
