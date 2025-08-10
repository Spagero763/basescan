"use client";

import { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function EtherscanLinker() {
  const [address, setAddress] = useState("");

  const basescanUrl = `https://basescan.org/address/${address}`;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
             <Search className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="font-headline">Contract Explorer</CardTitle>
            <CardDescription>
              Look up any address on Basescan.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between gap-4">
        <div className="space-y-2">
            <Input
            id="address-input"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Enter a valid contract or wallet address.</p>
        </div>
        <Button asChild disabled={!address.startsWith("0x") || address.length < 10}>
          <a href={basescanUrl} target="_blank" rel="noopener noreferrer" className="w-full">
            View on Basescan
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
