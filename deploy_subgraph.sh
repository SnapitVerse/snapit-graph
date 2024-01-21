cd ./firstsubgraph

graph create basarrcan/firstsubgraph --node http://localhost:8020

sleep 1

graph deploy basarrcan/firstsubgraph --node http://localhost:8020 --ipfs http://localhost:5001