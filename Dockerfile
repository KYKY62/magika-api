# ── Stage 1: Install dependencies ────────────────────────────────────
FROM node:22-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── Stage 2: Production image ────────────────────────────────────────
FROM node:22-slim AS runner

WORKDIR /app

# Non-root user for security
RUN groupadd --system appgroup && \
    useradd --system --gid appgroup --create-home appuser

# Copy dependencies from build stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY package.json ./
COPY src ./src
COPY public ./public

# Set ownership
RUN chown -R appuser:appgroup /app

USER appuser

# Expose port (default 3000, configurable via env)
EXPOSE 3000

# Healthcheck — polls the /api/health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r=>{if(!r.ok)throw r;process.exit(0)}).catch(()=>process.exit(1))"

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "src/server.js"]
