#!/bin/bash

graph init \
  --product subgraph-studio \
  --from-contract "0x5fbdb2315678afecb367f032d93f642f64180aa3" \
  --network mainnet \
  --abi "./SnapitNFT.json" \
  firstsubgraph
