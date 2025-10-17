# ---- Base versions
FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---- Install deps (cached layer)
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ---- Build (generate Prisma client + Next build)
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
# copy only what's needed first (better cache)
COPY prisma ./prisma
RUN npx prisma generate
# now copy the rest
COPY . .
# Provide safe default for build-time public var
ARG NEXT_PUBLIC_SITE_NAME="Cynthia's Hub"
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
RUN npm run build

# ---- Runtime image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# (optional) run as non-root
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Bring runtime files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000
USER nextjs
CMD ["npm","run","start"]
