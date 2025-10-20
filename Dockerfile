FROM node:20-alpine AS base
WORKDIR /app

# deps for build
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci

# build app
FROM deps AS builder
# Defaults so Next build doesn't fail if envs aren't provided in CI
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .
ENV NODE_ENV=production
# run prisma generate only if prisma dir exists
RUN sh -lc 'if [ -d prisma ]; then npx prisma generate; fi'
RUN npm run build

# runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
# copy Next standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# non-root
RUN addgroup -g 1001 -S nodegrp && adduser -S node -u 1001 -G nodegrp
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node","server.js"]
