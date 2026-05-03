FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
RUN npm install

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "npx prisma db push && node src/seed.js && npx nodemon --legacy-watch src/index.js"]
