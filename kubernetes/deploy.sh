#!/bin/bash

# Apply Kubernetes manifests
echo "Creating ConfigMap..."
kubectl apply -f kubernetes/configmap.yaml

echo "Creating Secret..."
kubectl apply -f kubernetes/secret.yaml

echo "Creating Deployment..."
kubectl apply -f kubernetes/deployment.yaml

echo "Creating Service..."
kubectl apply -f kubernetes/service.yaml

echo "Creating Ingress..."
kubectl apply -f kubernetes/ingress.yaml

echo "Deployment complete!"
echo "You can access the application at: http://tasks.example.com"
