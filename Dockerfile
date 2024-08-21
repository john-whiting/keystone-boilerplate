FROM node:20.16.0-alpine AS base

FROM base AS build

WORKDIR /build
COPY . .

ENV BUILDING=true
RUN yarn install --frozen-lockfile
RUN yarn build

FROM base AS install_production

WORKDIR /build
COPY . .

ENV BUILDING=true
RUN yarn install --frozen-lockfile --production

FROM base AS production

WORKDIR /app
COPY --from=build /build/.keystone ./.keystone
COPY --from=build /build/schema.graphql /build/schema.prisma ./
COPY --from=install_production /build/node_modules ./node_modules
COPY package.json yarn.lock ./

CMD ["yarn", "start"]