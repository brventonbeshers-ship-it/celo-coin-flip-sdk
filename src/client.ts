import { ethers } from "ethers";
import { CeloCoinFlipConfig, CoinFlipStats, LeaderboardEntry } from "./types";

const ABI = [
  "function flip(uint256 choice) external",
  "function totalFlips() external view returns (uint256)",
  "function userFlips(address) external view returns (uint256)",
  "function userWins(address) external view returns (uint256)",
  "function getUserStats(address player) external view returns (uint256 flips, uint256 wins, uint256 latestChoice, uint256 latestResult)",
  "function getLeaderboard() external view returns (address[10], uint256[10])",
];

export class CeloCoinFlipClient {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  public contractAddress: string;

  constructor(config: CeloCoinFlipConfig) {
    const rpcUrl = config.rpcUrl || "https://forno.celo.org";
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.contractAddress = config.contractAddress;
    this.contract = new ethers.Contract(config.contractAddress, ABI, this.provider);
  }

  async getTotalFlips(): Promise<number> {
    const total = await this.contract.totalFlips();
    return Number(total);
  }

  async getUserStats(address: string): Promise<CoinFlipStats> {
    const [flips, wins, lastChoice, lastResult] = await this.contract.getUserStats(address);
    const flipCount = Number(flips);
    const winCount = Number(wins);
    return {
      flips: flipCount,
      wins: winCount,
      lastChoice: Number(lastChoice),
      lastResult: Number(lastResult),
      winRate: flipCount === 0 ? 0 : Math.round((winCount / flipCount) * 100),
    };
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const [addresses, scores] = await this.contract.getLeaderboard();
    const entries: LeaderboardEntry[] = [];

    for (let i = 0; i < 10; i++) {
      const address = addresses[i];
      const score = Number(scores[i]);
      if (address !== ethers.ZeroAddress && score > 0) {
        entries.push({ address, score, rank: i + 1 });
      }
    }

    return entries;
  }
}

export { ABI as CELO_COIN_FLIP_ABI };
