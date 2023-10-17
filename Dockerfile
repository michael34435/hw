FROM node:18.18.2-alpine3.17 as builder

WORKDIR /app

COPY . .

RUN npm install && \
  npm i -g @nestjs/cli && \
  nest build

FROM node:18.18.2-alpine3.17 as prod

WORKDIR /app

COPY . .

RUN npm install --omit=dev

ARG DATABASE_URL
ARG JWT_SECRET_KEY

ENV DATABASE_URL $DATABASE_URL
ENV JWT_SECRET_KEY $JWT_SECRET_KEY

COPY --from=builder /app/dist /app/dist

RUN ["node", "./dist/main"]
