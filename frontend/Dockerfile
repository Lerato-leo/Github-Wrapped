# Frontend Dockerfile - React with Vite (Multi-stage build)
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY src ./src
COPY index.html vite.config.js ./

# Build application
RUN npm run build

# Production stage - serve with node
FROM node:18-alpine

WORKDIR /app

# Install serve to serve the built app
RUN npm install -g serve

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5173', (res) => { if (res.statusCode !== 404) throw new Error(res.statusCode) })"

# Start application
CMD ["serve", "-s", "dist", "-l", "5173"]
