FROM node:12.18.4 AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run test
RUN npm run test:e2e
RUN npm run build:prod

FROM node:12.18.4 AS production
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server"]