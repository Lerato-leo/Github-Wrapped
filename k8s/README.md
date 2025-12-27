# Kubernetes Deployment Guide for GitHub Wrapped

## Overview
This directory contains Kubernetes manifests to deploy GitHub Wrapped to any Kubernetes cluster.

## Files

- **namespace.yaml** - Creates the `github-wrapped` namespace
- **backend-deployment.yaml** - Backend service deployment (2 replicas)
- **frontend-deployment.yaml** - Frontend service deployment (2 replicas)
- **services.yaml** - Service definitions for backend (ClusterIP) and frontend (LoadBalancer)
- **configmap.yaml** - Configuration settings
- **secrets.yaml** - Secrets (GitHub token, etc.)
- **ingress.yaml** - Ingress configuration for routing
- **deploy.sh** - Deployment automation script

## Prerequisites

1. **Kubernetes Cluster** - One of:
   - Docker Desktop Kubernetes
   - Azure AKS
   - AWS EKS
   - Google GKE
   - Minikube (local testing)

2. **kubectl** - Kubernetes command-line tool
   ```bash
   # Check if installed
   kubectl version --client
   ```

3. **Context** - Ensure your kubectl is connected to the correct cluster
   ```bash
   kubectl config current-context
   kubectl get nodes
   ```

## Deployment Options

### Option 1: Automated Deployment (Recommended)

```bash
cd k8s
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deployment

```bash
# Navigate to k8s directory
cd k8s

# Create namespace
kubectl apply -f namespace.yaml

# Create secrets (optional - for GitHub token)
kubectl apply -f secrets.yaml

# Create configuration
kubectl apply -f configmap.yaml

# Deploy backend
kubectl apply -f backend-deployment.yaml

# Deploy frontend
kubectl apply -f frontend-deployment.yaml

# Create services
kubectl apply -f services.yaml

# Create ingress (optional)
kubectl apply -f ingress.yaml
```

## Verification

```bash
# Check deployment status
kubectl get deployments -n github-wrapped

# Check pods
kubectl get pods -n github-wrapped

# Check services
kubectl get svc -n github-wrapped

# View logs
kubectl logs -n github-wrapped -l component=backend --tail=50
kubectl logs -n github-wrapped -l component=frontend --tail=50
```

## Accessing the Application

### Local Testing (Port Forward)
```bash
kubectl port-forward -n github-wrapped svc/github-wrapped-frontend 5173:80
# Access at http://localhost:5173
```

### Via LoadBalancer
```bash
# Get the external IP
kubectl get svc github-wrapped-frontend -n github-wrapped

# For Azure AKS:
kubectl get svc github-wrapped-frontend -n github-wrapped -o wide
```

### Via Ingress
Update the ingress.yaml with your domain, then:
```bash
kubectl apply -f ingress.yaml
# Access at https://github-wrapped.example.com
```

## Resource Limits

Current limits per pod:
- **Memory Request**: 128Mi
- **Memory Limit**: 512Mi
- **CPU Request**: 100m (0.1 cores)
- **CPU Limit**: 500m (0.5 cores)

Adjust in the deployment files if needed.

## Scaling

Scale deployments up/down:
```bash
# Scale backend to 3 replicas
kubectl scale deployment github-wrapped-backend -n github-wrapped --replicas=3

# Scale frontend to 3 replicas
kubectl scale deployment github-wrapped-frontend -n github-wrapped --replicas=3
```

## Updating Images

Update to a new image version:
```bash
kubectl set image deployment/github-wrapped-backend \
  backend=leratomatamela1/github-wrapped-backend:v1.0.0 \
  -n github-wrapped

kubectl set image deployment/github-wrapped-frontend \
  frontend=leratomatamela1/github-wrapped-frontend:v1.0.0 \
  -n github-wrapped
```

## Cleanup

Remove all resources:
```bash
kubectl delete namespace github-wrapped
```

## Troubleshooting

### Pods not starting
```bash
kubectl describe pod -n github-wrapped <pod-name>
kubectl logs -n github-wrapped <pod-name>
```

### Service not accessible
```bash
kubectl get svc -n github-wrapped
kubectl describe svc github-wrapped-frontend -n github-wrapped
```

### Image pull errors
```bash
# Check if Docker image is available
docker pull leratomatamela1/github-wrapped-backend:latest
docker pull leratomatamela1/github-wrapped-frontend:latest

# May need to add image pull secrets if using private registry
```

## Environment Variables

Add environment variables in the deployment files:
- Backend: Modify `backend-deployment.yaml` env section
- Frontend: Modify `frontend-deployment.yaml` env section

## Health Checks

Both deployments include:
- **Liveness Probe** - Restarts unhealthy pods
- **Readiness Probe** - Marks pods ready for traffic

## Next Steps

1. Update your Kubernetes context to target the correct cluster
2. Customize the manifests (domain, resource limits, replicas)
3. Run the deployment script or apply manifests manually
4. Verify all pods are running and healthy
5. Access the application via LoadBalancer IP or port-forward
