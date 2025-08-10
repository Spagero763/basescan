"use client";

import { useState } from "react";
import Image from "next/image";
import type { Protocol } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProtocolTableProps {
  protocols: Protocol[];
}

const categories = ["All", "DEX", "Lending", "Liquid Staking", "Yield"] as const;
type Category = (typeof categories)[number];

export default function ProtocolTable({ protocols }: ProtocolTableProps) {
  const [filter, setFilter] = useState<Category>("All");

  const filteredProtocols =
    filter === "All"
      ? protocols
      : protocols.filter((p) => p.category === filter);

  const calculateApy = (volume24h: number, tvl: number): string => {
    if (tvl === 0) return "0.00";
    const apy = (volume24h * 365 * 100) / tvl;
    return apy.toFixed(2);
  };

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="All"
        onValueChange={(value) => setFilter(value as Category)}
      >
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Protocol</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">TVL</TableHead>
              <TableHead className="text-right">24h Volume</TableHead>
              <TableHead className="text-right">Est. APY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProtocols.map((protocol) => (
              <TableRow key={protocol.name}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={protocol.logoUrl}
                      alt={`${protocol.name} logo`}
                      width={24}
                      height={24}
                      className="rounded-full"
                      data-ai-hint={protocol.logoHint}
                    />
                    <span className="font-medium">{protocol.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{protocol.category}</Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${(protocol.tvl / 1_000_000).toFixed(2)}M
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${(protocol.volume24h / 1_000_000).toFixed(2)}M
                </TableCell>
                <TableCell className="text-right font-mono text-primary">
                  {calculateApy(protocol.volume24h, protocol.tvl)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
