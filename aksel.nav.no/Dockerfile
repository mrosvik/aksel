FROM node:18.1-alpine3.14
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production

WORKDIR /app
COPY aksel.nav.no/website/.next/standalone ./
COPY aksel.nav.no/website/next-logger.config.js ./
# COPY aksel.nav.no/website/package.json .
# COPY aksel.nav.no/website/.next/ .next/
# COPY aksel.nav.no/website/public/ public
# COPY aksel.nav.no/website/.env .
# COPY aksel.nav.no/website/next.config.js .
# COPY node_modules/ node_modules/
# COPY @navikt/ @navikt/
# CMD yarn start

ENV NODE_OPTIONS '-r next-logger'

EXPOSE 3000
CMD ["node", "aksel.nav.no/website/server.js"]
