# Snapit Graph

This project provides theGraph environment to build and deploy subgraph that will listen blockchain events and create custom defined indexes that will be useful on application (or game) side.

### Prerequisites:

- Install Docker https://docs.docker.com/engine/install/

### To test:

- Run run local evm node (for testing) in **snapit-contracts** directory.
- Ensure SnapitNFT contract is deployed and the contract address is correct in `./firstsubgraph/subgraph.yaml`
- Run `./clear_graph` first to ensure previous environment is clean
- Run `./start_graph.sh` to start docker environment that runs theGraph service, a postgres DB and IPFS instance.
- Run `./deploy_subgraph.sh` to deploy the **firstsubgraph** that we defined.

After the last steph, **snapit-api** project can be used to send API request to mint, transfer and query SnapitNFTs.
