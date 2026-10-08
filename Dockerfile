FROM node:20-alpine            # smaller, patched base image (pin a version, not latest)
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN addgroup -S app && adduser -S app -G app
USER app                        # non-root
HEALTHCHECK CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "server.js"]
