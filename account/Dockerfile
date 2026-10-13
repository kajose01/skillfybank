FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app .
USER node
EXPOSE 3000
CMD ["node", "server.js"]
