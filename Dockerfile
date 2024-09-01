FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages

RUN npm install
RUN cd packages/database && npx prisma generate --schema=./prisma/schema.prisma && cd ../..

RUN npm run build-backend
EXPOSE 3001

CMD ["npm", "run", "start-backend"]