FROM node:20-alpine

# Required for bcrypt (native module) and Prisma
RUN apk add --no-cache openssl python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN sed -i 's/\r//' entrypoint.sh && chmod +x entrypoint.sh

EXPOSE 3000

CMD ["sh", "entrypoint.sh"]
