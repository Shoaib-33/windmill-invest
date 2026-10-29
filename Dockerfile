# Windmill Invest website for Google Cloud Run.
# The pages are built when the container starts, so company details set as Cloud Run
# environment variables (LEGAL_NAME, KVK, PHONE, ...) end up in the HTML.
FROM node:24-slim

ENV NODE_ENV=production
WORKDIR /app
# Run as the unprivileged node user; it owns /app because the build writes dist/ at start-up.
RUN chown node:node /app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --chown=node:node . .

# Cloud Run sets PORT (8080); config.js reads it.
ENV PORT=8080
EXPOSE 8080
CMD ["sh", "-c", "node build.js && exec node server.js"]
