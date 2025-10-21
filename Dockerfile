# # Etapa 1: Compilación
# FROM node:22-bookworm-slim AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# ENV DISABLE_ESLINT=true
# RUN npm run build

# # Etapa 2: Producción
# FROM node:22-bookworm-slim AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# EXPOSE 3000
# CMD ["npm", "start"]

######

# Etapa 1: Build
FROM node:22-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable

COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .

ENV DISABLE_ESLINT=true
RUN npm run build

# Etapa 2: Runner
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN useradd -r -u 10001 nodeapp

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN chown -R 10001:0 /app
USER 10001

EXPOSE 3000
CMD ["npm","start"]