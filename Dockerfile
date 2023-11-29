# builder
FROM node:20.9.0 as builder
WORKDIR /app


COPY tsconfig.json package.json yarn.lock swagger.ts ./
COPY ./src ./src

RUN yarn set version berry
RUN yarn install
RUN yarn build

# main
FROM node:20.9.0-slim

ENV ENVIRONMENT=production


WORKDIR /app


COPY package*.json yarn.lock ./

RUN  yarn install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/swagger-output.json ./dist

CMD ["yarn", "start"]
