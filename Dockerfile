FROM node:20-bookworm-slim AS base
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NEXT_DISABLE_SWC_LOAD_FAILURE_WARNING=1
WORKDIR /app

FROM base AS deps
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates openssl git curl && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

FROM deps AS builder
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXTAUTH_URL=http://localhost:3000
ARG NEXTAUTH_SECRET=devsecret
ARG DATABASE_URL=file:./prisma/dev.db
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} NEXTAUTH_URL=${NEXTAUTH_URL} NEXTAUTH_SECRET=${NEXTAUTH_SECRET} DATABASE_URL=${DATABASE_URL} CI=true
COPY . .
RUN bash -lc 'if [ -d prisma ]; then npx prisma generate; fi'
RUN npm run build

FROM node:20-bookworm-slim AS runner
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0 NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
RUN useradd -u 1001 -m nodeuser
USER 1001
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node","server.js"]
