export interface LeaderboardEntry {
  address: string;
  score: number;
  rank: number;
}

export interface CoinFlipStats {
  flips: number;
  wins: number;
  lastChoice: number;
  lastResult: number;
  winRate: number;
}

export interface CeloCoinFlipConfig {
  contractAddress: string;
  rpcUrl?: string;
}
