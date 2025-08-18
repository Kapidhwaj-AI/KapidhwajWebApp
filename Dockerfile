FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache python3 make g++ libc6-compat

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["npm", "run", "start", "--", "-p", "3001"]
