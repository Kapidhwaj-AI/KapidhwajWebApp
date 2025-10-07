# Use an official Node.js Alpine image
FROM node:20-alpine

WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json ./

# Install git and pnpm
RUN apk add --no-cache git && npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy rest of your app
COPY . .

# Build your app (add if you have a build step)
RUN pnpm build

# Expose port (optional, if your app runs on a port, e.g. 3000)
EXPOSE 3001

# Start your app (customize as needed)
CMD ["pnpm", "start"]
