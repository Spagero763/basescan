export type Protocol = {
  name: string;
  tvl: number;
  volume24h: number;
  users: number;
  category: 'DEX' | 'Lending' | 'Liquid Staking' | 'Yield';
  logoUrl: string;
  logoHint: string;
  timestamp: number;
  isActive: boolean;
};

export type Token = {
  address: string;
  name: string;
  ticker: string;
  price: number;
  volume: number;
  marketCap: number;
  logoUrl: string;
  logoHint: string;
};

export const protocols: Protocol[] = [
  {
    name: "AeroSwap",
    tvl: 850000000,
    volume24h: 120000000,
    users: 45000,
    category: "DEX",
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "rocket logo",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    isActive: true,
  },
  {
    name: "BaseLend",
    tvl: 1200000000,
    volume24h: 35000000,
    users: 22000,
    category: "Lending",
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "bank building",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    isActive: true,
  },
  {
    name: "VelocityX",
    tvl: 600000000,
    volume24h: 85000000,
    users: 31000,
    category: "DEX",
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "speed lines",
    timestamp: Date.now() - 1000 * 60 * 45, // 45 minutes ago
    isActive: true,
  },
  {
    name: "StakeBase",
    tvl: 950000000,
    volume24h: 15000000,
    users: 15000,
    category: "Liquid Staking",
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "shield icon",
    timestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    isActive: false,
  },
  {
    name: "YieldFarm",
    tvl: 300000000,
    volume24h: 25000000,
    users: 18000,
    category: "Yield",
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "wheat plant",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    isActive: true,
  },
];

export const tokens: Token[] = [
  {
    address: "0x4200000000000000000000000000000000000006",
    name: "Wrapped Ether",
    ticker: "WETH",
    price: 3500.5,
    volume: 500000000,
    marketCap: 420000000000,
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "ethereum logo",
  },
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bda02913",
    name: "USD Coin",
    ticker: "USDC",
    price: 1.0,
    volume: 800000000,
    marketCap: 33000000000,
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "dollar coin",
  },
  {
    address: "0x0000852600CEb0011448b29Cf04ee625585b0A23",
    name: "Aero",
    ticker: "AERO",
    price: 1.25,
    volume: 120000000,
    marketCap: 500000000,
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "letter A",
  },
  {
    address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
    name: "Dai",
    ticker: "DAI",
    price: 0.99,
    volume: 150000000,
    marketCap: 5300000000,
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "orange diamond",
  },
  {
    address: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
    name: "Bald",
    ticker: "BALD",
    price: 0.03,
    volume: 10000000,
    marketCap: 30000000,
    logoUrl: "https://placehold.co/40x40.png",
    logoHint: "abstract shape",
  },
];
