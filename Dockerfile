FROM node:20.9.0 AS base

WORKDIR /app
COPY package*.json ./

RUN yarn set version berry
RUN yarn

COPY . .

RUN yarn build


FROM node:20.9.0-slim AS production

ARG user=amplication
ARG group=${user}
ARG uid=1001
ARG gid=$uid



WORKDIR /app


RUN groupadd --gid ${gid} ${user}
RUN useradd --uid ${uid} --gid ${gid} -m ${user}

COPY --from=base /app/node_modules/ ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/scripts ./scripts
COPY --from=base /app/src ./src
COPY --from=base /app/tsconfig* ./

RUN chown -R ${uid}:${gid} /app/

RUN yarn set version berry
RUN yarn install --production

USER ${user}

ENV PORT=3000
EXPOSE ${PORT}

CMD [ "node", "./dist/main.js" ]
