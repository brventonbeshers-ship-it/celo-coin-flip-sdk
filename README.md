# celo-coin-flip-sdk

TypeScript SDK for reading the Celo Coin Flip contract from Celo mainnet.

```ts
import { CeloCoinFlipClient } from "celo-coin-flip-sdk";

const client = new CeloCoinFlipClient({
  contractAddress: "0x6aB174Cb1E0EE652c2d20001f70b0c06bc975113",
});

const totalFlips = await client.getTotalFlips();
```
