#!/bin/bash

# Stop all services managed by Docker Compose
echo "Stopping Docker Compose services..."
docker-compose down

# Replace these with your actual Graph Node, PostgreSQL, and IPFS volume names
GRAPH_NODE_VOLUME="graph-node-1"
POSTGRES_VOLUME="postgres-1"
IPFS_VOLUME="ipfs-1"

# Remove the Docker volumes
echo "Removing Docker volumes..."
docker volume rm $GRAPH_NODE_VOLUME $POSTGRES_VOLUME $IPFS_VOLUME

cd ./data 

rm -rf ipfs postgres

echo "Volumes removed. Graph Node, PostgreSQL, and IPFS states are reset."
