import { DollarSign, Users, TrendingUp, Shield } from "lucide-react";
import { protocols, tokens } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AiInsights from "@/components/dashboard/ai-insights";
import EtherscanLinker from "@/components/dashboard/etherscan-linker";
import ProtocolTable from "@/components/dashboard/protocol-table";
import TokenTable from "@/components/dashboard/token-table";
import { Logo } from "@/components/icons";
import MetricsCard from "@/components/dashboard/metrics-card";

export default function Home() {
  const totalTVL = protocols.reduce((acc, p) => acc + p.tvl, 0);
  const totalVolume24h = protocols.reduce((acc, p) => acc + p.volume24h, 0);
  const totalUsers = protocols.reduce((acc, p) => acc + p.users, 0);
  const protocolNames = protocols.map(p => p.name);
  const contractOwner = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Placeholder address

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline">BaseScan</h1>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Owner:</span>
          <a
            href={`https://etherscan.io/address/${contractOwner}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-primary hover:underline"
          >
            {`${contractOwner.substring(0, 6)}...${contractOwner.substring(contractOwner.length - 4)}`}
          </a>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="container mx-auto">
          <section className="mb-6">
            <h2 className="text-3xl font-bold font-headline tracking-tight mb-1">
              Base Ecosystem Metrics
            </h2>
            <p className="text-muted-foreground">
              An overview of the DeFi landscape on Base.
            </p>
          </section>

          <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

          <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AiInsights
                tvl={totalTVL}
                volume24h={totalVolume24h}
                users={totalUsers}
                protocolNames={protocolNames}
              />
            </div>
            <div>
              <EtherscanLinker />
            </div>
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
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        Built with Next.js and Firebase.
      </footer>
    </div>
  );
}
