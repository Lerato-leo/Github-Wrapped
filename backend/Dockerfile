# Backend Dockerfile - Node.js Express Server
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source
COPY src ./src

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000', (res) => { if (res.statusCode !== 404) throw new Error(res.statusCode) })"

# Start application
CMD ["npm", "run", "dev"]
