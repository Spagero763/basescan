"use server";

import { defiInsights, type DefiInsightsInput, type DefiInsightsOutput } from "@/ai/flows/defi-insights";

export async function generateInsightsAction(
  input: DefiInsightsInput
): Promise<DefiInsightsOutput> {
  try {
    const result = await defiInsights(input);
    return result;
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return {
      insights: "There was an error generating insights. Please try again later.",
    };
  }
}
