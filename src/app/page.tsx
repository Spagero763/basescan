"use client";

import { DollarSign, Users, TrendingUp, Shield, Wallet, Bot, Search, UploadCloud, UserCog } from "lucide-react";
import { protocols, tokens } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AiInsights from "@/components/dashboard/ai-insights";
import EtherscanLinker from "@/components/dashboard/etherscan-linker";
import ProtocolTable from "@/components/dashboard/protocol-table";
import TokenTable from "@/components/dashboard/token-table";
import { Logo } from "@/components/icons";
import MetricsCard from "@/components/dashboard/metrics-card";
import UpdateMetrics from "@/components/dashboard/update-metrics";
import UpdateTokenPrices from "@/components/dashboard/update-token-prices";
import AdminActions from "@/components/dashboard/admin-actions";
import ProtocolTvlChart from "@/components/dashboard/protocol-tvl-chart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const totalTVL = protocols.reduce((acc, p) => acc + p.tvl, 0);
  const totalVolume24h = protocols.reduce((acc, p) => acc + p.volume24h, 0);
  const totalUsers = protocols.reduce((acc, p) => acc + p.users, 0);
  const protocolNames = protocols.map(p => p.name);
  const contractOwner = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Placeholder address

  // Simple ecosystem-wide APY calculation
  const totalDailyFees = totalVolume24h * 0.003; // Assume 0.3% fee
  const totalAnnualFees = totalDailyFees * 365;
  const ecosystemApy = totalTVL > 0 ? (totalAnnualFees / totalTVL) * 100 : 0;

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    // In a real app, you would use a library like ethers.js, wagmi, or web3-react to connect to a wallet.
    // This is a simulation.
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Set mock account to be the owner for demonstration purposes
    const mockAccount = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
    setAccount(mockAccount);
    setIsConnected(true);
    setIsConnecting(false);
  };

  const handleDisconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
  };

  const isOwner = isConnected && account?.toLowerCase() === contractOwner.toLowerCase();


  return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <SidebarTrigger />
                </Button>
                <Logo className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold font-headline text-primary">BaseScan</h1>
              </div>
          </SidebarHeader>
          <SidebarContent>
            <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-4 text-base hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Bot /> AI Tools
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-2">
                    <AiInsights
                    tvl={totalTVL}
                    volume24h={totalVolume24h}
                    users={totalUsers}
                    protocolNames={protocolNames}
                    apy={ecosystemApy}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-4 text-base hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Search /> Explorer
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-2">
                  <EtherscanLinker />
                </AccordionContent>
              </AccordionItem>
              {isOwner && (
                <>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="px-4 text-base hover:no-underline">
                      <div className="flex items-center gap-2">
                        <UploadCloud /> Update Data
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-2 space-y-2">
                      <UpdateMetrics />
                      <UpdateTokenPrices />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="px-4 text-base hover:no-underline">
                      <div className="flex items-center gap-2">
                        <UserCog /> Admin
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-2">
                      <AdminActions />
                    </AccordionContent>
                  </AccordionItem>
                </>
              )}
            </Accordion>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
           <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <div>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <SidebarTrigger />
                </Button>
                <h2 className="text-3xl font-bold font-headline tracking-tight">
                  Base Ecosystem Metrics
                </h2>
                <p className="text-muted-foreground">
                  An overview of the DeFi landscape on Base.
                </p>
              </div>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 text-sm sm:flex">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Owner:</span>
                <a
                  href={`https://basescan.org/address/${contractOwner}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-primary hover:underline"
                >
                  {`${contractOwner.substring(0, 6)}...${contractOwner.substring(contractOwner.length - 4)}`}
                </a>
              </div>
              {isConnected && account ? (
                <Button variant="outline" onClick={handleDisconnectWallet}>
                  <span className="font-mono">{`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</span>
                </Button>
              ) : (
                <Button onClick={handleConnectWallet} disabled={isConnecting}>
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>
          </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-6">
              <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <MetricsCard
                  title="Total Value Locked (TVL)"
                  value={`$${(totalTVL / 1e9).toFixed(2)}B`}
                  icon={<DollarSign />}
                  description="The total value of assets locked in Base protocols."
                />
                <MetricsCard
                  title="24h Volume"
                  value={`$${(totalVolume24h / 1e6).toFixed(2)}M`}
                  icon={<TrendingUp />}
                  description="The total trading volume across Base in the last 24 hours."
                />
                <MetricsCard
                  title="Active Users"
                  value={totalUsers.toLocaleString()}
                  icon={<Users />}
                  description="The number of unique wallets interacting with Base protocols."
                />
              </section>

              <section>
                <ProtocolTvlChart protocols={protocols} />
              </section>
              
              <section>
                <Card>
                  <CardContent className="p-0">
                    <Tabs defaultValue="protocols">
                      <div className="p-4 border-b">
                        <TabsList>
                          <TabsTrigger value="protocols">Protocols</TabsTrigger>
                          <TabsTrigger value="tokens">Tokens</TabsTrigger>
                        </TabsList>
                      </div>
                      <TabsContent value="protocols" className="p-4">
                        <ProtocolTable protocols={protocols} />
                      </TabsContent>
                      <TabsContent value="tokens" className="p-4">
                        <TokenTable tokens={tokens} />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </section>
          </main>
        </SidebarInset>
      </div>
  );
}
