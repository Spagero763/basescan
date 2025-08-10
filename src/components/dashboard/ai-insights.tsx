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
    <Card className="h-full flex flex-col bg-transparent border-0 shadow-none">
      <CardContent className="flex-grow flex flex-col gap-4 p-0">
        <div className="space-y-2">
          <Label htmlFor="api-key" className="sr-only">API Key (Optional)</Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="api-key" placeholder="API key (optional)" className="pl-10 h-9" />
          </div>
        </div>

        <div className="flex-grow rounded-lg border bg-background p-3 min-h-[120px]">
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
              Click the button to generate AI insights.
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
