# syntax=docker/dockerfile:1.7

# -----------------------------
# Base image with shared setup
# -----------------------------
FROM node:22-alpine AS base
WORKDIR /app

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Install required build tools
RUN apk add --no-cache python3 make g++ libc6-compat

# -----------------------------
# Dependencies stage
# -----------------------------
FROM base AS deps

# Copy only package manifests for better caching
COPY package*.json ./

# Install git (fixes ENOENT error) and pnpm + dependencies
RUN apk add --no-cache git && \
    npm install -g pnpm && \
    pnpm install

# -----------------------------
# Build stage
# -----------------------------
FROM base AS build

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
# Copy rest of the source code
COPY . .

# Build the Next.js app
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

# -----------------------------
# Runtime image
# -----------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
RUN apk add --no-cache libc6-compat

# Copy necessary files from build stages
COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.* ./

EXPOSE 3001
CMD ["pnpm", "run", "start", "--", "-p", "3001"]
