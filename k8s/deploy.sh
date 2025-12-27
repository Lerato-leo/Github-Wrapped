#!/bin/bash

# GitHub Wrapped Kubernetes Deployment Script
# This script deploys the application to a Kubernetes cluster

set -e

echo "🚀 Deploying GitHub Wrapped to Kubernetes..."

# Create namespace
echo "📦 Creating namespace..."
kubectl apply -f namespace.yaml

# Create secrets (optional)
echo "🔐 Creating secrets..."
kubectl apply -f secrets.yaml

# Create configmap
echo "⚙️  Creating configuration..."
kubectl apply -f configmap.yaml

# Deploy backend
echo "🔧 Deploying backend..."
kubectl apply -f backend-deployment.yaml

# Deploy frontend
echo "🎨 Deploying frontend..."
kubectl apply -f frontend-deployment.yaml

# Create services
echo "🌐 Creating services..."
kubectl apply -f services.yaml

# Create ingress (optional)
echo "🔗 Creating ingress (optional)..."
kubectl apply -f ingress.yaml || echo "⚠️  Ingress creation failed - may require additional setup"

# Wait for deployments
echo "⏳ Waiting for deployments to be ready..."
kubectl rollout status deployment/github-wrapped-backend -n github-wrapped --timeout=5m
kubectl rollout status deployment/github-wrapped-frontend -n github-wrapped --timeout=5m

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Deployment Status:"
kubectl get deployments -n github-wrapped
echo ""
echo "📌 Services:"
kubectl get svc -n github-wrapped
echo ""
echo "🔍 Pods:"
kubectl get pods -n github-wrapped
echo ""
echo "💡 To access the application:"
echo "   - Get the frontend service IP: kubectl get svc github-wrapped-frontend -n github-wrapped"
echo "   - Port forward (local testing): kubectl port-forward -n github-wrapped svc/github-wrapped-frontend 5173:80"
echo ""
