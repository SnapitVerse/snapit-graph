#!/bin/bash

graph init \
  --product subgraph-studio \
  --from-contract "0x8707deaa13aD0883045EC2905BBC22e6d041dC40" \
  --network mainnet \
  --abi "./SnapitNFT.json" \
  firstsubgraph
