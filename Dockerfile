# Dockerfile para Frontend - Next.js

# Etapa 1: Dependencias
FROM node:22-alpine AS deps

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Etapa 2: Build
FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN pnpm run build

# Etapa 3: Production
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copiar archivos necesarios del build standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]
