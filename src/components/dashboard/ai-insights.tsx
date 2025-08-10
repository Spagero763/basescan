"use client";

import { useState } from "react";
import { Sparkles, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { generateInsightsAction } from "@/app/actions";
import { DefiInsightsInput, DefiInsightsOutput } from "@/ai/flows/defi-insights";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function AiInsights(props: DefiInsightsInput) {
  const [insights, setInsights] = useState<DefiInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setInsights(null);
    const result = await generateInsightsAction(props);
    setInsights(result);
    setIsLoading(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-headline">AI-Powered Insights</CardTitle>
            <CardDescription>
              Generate a summary of key trends and observations.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key (Optional)</Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="api-key" placeholder="Enter your API key" className="pl-10" />
          </div>
        </div>

        <div className="flex-grow rounded-lg border bg-background p-4 min-h-[120px]">
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          {insights && <p className="text-sm">{insights.insights}</p>}
          {!isLoading && !insights && (
            <p className="text-sm text-muted-foreground">
              Click the button to generate AI insights based on the current ecosystem metrics.
            </p>
          )}
        </div>
        
        <Button onClick={handleGenerateInsights} disabled={isLoading} className="w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? "Generating..." : "Generate Insights"}
        </Button>
      </CardContent>
    </Card>
  );
}
