"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CollapsibleCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export function CollapsibleCard({ title, description, children, defaultOpen = true, icon }: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="bg-background/50">
        <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-4">
                {icon && <div className="bg-primary/10 p-2 rounded-lg">{icon}</div>}
                <div>
                    <CardTitle className="font-headline">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </div>
             <CollapsibleTrigger asChild>
                <button className="p-2 rounded-md hover:bg-muted">
                    <ChevronDown className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} />
                    <span className="sr-only">Toggle</span>
                </button>
            </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
            <CardContent className="p-4 pt-0">
                {children}
            </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
