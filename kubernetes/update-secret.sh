#!/bin/bash

# Update Secret
echo "Updating Secret..."
kubectl apply -f kubernetes/secret.yaml

# Restart the deployment to pick up new Secret values
echo "Restarting deployment to apply changes..."
kubectl rollout restart deployment task-manager

echo "Secret updated!"
