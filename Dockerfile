# Use Node.js 22 Alpine (latest LTS)
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_CALENDLY_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BUILD_VERSION

# Set environment variables for build
ENV NEXT_PUBLIC_CALENDLY_URL=$NEXT_PUBLIC_CALENDLY_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_BUILD_VERSION=$NEXT_PUBLIC_BUILD_VERSION

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]