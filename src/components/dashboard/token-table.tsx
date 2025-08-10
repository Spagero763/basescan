"use client";

import Image from "next/image";
import type { Token } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

interface TokenTableProps {
  tokens: Token[];
}

export default function TokenTable({ tokens }: TokenTableProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Token</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Volume</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.map((token) => (
            <TableRow key={token.address}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={token.logoUrl}
                    alt={`${token.name} logo`}
                    width={24}
                    height={24}
                    className="rounded-full"
                    data-ai-hint={token.logoHint}
                  />
                  <div>
                    <div className="font-medium">{token.name}</div>
                    <div className="text-xs text-muted-foreground">{token.ticker}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono">
                ${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4})}
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(token.volume)}
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(token.marketCap)}
              </TableCell>
              <TableCell className="text-right">
                <a
                  href={`https://basescan.org/token/${token.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
