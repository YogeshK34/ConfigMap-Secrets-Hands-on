#!/bin/bash

# Update ConfigMap
echo "Updating ConfigMap..."
kubectl apply -f kubernetes/configmap.yaml

# Restart the deployment to pick up new ConfigMap values
echo "Restarting deployment to apply changes..."
kubectl rollout restart deployment task-manager

echo "ConfigMap updated!"
